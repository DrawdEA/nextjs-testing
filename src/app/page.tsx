"use client";

import Link from "next/link";
import Image from "next/image";

import Button from "../components/Button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Image 
        src="/logo.png"
        alt="Logo"
        width={800}
        height={450}
      />
      <Link href="/game">
        <Button text="START" onClick={() => console.log("STARTING!") } />
      </Link>
    </div>
  );
}
