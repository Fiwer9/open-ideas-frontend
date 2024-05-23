import { getDirectionName, getOrganizationName, statusTranslation } from "./utils";
import { QueriesResponse } from "../models/response/QueriesResponse";

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

export const getAnalyticsForGraphic = (queries : QueriesResponse[]) => {
	const statusStatistics = new Map<string, number[]>()
	for (let i = 0; i < queries.length; i++) {
		const currentStatus = convertStatus(statusTranslation[queries[i].status])
		const month = new Date(queries[i].date).getUTCMonth()
		if (statusStatistics.has(currentStatus)) {
			const countQueries = statusStatistics.get(currentStatus)
			countQueries[month] += 1
			statusStatistics.set(currentStatus, countQueries)
		}
		else {
			const countQueries = new Array<number>(12).fill(0)
			countQueries[month] = 1
			statusStatistics.set(currentStatus, countQueries)
		}
	}
	return statusStatistics
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

