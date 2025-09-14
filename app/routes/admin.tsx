import { Form, useActionData, useLoaderData } from 'react-router'
import {
  MdCheckCircle,
  MdError,
  MdLocationPin,
  MdMessage,
  MdNotifications,
  MdPhoto,
} from 'react-icons/md'

import { Button, Heading } from '@a01sa01to/ui'

import {
  NOTIFICATION_DISABLED,
  NOTIFICATION_ENABLED,
  isNotificationStatus,
  setNotificationStatus,
} from '~/data/notification'
import { isStatusIcon, setStatusIcon, setStatusText } from '~/data/status'
import { IconSelector } from '~/components/IconSelector'
import type { Route } from './+types/home'
import { fetchData } from '~/utils/fetch-data'
import { setLastUpdate } from '~/data/update'
import { setMessage } from '~/data/message'
import { setPlace } from '~/data/place'

import styles from './style.module.scss'

export const loader = async ({ context }: Route.LoaderArgs) => {
  return fetchData(context.cloudflare.env)
}

export const action = async ({ request, context }: Route.ActionArgs) => {
  const formData = await request.formData()

  const statusIcon = formData.get('statusIcon')
  const statusText = formData.get('statusText')
  const place = formData.get('place')
  const message = formData.get('message')
  const notificationStatus = formData.get('notificationStatus')

  const prevStatusIcon = formData.get('prevStatusIcon')
  const prevStatusText = formData.get('prevStatusText')
  const prevPlace = formData.get('prevPlace')
  const prevMessage = formData.get('prevMessage')
  const prevNotificationStatus = formData.get('prevNotificationStatus')

  if (typeof statusIcon !== 'string') return false
  if (typeof statusText !== 'string') return false
  if (typeof place !== 'string') return false
  if (typeof message !== 'string') return false
  if (typeof notificationStatus !== 'string') return false
  if (!isStatusIcon(statusIcon)) return false
  if (!isNotificationStatus(notificationStatus)) return false

  if (typeof prevStatusIcon !== 'string') return false
  if (typeof prevStatusText !== 'string') return false
  if (typeof prevPlace !== 'string') return false
  if (typeof prevMessage !== 'string') return false
  if (typeof prevNotificationStatus !== 'string') return false
  if (!isStatusIcon(prevStatusIcon)) return false
  if (!isNotificationStatus(prevNotificationStatus)) return false

  const updList = [
    statusIcon !== prevStatusIcon &&
      setStatusIcon(context.cloudflare.env, statusIcon),
    statusText !== prevStatusText &&
      setStatusText(context.cloudflare.env, statusText),
    place !== prevPlace && setPlace(context.cloudflare.env, place),
    message !== prevMessage && setMessage(context.cloudflare.env, message),
    notificationStatus !== prevNotificationStatus &&
      setNotificationStatus(context.cloudflare.env, notificationStatus),
  ].filter(v => v !== false)

  return await Promise.all(updList)
    .then(() => setLastUpdate(context.cloudflare.env))
    .then(() => true)
    .catch(() => false)
}

export default function Admin() {
  const {
    notificationStatus,
    statusIcon,
    lastUpdate,
    message,
    place,
    statusText,
  } = useLoaderData<typeof loader>()
  const savedSuccessfully = useActionData<typeof action>()

  const lastUpd = lastUpdate.toLocaleString(undefined, {
    /* eslint-disable sort-keys */
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    /* eslint-enable sort-keys */
  })
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone

  return (
    <>
      <title>Admin | Asa&apos;s Status</title>
      <main className={styles.container}>
        <Heading size='h1'>Admin</Heading>
        <Form method='post'>
          <input type='hidden' name='prevStatusIcon' value={statusIcon} />
          <input type='hidden' name='prevStatusText' value={statusText} />
          <input type='hidden' name='prevPlace' value={place} />
          <input type='hidden' name='prevMessage' value={message} />
          <input
            type='hidden'
            name='prevNotificationStatus'
            value={notificationStatus}
          />

          <div className={styles.item}>
            <MdPhoto size={48} className={styles.icon} />
            <p className={styles.title}>Status Icon</p>
            <IconSelector className={styles.desc} statusIcon={statusIcon} />
          </div>
          <div className={styles.item}>
            <p className={styles.title}>Status Text</p>
            <input
              type='text'
              name='statusText'
              defaultValue={statusText}
              className={styles.desc}
            />
            <p className={styles.hint}>
              &quot;In front of Computer&quot;, &quot;Riding on a train&quot;,
              &quot;Working from home&quot;, &quot;Researching&quot;, etc...
            </p>
          </div>
          <div className={styles.item}>
            <MdNotifications size={48} className={styles.icon} />
            <p className={styles.title}>Notification</p>
            <select
              name='notificationStatus'
              defaultValue={notificationStatus}
              className={styles.desc}
            >
              <option value={NOTIFICATION_ENABLED}>Enabled</option>
              <option value={NOTIFICATION_DISABLED}>Disabled</option>
            </select>
          </div>
          <div className={styles.item}>
            <MdLocationPin size={48} className={styles.icon} />
            <p className={styles.title}>Place</p>
            <input
              type='text'
              name='place'
              defaultValue={place}
              className={styles.desc}
            />
            <p className={styles.hint}>
              &quot;Home&quot;, &quot;Work&quot;, &quot;Univerisity&quot;,
              &quot;Cafe&quot;, etc...
            </p>
          </div>
          <div className={styles.item}>
            <MdMessage size={48} className={styles.icon} />
            <p className={styles.title}>Message</p>
            <input
              type='text'
              name='message'
              defaultValue={message}
              className={styles.desc}
            />
          </div>
          <div className={styles.footer}>
            <p className={styles.footerText}>
              Last Updated at {lastUpd} ({tz}).
            </p>
            <div className={styles.links}>
              <Button type='submit' variant='solid-fill' size='large'>
                Save
              </Button>
              <Button type='reset' variant='outline' size='large'>
                Reset
              </Button>
            </div>
          </div>
        </Form>
        {savedSuccessfully !== undefined && (
          <div
            className={[
              styles.toast,
              savedSuccessfully ? styles.success : styles.error,
            ].join(' ')}
          >
            {savedSuccessfully ? (
              <>
                <MdCheckCircle size={24} />
                <span>Saved successfully</span>
              </>
            ) : (
              <>
                <MdError size={24} />
                <span>Failed to save</span>
              </>
            )}
          </div>
        )}
      </main>
    </>
  )
}
