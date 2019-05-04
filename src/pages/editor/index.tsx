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

const IndexPage: React.FC<IProps> = ({ dispatch, information }) => {
  const handleValue = (vals: any) => {
    const { educations, experiences, projects, personal, ...profile } = vals;
    dispatch({
      type: 'information/updateProfile',
      payload: profile,
    });
    dispatch({
      type: 'information/updateOthers',
      payload: {
        educations,
        experiences,
        projects,
        personal: personal.split('\n'),
      },
    });
    router.push('/preview');
  };

  return (
    <div className={styles.editor}>
      <div className="title">
        <h2>{translate('common.editor')}</h2>
      </div>
      <div className="workspace">
        <Form onValue={handleValue} initValue={information} />
      </div>
    </div>
  );
};

export default inject('information')(IndexPage);
