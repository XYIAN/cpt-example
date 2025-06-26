'use client';

import ThemeSidebar from './ThemeSidebar';

export default function Footer() {
  return (
    <div className="w-full px-4 py-2 mt-auto bg-surface-card shadow-md border-t border-primary/10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-sm opacity-80">
          <span>© {new Date().getFullYear()} CPT Group</span>
          <span className="mx-2 text-xs">•</span>
          <span>All rights reserved</span>
        </div>
        <ThemeSidebar />
      </div>
    </div>
  );
} 