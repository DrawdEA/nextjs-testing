"use client";

import Link from "next/link";

import Button from "../components/Button";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Link href="/game">
        <Button text="START" onClick={() => console.log("STARTING!") } />
      </Link>
    </div>
  );
}
