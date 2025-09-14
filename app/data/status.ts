import { MdComputer, MdQuestionMark } from 'react-icons/md'
import { setLastUpdate } from './update'

export const STATUS_TEXT_KEY = 'status_text'
export const STATUS_ICON_KEY = 'status_icon'

/* eslint-disable sort-keys */
export const ICON_LIST = {
  Unknown: MdQuestionMark,
  Computer: MdComputer,
} as const
/* eslint-enable sort-keys */
export type StatusIconList = keyof typeof ICON_LIST

const isStatusIcon = (value: string): value is StatusIconList => {
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

export const setMyStatus = async (
  env: Env,
  statusIcon: StatusIconList,
  statusText: string
) => {
  await env.STATUS.put(STATUS_ICON_KEY, statusIcon)
  await env.STATUS.put(STATUS_TEXT_KEY, statusText)
  await setLastUpdate(env)
}
