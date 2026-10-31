import { Link } from 'react-router-dom'
import styles from './EmptyState.module.css'

interface EmptyStateProps {
    message: string
    actionLabel?: string
    actionTo?: string
}

function EmptyState({ message, actionLabel, actionTo }: EmptyStateProps) {
    return (
        <div className={styles.wrapper}>
            <p className={styles.message}>{message}</p>
            {actionLabel && actionTo && (
                <Link to={actionTo} className={styles.action}>
                    {actionLabel}
                </Link>
            )}
        </div>
    )
}

export default EmptyState