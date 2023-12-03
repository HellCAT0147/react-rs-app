import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.sass';

interface MenuItems {
  title: string;
  to: string;
}

const Header: React.FC = (): JSX.Element => {
  const links: MenuItems[] = [
    { title: 'Main', to: '/' },
    { title: 'Uncontrolled Form', to: '/uncontrolled' },
    { title: 'React Hook Form', to: '/hook' },
  ];

  const { pathname } = useLocation();

  return (
    <>
      <nav className={styles.menu}>
        <ul className={styles.items}>
          {links.map((link, id) => (
            <li key={id}>
              <Link
                className={`${styles.link}${
                  link.to === pathname ? ` ${styles.active}` : ''
                }`}
                to={link.to}
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Header;
