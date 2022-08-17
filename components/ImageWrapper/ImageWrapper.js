import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import styles from './styles.module.scss';

export default function ImageWrapper(props) {
  const { alt, className, src } = props;
  const classes = [styles.root, className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <Image alt={alt} src={src} layout='fill' objectFit='contain' />
    </div>
  );
}

ImageWrapper.defaultProps = {
  alt: '',
  className: '',
  src: null,
};

ImageWrapper.propTypes = {
  alt: PropTypes.string,
  className: PropTypes.string,
  src: PropTypes.any,
};
