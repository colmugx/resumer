import React from 'react';
import { LocaleProvider } from 'antd'
import { addLocaleData, IntlProvider } from 'react-intl'
import inject from '@/utils/inject';
import { TGlobal } from '@/models/global';
import zh from 'react-intl/locale-data/zh'
import en from 'react-intl/locale-data/en'
import antcn from 'antd/lib/locale-provider/zh_CN'
import anten from 'antd/lib/locale-provider/en_US'
import selcn from '@/i18n/zh_cn'
import selen from '@/i18n/en'
import styles from './index.scss';

interface IProps {
  global: TGlobal
}

addLocaleData([...zh, ...en])

const antI18n = { zh: antcn, en: anten }
const selI18n = { zh: selcn, en: selen }

const BasicLayout: React.FC<IProps> = ({ children, global }) => {
  return (
    <LocaleProvider locale={antI18n[global.lang]}>
      <IntlProvider locale={global.lang} messages={selI18n[global.lang]}>
        <div className={styles.container}>
          {children}
        </div>
      </IntlProvider>
    </LocaleProvider>
  );
};

export default inject('global')(BasicLayout);
