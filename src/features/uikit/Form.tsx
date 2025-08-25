import React from 'react'

export const TextInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { label?: string }>(
  ({ label, className = '', ...rest }, ref) => {
    return (
      <label className="flex-1 text-sm">
        {label && <span className="sr-only">{label}</span>}
        <input
          ref={ref}
          {...rest}
          className={`w-full rounded-xl border border-neutral-200/70 dark:border-neutral-800/60 bg-white/80 dark:bg-neutral-900/80 px-3 py-2 text-sm ${className}`}
        />
      </label>
    )
  }
)
TextInput.displayName = 'TextInput'

export function Button(
  { children, className = '', ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }
) {
  return (
    <button
      {...rest}
      className={`rounded-xl bg-blue-600 text-white text-sm font-medium px-4 py-2 hover:bg-blue-500 disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  )
}
