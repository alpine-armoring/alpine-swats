import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from 'components/global/button/Button';
import Logo from 'components/icons/Logo2';
import Navigation from 'components/global/navigation/Navigation';
import styles from './Header.module.scss';
import { HeaderProps } from 'types';

const Header = ({
  setNavOpen,
  isNavOpen,
  isHeaderGray,
  isDarkMode,
}: HeaderProps) => {
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
        ${isDarkMode ? styles.header_transparent : ''}  
        b-header
      `}
    >
      <div className={`${styles.header_wrapper} container`}>
        <Link
          href={'/'}
          className={`${styles.header_logo}`}
          aria-label="Alpine Armoring Logo"
          onClick={() => setNavOpen(false)}
        >
          <Image
            src="/assets/alpine-armoring-logo-goldbox-curved.png"
            alt="Alpine Armoring Logo"
            width="120"
            height="50"
            priority
          />

          {/* <svg version="1.1" id="Layer_3" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            viewBox="0 0 625.8 37">
            <defs>
              <style type="text/css">
                {`
                  .st0{fill:none;}
                  .st1{fill:#FFFFFF;}
                  .st2{font-family:'Termina';}
                  .st3{font-size:28px;}

                `}
              </style>
            </defs>
          <rect y="7.7" className="st0" width="625.8" height="37"/>
          <text transform="matrix(1 0 0 1 8.6111 28.4184)" className="st1 st2 st3">SWAT &amp; APC VEHICLES</text>
          </svg> */}

          <span className={`${styles.header_headline}`}>
            {/* Armored SWAT & APC Vehicles */}
            <Logo />
          </span>
        </Link>

        <Navigation isNavOpen={isNavOpen} />

        <div className={`${styles.header_right}`}>
          <div className={`desktop-only flex`}>
            <Button
              href="/contact"
              className={`${styles.header_contact} rounded shiny transparent uppercase`}
            >
              <span onClick={() => setNavOpen(false)}>Contact</span>
            </Button>
          </div>

          <div
            className={`${styles.header_burger}`}
            onClick={() => {
              setNavOpen((prevState) => !prevState);
            }}
          >
            <div className={`${styles.header_burger_inner}`}></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
