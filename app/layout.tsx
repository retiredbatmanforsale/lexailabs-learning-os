import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { AuthProviderWrapper } from '@/providers/AuthProviderWrapper';

export const metadata: Metadata = {
  title: 'Lex AI - Learn AI from Industry Engineers',
  description:
    'Master Machine Learning, Deep Learning, and LLMs through structured, hands-on courses taught by Google, Amazon, and Oracle engineers.',
    keywords:
        'Lex AI, AI community India, AI fellowship, machine learning, AI engineering, AI mentorship, AI training India, AI leaders',
      icons: {
        icon: '/assets/lexailogo.svg',
        shortcut: '/assets/lexailogo.svg',
        apple: '/assets/lexailogo.svg',
      },
      openGraph: {
        title: 'Lex AI | Build Intelligence. Build India.',
        description:
          "Join India's most ambitious community of engineers, founders & leaders building real AI. Elite training, mentorship, and a network that accelerates your career.",
        type: 'website',
      },
    };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <AuthProviderWrapper>{children}</AuthProviderWrapper>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
