import { SidebarAccordion } from './Accordion/SidebarAccordion';
import { SidebarAccordionMobile } from './AccordionMobile/SidebarAccordionMobile';
import styles from './Sidebar.module.scss';

export const Sidebar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <p className={styles.title}>
          <span>Mein</span> GYM
        </p>
      </div>
      <div className={styles.accordion}>
        <SidebarAccordion />
      </div>
      <div>
        <SidebarAccordionMobile />
      </div>
    </div>
  );
};
