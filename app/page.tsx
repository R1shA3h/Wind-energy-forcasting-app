// page.tsx
"use client";
import { useState } from 'react';
import prisma from "@/lib/db";

export default function Home() {
  const [dateInput, setDateInput] = useState('');
  const [generation, setGeneration] = useState<number | null>(null);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateInput(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch('/api/generation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dateInput }),
    });
    const data = await response.json();
    setGeneration(data.generation);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
      <h1 className="text-4xl font-bold text-white mb-10">Weather Generation Forecast</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateInput">
            Enter Date and Time
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="dateInput"
            type="text"
            placeholder="DD/MM/YYYY HH:MM"
            value={dateInput}
            onChange={handleDateChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Get Generation
          </button>
        </div>
      </form>
      {generation !== null && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-center">
          <p className="text-gray-700 text-sm font-bold">Generation Power:</p>
          <p className="text-2xl">{generation} MW</p>
        </div>
      )}
    </div>
  );
}
