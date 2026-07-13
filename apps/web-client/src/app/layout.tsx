import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Appliance Clinic — Enterprise Management Platform',
  description: 'Enterprise-grade operations, dispatch, CRM, and financial management.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
