import type { ImportMetaEnv } from '@/app/types/vite-env'

const getEnvVar = (key: keyof ImportMetaEnv) => {
  const value = import.meta.env[key]

  if (value === undefined) {
    throw new Error(`Env variable ${key} is required`)
  }

  return value
}

export const API_URL = getEnvVar('VITE_API_URL')
