"use client";

import React from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function SharePage() {
  return (
    <ProtectedRoute>
      <div className="p-10">
        <h1 className="text-2xl font-bold font-poppins">Share</h1>
        <p className="mt-4 font-poppins text-gray-600">This is the Share page.</p>
      </div>
    </ProtectedRoute>
  );
}
