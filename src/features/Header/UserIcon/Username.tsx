import styles from './Username.module.scss';
import { type UserProfile } from '../../../entities/apiTypes';

function getInitials(
  name: UserProfile['name'],
  surname: UserProfile['surname']
) {
  return `${name.slice(0, 1)}${surname.slice(0, 1)}`;
}

export const Username = ({
  user,
  url
}: {
  user?: UserProfile;
  url?: string;
}) => {
  if (user)
    return user.profilePhotoUrl ? (
      <img
        className={styles.container}
        src={user.profilePhotoUrl}
      />
    ) : (
      <div className={styles.container}>
        {getInitials(user.name, user.surname)}
      </div>
    );
  if (url)
    return (
      <img
        className={styles.container}
        src={url}
      />
    );
};
