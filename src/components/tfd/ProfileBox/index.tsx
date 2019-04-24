import React from 'react';
import styles from './index.scss';
import translate from '@/utils/translate';

export type TInfo = {
  name?: string;
  job?: string;
  base?: string;
  local?: string;
  phone?: string;
  homepage?: string;
  github?: string;
  email?: string;
  qq?: number;
  tags?: string[];
};

interface IProps {
  info: TInfo;
}

const COLUMN_LIST = [
  ['job', 'base', 'local'],
  ['phone', 'email', 'qq'],
  'homepage',
  'github',
  'tags',
];

const createItem = (value: string | string[], label: string, idx: number) => {
  return (
    <p key={`item-${label}-${idx}`}>
      {translate(`info.profile.${label}`)}
      {typeof value !== 'object' ? (
        <>
          <span>{value}</span>
        </>
      ) : (
        value.map(val => (
          <span key={`key-${val}`} className={styles.itemKey}>
            {val}
          </span>
        ))
      )}
    </p>
  );
};

const createList = (list: any, data: any) =>
  list.map((item: any, idx: number) =>
    typeof item === 'string' ? (
      data[item] ? (
        createItem(data[item], item, idx)
      ) : null
    ) : (
      <div key={`child-${idx}`} className={styles.childList}>
        {createList(item, data)}
      </div>
    ),
  );

const componentName: React.FC<IProps> = ({ info }) => {
  return (
    <header className={styles.profile}>
      <div className="title">
        <h1>{info.name}</h1>
      </div>
      <div className="other">{createList(COLUMN_LIST, info)}</div>
    </header>
  );
};

export default componentName;
