import React from 'react';
import './styles.css';
import { Metadata } from 'next';
import WhatsAppButtonClient from './components/WhatsAppButton';

export const metadata: Metadata = {
  title: 'PT. Wahana Jaya Distribusi - Industrial Equipment Supplier',
  description: 'Leading industrial equipment supplier in Indonesia, providing high-quality products and solutions for various industrial applications.',
  keywords: 'industrial equipment, supplier, Indonesia, industrial solutions',
  robots: 'index, follow',
};

// Server component layout
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="font-sans overflow-x-hidden bg-white">
        {children}
        <WhatsAppButtonClient />
      </body>
    </html>
  );
};

export default Layout;
