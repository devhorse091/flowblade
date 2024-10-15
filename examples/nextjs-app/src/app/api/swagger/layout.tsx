import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { fontInter } from '@/components/fonts/FontInter';
import { ReactQueryClientProvider } from '@/providers/ReactQueryClientProvider';
import { ReduxStoreProvider } from '@/providers/ReduxProvider';

export const metadata: Metadata = {
  title: 'Flowblade nextjs app',
  description: 'Example',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontInter.variable} antialiased`}>
        <ReduxStoreProvider>
          <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
        </ReduxStoreProvider>
      </body>
    </html>
  );
}
