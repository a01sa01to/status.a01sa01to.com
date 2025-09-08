import {
  MdComputer,
  MdLocationPin,
  MdMessage,
  MdNotifications,
  MdNotificationsOff,
} from 'react-icons/md'
import { useLoaderData } from 'react-router'

import { Heading } from '@a01sa01to/ui'

import { NOTIFICATION_ENABLED } from '~/constants/notification'
import type { Route } from './+types/home'
import { fetchData } from '~/utils/fetch-data'

export const loader = async ({ context }: Route.LoaderArgs) => {
  return fetchData(context.cloudflare.env)
}

export default function Home() {
  const { notificationStatus } = useLoaderData<typeof loader>()

  return (
    <>
      <title>Asa&apos;s Status</title>
      <main>
        <Heading size='h1'>Asa&apos;s Status</Heading>
        <div>
          <MdComputer size={48} />
          <p>Status: ???</p>
        </div>
        <div>
          {notificationStatus === NOTIFICATION_ENABLED ? (
            <>
              <MdNotifications size={48} />
              <div>
                <p>Notification On</p>
                <p>
                  I&apos;ll get back to you, but it might take some time.
                  Mention me if urgent!
                </p>
              </div>
            </>
          ) : (
            <>
              <MdNotificationsOff size={48} />
              <div>
                <p>Notification Off</p>
                <p>
                  Feel free to send me a message, but I might not respond
                  immediately. I&apos;ll reply when I get a chance!
                </p>
              </div>
            </>
          )}
        </div>
        <div>
          <MdLocationPin size={48} />
          <p>Location: ???</p>
        </div>
        <div>
          <MdMessage size={48} />
          <p>Message: ???</p>
        </div>
      </main>
    </>
  )
}
