import React from 'react';
import styles from './index.scss';
import Form from './form'
import translate from '@/utils/translate';

interface IProps {
  dispatch?: any;
}

const IndexPage: React.FC<IProps> = () => {

  const handleValue = value => console.log(value)

  return (
    <div className={styles.editor}>
      <div className="title">
        <h2>{translate('common.editor')}</h2>
      </div>
      <div className="workspace">
        <Form onValue={handleValue} />
      </div>
    </div>
  );
};

export default IndexPage;
