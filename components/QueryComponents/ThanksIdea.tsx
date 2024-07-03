import { Button, Card } from "antd";
import React, { memo } from "react";

import styles from './styles/ThanksIdea.module.scss'
import router from "next/router";


const ThanksIdea: React.FC = memo(() => {

  return (
    <>
      <Card className={styles.card}>
        <div className={styles.thanksContainer}>
            <p className={styles.titleThanks}>Спасибо за идею!</p>
            <p className={styles.nameIdea}>Сделать так, чтобы не дуло в кабинете 303</p>
            <p className={styles.textIdea}>
                Чтобы не дуло в кабинете 303, нужно проверить окна и двери на плотность закрытия, загерметизировать щели, 
                установить уплотнители на рамы, проверить работу вентиляции и при необходимости утеплить стены. 
                Чтобы не дуло в кабинете 303, нужно проверить окна и двери на плотность закрытия, загерметизировать щели, установить...
            </p>

            <div className={styles.btnContainer}>
                <Button 
                    type="primary" 
                    className={styles.btnWatch}
                    onClick={() => { router.push("/queries"); }}
                >
                        Посмотреть идею
                </Button>
                <Button 
                    className={styles.btnGo}
                    onClick={() => { router.push("/queries"); }}
                >
                        Перейти в «Инициативы»
                </Button>
            </div>
        </div>
      </Card>
    </>
  );
})

export default ThanksIdea;
