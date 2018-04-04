import React from 'react';
import './styles/NotificationDrawer.css';

import SuccessNotification from './../notifications/SuccessNotification';
import ErrorNotification from './../notifications/ErrorNotification';
import PurchaseNotification from './../notifications/PurchaseNotification';

import { TransitionGroup } from 'react-transition-group';

import { Fade } from './../animations/Animations';

const NotificationDrawer = ({ notifications, products }) => (
    <div className="notificationDrawer">
        <TransitionGroup>
            {notifications &&
                notifications.length > 0 &&
                notifications.map(
                    (notification, id) =>
                        notification.messageType === 'SUCCESS' ? (
                            <Fade key={notification.id}>
                                <SuccessNotification
                                    message={notification.message}
                                    shadow
                                />
                            </Fade>
                        ) : (
                            <Fade key={notification.id}>
                                <ErrorNotification
                                    message={notification.message}
                                    shadow
                                />
                            </Fade>
                        )
                )}
            {products &&
                products.length > 0 && (
                    <Fade>
                        <PurchaseNotification shadow products={products} />
                    </Fade>
                )}
        </TransitionGroup>
    </div>
);

export default NotificationDrawer;
