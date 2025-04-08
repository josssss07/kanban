'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ForgotPassword() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/reset-password');
  }, [router]);
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="text-white text-center">
        <p>Redirecting to password reset...</p>
      </div>
    </div>
  );
}