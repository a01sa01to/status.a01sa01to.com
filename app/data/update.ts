export const LAST_UPDATE_KEY = 'last_update'

export const getLastUpdate = async (env: Env): Promise<Date> => {
  const lastUpdate = await env.STATUS.get(LAST_UPDATE_KEY, 'text')
  return new Date(lastUpdate ?? new Date())
}

export const setLastUpdate = async (env: Env) => {
  const now = new Date().toISOString()
  await env.STATUS.put(LAST_UPDATE_KEY, now)
}
