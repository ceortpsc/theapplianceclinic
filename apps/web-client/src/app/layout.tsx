import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'The Appliance Clinic | POS & Store Operations',
    template: '%s | The Appliance Clinic',
  },
  description:
    'Independent point-of-sale and store-operations platform for appliance sales, inventory, repairs, dispatch, pickup, delivery, employees, payroll and analytics.',
  applicationName: 'The Appliance Clinic',
  robots: {
    index: true,
    follow: true,
  },
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
