"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('onboardingComplete2') === 'true';
    
    if (hasCompletedOnboarding) {
      router.push('/dashboard');
    } else {
      router.push('/onboarding/1');
    }
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-600 font-medium">Loading...</p>
      </div>
    </div>
  );
}