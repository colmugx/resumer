import React from 'react';
import router from 'umi/router';
import styles from './index.scss';
import Form from './form';
import translate from '@/utils/translate';
import inject from '@/utils/inject';

interface IProps {
  dispatch?: any;
  information: {
    profile: any;
    others: any;
  };
}

const IndexPage: React.FC<IProps> = ({ dispatch, information: { profile } }) => {
  const handleValue = (vals: any) => {
    dispatch({
      type: 'information/updateProfile',
      payload: vals,
    });
    router.push('/preview');
  };

  return (
    <div className={styles.editor}>
      <div className="title">
        <h2>{translate('common.editor')}</h2>
      </div>
      <div className="workspace">
        <Form onValue={handleValue} initValue={profile} />
      </div>
    </div>
  );
};

export default inject('information')(IndexPage);
