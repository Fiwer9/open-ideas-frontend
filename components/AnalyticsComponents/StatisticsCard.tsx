import React from "react";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import styles from "./styles/StatisticsCard.module.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

export const StatisticsCard = ( { title, numInitiatives, colorTag1, colorTag2, colorTag3,
                                  color1, color2, color3, percent1, percent2, percent3, text1, text2, text3 }: any ) => {
  const data = {
    datasets: [
      {
        data: [62, 13, 23],
        backgroundColor: [
          color1,
          color2,
          color3,
        ],
        borderColor: [
          color1,
          color2,
          color3,
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    maintainAspectRatio: false,
    aspectRatio: 1,
  };

  return (
    <>
      <div className={styles.card}>
        <div>
          <p className={styles.title}>{title}</p>
          <p className={styles.numberInitiative}>{numInitiatives}</p>
          <div className={styles.statisticsContent}>
            <div className={styles.infContent}>
              <div className={styles.infContentItem}>
                <button style={{backgroundColor: colorTag1}} className={styles.btnStatic}></button>
                <p className={styles.textStatic}><strong className={styles.strong}>{percent1}</strong> {text1}</p>
              </div>
              <div className={styles.infContentItem}>
                <button style={{backgroundColor: colorTag2}} className={styles.btnStatic}></button>
                <p className={styles.textStatic}><strong className={styles.strong}>{percent2}</strong> {text2}</p>
              </div>
              <div className={styles.infContentItem}>
                <button style={{backgroundColor: colorTag3}} className={styles.btnStatic}></button>
                <p className={styles.textStatic}><strong className={styles.strong}>{percent3}</strong> {text3}</p>
              </div>
            </div>

            <div className={styles.doughnut}>
              <Doughnut data={data} options={options} className={styles.progress} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
