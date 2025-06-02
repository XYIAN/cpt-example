'use client';

import { Toolbar } from 'primereact/toolbar';
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';

export default function Header() {
  const startContent = (
    <div className="flex items-center gap-4">
      <Image
        src="/cpt-gen.png"
        alt="CPT Group Logo"
        width="68"
        height="68"
        className="transition-all duration-300 hover:scale-105"
        pt={{
          image: { 
            className: 'rounded-lg shadow-lg border-2 border-primary/10',
          }
        }}
      />
      <div>
        <h1 className="text-2xl font-bold m-0">CPT Group</h1>
        <p className="text-sm opacity-80 mt-1">
          Class Action Lawsuit Member Management
        </p>
      </div>
    </div>
  );

  const endContent = (
    <Button
      icon="pi pi-github"
      rounded
      text
      severity="secondary"
      tooltip="View on GitHub"
      onClick={() => window.open('https://github.com/XYIAN/cpt-example', '_blank')}
      aria-label="GitHub Repository"
      pt={{
        root: { className: 'p-4' },
        icon: { 
          className: 'transition-transform hover:scale-110',
          style: { fontSize: '40px', width: '40px', height: '40px' }
        }
      }}
    />
  );

  return (
    <Toolbar
      start={startContent}
      end={endContent}
      className="mb-6 surface-card shadow-md rounded-xl border border-primary/10"
      pt={{
        root: { className: 'p-4' }
      }}
    />
  );
} 