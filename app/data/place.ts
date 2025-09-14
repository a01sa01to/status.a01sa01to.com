import { setLastUpdate } from './update'

export const PLACE_KEY = 'place'

export const getPlace = async (env: Env): Promise<string> => {
  const status = await env.STATUS.get(PLACE_KEY, 'text')
  return status ?? 'Unknown'
}

export const setPlace = async (env: Env, status: string) => {
  await env.STATUS.put(PLACE_KEY, status)
  await setLastUpdate(env)
}
