import React, { useEffect, useState } from 'react';
import Link from 'next/link';
// import Image from 'next/image';
import Button from 'components/global/button/Button';
import Logo from 'components/icons/Logo';
import Navigation from 'components/global/navigation/Navigation';
import styles from './Header.module.scss';
import { HeaderProps } from 'types';

const Header = ({ setNavOpen, isNavOpen, isHeaderGray }: HeaderProps) => {
  const [hState, sethState] = useState('-top');

  useEffect(() => {
    if (isNavOpen) {
      document.body.style.marginRight =
        window.innerWidth - document.body.offsetWidth + 'px';
      document.body.classList.add('no-scroll');
    } else {
      document.body.style.marginRight = '0';
      document.body.classList.remove('no-scroll');
    }
  }, [isNavOpen]);

  useEffect(() => {
    let lastVal = 68;

    const y = window.scrollY;
    if (y > lastVal) {
      sethState('down');
    }

    const handleScroll = () => {
      const y = window.scrollY;
      if (y > lastVal) {
        sethState('down');
      }
      if (y < lastVal) {
        sethState('up');
      }
      if (y === 0) {
        sethState('top');
      }
      lastVal = y;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`
        ${styles.header}
        ${styles[hState]}
        ${isNavOpen ? styles.header_navOpen : ''}
        ${isHeaderGray ? styles.header_gray : ''}     
        b-header
      `}
    >
      <div className={`${styles.header_wrapper} container`}>
        <div
          className={`${styles.header_logo}`}
          onClick={() => setNavOpen(false)}
        >
          <Link href={'/'} aria-label="Alpine Armoring Logo">
            <Logo />
            {/* <Image 
              src="/assets/LogoTest.svg"
              alt=""
              width="400"
              height="90"            
            /> */}
          </Link>
        </div>

        <Navigation isNavOpen={isNavOpen} />

        <div className={`${styles.header_right}`}>
          <div
            className={`${styles.header_burger} mobile-only`}
            onClick={() => {
              setNavOpen((prevState) => !prevState);
            }}
          >
            <div className={`${styles.header_burger_inner}`}></div>
          </div>

          <div className={`desktop-only flex`}>
            <Button
              href="/contact"
              className={`${styles.header_contact} rounded shiny transparent uppercase`}
            >
              <span onClick={() => setNavOpen(false)}>Contact</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
