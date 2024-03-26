import { useEffect, useState } from 'react';

import classNames from 'classnames';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem
} from 'react-headless-accordion';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import { ReactComponent as CalendarIcon } from '~/assets/icons/sidebar/calendar.svg';
import { ReactComponent as CheckIcon } from '~/assets/icons/sidebar/check.svg';
import { ReactComponent as ClipIcon } from '~/assets/icons/sidebar/clip.svg';
import { ReactComponent as DotIcon } from '~/assets/icons/sidebar/dot.svg';
import { ReactComponent as HourglassIcon } from '~/assets/icons/sidebar/hourglass.svg';
import { ReactComponent as InformationIcon } from '~/assets/icons/sidebar/information.svg';
import { ReactComponent as LightningIcon } from '~/assets/icons/sidebar/lightning.svg';
import { ReactComponent as MeditationIcon } from '~/assets/icons/sidebar/MeditationIcon.svg';
import { ReactComponent as SwitchIcon } from '~/assets/icons/sidebar/switch.svg';
import { type BonusMaterials } from '~/entities/apiTypes';
import { useOutsideClick } from '~/shared/hooks/useOutsideClick';
import { useGetBonusMaterialsQuery } from '~/store/api/bonus/bonus.api';
import { toggleBoolean } from '~/store/sideBarClick/sideBarClickSlice';

import styles from './SidebarAccordion.module.scss';
import { useGetTopicsNameQuery } from '../../../store/api/topics/topics';
import { useAppSelector } from '../../../store/store.types';
import { selectUser } from '../../../store/user/user.selector';
import { getBonusLinks } from '../Sidebar.constants';

export const SidebarAccordion = ({ isClicked }: { isClicked?: boolean }) => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const dispatch = useDispatch();

  const [isInfoClicked, setIsInfoClicked] = useState(false);
  const [isBonusClicked, setIsBonusClicked] = useState(false);
  const [selectedButton, setSelectedButton] = useState('');

  const reference = useOutsideClick({ reset: () => handleClick() });

  const handleClick = () => {
    dispatch(toggleBoolean());
  };

  const [bonus, setBonus] = useState({} as BonusMaterials);

  const { data: newBonus, isLoading: isBonusLoading } =
    useGetBonusMaterialsQuery();

  const { data: topics, isLoading: isTopicsLoading } = useGetTopicsNameQuery();

  useEffect(() => {
    if (newBonus) {
      setBonus(newBonus);
    }
  }, [newBonus]);

  const bonuslinks = getBonusLinks(bonus);
  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
  };

  const handleResetClick = () => {
    setSelectedButton('');
  };

  const clickInfo = () => {
    setIsInfoClicked((hasBeenClicked) => !hasBeenClicked);
    setIsBonusClicked(false);
  };
  const clickBonus = () => {
    setIsBonusClicked((hasBeenClicked) => !hasBeenClicked);
    setIsInfoClicked(false);
  };
  const clickCalendar = () => {
    setIsInfoClicked(false);
    setIsBonusClicked(false);
    if (user?.isConfirmed) {
      navigate('/schedule');
    }
    handleButtonClick('calendar');
  };
  const clickHabit = () => {
    setIsInfoClicked(false);
    setIsBonusClicked(false);
    if (user?.isConfirmed) {
      navigate('/habitTracker');
    }
    handleButtonClick('habits');
  };

  const clickMeditation = () => {
    setIsInfoClicked(false);
    setIsBonusClicked(false);
    if (user?.isConfirmed) {
      navigate('/meditations');
    }
    handleButtonClick('meditation');
    handleClick();
  };

  return (
    <div
      className={`${styles.menu} ${
        isClicked ? styles.open : styles.unSelected
      }`}
      ref={reference}
    >
      <Accordion
        className={
          user?.isConfirmed
            ? styles.accordion_container
            : styles.accordion_container_disabled
        }
      >
        <AccordionItem>
          <AccordionHeader
            className={styles.accordion_btn}
            onClick={clickInfo}
          >
            <InformationIcon className={styles.icon} />
            <p>Wichtige Informationen</p>
            <div className={styles.empty}></div>
            <SwitchIcon className={styles.switch_icon} />
          </AccordionHeader>
          <AccordionBody
            className={`${
              isInfoClicked
                ? styles.accordion_content
                : styles.accordion_content_hidden
            }`}
          >
            <div className={styles.content_buttons}>
              {isTopicsLoading ? (
                <div className={styles.bonus_loader}>
                  <div className={styles.bounce1}></div>
                  <div className={styles.bounce2}></div>
                  <div className={styles.bounce3}></div>
                </div>
              ) : (
                topics &&
                topics.map((item, index) => {
                  return index === 0 ? (
                    <NavLink
                      key={item.path}
                      className={({ isActive }) =>
                        classNames({
                          [styles.active_info]: isActive,
                          [styles.content_item]: true
                        })
                      }
                      to={'/contraindications'}
                      onClick={() => {
                        handleResetClick();
                        handleClick();
                      }}
                    >
                      Kontraindikationen
                      <div className={styles.empty} />
                      {user?.isConfirmed ? <CheckIcon /> : <HourglassIcon />}
                    </NavLink>
                  ) : (
                    <NavLink
                      key={item.path}
                      className={({ isActive }) =>
                        classNames({
                          [styles.active_info]: isActive,
                          [styles.content_item]: true,
                          [styles.content_item_disabled]: !user?.isConfirmed,
                          [styles.topic]: true
                        })
                      }
                      to={`${item.path}`}
                      onClick={() => {
                        handleResetClick();
                        handleClick();
                      }}
                    >
                      {item.displayName}
                    </NavLink>
                  );
                })
              )}
            </div>
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader
            className={`${
              user?.isConfirmed
                ? styles.accordion_btn
                : styles.accordion_btn_disabled
            } ${selectedButton === 'calendar' ? styles.selected : ''}`}
            onClick={() => {
              clickCalendar();
              handleClick();
            }}
          >
            <CalendarIcon className={styles.icon} />
            <p>Mein Wochenplan</p>
          </AccordionHeader>
        </AccordionItem>

        <AccordionItem>
          <AccordionHeader
            className={
              user?.isConfirmed
                ? styles.accordion_btn
                : styles.accordion_btn_disabled
            }
            onClick={clickBonus}
          >
            <ClipIcon className={styles.icon} />
            <p>Mein Bonusmaterial</p>
            <div className={styles.empty}></div>
            <SwitchIcon className={styles.switch_icon} />
          </AccordionHeader>
          <AccordionBody
            className={`${
              isBonusClicked
                ? styles.accordion_content
                : styles.accordion_content_hidden
            }`}
          >
            {isBonusLoading ? (
              <div className={styles.bonus_loader}>
                <div className={styles.bounce1}></div>
                <div className={styles.bounce2}></div>
                <div className={styles.bounce3}></div>
              </div>
            ) : bonuslinks[0].links ? (
              bonuslinks.map((item) => {
                return (
                  <NavLink
                    className={({ isActive }) =>
                      classNames({
                        [styles.active]:
                          isActive ||
                          location.pathname.startsWith(`${item.path}`),
                        [styles.content_item]: true,
                        [styles.content_item_disabled]: !user?.isConfirmed
                      })
                    }
                    key={item.title}
                    to={`${item.path}/${item.links[0].id}`}
                  >
                    {item.title}
                    <div className={styles.bonus}>
                      {item.links?.map((link) => {
                        return (
                          <NavLink
                            key={link.title}
                            to={`${item.path}/${link.id}`}
                            className={({ isActive }) =>
                              classNames({
                                [styles.bonus_link_active]: isActive,
                                [styles.bonus_link]: true
                              })
                            }
                            onClick={() => {
                              handleResetClick();
                              handleClick();
                            }}
                          >
                            {link.seenStatus === 'Seen' ? (
                              <CheckIcon />
                            ) : link.seenStatus === 'Started' ? (
                              <HourglassIcon />
                            ) : (
                              <DotIcon id={'dot'} />
                            )}
                            <div className={styles.empty} />
                            <p>{link.title}</p>
                          </NavLink>
                        );
                      })}
                    </div>
                  </NavLink>
                );
              })
            ) : (
              <div className={styles.content_item}>Hier ist noch nichts</div>
            )}
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader
            className={`${
              user?.isConfirmed
                ? styles.accordion_btn
                : styles.accordion_btn_disabled
            } ${selectedButton === 'meditation' ? styles.selected : ''}`}
            onClick={clickMeditation}
          >
            <MeditationIcon className={styles.icon} />
            <p>Meditationen</p>
          </AccordionHeader>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader
            className={`${
              user?.isConfirmed
                ? styles.accordion_btn
                : styles.accordion_btn_disabled
            } ${selectedButton === 'habits' ? styles.selected : ''}`}
            onClick={() => {
              clickHabit();
              handleClick();
            }}
          >
            <LightningIcon className={styles.icon} />
            <p>Habit Tracker</p>
          </AccordionHeader>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
