import React from 'react';
import styles from './Footer.module.scss';
import FacebookIcon from 'components/icons/Facebook';
import TiktokIcon from 'components/icons/Tiktok';
import XIcon from 'components/icons/X';
import InstagramIcon from 'components/icons/Instagram';
import YoutubeIcon from 'components/icons/Youtube';
import LinkedinIcon from 'components/icons/Linkedin';
import ThreadsIcon from 'components/icons/Threads';
import MapIcon from 'components/icons/Map';
import PhoneIcon from 'components/icons/Phone';
import MailIcon from 'components/icons/Mail';
import Link from 'next/link';

const Footer = () => {
  const links = [
    { path: '/inventory', text: 'Available SWAT Vehicles' },
    { path: '/faqs', text: 'FAQs' },
    { path: '/ballistic-chart', text: 'Ballistic Testing' },
    { path: '/contact', text: 'Contact Us' },
  ];

  return (
    <footer
      className={`
        ${styles.footer}        
      `}
    >
      <div className={`${styles.footer_inner} container`}>
        <div className={`${styles.footer_top}`}>
          <div className={styles.footer_content}>
            <div className={styles.footer_text}>
              <h2 className={styles.footer_top_heading}>Alpine Armoring</h2>
              <h3 className={styles.footer_top_subheading}>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                "no one protects you better" ®
              </h3>
            </div>
          </div>
        </div>

        <div className={`${styles.footer_middle}`}>
          <div className={`${styles.footer_middle_info}`}>
            <div className={`${styles.footer_column}`}>
              <h3 className={`${styles.footer_column_title}`}>Contact Us</h3>
              <ul className={`${styles.footer_column_list}`}>
                <li>
                  <Link
                    href="tel:+17034710002"
                    className={`${styles.footer_column_list_item}`}
                    rel="nofollow noreferrer noopener"
                  >
                    <PhoneIcon color="#2d2d27" />
                    1.703.471.0002
                  </Link>
                </li>
                <li>
                  <Link
                    href="tel:+18009927667"
                    className={`${styles.footer_column_list_item}`}
                    rel="nofollow noreferrer noopener"
                  >
                    <PhoneIcon color="#2d2d27" />
                    1.800.99ARMOR
                  </Link>
                </li>
                <li>
                  <Link
                    href="mailto:sales@armored-swat.com"
                    className={`${styles.footer_column_list_item}`}
                    rel="nofollow noreferrer noopener"
                  >
                    <MailIcon color="#2d2d27" />
                    sales@armored-swat.com
                  </Link>
                </li>
                <li className={`${styles.footer_column_list_item}`}>
                  <MapIcon color="#2d2d27" />
                  Chantilly, Virginia, USA
                </li>
              </ul>
            </div>

            <div className={`${styles.footer_column_social}`}>
              <h3 className={`${styles.footer_column_title}`}>FOLLOW US ON</h3>
              <ul className={`${styles.footer_socials}`}>
                <li className={`${styles.footer_socials_item}`}>
                  <Link
                    href="https://www.youtube.com/c/AlpineArmoring"
                    target="_blank"
                    rel="nofollow noreferrer noopener"
                  >
                    <YoutubeIcon />
                  </Link>
                </li>
                <li className={`${styles.footer_socials_item}`}>
                  <Link
                    href="https://www.instagram.com/alpinearmoring/"
                    target="_blank"
                    rel="nofollow noreferrer noopener"
                  >
                    <InstagramIcon />
                  </Link>
                </li>
                <li
                  className={`${styles.footer_socials_item} ${styles.footer_socials_item_x}`}
                >
                  <Link
                    href="https://x.com/AlpineArmoring"
                    target="_blank"
                    rel="nofollow noreferrer noopener"
                  >
                    <XIcon />
                  </Link>
                </li>
                <li className={`${styles.footer_socials_item}`}>
                  <Link
                    href="https://www.facebook.com/AlpineArmoring/"
                    target="_blank"
                    rel="nofollow noreferrer noopener"
                  >
                    <FacebookIcon />
                  </Link>
                </li>
                <li
                  className={`${styles.footer_socials_item} ${styles.footer_socials_item_tiktok}`}
                >
                  <Link
                    href="https://www.tiktok.com/@alpinearmoring"
                    target="_blank"
                    rel="nofollow noreferrer noopener"
                  >
                    <TiktokIcon />
                  </Link>
                </li>
                <li className={`${styles.footer_socials_item}`}>
                  <Link
                    href="https://www.linkedin.com/company/alpinearmoring/"
                    target="_blank"
                    rel="nofollow noreferrer noopener"
                  >
                    <LinkedinIcon />
                  </Link>
                </li>
                <li
                  className={`${styles.footer_socials_item} ${styles.footer_socials_item_threads}`}
                >
                  <Link
                    href="https://www.threads.net/@alpinearmoring/"
                    target="_blank"
                    rel="nofollow noreferrer noopener"
                  >
                    <ThreadsIcon />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className={`${styles.footer_column}`}>
            <h3 className={`${styles.footer_column_title}`}>QUICK LINKS</h3>
            <ul className={`${styles.footer_column_list} ${styles.footer_nav}`}>
              {links.map((link, index) => (
                <li className={`${styles.footer_nav_item}`} key={index}>
                  <Link
                    href={link.path}
                    className={`${styles.footer_nav_link}`}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`${styles.footer_bottom}`}>
          <ul className={`${styles.footer_bottom_nav}`}>
            <li className={`${styles.footer_bottom_nav_item}`}>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
          </ul>

          <p className={`${styles.footer_bottom_copy}`}>
            ©1997-2024. Alpine Armoring Inc. <span>All Rights Reserved</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
