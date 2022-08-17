import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import ImageWrapper from '../ImageWrapper';
import IconBag from '../../public/ic-bag.svg';
import IconHome from '../../public/ic-home.svg';
import IconPokeball from '../../public/ic-pokeball.svg';
import styles from './styles.module.scss';

export default function Header() {
  const [pathName, setPathName] = useState('');
  const router = useRouter();

  const clickMenu = (path) => router.push(path);

  useEffect(() => {
    const path = window.location.pathname.split('/')[1];
    setPathName(path);
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.sectionLeft} onClick={() => clickMenu('/')}>
        <ImageWrapper alt='Icon' src={IconPokeball} />
        <div className={styles.name}>Pokedex</div>
      </div>
      <div className={styles.sectionRight}>
        <div className={styles.menu} onClick={() => clickMenu('/')}>
          <ImageWrapper alt='Icon' className={styles.icon} src={IconHome} />
          <div className={`${styles.line} ${pathName === '' && styles.path}`} />
        </div>
        <div className={styles.menu} onClick={() => clickMenu('/bag')}>
          <ImageWrapper alt='Icon' className={styles.icon} src={IconBag} />
          <div
            className={`${styles.line} ${pathName === 'bag' && styles.path}`}
          />
        </div>
      </div>
    </div>
  );
}
