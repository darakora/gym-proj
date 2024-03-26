import { useNavigate } from 'react-router-dom';

import { ReactComponent as NextIcon } from '~/assets/icons/bonusmaterials/next.svg';
import { ReactComponent as PreviousIcon } from '~/assets/icons/bonusmaterials/previous.svg';

import styles from './Navigation.module.scss';
import { getNextId, getPreviousId } from './navigation.utils';
import {
  type Meditation,
  type BonusMaterial
} from '../../../entities/apiTypes';
import { Button } from '../../../shared/ui/Button/Button';

export const Navigation = ({
  isMeditation,
  isPreviousDisabled,
  isNextDisabled,
  path,
  id,
  links,
  switchTab
}: {
  isMeditation?: boolean;
  isPreviousDisabled?: boolean;
  isNextDisabled?: boolean;
  path: string;
  id: number;
  links: [BonusMaterial] | [Meditation];
  switchTab?: () => void;
}) => {
  const navigate = useNavigate();
  return (
    <div className={styles.navigation}>
      <Button
        className={styles.navigation_button}
        appearance="secondary2"
        icon={<PreviousIcon className={styles.icon} />}
        disabled={isPreviousDisabled}
        onClick={() => {
          navigate(`/${path}/${getPreviousId(links, id)}`);
          {
            switchTab && switchTab();
          }
        }}
      >
        Vorheriges {isMeditation ? 'Meditation' : 'Video'}
      </Button>
      <Button
        className={styles.navigation_button}
        appearance="secondary2"
        icon={<NextIcon className={styles.icon} />}
        disabled={isNextDisabled}
        onClick={() => {
          navigate(`/${path}/${getNextId(links, id)}`);
          {
            switchTab && switchTab();
          }
        }}
      >
        Nächstes {isMeditation ? 'Meditation' : 'Video'}
      </Button>
    </div>
  );
};
