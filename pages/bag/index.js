import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getDetailData } from '../api';
import { gridColumn } from '../../utils/format';
import { getPokeId, setPokeId } from '../../utils/storage';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import ModalNotification from '../../components/ModalNotification';
import styles from '../../styles/Bag.module.scss';

export default function Bag() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const router = useRouter();
  const clickBack = () => router.push('/');

  const deleteData = (id) => {
    setLoading(true);
    const pokeId = getPokeId();
    const newPokeId = JSON.parse(pokeId).filter((i) => i !== id);
    setPokeId(newPokeId);
    setData([]);

    if (newPokeId.length) {
      newPokeId.map((i) => {
        getDetailData(i).then((res) => {
          setData((data) => [...data, res]);
        });
      });
    }
    setShow(true);
    setLoading(false);
  };

  useEffect(() => {
    const listId = getPokeId();
    if (listId !== null) {
      if (listId.length) {
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
      }, 5000);
    }
  }, [show]);

  return (
    <div
      className={styles.root}
      style={{ marginBottom: data.length > 5 ? '2rem' : '0' }}
    >
      <Header />
      {loading ? (
        <div className={styles.loading}>
          <Loading />
        </div>
      ) : (
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
              className={`${styles.data} ${
                data.length >= 5 ? styles.dataGap : ''
              }`}
            >
              {data.map((i, idx) => (
                <Card
                  className={
                    data.length < 5 && idx !== data.length - 1
                      ? styles.card
                      : ''
                  }
                  data={i}
                  key={idx}
                  onClick={(id) => deleteData(id)}
                  variant='delete'
                />
              ))}
            </div>
          )}
        </div>
      )}
      {show ? (
        <ModalNotification
          label='Deleted'
          onClose={() => setShow(false)}
          variant='danger'
        />
      ) : (
        ''
      )}
    </div>
  );
}
