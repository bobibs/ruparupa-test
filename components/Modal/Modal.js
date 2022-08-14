import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import IconClear from '../../public/ic-clear.svg';
import styles from './styles.module.scss';

export default function Modal(props) {
  const { data, onClose } = props;

  return (
    <div className={styles.root}>
      <div className={styles.modal}>
        <div className={styles.close} onClick={onClose}>
          <Image alt='Icon' height='25' src={IconClear} width='25' />
        </div>
        <div className={styles.top}>
          <Image
            alt='Icon'
            height='150'
            src={data.sprites?.other?.home.front_default}
            width='150'
          />
          <div className={styles.name}>{data.name}</div>
        </div>
        <div className={styles.bottom}>
          <div>
            {data.stats?.map((i, idx) => (
              <div key={idx} className={styles.stat}>
                <div className={styles.statName}>{i.stat.name}</div>
                <div
                  className={styles.statBar}
                  style={{ width: i.base_stat }}
                />
                <div className={styles.statPrecentage}>{i.base_stat}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Modal.defaultProps = {
  data: {},
  onClose: () => {},
};

Modal.propTypes = {
  data: PropTypes.object,
  onClose: PropTypes.func,
};
