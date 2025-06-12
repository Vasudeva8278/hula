'use client'

import { ReduxProvider } from "../redux/Provider"
import { ToastProvider } from "@/ui/toast"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </ReduxProvider>
  )
}