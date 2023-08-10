import React from "react";
import Image from "next/image";
import logo from '../../public/img/Logo2.0.svg';

import styles from './styles/Logo.module.scss';

export const Logo = ({width} : any, {height} : any) => {
    return (
        <Image width={width} height={height} src={logo} alt="RusGidro" className={styles.logo}/>
    );
};
