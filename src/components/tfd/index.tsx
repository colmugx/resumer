import './styles/index.scss';

import React from 'react';
import Profile, { TInfo } from './ProfileBox';
import InfoBox from './InfoBox';
import MessageBox from './MessageBox';
import translate from '@/utils/translate';

import styles from './styles/style.scss';

interface IProps {
  data: {
    profile: TInfo;
    others: any;
  };
}

const TFDGenerate: React.FC<IProps> = ({ data }) => {
  return (
    <div className={styles.tfdScheme}>
      <Profile info={data.profile} />
      {Object.keys(data.others).map(key => (
        <InfoBox key={key} title={translate(`info.others.${key}`)} >
          <MessageBox key={`mbox-${name}`} type={key} data={data.others[key]} />
        </InfoBox>
      ))}
    </div>
  );
};

export default TFDGenerate;

export { Profile as ProfileBox, InfoBox };
