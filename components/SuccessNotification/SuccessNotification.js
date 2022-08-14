import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import IconSuccess from '../../public/ic-success.svg';
import styles from './styles.module.scss';

export default function SuccessNotification(props) {
  const { label, show, variant } = props;
  const classes = [styles.root, show && styles['show'], styles[variant]]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      Successfully {label}
      <Image
        alt='Icon'
        className={styles[`icon${variant}`]}
        height='20'
        src={IconSuccess}
        width='20'
      />
    </div>
  );
}

SuccessNotification.defaultProps = {
  label: '',
  show: false,
  variant: 'success',
};

SuccessNotification.propTypes = {
  label: PropTypes.string,
  show: PropTypes.bool,
  variant: PropTypes.oneOf(['success', 'danger']),
};
