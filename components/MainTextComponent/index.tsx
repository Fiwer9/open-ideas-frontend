import React, { memo, useEffect, useState } from "react";
import styles from "./styles/index.module.scss";

interface MainTextProps {
  text: string;
}

export const MainText: React.FC<MainTextProps> = memo(({ text }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return;
  }

  return (
    <div className={styles.titleContainer}>
      <h1 className={styles.title}>{text}</h1>
    </div>
  );
});
