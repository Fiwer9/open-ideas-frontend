import { getDirectionName, getOrganizationName, statusTranslation } from "./utils";
import { QueriesResponse } from "../models/response/QueriesResponse";
import {monthLabels} from "./consts";

export enum AnalyticType {
	DIRECTION,
	ORGANIZATION,
	QUERYSTATUS
}

export type StatisticItem = {
	name: string;
	count: number;
	percent: number;
}

const statusOptionsProcess = [
	'Зарегистрирована',
	'На рассмотрении',
	'Анализируется экспертом',
	'На рассмотрении у руководства',
	'Принята к реализации'
]

export const daysInMonth = (month: number, year: number) => {
	return new Date(year, month, 0).getDate();
}

const getXOptionsForGraphic = (queryDate: string, months: number, years: number, startDate: string, endDate: string) => {
	if (years === 0 && months === 0) {
		return new Date(queryDate).getDate() - 1
	}
	if (months < 12 && months >= 1) {
		const arr = []
		for (let i = new Date(startDate).getUTCMonth(); i < new Date(endDate).getUTCMonth() + 1; i++) {
			arr.push(i)
		}
		return arr.indexOf(new Date(queryDate).getUTCMonth())
	}
	else {
		return new Date(queryDate).getUTCMonth()
	}
}

const getSizeArray = (date: string, days: number, months: number, years: number) => {
	if (years === 0 && months === 0) {
		return daysInMonth(new Date(date).getUTCMonth() + 1, new Date(date).getFullYear())
	}
	if (months < 12 && months >= 1) {
		return months + 1;
	}
	else {
		return 12;
	}
}

export const getAnalyticsForGraphic = (queries : QueriesResponse[], startDate: string, endDate: string) => {
	const days = new Date(endDate).getDate() - new Date(startDate).getDate()
	const months = (new Date(endDate).getUTCMonth() + 1) - (new Date(startDate).getUTCMonth() + 1)
	const years = new Date(endDate).getFullYear() -  new Date(startDate).getFullYear()
	const count = getSizeArray(endDate, days, months, years)
	const statusStatistics = new Map<string, number[]>()
	for (let i = 0; i < queries.length; i++) {
		const currentStatus = convertStatus(statusTranslation[queries[i].status])
		const xOption = getXOptionsForGraphic(queries[i].date, months, years, startDate, endDate)
		if (statusStatistics.has(currentStatus)) {
			const countQueries = statusStatistics.get(currentStatus)
			countQueries[xOption] += 1
			statusStatistics.set(currentStatus, countQueries)
		}
		else {
			const countQueries = new Array<number>(count).fill(0)
			countQueries[xOption] = 1
			statusStatistics.set(currentStatus, countQueries)
		}
	}
	const countQueries = new Array<number>(count).fill(0)
	if (!statusStatistics.has('В процессе')) {
		statusStatistics.set('В процессе', countQueries)
	}
	if (!statusStatistics.has('Отклонены')) {
		statusStatistics.set('Отклонены', countQueries)
	}
	if (!statusStatistics.has('Выполнены')) {
		statusStatistics.set('Выполнены', countQueries)
	}
	console.log(statusStatistics)
	return statusStatistics;
}

export const getAnalyticsForPieChart = (initiativeValues, statisticItems, analytic : AnalyticType) : StatisticItem[] => {
	const statistics: StatisticItem[] = []
	for (let i = 0; i < initiativeValues.length; i++) {
		const currentName = getOptions(initiativeValues[i], statisticItems, analytic)
		if (statistics.find((dir) => dir.name === currentName)) {
			const statDir = statistics.find((dir) => dir.name === currentName)
			const indexStatDir = statistics.indexOf(statDir)
			const newPercent = Math.round((statDir.count + 1) / initiativeValues.length * 100)
			const newStatDir = { ...statDir, count: statDir.count + 1, percent: newPercent }
			statistics[indexStatDir] = newStatDir
		}
		else {
			const dirName = getOptions(initiativeValues[i], statisticItems, analytic)
			const statDir : StatisticItem = {
				name: dirName,
				count: 1,
				percent: Math.round(1 / initiativeValues.length * 100)
			}
			statistics.push(statDir)
		}
	}
	return statistics;
}

const getOptions = (currentElement, statisticItems, type : AnalyticType) => {
	switch (type) {
		case AnalyticType.DIRECTION:
			return getDirectionName(currentElement, statisticItems)
		case AnalyticType.ORGANIZATION:
			return getOrganizationName(currentElement, statisticItems)
		case AnalyticType.QUERYSTATUS:
			return convertStatus(statusTranslation[currentElement])
	}
}

const convertStatus = (status: string) => {
	if (statusOptionsProcess.indexOf(status) !== -1)
		return 'В процессе'
	if (status === 'Выполнена')
		return 'Выполнены'
	else
		return 'Отклонены'
}

export const filterAnalytics = (startDate: string, endDate: string, queries : QueriesResponse[]) => {
	const start = new Date(startDate)
	const end = new Date(endDate)
	return queries.filter((query) =>
		(new Date(query.date) <= end) && (new Date(query.date) >= start)
	)
}
