import React from "react";
import Image from "next/image";
import logo from '../../public/img/logo.svg';
import logoMin from '../../public/img/logo-min.svg';

import styles from './styles/Logo.module.scss';

interface LogoProps {
    width: number;
    height: number;
    min?: boolean;
}

export const Logo = ({ width, height, min }: LogoProps) => {
    return (
        <div className={styles.logoContainer}>
            {min ? (
                <Image width={width} height={height} src={logoMin} alt="Открытые идеи" className={styles.logoMin}/>
            ) : (
                <Image width={width} height={height} src={logo} alt="Открытые идеи" className={styles.logo}/>
            )}
        </div>
    );
};
