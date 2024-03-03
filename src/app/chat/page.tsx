/* eslint-disable @next/next/no-img-element */
// Import necessary dependencies
"use client";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import a2 from "../../../public/a2.json";
import Lottie from "lottie-react";
// Define the Home component
const Chat = () => {
  const { user } = useUser();
  const imageUrl = user?.imageUrl;

  console.log(user);

  // Define state variables
  const [error, setError] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<
    { role: string; parts: string }[]
  >([]);
  // console.log(chatHistory);

  const [loading, setLoading] = useState<boolean>(false);

  // Define the supriseMe function
  const supriseMe = () => [
    "What is the capital of Nigeria?",
    "Who won the 2018 world cup?",
    "What is the largest continent in the world?",
    "Cricket is the national sport of which country?",
  ];

  // Define the suprise function
  const suprise = () => {
    const random = Math.floor(Math.random() * supriseMe().length);
    setValue(supriseMe()[random]);
  };

  // Define the getResponse function
  const getResponse = async () => {
    // Clear previous errors
    setError("");

    // Check if the value is empty
    if (!value) {
      setError("Please ask a question");
      return;
    }

    try {
      // Set loading to true
      // Prepare the options for the fetch request
      const options = {
        method: "POST",
        body: JSON.stringify({
          message: value,
          history: chatHistory,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Make the fetch request
      setLoading(true);
      const response = await fetch("http://localhost:9000/gemini", options);
      const data = await response.text();

      // Update chat history with user and model messages
      setChatHistory((oldHistory) => [
        ...oldHistory,
        {
          role: "user",
          parts: value,
        },
        {
          role: "model",
          parts: data,
        },
      ]);

      // Clear the input value
      setValue("");
    } catch (error) {
      // Handle errors
      setError("Something went wrong. Please try again later.");
    } finally {
      // Set loading to false regardless of success or failure
      setLoading(false);
    }
  };

  const userIconPath = imageUrl;
  const aiIconUrl = "/ai.png";

  // Return the JSX markup
  return (
    <main className="h-screen flex justify-center items-center">
      <div className="border border-zinc-700  h-4/5 w-4/5 rounded-3xl p-5 overflow-hidden flex flex-col">
        <div
          id="scroll"
          className="border-zinc-600 border overflow-y-scroll mt-3 font-bold px-2 py-0.5 text-lg rounded flex-grow"
        >
          {chatHistory.slice().reverse().map((chatItem, _index, array) => (
            <div
              key={_index}
              className="flex w-full items-center justify-center"
            >
              <img
                alt="Gemini"
                className="rounded-full w-10 h-10"
                height="30"
                src={chatItem.role === "user" ? userIconPath : aiIconUrl}
                style={{
                  objectFit: "cover",
                }}
                width="30"
              />

              {loading && chatItem.role !== "user" && (
                <Lottie className="w-10 h-10" animationData={a2} />
              )}
              <p
                className={
                  chatItem.role === "user"
                    ? "py-3 px-5 flex bg-neutral-900 w-full ml-2"
                    : "py-3 px-5 flex bg-neutral-800 border w-full ml-2 border-neutral-800 rounded-lg"
                }
              >
                {chatItem.parts}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-end">
          <div className="input-container relative ">
            <input
              className="bg-zinc-900 border border-zinc-900 outline-none text-white p-2 w-full rounded-lg"
              value={value}
              placeholder="Ask me anything.."
              type="text"
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
            {!error && (
              <button
                onClick={getResponse}
                className="btn absolute right-4 bg-[#e0e0e6] m-2 text-black p-1"
              >
                Ask me
              </button>
            )}
            {error && (
              <button
                onClick={() => {
                  setValue("");
                  setError("");
                }}
                className="btn absolute right-4 m-2"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {chatHistory.length === 0 && (
          <button
            disabled={!chatHistory}
            onClick={suprise}
            className="btn text-black mt-4 self-end"
          >
            Surprise me
          </button>
        )}

        {error && <p className=" text-red-500">{error}</p>}
      </div>
    </main>
  );
};

// Export the Home component
export default Chat;
