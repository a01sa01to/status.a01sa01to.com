import { MdComputer, MdQuestionMark } from 'react-icons/md'

export const STATUS_TEXT_KEY = 'status_text'
export const STATUS_ICON_KEY = 'status_icon'

/* eslint-disable sort-keys */
export const ICON_LIST = {
  Unknown: MdQuestionMark,
  Computer: MdComputer,
} as const
/* eslint-enable sort-keys */
export type StatusIconList = keyof typeof ICON_LIST

export const isStatusIcon = (value: string): value is StatusIconList => {
  return Object.keys(ICON_LIST).includes(value)
}

export const getMyStatus = async (
  env: Env
): Promise<[StatusIconList, string]> => {
  const statusText = await env.STATUS.get(STATUS_TEXT_KEY, 'text')
  const statusIcon = await env.STATUS.get(STATUS_ICON_KEY, 'text')
  const icon = statusIcon && isStatusIcon(statusIcon) ? statusIcon : 'Unknown'
  return [icon, statusText ?? 'Unknown Status']
}

export const setStatusIcon = async (env: Env, statusIcon: StatusIconList) => {
  await env.STATUS.put(STATUS_ICON_KEY, statusIcon)
}

export const setStatusText = async (env: Env, statusText: string) => {
  await env.STATUS.put(STATUS_TEXT_KEY, statusText)
}
