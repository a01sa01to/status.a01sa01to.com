import { getLastUpdate } from '~/data/update'
import { getMessage } from '~/data/message'
import { getMyStatus } from '~/data/status'
import { getNotificationStatus } from '~/data/notification'
import { getPlace } from '~/data/place'

export const fetchData = async (env: Env) => {
  const [statusIcon, statusText] = await getMyStatus(env)
  const notificationStatus = await getNotificationStatus(env)
  const place = await getPlace(env)
  const message = await getMessage(env)
  const lastUpdate = await getLastUpdate(env)
  return {
    lastUpdate,
    message,
    notificationStatus,
    place,
    statusIcon,
    statusText,
  }
}
