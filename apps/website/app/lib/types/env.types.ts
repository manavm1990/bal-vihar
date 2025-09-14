import { object, parse, pipe, string, url } from 'valibot'

export const { USERCHECK_API_KEY, USERCHECK_API_URL } = parse(
  object({
    USERCHECK_API_KEY: string(),
    USERCHECK_API_URL: pipe(string(), url()),
  }),
  process.env,
)
