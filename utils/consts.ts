import faker from "faker";

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
];

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
