import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'CPT Group Member Management';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#030711',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px',
        }}
      >
        {/* Logo */}
        <img
          src="public/cpt-logo.png"
          alt="CPT Group Logo"
          width={200}
          height={200}
          style={{
            marginBottom: '24px',
          }}
        />
        <div
          style={{
            fontSize: 60,
            fontWeight: 'bold',
            color: '#ffffff',
            marginBottom: '16px',
            textAlign: 'center',
            lineHeight: 1.2,
          }}
        >
          CPT Group
        </div>
        <div
          style={{
            fontSize: 36,
            color: '#a1a1aa',
            textAlign: 'center',
          }}
        >
          Member Management System
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
} 