import { useRouter } from 'next/router';
import Link from 'next/link';
import { NavigationProps } from 'types';
import styles from './NavigationPopup.module.scss';

import FacebookIcon from 'components/icons/Facebook';
import TiktokIcon from 'components/icons/Tiktok';
import XIcon from 'components/icons/X';
import InstagramIcon from 'components/icons/Instagram';
import YoutubeIcon from 'components/icons/Youtube';
import LinkedinIcon from 'components/icons/Linkedin';
import MailIcon from 'components/icons/Mail';
import MapIcon from 'components/icons/Map';
import PhoneIcon from 'components/icons/Phone';
import ThreadsIcon from 'components/icons/Threads';

const NavigationPopup = ({ isNavOpen, setNavOpen }: NavigationProps) => {
  const router = useRouter();

  const links = [
    { path: '/swat-for-sale', text: 'SWAT for Sale' },
    { path: '/vehicles-we-build', text: 'Vehicles we Build' },
  ];

  const linksRight = [
    { path: '/about-us', text: 'About Us' },
    { path: '/armored-vehicle-testing', text: 'Armored Vehicle Testing' },
    { path: '/ballistic-chart', text: 'Weapons & Ammunition Chart' },
    { path: '/faqs', text: 'FAQs' },
    { path: '/contact', text: 'Contact' },
  ];

  const closeNav = () => {
    setNavOpen(false);
  };

  return (
    <nav
      className={`${styles.navigationPopup} ${
        isNavOpen ? styles.navigationPopup_open : ''
      }`}
      id="navigationPopup"
    >
      <div className={`${styles.navigationPopup_inner} container`}>
        <div className={`${styles.navigationPopup_nav}`}>
          <ul
            className={`${styles.navigationPopup_list_left} ${styles.navigationPopup_list}`}
          >
            {links.map((link, index) => (
              <li
                key={index}
                className={`
                  ${styles.navigationPopup_item} 
                  ${
                    router.asPath === link.path
                      ? `${styles.navigationPopup_item_active}`
                      : ''
                  }`}
                onClick={() => setNavOpen(false)}
              >
                {link.path ? (
                  <Link
                    className={`${styles.navigationPopup_link}`}
                    href={link.path}
                  >
                    {link.text}
                  </Link>
                ) : (
                  <span className={`${styles.navigationPopup_link}`}>
                    {link.text}
                  </span>
                )}
              </li>
            ))}
          </ul>

          <ul
            className={`${styles.navigationPopup_list_right} ${styles.navigationPopup_list}`}
          >
            {linksRight.map((link, index) => (
              <li
                key={index}
                className={`
                  ${styles.navigationPopup_item} 
                  ${
                    router.asPath === link.path
                      ? `${styles.navigationPopup_item_active}`
                      : ''
                  }`}
                onClick={closeNav}
              >
                <Link
                  className={`${styles.navigationPopup_link}`}
                  href={link.path}
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={`${styles.navigationPopup_info}`}>
          <div className={`${styles.navigationPopup_contact}`}>
            <Link
              href="tel:+17034710002"
              className={`${styles.navigationPopup_contact_item}`}
              rel="nofollow noreferrer noopener"
            >
              <PhoneIcon />
              1.703.471.0002
            </Link>
            <Link
              href="mailto:sales@armored-swat.com"
              className={`${styles.navigationPopup_contact_item}`}
              rel="nofollow noreferrer noopener"
            >
              <MailIcon />
              sales@armored-swat.com
            </Link>

            <div className={`${styles.navigationPopup_contact_item}`}>
              <MapIcon />
              Chantilly, Virginia, USA
            </div>
          </div>

          <ul className={`${styles.navigationPopup_socials}`}>
            <li className={`${styles.navigationPopup_socials_item}`}>
              <Link
                href="https://www.youtube.com/c/AlpineArmoring"
                target="_blank"
                rel="nofollow noreferrer noopener"
              >
                <YoutubeIcon color="white" />
              </Link>
            </li>
            <li className={`${styles.navigationPopup_socials_item}`}>
              <Link
                href="https://www.instagram.com/alpinearmoring/"
                target="_blank"
                rel="nofollow noreferrer noopener"
              >
                <InstagramIcon color="white" />
              </Link>
            </li>
            <li
              className={`${styles.navigationPopup_socials_item} ${styles.navigationPopup_socials_item_x}`}
            >
              <Link
                href="https://x.com/AlpineArmoring"
                target="_blank"
                rel="nofollow noreferrer noopener"
              >
                <XIcon color="white" />
              </Link>
            </li>
            <li className={`${styles.navigationPopup_socials_item}`}>
              <Link
                href="https://www.facebook.com/AlpineArmoring/"
                target="_blank"
                rel="nofollow noreferrer noopener"
              >
                <FacebookIcon color="white" />
              </Link>
            </li>
            <li
              className={`${styles.navigationPopup_socials_item} ${styles.navigationPopup_socials_item_tiktok}`}
            >
              <Link
                href="https://www.tiktok.com/@alpinearmoring"
                target="_blank"
                rel="nofollow noreferrer noopener"
              >
                <TiktokIcon color="white" />
              </Link>
            </li>
            <li className={`${styles.navigationPopup_socials_item}`}>
              <Link
                href="https://www.linkedin.com/company/alpinearmoring/"
                target="_blank"
                rel="nofollow noreferrer noopener"
              >
                <LinkedinIcon color="white" />
              </Link>
            </li>
            <li
              className={`${styles.navigationPopup_socials_item} ${styles.navigationPopup_socials_item_threads}`}
            >
              <Link
                href="https://www.threads.net/@alpinearmoring/"
                target="_blank"
                rel="nofollow noreferrer noopener"
              >
                <ThreadsIcon color="white" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationPopup;
