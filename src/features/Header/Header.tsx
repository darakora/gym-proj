import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { ReactComponent as LogoutIcon } from '~/assets/icons/logout.svg';
import { ReactComponent as NotificationIcon } from '~/assets/icons/notifications.svg';
import { ReactComponent as SettingsIcon } from '~/assets/icons/settings.svg';
import { ReactComponent as HeaderLogo } from '~/assets/logoHeader.svg';

import styles from './Header.module.scss';
import { HeaderMobile } from './HeaderMobile/HeaderMobile';
import { UserIcon } from './UserIcon/UserIcon';
import { useOutsideClick } from '../../shared/hooks/useOutsideClick';
import { Button } from '../../shared/ui/Button/Button';
import { useAppDispatch, useAppSelector } from '../../store/store.types';
import { selectUser } from '../../store/user/user.selector';
import { userActions } from '../../store/user/user.slice';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const toggleMenu = () => {
    setIsOpen((hasBeenOpened) => !hasBeenOpened);
  };

  const reference = useOutsideClick({
    callback: () => {
      setIsOpen(false);
    }
  });
  const navigate = useNavigate();

  return (
    <header>
      <div
        className={styles.container}
        ref={reference}
      >
        <Link to={'/'}>
          <HeaderLogo />
        </Link>
        {user && (
          <div className={styles.btn_container}>
            <div className={styles.buttons}>
              <Button
                icon={<NotificationIcon />}
                appearance="secondary2"
                onClick={() => navigate('/notifications')}
              />
              <Button
                icon={<SettingsIcon />}
                appearance="secondary2"
                onClick={() => navigate('/profile')}
              />
              <Button
                icon={<LogoutIcon />}
                appearance="secondary2"
                onClick={() => dispatch(userActions.logout())}
              />
            </div>
            <UserIcon user={user} />
          </div>
        )}
        {user && (
          <HeaderMobile
            isOpen={isOpen}
            toggleMenu={toggleMenu}
          />
        )}
      </div>
    </header>
  );
};
