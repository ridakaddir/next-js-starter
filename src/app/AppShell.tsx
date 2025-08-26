"use client"

import SignIn from "@/features/sign-in/sign-in"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

type Props = {
  children: React.ReactNode
}

const links = [
  { href: "/", label: "Home" },
  { href: "/todo", label: "Todos" },
  { href: "/customers", label: "Customers" },
]

export default function AppShell({ children }: Props) {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  const linkCls = (href: string) =>
    `block rounded-md px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900 ${pathname === href ? "bg-neutral-100 dark:bg-neutral-900 font-medium" : ""
    }`

  return (
    <div className="min-h-screen flex bg-[var(--background)] text-[var(--foreground)]">
      <SignIn />
      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-40 md:hidden ${open ? "" : "pointer-events-none"}`}>
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
          aria-hidden
        />
        <aside
          className={`absolute left-0 top-0 bottom-0 w-64 border-r border-neutral-200/70 dark:border-neutral-800/60 bg-white dark:bg-neutral-950 shadow-xl transform transition-transform ${open ? "translate-x-0" : "-translate-x-full"
            }`}
          aria-label="Sidebar"
        >
          <div className="p-4 border-b border-neutral-200/70 dark:border-neutral-800/60">
            <span className="text-base font-semibold">Inspector Console</span>
          </div>
          <nav className="p-3 space-y-1">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className={linkCls(l.href)} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
          </nav>
        </aside>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 border-r border-neutral-200/70 dark:border-neutral-800/60 bg-white dark:bg-neutral-950/50">
        <div className="w-full">
          <div className="p-4 border-b border-neutral-200/70 dark:border-neutral-800/60">
            <span className="text-base font-semibold">Inspector Console</span>
          </div>
          <nav className="p-3 space-y-1">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className={linkCls(l.href)}>
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 border-b border-neutral-200/70 dark:border-neutral-800/60 bg-white/80 dark:bg-neutral-950/60 backdrop-blur supports-[backdrop-filter]:bg-white/75 supports-[backdrop-filter]:dark:bg-neutral-950/55">
          <div className="flex items-center gap-3 px-4 h-14">
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center rounded-md border border-neutral-300/70 dark:border-neutral-700/60 bg-white dark:bg-neutral-900 h-9 w-9 text-neutral-700 dark:text-neutral-200 shadow-sm hover:bg-neutral-50"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span className="text-sm font-medium">Inspector Console</span>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
