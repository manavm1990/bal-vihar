import { useState } from 'react'

export default function useDate() {
  const [date, setDate] = useState<Date>()

  return [date, setDate] as const
}
