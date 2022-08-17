import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import IconClear from '../../public/ic-clear.svg';
import styles from './styles.module.scss';

export default function ModalNotification(props) {
  const { label, onClose, variant } = props;

  return (
    <div className={styles.root}>
      <div className={styles.modal}>
        <div
          className={`${styles.content} ${styles[variant]}`}
          onClick={onClose}
        >
          Data has beed {variant === 'success' ? 'added' : 'deleted'}!
          <Image alt='Icon' height='25' src={IconClear} width='25' />
        </div>
      </div>
    </div>
  );
}

ModalNotification.defaultProps = {
  label: '',
  onClose: () => {},
  variant: 'success',
};

ModalNotification.propTypes = {
  label: PropTypes.string,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['danger', 'success']),
};
