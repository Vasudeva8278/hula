'use client'

import { ReduxProvider } from "../redux/Provider"
import { ToastProvider } from "@/ui/toast"

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </ReduxProvider>
  )
}