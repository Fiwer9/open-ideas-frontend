import React, { memo } from "react";
import Image from "next/image";
import logo from "../../public/img/logo.svg";
import logoMin from "../../public/img/logo-min.svg";
import logoBig from "../../public/img/logoBig.svg";

import styles from "./styles/Logo.module.scss";

interface LogoProps {
  width: number;
  height: number;
  min?: boolean;
  big?: boolean;
  className?: any;
}

export const Logo: React.FC<LogoProps> = memo(({ width, height, min, big, className }) => {
  return (
    <>
      {big ? (
        <Image
          width={width}
          height={height}
          src={logoBig}
          alt="Открытые идеи"
          className={className}
        />
      ) : (
        <div className={styles.logoContainer}>
          {min ? (
            <Image
              width={width}
              height={height}
              src={logoMin}
              alt="Открытые идеи"
              className={`${styles.logoMin} ${className}`}
            />
          ) : (
            <Image
              width={width}
              height={height}
              src={logo}
              alt="Открытые идеи"
              className={`${styles.logo} ${className}`}
            />
          )}
        </div>
      )}
    </>
  );
});
