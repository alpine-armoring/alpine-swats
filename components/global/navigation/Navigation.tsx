import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './Navigation.module.scss';
import { NavigationProps } from 'types';

const Navigation = ({ isNavOpen }: NavigationProps) => {
  const router = useRouter();

  const links = [
    { path: '/inventory', text: 'Inventory' },
    { path: '/models', text: 'Models' },
  ];

  return (
    <nav
      className={`${styles.navigation} ${isNavOpen ? styles.navigation_navOpen : ''}`}
    >
      <ul className={styles.navigation_list}>
        {links.map((link, index) => (
          <li
            key={index}
            className={`
              ${styles.navigation_item} 
              ${
                router.pathname.startsWith(link.path)
                  ? `${styles.navigation_item_active}`
                  : ''
              }
              ${!link.path ? `${styles.navigation_link_disabled}` : ''}
            `}
          >
            {link.path ? (
              <Link href={link.path}>{link.text}</Link>
            ) : (
              <span>{link.text}</span>
            )}

            {/* {link.submenu && (
              <ul className={`${styles.navigation_submenu} navigation_submenu`}>
                {link.submenu.map((submenuItem, subIndex) => (
                  <li key={subIndex}>
                    <Link
                      className={styles.navigation_submenu_link}
                      href={submenuItem.path}
                    >
                      {submenuItem.text}
                    </Link>
                  </li>
                ))}
              </ul>
            )} */}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
