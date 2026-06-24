type ClassValue = string | undefined | null | false | ClassValue[]

function flatten(value: ClassValue): string[] {
  if (!value) return []
  if (typeof value === 'string') return [value]
  return value.flatMap(flatten)
}

export function cn(...inputs: ClassValue[]): string {
  return flatten(inputs).join(' ')
}