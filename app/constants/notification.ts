export const NOTIFICATION_DISABLED = 'disabled'
export const NOTIFICATION_ENABLED = 'enabled'

export const NOTIFICATION_KEY = 'notification'

export const NOTIFICATION_STATUS_LIST = [
  NOTIFICATION_DISABLED,
  NOTIFICATION_ENABLED,
] as const
export type NotificationStatus = (typeof NOTIFICATION_STATUS_LIST)[number]

const isNotificationStatus = (value: string): value is NotificationStatus => {
  return NOTIFICATION_STATUS_LIST.includes(value as NotificationStatus)
}

export const getNotificationStatus = async (
  env: Env
): Promise<NotificationStatus> => {
  const status = await env.STATUS.get(NOTIFICATION_KEY, 'text')
  if (!status || !isNotificationStatus(status)) return NOTIFICATION_DISABLED
  return status
}

export const setNotificationStatus = async (
  env: Env,
  status: NotificationStatus
) => {
  await env.STATUS.put('notification', status)
}
