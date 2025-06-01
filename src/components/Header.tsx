'use client';

import Image from 'next/image';

export default function Header() {
  return (
    <div className="flex flex-col items-center mb-6">
      <div className="flex items-center gap-4 mb-3">
        <Image
          src="/cpt-logo.png"
          alt="CPT Group Logo"
          width={48}
          height={48}
          priority
        />
        <h1 className="text-2xl font-bold m-0">CPT Group</h1>
      </div>
      <p className="text-sm opacity-80">
        Class Action Lawsuit Member Management System
      </p>
    </div>
  );
} 