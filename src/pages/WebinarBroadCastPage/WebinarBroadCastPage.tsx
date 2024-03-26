import { useParams } from 'react-router-dom';

import { WebinarEvent } from '~/features/Webinar/Webinar';
import { Loader } from '~/shared/ui/Loader/Loader';
import { Navbar } from '~/shared/ui/Navbar/Navbar';
import { useGetWebinarQuery } from '~/store/api/webinars/webinars.api';

export const WebinarBroadCastPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: newWebinar, isLoading } = useGetWebinarQuery(Number(id));

  const routes = () => {
    if (newWebinar) {
      return [
        { id: 'webinars', title: 'Mein Wochenplan', path: '/schedule' },
        {
          id: 'webinar',
          title: `${newWebinar.title}`,
          path: `/webinar/${newWebinar.id}`
        }
      ];
    }
  };

  return (
    <>
      {!isLoading && newWebinar ? (
        <div>
          <Navbar routes={routes()} />
          <WebinarEvent id={newWebinar.id} />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};
