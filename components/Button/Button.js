import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

export default function Button(props) {
  const { label, onClick } = props;

  return (
    <button className={styles.root} onClick={onClick}>
      {label}
    </button>
  );
}

Button.defaultProps = {
  label: null,
  onClick: () => {},
};

Button.propTypes = {
  label: PropTypes.any,
  onClick: PropTypes.func,
};
