import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { getDetailData } from '../../pages/api';
import Loading from '../Loading';
import ModalInformation from '../ModalInformation';
import IconAdd from '../../public/ic-add.svg';
import IconDelete from '../../public/ic-delete.svg';
import IconInfo from '../../public/ic-info.svg';
import styles from './styles.module.scss';

export default function Card(props) {
  const { className, data, onClick, variant } = props;
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const classes = [styles.root, className].filter(Boolean).join(' ');

  useEffect(() => {
    setLoading(true);
    getDetailData(data.id).then((res) => {
      setDetail(res);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [show]);

  if (loading || !detail.sprites) {
    return (
      <div className={styles.loading}>
        <Loading />
      </div>
    );
  }

  return (
    <div className={classes}>
      <div className={styles.images}>
        <Image
          alt='Pokemon'
          height='150'
          src={detail.sprites.other.home.front_default}
          width='150'
        />
      </div>
      <div className={styles.title}>
        <div className={styles.text}>{detail.name}</div>
      </div>
      <div className={styles.action}>
        <Image
          alt='Pokemon'
          className={styles.icon}
          height='24'
          onClick={() => setShow(true)}
          src={IconInfo}
          width='25'
        />
        {variant === 'add' ? (
          <Image
            alt='Pokemon'
            className={styles.icon}
            height='29'
            onClick={() => onClick(data.id)}
            src={IconAdd}
            width='29'
          />
        ) : (
          <Image
            alt='Pokemon'
            className={styles.icon}
            height='25'
            onClick={() => onClick(data.id)}
            src={IconDelete}
            width='25'
          />
        )}
      </div>
      {show ? (
        <ModalInformation data={detail} onClose={() => setShow(false)} />
      ) : (
        ''
      )}
    </div>
  );
}

Card.defaultProps = {
  className: '',
  data: {},
  onClick: () => {},
  variant: 'add',
};

Card.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['add', 'delete']),
};
