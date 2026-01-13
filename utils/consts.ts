import { faker } from "@faker-js/faker";
import { daysInMonth } from "./getAnalytics";

export const statusOptions = [
  { value: "registered", label: "Зарегистрирована" },
  { value: "check", label: "На рассмотрении" },
  { value: "analysis", label: "Анализируется экспертом" },
  {
    value: "accepted",
    label: "На рассмотрении у руководства",
  },
  {
    value: "implementation",
    label: "Принята к реализации",
  },
  { value: "done", label: "Выполнена" },
  { value: "rejected", label: "Отклонена" },
];

export const monthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const getGraphicLabels = (
  startDate: string,
  endDate: string,
  months: number,
  years: number
): string[] => {
  const count = daysInMonth(
    new Date(startDate).getUTCMonth() + 1,
    new Date(startDate).getFullYear()
  );
  if (years === 0 && months === 0) {
    const array = [...Array(count).keys()].map((numb) => (numb + 1).toString());
    return array;
  }
  if (years === 0 && months >= 1) {
    return monthLabels.slice(
      new Date(startDate).getUTCMonth(),
      new Date(endDate).getUTCMonth() + 1
    );
  }
  if (years === 1) {
    const arrLength = 12 + months;
    const arr: string[] = [];
    for (
      let i = new Date(startDate).getUTCMonth();
      i < new Date(startDate).getUTCMonth() + arrLength + 1;
      i++
    ) {
      arr.push(monthLabels[i % 12]);
    }
    return arr;
  }
  if (years > 1) {
    const arr: string[] = [];
    for (
      let i = new Date(startDate).getFullYear();
      i < new Date(endDate).getFullYear() + 1;
      i++
    ) {
      arr.push(i.toString());
    }
    return arr;
  } else return monthLabels;
};

export const data = {
  labels: monthLabels,
  datasets: [
    {
      label: "В процессе",
      data: monthLabels.map(() => faker.number.int({ min: 10, max: 100 })),
      borderColor: "#1B59F8",
      backgroundColor: "#1B59F8",
      borderWidth: 3,
    },
    {
      label: "Отклонены",
      data: monthLabels.map(() => faker.number.int({ min: 10, max: 100 })),
      borderColor: "#CE2A96",
      backgroundColor: "#CE2A96",
      borderWidth: 3,
    },
    {
      label: "Выполнены",
      data: monthLabels.map(() => faker.number.int({ min: 10, max: 100 })),
      borderColor: "#66ED7C",
      backgroundColor: "#66ED7C",
      borderWidth: 3,
    },
  ],
};
