import React, { FC, useEffect, useState } from 'react';
import classnames from 'classnames';
import * as styles from './Card.module.scss';

export const Card: FC = (props) => {

  return (
    <div className={classnames('bg-red', styles['card'])}>
      <h3 className={classnames('global-header')}>Card 2</h3>
    </div>
  )
}