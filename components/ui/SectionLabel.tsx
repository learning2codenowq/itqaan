import { cn } from '@/lib/utils'

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
  center?: boolean
}

export default function SectionLabel({
  children,
  className,
  center = false,
}: SectionLabelProps) {
  return (
    <p
      className={cn(
        'flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-ink-48',
        center && 'justify-center',
        className
      )}
    >
      <span
        aria-hidden="true"
        className="inline-block h-1 w-1 rounded-full bg-ember flex-shrink-0"
      />
      {children}
    </p>
  )
}