import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import SuccessNotification from '../../components/SuccessNotification';
import styles from './styles.module.scss';

export default function Bag() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const router = useRouter();
  const clickBack = () => router.push('/');

  const getDetailData = async (id) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    return data;
  };

  const gridColumn = (data) => {
    let col = '';
    data.forEach(() => (col += 'auto '));
    return col;
  };

  const deleteData = (id) => {
    setLoading(true);
    const pokeId = window.localStorage.getItem('pokeId');
    const newPokeId = JSON.parse(pokeId).filter((i) => i !== id);
    window.localStorage.setItem('pokeId', JSON.stringify(newPokeId));
    setData([]);

    if (newPokeId.length) {
      newPokeId.map((i) => {
        getDetailData(i).then((res) => {
          setData((data) => [...data, res]);
        });
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    const listId = window.localStorage.getItem('pokeId');
    if (listId !== null) {
      if (listId.length) {
        const parseId = JSON.parse(listId);
        JSON.parse(listId).map((i) => {
          getDetailData(i).then((res) => {
            setData((data) => [...data, res]);
          });
        });
      }
    }
  }, []);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setShow(false);
      }, 1000);
    }
  }, [show]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <Loading />
      </div>
    );
  }

  return (
    <div
      className={styles.root}
      style={{ marginBottom: data.length > 5 ? '2rem' : '0' }}
    >
      <Header />
      <div className={styles.section}>
        {!data.length ? (
          <div className={styles.noData}>
            <div className={styles.noText}>No Pokemon Selected.</div>
            <div className={styles.noButton} onClick={clickBack}>
              <Button label='Back To Home' />
            </div>
          </div>
        ) : (
          <div
            className={styles.data}
            style={{
              gridTemplateColumns: gridColumn(data),
            }}
          >
            {data.map((i, idx) => (
              <Card
                data={i}
                key={idx}
                onClick={(id) => deleteData(id)}
                variant='delete'
              />
            ))}
          </div>
        )}
      </div>
      <SuccessNotification label='Deleted' show={show} variant='danger' />
    </div>
  );
}
