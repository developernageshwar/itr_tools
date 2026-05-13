"use client";

import React from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function NeedHelpPage() {
  return (
    <ProtectedRoute>
      <div className="p-10">
        <h1 className="text-2xl font-bold font-poppins">Need Help?</h1>
        <p className="mt-4 font-poppins text-gray-600">This is the Need Help page.</p>
      </div>
    </ProtectedRoute>
  );
}
