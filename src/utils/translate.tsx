import React from 'react';
import { FormattedMessage } from 'react-intl';

export default function translate(id: string) {
  return <FormattedMessage id={id}>{t => t}</FormattedMessage>;
}
