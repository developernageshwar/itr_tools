"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Perform logout logic here (e.g., clearing tokens)
    // For now, just redirect to home after a delay
    const timer = setTimeout(() => {
      router.push('/');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold font-poppins">Logging out...</h1>
      <p className="mt-4 font-poppins text-gray-600">Please wait while we log you out safely.</p>
    </div>
  );
}
