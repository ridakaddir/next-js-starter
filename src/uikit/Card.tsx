import React from 'react'

export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-neutral-200/70 dark:border-neutral-800/60 bg-white dark:bg-neutral-900 shadow-sm ${className}`}>
      {children}
    </div>
  )
}

export function CardHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="p-6 border-b border-neutral-200/70 dark:border-neutral-800/60">
      <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">{title}</h2>
      {subtitle && <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">{subtitle}</p>}
    </div>
  )
}

export function CardBody({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-6 ${className}`}>{children}</div>
}
