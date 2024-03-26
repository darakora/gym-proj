import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import { ReactComponent as HomeIcon } from '~/assets/icons/home.svg';

import navbarStyles from './Navbar.module.scss';
import { type Route } from '../../../entities/routes';

export const Navbar = ({ routes }: { routes?: Route[] }) => {
  return (
    <div className={navbarStyles.container}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          classNames({
            [navbarStyles.active]: isActive,
            [navbarStyles.link]: true
          })
        }
        id={'backHome'}
      >
        <HomeIcon className={navbarStyles.home} />
        Home
      </NavLink>
      {routes &&
        routes.map((route) => (
          <NavLink
            key={route.id}
            to={route.path}
            className={({ isActive }) =>
              classNames({
                [navbarStyles.active]: isActive,
                [navbarStyles.link]: true
              })
            }
          >
            {route.title}
          </NavLink>
        ))}
    </div>
  );
};
