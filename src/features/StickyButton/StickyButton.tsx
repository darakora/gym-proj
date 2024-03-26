import { ReactComponent as HeadphonesIcon } from '~/assets/icons/headphones.svg';
import { ReactComponent as MailIcon } from '~/assets/icons/mail.svg';
import styles from '~/features/StickyButton/StickyButton.module.scss';
import { Button } from '~/shared/ui/Button/Button';

const StickyButtons = ({
  clickMail,
  clickHeadphones
}: {
  clickMail: () => void;
  clickHeadphones: () => void;
}) => {
  return (
    <div className={styles.stickyContainer}>
      <div>
        <Button
          className={styles.wrapperHeadphones}
          icon={<HeadphonesIcon />}
          appearance="secondary2"
          onClick={clickHeadphones}
        ></Button>
      </div>
      <div>
        <Button
          className={styles.wrapperMail}
          icon={<MailIcon />}
          appearance="secondary2"
          onClick={clickMail}
        />
      </div>
    </div>
  );
};

export { StickyButtons };
