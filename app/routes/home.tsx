import {
  MdLocationPin,
  MdMessage,
  MdNotifications,
  MdNotificationsOff,
} from 'react-icons/md'
import { SiGithub, SiInstagram, SiX } from 'react-icons/si'
import { GoRepo } from 'react-icons/go'
import { useLoaderData } from 'react-router'

import { Heading, UtilLink } from '@a01sa01to/ui'

import { ICON_LIST } from '~/data/status'
import { NOTIFICATION_ENABLED } from '~/data/notification'
import type { Route } from './+types/home'
import { fetchData } from '~/utils/fetch-data'

import styles from './style.module.scss'

export const loader = async ({ context }: Route.LoaderArgs) => {
  return fetchData(context.cloudflare.env)
}

export default function Home() {
  const {
    notificationStatus,
    statusIcon,
    lastUpdate,
    message,
    place,
    statusText,
  } = useLoaderData<typeof loader>()

  const StatusIcon = ICON_LIST[statusIcon]

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
      <title>Asa&apos;s Status</title>
      <main className={styles.container}>
        <Heading size='h1'>Asa&apos;s Status</Heading>
        <div className={styles.item}>
          <StatusIcon size={48} className={styles.icon} />
          <p className={styles.title}>{statusText}</p>
        </div>
        <div className={styles.item}>
          {notificationStatus === NOTIFICATION_ENABLED ? (
            <>
              <MdNotifications size={48} className={styles.icon} />
              <p className={styles.title}>Notification On</p>
              <p className={styles.desc}>
                I&apos;ll get back to you, but it might take some time. Mention
                me if urgent!
              </p>
            </>
          ) : (
            <>
              <MdNotificationsOff size={48} className={styles.icon} />
              <p className={styles.title}>Notification Off</p>
              <p className={styles.desc}>
                Feel free to send me a message, but I might not respond
                immediately. I&apos;ll reply when I get a chance!
              </p>
            </>
          )}
        </div>
        <div className={styles.item}>
          <MdLocationPin size={48} className={styles.icon} />
          <p className={styles.title}>{place}</p>
        </div>
        <div className={styles.item}>
          <MdMessage size={48} className={styles.icon} />
          <p className={styles.title}>Message</p>
          <p className={styles.desc}>{message}</p>
        </div>
        <div className={styles.footer}>
          <p className={styles.footerText}>
            This may not be my real-time status.
            <br />
            Last Updated at {lastUpd} ({tz}).
          </p>
          <div className={styles.links}>
            <UtilLink href='https://github.com/a01sa01to' noIcon title='GitHub'>
              <SiGithub size={24} />
            </UtilLink>
            <UtilLink
              href='https://twitter.com/a01sa01to'
              noIcon
              title='Twitter (Currently X)'
            >
              <SiX size={24} />
            </UtilLink>
            <UtilLink
              href='https://www.instagram.com/a01sa01to/'
              noIcon
              title='Instagram'
            >
              <SiInstagram size={24} />
            </UtilLink>
          </div>
          <p className={styles.footerText}>
            <GoRepo size={18} />
            <UtilLink href='https://github.com/a01sa01to/status.a01sa01to.com'>
              a01sa01to/status.a01sa01to.com
            </UtilLink>
          </p>
        </div>
      </main>
    </>
  )
}
