import React from 'react';
import styles from './index.scss';
import inject from '@/utils/inject';

import TFDGenerate from '@/components/tfd';
import { TInfo } from '@/components/tfd/ProfileBox';

interface IProps {
  dispatch?: any;
  information: {
    profile: TInfo;
    others: any;
  };
}

const schemes = [{
  name: 'TFD',
  generate: TFDGenerate
}];

const Footer = ({ name }: { name: string }) => (
  <footer className={styles.footer}>
    <span>Powered by Resumer, scheme: {name}.</span>
  </footer>
)

const PreviewPage: React.FC<IProps> = ({ information }) => {
  const Scheme = schemes[0];
  return (
    <div className={styles.preview}>
      <Scheme.generate data={information} />
      <Footer name={Scheme.name} />
    </div>
  );
};

export default inject('information')(PreviewPage);
