import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem
} from 'react-headless-accordion';
import { Link } from 'react-router-dom';

import { ReactComponent as BurgerIcon } from '~/assets/icons/burger.svg';
import { Button } from '~/shared/ui/Button/Button';
import { useAppDispatch } from '~/store/store.types';
import { userActions } from '~/store/user/user.slice';

import { NavLinks } from './HeaderMobile.constants';
import styles from './HeaderMobile.module.scss';

export const HeaderMobile = ({
  isOpen,
  toggleMenu
}: {
  isOpen: boolean;
  toggleMenu: () => void;
}) => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.wrapper}>
      <Accordion className={styles.menu}>
        <AccordionItem>
          <AccordionHeader>
            <Button
              onClick={toggleMenu}
              icon={isOpen ? null : <BurgerIcon />}
              appearance="secondary2"
            />
          </AccordionHeader>
          <div className={`${isOpen ? styles.open : styles.closed}`}>
            <AccordionBody className={`${isOpen ? styles.headerInner : ''}`}>
              {NavLinks.map((link) => {
                return link.title === 'Logout' ? (
                  <Link
                    onClick={() => dispatch(userActions.logout())}
                    to={link.path}
                    key={link.title}
                  >
                    {link.title}
                  </Link>
                ) : (
                  <Link
                    onClick={toggleMenu}
                    to={link.path}
                    key={link.title}
                  >
                    {link.title}
                  </Link>
                );
              })}
            </AccordionBody>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
