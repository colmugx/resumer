import React from 'react';
import { Button, Icon } from 'antd';
import translate from './translate';

export const AddMoreBtn: React.FC<{ onClick: any; label: string }> = ({ onClick, label }) => (
  <Button type="dashed" onClick={onClick} style={{ width: '60%' }}>
    <Icon type="plus" style={{ marginRight: 4 }} />
    {translate('common.add')}
    {translate(label)}
  </Button>
);
