import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CPT Group Member Management',
    short_name: 'CPT Group',
    description: 'Efficient member management system for class action lawsuits',
    start_url: '/',
    display: 'standalone',
    background_color: '#030711',
    theme_color: '#030711',
    icons: [
      {
        src: '/cpt-logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/cpt-logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
} 