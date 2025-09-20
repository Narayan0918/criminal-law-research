// client/app/dashboard/layout.tsx

"use client";

import React, { useEffect, useState } from 'react'; // Import React for types
import { useRouter } from 'next/navigation';

// Define the type for the props, specifically for 'children'
type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.replace('/');
    } else {
      setIsVerified(true);
    }
  }, [router]);

  if (!isVerified) {
    return null; // Render nothing while verifying
  }

  // If verified, render the children (the page.tsx component)
  return <section className="bg-gray-100">{children}</section>;
}