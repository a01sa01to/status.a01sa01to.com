import { ICON_LIST, type StatusIconList } from '~/data/status'

import styles from './style.module.scss'

interface Props {
  className?: string
  statusIcon: StatusIconList
}

export const IconSelector = ({ className, statusIcon }: Props) => {
  return (
    <div className={[styles.iconSelector, className ?? ''].join(' ')}>
      {Object.entries(ICON_LIST).map(([key, Icon]) => (
        <button key={key} type='button' className={styles.iconButton}>
          <Icon size={32} className={styles.icon} />
          <span className={styles.text}>{key}</span>
          <input
            type='radio'
            name='statusIcon'
            value={key}
            defaultChecked={statusIcon === key}
            className={styles.input}
          />
        </button>
      ))}
    </div>
  )
}
