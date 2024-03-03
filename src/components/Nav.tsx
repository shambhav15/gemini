"use client";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { SignIn, SignUp } from "@clerk/nextjs";
export default function Nav() {
  const { isSignedIn } = useUser();

  return (
    <header key="1" className="fixed inset-x-0 top-0  z-50">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="flex h-14 items-center">
            <Link
              className=" text-3xl font-sans  items-center justify-center text-white/90 hover:text-gray-300"
              href="/"
            >
              <Image
                alt="Acme Inc"
                className="rounded-full"
                height="40"
                src="/ai.png"
                style={{
                  aspectRatio: "40/40",
                  objectFit: "cover",
                }}
                width="40"
              />
            </Link>
            <nav className="hidden md:flex items-center space-x-4 text-sm font-medium">
              {/* <Link
                className="text-gray-100/90 hover:text-gray-100/50"
                href="#"
              >
                Contact
              </Link> */}
            </nav>
            <div className="ml-auto flex items-center space-x-4 z-10">
              {!isSignedIn ? (
                <>
                  <SignInButton>
                    <button className="btn">Sign In</button>
                  </SignInButton>
                </>
              ) : (
                <>
                  <UserButton afterSignOutUrl="/" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
