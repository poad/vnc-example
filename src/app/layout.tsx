'use client';
import { ReactNode } from 'react';
import 'tailwindcss/tailwind.css';
import './styles/Layout.module.css';

export default function Document({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
