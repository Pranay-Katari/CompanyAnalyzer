"use client";
import Link from "next/link";
import { useState} from "react";

export default function Home() {
  const [stocks] = useState([
    { symbol: "AAPL", price: 184.56, change: +1.23 },
    { symbol: "MSFT", price: 318.74, change: -0.84 },
    { symbol: "GOOGL", price: 138.92, change: +0.56 },
    { symbol: "AMZN", price: 142.11, change: +2.01 },
    { symbol: "TSLA", price: 256.73, change: -3.45 },
  ]);

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center relative px-4">
      <div className="absolute top-0 w-full bg-black text-white py-2 px-6 flex justify-center space-x-8 overflow-x-auto">
        {stocks.map((s, idx) => (
          <div key={idx} className="flex items-center space-x-2">
            <span className="font-semibold">{s.symbol}</span>
            <span>${s.price.toFixed(2)}</span>
            <span
              className={`${
                s.change >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {s.change >= 0 ? "▲" : "▼"} {Math.abs(s.change).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
      <div className="max-w-3xl mt-20">
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-gray-900">
          S&amp;P 500 <span className="text-blue-600">Analyzer</span>
        </h1>
        <p className="mt-6 text-xl md:text-2xl text-gray-600 leading-relaxed">
          Gain insights into market sentiment, company trends, and sector
          performance. A powerful tool for data-driven investors and analysts.
        </p>
        <p className="mt-6 text-sm text-gray-500 italic">
          Disclaimer: Data availability may vary depending on market hours, API limits, 
          or server activity. Data availability is best around/after noon. Check the Github.
        </p>
        <div className="mt-10">
          <Link
            href="/analyzer"
            className="inline-block px-10 py-4 text-lg font-semibold rounded-2xl shadow-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
          <Link
            href="/gallery"
            className="inline-block px-10 py-4 text-lg font-semibold rounded-2xl shadow-md bg-gray-800 text-white hover:bg-gray-900 transition"
          >
            View Gallery
          </Link>
        </div>
      </div>
      <footer className="absolute bottom-6 text-gray-500 text-sm">
        {new Date().getFullYear()} Open Source by Pranay Katari.
      </footer>
    </main>
  );
}
