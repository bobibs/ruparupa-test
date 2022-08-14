import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import IconRefresh from '../public/ic-refresh.svg';
import IconSearch from '../public/ic-search.svg';
import IconSuccess from '../public/ic-success.svg';
import Button from '../components/Button';
import Card from '../components/Card';
import Header from '../components/Header';
import InputSearch from '../components/InputSearch';
import Loading from '../components/Loading';
import SuccessNotification from '../components/SuccessNotification';
import styles from '../styles/Home.module.scss';

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const getData = async () => {
    const offset = randomNumber(1, 1000);
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=5`,
    );
    const data = await res.json();
    return data;
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

  const clearData = () => {
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

  const getSearchValue = (val) => setSearchValue(val);

  const gridColumn = (data) => {
    let col = '';
    data.forEach(() => (col += 'auto '));
    return col;
  };

  const updateData = async () => {
    setLoading(true);
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${searchValue.toLowerCase()}`,
    );
    const data = await res.json();
    setData([data]);
    setLoading(false);
  };

  const addData = (id) => {
    const pokeId = window.localStorage.getItem('pokeId');
    const setPokeId = (data) =>
      window.localStorage.setItem('pokeId', JSON.stringify(data));

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
      }, 1000);
    }
  }, [show]);

  return (
    <div className={styles.root}>
      <Header />
      <div className={styles.section}>
        <div className={styles.filter}>
          <InputSearch
            getValue={(val) => getSearchValue(val)}
            onClearData={clearData}
          />
          <Button label={<SearchLabel />} onClick={updateData} />
          <Button label={<RefreshLabel />} onClick={refreshData} />
        </div>
        {loading ? (
          <div className={styles.loading}>
            <Loading />
          </div>
        ) : (
          <div
            className={styles.list}
            style={{
              gridTemplateColumns: gridColumn(data),
            }}
          >
            {data.map((i, idx) => (
              <Card data={i} key={idx} onClick={(id) => addData(id)} />
            ))}
          </div>
        )}
        <SuccessNotification label='Added' show={show} variant='success' />
      </div>
    </div>
  );
}

const RefreshLabel = () => (
  <Image
    alt='Icon'
    className={styles.iconRefresh}
    height='20'
    src={IconRefresh}
    width='20'
  />
);

const SearchLabel = () => (
  <Image
    alt='Icon'
    className={styles.iconRefresh}
    height='20'
    src={IconSearch}
    width='20'
  />
);
