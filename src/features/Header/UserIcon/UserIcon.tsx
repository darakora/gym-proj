import { Username } from './Username';
import { type UserProfile } from '../../../entities/apiTypes';

export const UserIcon = ({
  user,
  url
}: {
  user?: UserProfile;
  url?: string;
}) => {
  if (user) return <Username user={user} />;
  if (url) return <Username url={url} />;
};
