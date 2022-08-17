import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { getData, searchData } from './api';
import { getPokeId, setPokeId } from '../utils/storage';
import IconRefresh from '../public/ic-refresh.svg';
import IconSearch from '../public/ic-search.svg';
import IconSuccess from '../public/ic-success.svg';
import Button from '../components/Button';
import Card from '../components/Card';
import Header from '../components/Header';
import InputSearch from '../components/InputSearch';
import Loading from '../components/Loading';
import ModalNotification from '../components/ModalNotification';
import styles from '../styles/Home.module.scss';

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const getSearchValue = (val) => setSearchValue(val);

  const addData = (id) => {
    const pokeId = getPokeId();

    if (pokeId === null) {
      setPokeId([id]);
    } else {
      if (!JSON.parse(pokeId).includes(id)) {
        const newData = [...JSON.parse(pokeId), id];
        setPokeId(newData);
        setShow(true);
      }
    }
  };

  const refreshData = () => {
    setLoading(true);
    getData().then(({ results }) => {
      setData(
        results.map((i) => ({
          id: parseInt(i.url.split('/')[6]),
        })),
        setLoading(false),
      );
    });
  };

  const updateData = () => {
    setLoading(true);
    searchData(searchValue).then((res) => {
      setData([res]);
      setLoading(false);
    });
  };

  const refreshLabel = () => (
    <Image
      alt='Icon'
      className={styles.iconRefresh}
      height='20'
      src={IconRefresh}
      width='20'
    />
  );

  const searchLabel = () => (
    <Image
      alt='Icon'
      className={styles.iconRefresh}
      height='20'
      src={IconSearch}
      width='20'
    />
  );

  useEffect(() => {
    setLoading(true);
    getData().then(({ results }) => {
      setData(
        results.map((i) => ({
          id: parseInt(i.url.split('/')[6]),
        })),
      );
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setShow(false);
      }, 5000);
    }
  }, [show]);

  return (
    <div className={styles.root}>
      <Head>
        <title>Pokedex</title>
      </Head>
      <Header />
      <div className={styles.section}>
        <div className={styles.filter}>
          <InputSearch getValue={(val) => getSearchValue(val)} />
          <div className={styles.filterAction}>
            <Button label={searchLabel()} onClick={updateData} />
            <Button label={refreshLabel()} onClick={refreshData} />
          </div>
        </div>
        {loading ? (
          <div className={styles.loading}>
            <Loading />
          </div>
        ) : (
          <div
            className={`${styles.list} ${
              data.length === 1 ? styles.listOne : ''
            }`}
          >
            {data.map((i, idx) => (
              <Card data={i} key={idx} onClick={(id) => addData(id)} />
            ))}
          </div>
        )}
        {show ? (
          <ModalNotification
            label='Added'
            onClose={() => setShow(false)}
            variant='success'
          />
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
