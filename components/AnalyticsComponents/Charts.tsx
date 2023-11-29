import React from "react";
import { Slider } from "../SliderComponents/SliderComponents";
import { Tabs } from "../TabsComponent/Tabs";
import { Header } from "../HeaderComponents/Header";
import { MainText } from "../MainTextComponent";
import { StatisticsCard } from "./StatisticsCard";
import Filter from "../FilterComponents/blocks/Filter";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import styles from "./styles/Charts.module.scss";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
  maintainAspectRatio: false,
  aspectRatio: 1,
};

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const data = {
  labels,
  datasets: [
    {
      label: 'В процессе',
      data: labels.map(() => faker.datatype.number({ min: 10, max: 100 })),
      borderColor: '#1B59F8',
      backgroundColor: '#1B59F8',
      borderWidth: 3,
    },
    {
      label: 'Отклонены',
      data: labels.map(() => faker.datatype.number({ min: 10, max: 100 })),
      borderColor: '#CE2A96',
      backgroundColor: '#CE2A96',
      borderWidth: 3,
    },
    {
      label: 'Выполнены',
      data: labels.map(() => faker.datatype.number({ min: 10, max: 100 })),
      borderColor: '#66ED7C',
      backgroundColor: '#66ED7C',
      borderWidth: 3,
    },
  ],
};

export const Charts = () => {

  return (
    <>
      <div className={styles.container}>
        <Slider/>
        <div className={styles.content}>
          <Header user_name={'Иванов Иван Иванович'} organization={'Aratrum'} department={'Отдел'}/>
          <Tabs />
          <MainText text={'Аналитика'}/>

          <div className={styles.contentStatic}>
            <div className={styles.headerContent}>
              <p className={`${styles.numberInitiatives} ${styles.headerItem}`}>Количество инициатив : 100</p>
              <div className={styles.calendar}>
                <Filter />
              </div>
            </div>

            <div className={styles.lineCharts}>
              <Line options={options} data={data} />
            </div>

            <div className={styles.statisticsCard}>
                <div className={styles.statisticsCardItem}>
                  <StatisticsCard
                    title={'Инициативы по направлениям'}
                    numInitiatives={'Количество инициатив: 4000'}
                    colorTag1={'#497AF9'}
                    percent1={'62%'}
                    text1={'Направление 1'}
                    color1={'rgba(27, 90, 248)'}
                    colorTag2={'#789DFB'}
                    percent2={'13%'}
                    text2={'Направление 2'}
                    color2={'rgba(27, 90, 248, 0.46)'}
                    colorTag3={'#E5E5E5'}
                    percent3={'23%'}
                    text3={'Направление 3'}
                    color3={'rgba(191, 191, 191, 0.2)'}
                  />
                </div>

                <div className={styles.statisticsCardItem}>
                  <StatisticsCard
                    title={'Инициативы по компаниям'}
                    numInitiatives={'Количество инициатив: 4000'}
                    colorTag1={'#65EBAD'}
                    percent1={'62%'}
                    text1={'Компания 1'}
                    color1={'rgba(101, 235, 174)'}
                    colorTag2={'#87B0ED'}
                    percent2={'13%'}
                    text2={'Компания 2'}
                    color2={'rgba(27, 90, 248, 0.4)'}
                    colorTag3={'#99C5D3'}
                    percent3={'23%'}
                    text3={'Компания 3'}
                    color3={'rgba(51, 139, 167, 0.6)'}
                  />
                </div>

                <div>
                  <StatisticsCard
                    title={'Инициативы по статусам'}
                    numInitiatives={'Количество инициатив: 4000'}
                    colorTag1={'#18B5B5'}
                    percent1={'62%'}
                    text1={'Выполненные'}
                    color1={'rgba(23, 180, 180)'}
                    colorTag2={'#A5C5E1'}
                    percent2={'13%'}
                    text2={'В процессе'}
                    color2={'rgba(143, 183, 217)'}
                    colorTag3={'#B08B8B'}
                    percent3={'23%'}
                    text3={'Отклонены'}
                    color3={'rgba(97, 23, 23, 0.5)'}
                  />
                </div>
              </div>
            </div>
        </div>
      </div>
    </>
  );
};
