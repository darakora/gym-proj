import { useEffect, useState } from 'react';

import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Loader } from '~/shared/ui/Loader/Loader';
import { PageText } from '~/shared/ui/PageText/PageText';
import { type RootState } from '~/store/store.types';

import styles from './WebinarsPage.module.scss';
import { Navigation } from '../../../features/Bonus/Navigation/Navigation';
import { VideoPlayer } from '../../../features/Bonus/VideoPlayer/VideoPlayer';
import {
  type SidebarBonusMaterials,
  getBonusLinks
} from '../../../features/Sidebar/Sidebar.constants';
import { Button } from '../../../shared/ui/Button/Button';
import { Navbar } from '../../../shared/ui/Navbar/Navbar';
import { useGetBonusMaterialQuery } from '../../../store/api/bonus/bonus.api';

export const WebinarsPage = () => {
  const { id } = useParams<'id'>();

  const { data, isLoading } = useGetBonusMaterialQuery({ id: id || '' });
  const [selectedTab, setSelectedTab] = useState('Video');
  const bonusMaterials = useSelector(
    (state: RootState) => state.bonusMaterials.data
  );
  const [links, setLinks] = useState<SidebarBonusMaterials[]>();

  useEffect(() => {
    if (bonusMaterials) {
      const links = getBonusLinks(bonusMaterials);
      setLinks(links);
    }
    setSelectedTab('Video');
  }, [bonusMaterials, id]);

  const routes = () => {
    if (data) {
      return [
        { id: 'bonus', title: 'mein Bonusmaterial', path: '/' },
        { id: 'webinars', title: `${data.title}`, path: `/webinars/${data.id}` }
      ];
    }
  };

  const toggleTab = (tab: string) => {
    setSelectedTab(tab);
  };

  if (isLoading) {
    return (
      <div className={styles.animationContainer}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <Navbar routes={routes()} />
        <h5>{data && data.title}</h5>
        <div className={styles.content}>
          <div className={styles.video_container}>
            <div className={styles.tabs}>
              <Button
                className={classNames({
                  [styles.active]: selectedTab === 'Video' ? 'active' : '',
                  [styles.tab]: true
                })}
                appearance="secondary2"
                onClick={() => toggleTab('Video')}
              >
                Video
              </Button>
              {data?.tabs.map((tabs, index) => (
                <Button
                  className={classNames({
                    [styles.active]:
                      selectedTab === tabs.name + index.toString()
                        ? 'active'
                        : '',
                    [styles.tab]: true
                  })}
                  appearance="secondary2"
                  onClick={() => toggleTab(tabs.name + index.toString())}
                  key={tabs.name + index.toString()}
                >
                  {tabs.name}
                </Button>
              ))}
            </div>
            {data && selectedTab === 'Video' && (
              <VideoPlayer
                videoLink={data.contentUrl}
                id={data.id}
              />
            )}
            {data &&
              data.tabs.map((tabs, index) => (
                <>
                  {tabs.name + index.toString() === selectedTab && (
                    <div
                      className={styles.tabsContainer}
                      key={tabs.name + index.toString()}
                    >
                      <PageText text={tabs.html} />
                    </div>
                  )}
                </>
              ))}
          </div>
          {links && data && (
            <Navigation
              isPreviousDisabled={id === `${links[0].links[0].id}`}
              isNextDisabled={id === `${links[0]?.links?.at(-1)?.id || ''}`}
              path="webinars"
              id={data.id}
              links={links[0].links}
              switchTab={() => toggleTab('Video')}
            />
          )}
        </div>
      </div>
    </>
  );
};
