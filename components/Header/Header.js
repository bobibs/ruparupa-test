import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
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
      <div className={styles.section}>
        <div className={styles.logo} onClick={() => clickMenu('/')}>
          <Image alt='Icon' height='30' src={IconPokeball} width='30' />
          <div className={styles.name}>Pokedex</div>
        </div>
      </div>
      <div className={`${styles.section} ${styles.sectionRight}`}>
        <div className={styles.menu} onClick={() => clickMenu('/')}>
          <Image alt='Icon' height='25' src={IconHome} width='25' />
          <div className={`${styles.line} ${pathName === '' && styles.path}`} />
        </div>
        <div className={styles.menu} onClick={() => clickMenu('/bag')}>
          <Image alt='Icon' height='25' src={IconBag} width='25' />
          <div
            className={`${styles.line} ${pathName === 'bag' && styles.path}`}
          />
        </div>
      </div>
    </div>
  );
}
