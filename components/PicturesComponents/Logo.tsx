"use client";
import React from "react";
import Image from "next/image";

import styles from "./styles/Logo.module.scss";

interface LogoProps {
  width: number;
  height: number;
  min?: boolean;
  big?: boolean;
  className?: any;
}

export default function Logo({
  width,
  height,
  min,
  big,
  className,
}: LogoProps) {
  return (
    <>
      {big ? (
        <Image
          width={width}
          height={height}
          src="/img/logoBig.svg"
          alt="Открытые идеи"
          className={className}
        />
      ) : (
        <div className={styles.logoContainer}>
          {min ? (
            <Image
              width={width}
              height={height}
              src="/img/logo-min.svg"
              alt="Открытые идеи"
              className={className}
            />
          ) : (
            <Image
              width={width}
              height={height}
              src="/img/logo.svg"
              alt="Открытые идеи"
              className={`${styles.logo} ${className}`}
            />
          )}
        </div>
      )}
    </>
  );
}
