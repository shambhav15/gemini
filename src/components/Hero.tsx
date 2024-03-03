import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Hero() {
  return (
    <section className="w-full py-12">
      <div className="container px-4 md:px-6 flex flex-col items-center space-y-4">
        <div className="grid items-center gap-4">
          <Image
            alt="Gemini"
            className="rounded-full"
            height="150"
            src="/placeholder.svg"
            style={{
              aspectRatio: "150/150",
              objectFit: "cover",
            }}
            width="150"
          />
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Talk to Gemini
            </h1>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide dark:text-gray-400">
              Powered by Google AI
            </p>
          </div>
        </div>
        <div className="w-full max-w-[600px] space-y-4">
          <p className="text-xl tracking-tight text-center md:text-2xl/none dark:text-gray-400">
            Ask questions, get answers. Experience the power of conversational
            AI with Gemini.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="btn">
              <Link href="/chat">Get Started</Link>
            </button>
            <button className="btn">Learn More</button>
          </div>
        </div>
      </div>
    </section>
  );
}
