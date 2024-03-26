import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as MenuIcon } from '~/assets/icons/sidebar/menu.svg';
import { ReactComponent as SwitchIcon } from '~/assets/icons/sidebar/switch.svg';
import { toggleBoolean } from '~/store/sideBarClick/sideBarClickSlice';
import { type RootState } from '~/store/store.types';

import styles from './SidebarAcordionMobile.module.scss';
import { SidebarAccordion } from '../Accordion/SidebarAccordion';

export const SidebarAccordionMobile = () => {
  const isClicked = useSelector(
    (state: RootState) => state.toggleSideBar.isClicked
  );

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(toggleBoolean());
  };

  return (
    <div>
      <div className={styles.accordion_container_mobile}>
        <div>
          <div
            className={styles.accordion_btn}
            onClick={handleClick}
            aria-expanded={isClicked}
          >
            <MenuIcon />
            <p>Menü</p>
            <div className={styles.empty}></div>
            <SwitchIcon className={styles.switch_icon} />
          </div>
          <div
            className={`${styles.accordion_content_hidden} ${
              isClicked ? styles.accordion_content : ''
            }`}
          >
            <SidebarAccordion isClicked={isClicked} />
          </div>
        </div>
      </div>
    </div>
  );
};
