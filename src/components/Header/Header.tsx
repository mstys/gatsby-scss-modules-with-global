import React, { FC, useEffect, useState } from 'react';
import * as styles from './Header.module.scss';
import { StaticImage } from "gatsby-plugin-image"
import classNames from 'classnames';

export const Header: FC = () => {
  return (
    <div>
      <h1 className={classNames('global-header', styles['header'])}>Header</h1>
      <h1>Hello gatsby-image</h1>
      <StaticImage src="https://placekitten.com/300/300" alt="A kitten" />

    </div>
  )
}