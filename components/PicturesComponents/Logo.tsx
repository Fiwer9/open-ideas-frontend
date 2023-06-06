import React from "react";
import Image from "next/image";
import RusGidroLogo from '../../public/img/Logo.svg';

import styles from './styles/Logo.module.scss';

export const Logo = () => {
    return (
        <div className={styles.logoContainer}>
            <Image src={RusGidroLogo} alt="RusGidro" className={styles.logo}/>
            <p className={styles.textLogo}>РусГидро</p>
        </div>
    );
};
