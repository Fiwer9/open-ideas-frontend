import faker from "faker";
import {daysInMonth} from "./getAnalytics";

export const statusOptions = [
	{ value: 'registered', label: 'Зарегистрирована' },
	{ value: 'check', label: 'На рассмотрении' },
	{ value: 'analysis', label: 'Анализируется экспертом' },
	{
		value: 'accepted',
		label: 'На рассмотрении у руководства',
	},
	{
		value: 'implementation',
		label: 'Принята к реализации',
	},
	{ value: 'done', label: 'Выполнена' },
	{ value: 'rejected', label: 'Отклонена' },
]

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
	"Dec"
];

export const getGraphicLabels = (startDate: string, endDate: string, days: number, months: number, years: number) => {
	const count = daysInMonth(new Date(startDate).getUTCMonth() + 1, new Date(startDate).getFullYear())
	if (years === 0 && months === 0) {
		const array = [...Array(count).keys()].map((numb) => (numb + 1).toString())
		return array;
	}
	if (months < 12 && months >= 1) {
		return monthLabels.slice(new Date(startDate).getUTCMonth(), new Date(endDate).getUTCMonth() + 1);
	}
	else return monthLabels;
}

export const data = {
	labels: monthLabels,
	datasets: [
		{
			label: "В процессе",
			data: monthLabels.map(() => faker.datatype.number({ min: 10, max: 100 })),
			borderColor: "#1B59F8",
			backgroundColor: "#1B59F8",
			borderWidth: 3,
		},
		{
			label: "Отклонены",
			data: monthLabels.map(() => faker.datatype.number({ min: 10, max: 100 })),
			borderColor: "#CE2A96",
			backgroundColor: "#CE2A96",
			borderWidth: 3,
		},
		{
			label: "Выполнены",
			data: monthLabels.map(() => faker.datatype.number({ min: 10, max: 100 })),
			borderColor: "#66ED7C",
			backgroundColor: "#66ED7C",
			borderWidth: 3,
		},
	],
};
