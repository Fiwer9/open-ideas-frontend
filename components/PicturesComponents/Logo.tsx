import React from "react";
import Image from "next/image";
import RusGidroLogo from '../../public/img/Logo2.0.svg';

import styles from './styles/Logo.module.scss';

export const Logo = ({width} : any, {height} : any) => {
    return (
        <Image width={width} height={height} src={RusGidroLogo} alt="RusGidro" className={styles.logo}/>
    );
};
