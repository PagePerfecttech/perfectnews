"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

/**
 * Root providers wrapper. Wraps the entire app with:
 * - NextAuth SessionProvider (required for signIn/signOut to work)
 *
 * Add any future providers (theme, toast, etc.) here.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
