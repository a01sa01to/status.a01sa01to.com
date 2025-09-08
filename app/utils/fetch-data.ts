import { getNotificationStatus } from '~/constants/notification'

export const fetchData = async (env: Env) => {
  const notificationStatus = await getNotificationStatus(env)
  return {
    notificationStatus,
  }
}
