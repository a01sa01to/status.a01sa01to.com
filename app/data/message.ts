export const MESSAGE_KEY = 'message'

export const getMessage = async (env: Env): Promise<string> => {
  const status = await env.STATUS.get(MESSAGE_KEY, 'text')
  return status ?? '-'
}

export const setMessage = async (env: Env, status: string) => {
  await env.STATUS.put(MESSAGE_KEY, status)
}
