import React, { useEffect, useRef, useState } from 'react';
import "../../styles/ui/NotificationSqaure.scss";

interface Notification {
    id: number;
    text: string;
    type?: 'win' | 'error' | 'default';
}

interface NotificationSquareProps {
    notifications: Notification[];
    removeNotification: (id: number) => void;
}

const NotificationSquare: React.FC<NotificationSquareProps> = ({ notifications = [], removeNotification }) => {
    return (
        <div className="notifications-container">
            {notifications.map((notification) => (
                <NotificationItem
                    key={notification.id}
                    notification={notification}
                    removeNotification={removeNotification}
                />
            ))}
        </div>
    );
};

interface NotificationItemProps {
    notification: Notification;
    removeNotification: (id: number) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, removeNotification }) => {
    const [isRemoving, setIsRemoving] = useState(false);
    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        timerRef.current = window.setTimeout(() => {
            setIsRemoving(true);
            setTimeout(() => {
                removeNotification(notification.id);
            }, 500);
        }, 3000);

        return () => {
            if (timerRef.current !== null) {
                clearTimeout(timerRef.current);
            }
        };
    }, [notification, removeNotification]);

    return (
        <div
            className={`square ${notification.type ?? 'default'} ${isRemoving ? 'hide' : 'show'}`}
            onClick={() => {
                setIsRemoving(true);
                setTimeout(() => {
                    removeNotification(notification.id);
                }, 500);
            }}
        >
            {notification.text}
        </div>
    );
};

export default NotificationSquare;