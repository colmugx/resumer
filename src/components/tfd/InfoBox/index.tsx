import React from 'react';
import styles from './index.scss';

interface IProps {
  title: string | React.ReactNode;
}

const InfoBox: React.FC<IProps> = ({ children, title }) => {
  return (
    <div className={styles.infoBox}>
      <div className={styles.infoBoxTitle}>
        <h3>{title}</h3>
      </div>
      <div className={styles.infoBoxBody}>{children}</div>
    </div>
  );
};

export default InfoBox;
