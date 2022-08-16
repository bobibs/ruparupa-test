import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import IconClear from '../../public/ic-clear.svg';
import styles from './styles.module.scss';

export default function InputSearch(props) {
  const { getValue } = props;
  const [value, setValue] = useState('');

  const clearValue = () => setValue('');

  useEffect(() => {
    getValue(value);
  }, [value]);

  return (
    <div className={styles.root}>
      <input
        className={styles.input}
        onChange={(e) => setValue(e.target.value)}
        placeholder='Find Pokemon'
        type='text'
        value={value}
      />
      <div className={styles.icon}>
        {value.length ? (
          <Image
            alt='Icon'
            height='25'
            onClick={clearValue}
            src={IconClear}
            width='25'
          />
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

InputSearch.defaultProps = {
  getValue: () => {},
};

InputSearch.propTypes = {
  getValue: PropTypes.func,
};
