"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { MdInfoOutline } from 'react-icons/md';
import { taxReturnService } from '@/services/taxReturnService';

export default function ItrStepRedirectPage() {
  const router = useRouter();
  const params = useParams();
  const itrId = params?.itrId;
  const step = params?.step;
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!itrId || !step) return;
 
    async function fetchAndRedirect() {
      try {
        const data = await taxReturnService.getItrDetails(itrId);
        const taxpayerType = data.taxpayer?.taxpayerType || 'Individual';

        const path = getRedirectPath(taxpayerType, step);
        router.replace(path);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      }
    }

    fetchAndRedirect();
  }, [itrId, step, router]);

  const getRedirectPath = (filingType, targetStep) => {
    const lowerFilingType = (filingType || 'Individual').toLowerCase();
    let stepRoute = targetStep;
    if (targetStep === 'personal-info' || targetStep === 'pan-details') {
      stepRoute = 'details'; 
    }

    let typeSlug = lowerFilingType;
    if (typeSlug === 'company private') typeSlug = 'company-private';
    if (typeSlug === 'aop/boi') typeSlug = 'aop-boi';
    if (typeSlug === 'cooperative society') typeSlug = 'cooperative-society';

    return `/dashboard/${typeSlug}/${stepRoute}`;
  };

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 flex-col gap-4">
        <MdInfoOutline className="text-[#FF383C]" size={48} />
        <h2 className="text-xl font-poppins font-medium text-black">Unable to resume tax filing.</h2>
        <p className="text-gray-500 font-poppins text-sm">{error}</p>
        <button
          onClick={() => router.replace('/dashboard/my-tax-returns')}
          className="mt-2 px-4 py-2 bg-gradient-to-r from-[#1498EB] to-[#962DE3] text-white rounded-md font-semibold text-sm"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#3867D6]"></div>
        <p className="text-gray-500 font-poppins text-base">Resuming tax filing... Please wait</p>
      </div>
    </div>
  );
}
