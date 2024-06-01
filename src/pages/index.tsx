import { Inter } from "next/font/google";
import NavBar from "@/pages/component/NavBar";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const handleClick = async () => {
    const username = "root";

    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
      }),
    });

    console.log(res);
  };

  return (
    <>
      <NavBar />
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
        test
      </main>
    </>
  );
}
