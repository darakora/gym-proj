import { ReactComponent as Instagram } from '~/assets/icons/instagram.svg';
import { ReactComponent as TikTok } from '~/assets/icons/tiktok.svg';
import { ReactComponent as YouTube } from '~/assets/icons/youtube.svg';
import { ReactComponent as FooterLogo } from '~/assets/logoFooter.svg';

import { menuLinks } from './Footer.constants';
import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer>
      <div className={styles.container}>
        <div className={styles.about}>
          <FooterLogo />
          <div className={styles.copyright}>
            <p>Copyright © GYM 2024 | All Rights Reserved.</p>
          </div>
        </div>
        <div className={styles.menu}>
          {menuLinks.map((link) => (
            <a
              key={link.path}
              href={link.path}
            >
              {link.title}
            </a>
          ))}
        </div>
        <div className={styles.social}>
          <p>Sozialen Medien</p>
          <div className={styles.links}>
            <a href="https://www.instagram.com/">
              <Instagram />
            </a>
            <a href="https://www.youtube.com/">
              <YouTube />
            </a>
            <a href="http://www.tiktok.com/">
              <TikTok />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
