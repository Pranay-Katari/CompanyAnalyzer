"use client";
import Link from "next/link";

export default function Gallery() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      <div className="absolute top-0 w-full bg-black text-white py-2 px-6 flex justify-center space-x-8">
        <Link href="/" className="inline-block px-10 py-4 text-lg font-semibold rounded-2xl shadow-md bg-gray-800 text-white hover:bg-gray-900 transition">Home</Link>
        <Link href="/gallery" className="inline-block px-10 py-4 text-lg font-semibold rounded-2xl shadow-md bg-gray-800 text-white hover:bg-gray-900 transition">Gallery</Link>
      </div>

      <div className="w-full mt-16">

          <img
            src="https://i.imgur.com/dOs9Ewl.png"
            alt="Gallery Screenshot"
            className="w-full h-auto"
          />

<img
            src="https://i.imgur.com/xVTxJeF.png"
            alt="Gallery Screenshot"
            className="w-full h-auto"
          />

        <p className="mt-6 text-sm text-gray-500 italic">
          Disclaimer: Data availability may vary depending on market hours, API limits, 
          or server activity. Some requests may not return results at certain times of the day.
        </p>
      </div>

      <footer className="absolute bottom-6 text-gray-500 text-sm">
        {new Date().getFullYear()} Open Source.
      </footer>
    </main>
  );
}
