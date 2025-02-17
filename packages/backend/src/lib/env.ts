export function getStringEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`You need to provide ${name} environment variable`)
  }

  return value
}

export function getIntEnv(name: string): number {
  const value = getStringEnv(name)
  const parsed = parseInt(value)
  if (isNaN(parsed)) {
    throw new Error(`${name} environment variable is not a number`)
  }

  return parsed
}
