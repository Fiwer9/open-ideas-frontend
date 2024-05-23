import React from "react";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styles from "./styles/StatisticsCard.module.scss";
import { StatisticItem } from "../../utils/getAnalytics";

ChartJS.register(ArcElement, Tooltip, Legend);

interface StatisticsCardProps {
	title: string,
	dataPieChart: StatisticItem[]
	numInitiatives: number,
	colorTag1: string,
	colorTag2: string,
	colorTag3: string,
	color1: string,
	color2: string,
	color3: string
}

export const StatisticsCard = ( { title, dataPieChart, numInitiatives, colorTag1, colorTag2, colorTag3,
                                  color1, color2, color3 } : StatisticsCardProps ) => {
	const colorTags = [colorTag1, colorTag2, colorTag3]
  const data = {
    datasets: [
      {
        data: dataPieChart.map((data) => data.percent),
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
          <p className={styles.numberInitiative}>Количество инициатив: {numInitiatives}</p>
          <div className={styles.statisticsContent}>
            <div className={styles.infContent}>
							{dataPieChart.map((data, count) =>
								<div className={styles.infContentItem} key={count}>
									<button style={{backgroundColor: colorTags[count]}} className={styles.btnStatic}></button>
									<p className={styles.textStatic}><strong className={styles.strong}>{data.percent}%</strong> {data.name}</p>
								</div>
							)}
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
