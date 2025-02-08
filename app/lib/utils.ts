import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { BASE_TITLE, DESCRIPTION } from './constants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createJsonLd(name: string, description = DESCRIPTION) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: `${BASE_TITLE} - ${name}`,
    image: 'https://d8n3.c1.e2-8.dev/bal-vihar/icon.svg',
    description,
  }
}
