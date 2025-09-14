import {
  MdComputer,
  MdLocationPin,
  MdMessage,
  MdNotifications,
  MdNotificationsOff,
} from 'react-icons/md'
import { SiGithub, SiInstagram, SiX } from 'react-icons/si'
import { GoRepo } from 'react-icons/go'
import { useLoaderData } from 'react-router'

import { Heading, UtilLink } from '@a01sa01to/ui'

import { NOTIFICATION_ENABLED } from '~/constants/notification'
import type { Route } from './+types/home'
import { fetchData } from '~/utils/fetch-data'

import styles from './home.module.scss'

export const loader = async ({ context }: Route.LoaderArgs) => {
  return fetchData(context.cloudflare.env)
}

export default function Home() {
  const { notificationStatus } = useLoaderData<typeof loader>()

  return (
    <>
      <title>Asa&apos;s Status</title>
      <main className={styles.container}>
        <Heading size='h1' className={styles.heading}>
          Asa&apos;s Status
        </Heading>
        <div className={styles.item}>
          <MdComputer size={48} className={styles.icon} />
          <p className={styles.title}>Front of PC</p>
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
          <p className={styles.title}>Home</p>
        </div>
        <div className={styles.item}>
          <MdMessage size={48} className={styles.icon} />
          <p className={styles.title}>Message</p>
          <p className={styles.desc}>On the way to the school</p>
        </div>
        <div className={styles.footer}>
          <p className={styles.footerText}>
            This may not be my real-time status. <wbr />
            Last Updated at ???.
          </p>
          <div className={styles.links}>
            <UtilLink href='https://github.com/a01sa01to' noIcon>
              <SiGithub size={24} className={styles.linkIcon} />
            </UtilLink>
            <UtilLink href='https://twitter.com/a01sa01to' noIcon>
              <SiX size={24} className={styles.linkIcon} />
            </UtilLink>
            <UtilLink href='https://www.instagram.com/a01sa01to/' noIcon>
              <SiInstagram size={24} className={styles.linkIcon} />
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
