'use client'

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-500">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to GigHub </h1>
      <p className="text-gray-600">Your side hustle starts here.Login to get started!</p>
      <button
        title="Login"
        onClick={() => router.push('/login')}
        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          Go to Login
        </button>
    </main>
  );
}
