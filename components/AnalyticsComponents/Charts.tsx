import React, {memo, useEffect, useState} from "react";
import { MainText } from "../MainTextComponent";
import { StatisticsCard } from "./StatisticsCard";
import Filter from "../FilterComponents/blocks/Filter";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import styles from "./styles/Charts.module.scss";
import { AnalyticType, getAnalyticsForPieChart, getAnalyticsForGraphic, StatisticItem } from "../../utils/getAnalytics";
import { monthLabels, statusOptions } from "../../utils/consts";
import { Status } from "../../redux/queriesSlice/types";
import { useSelector } from "react-redux";
import { selectOrganizations, selectOrgStatus } from "../../redux/organizationsSlice/selectors";
import { selectDirections, selectStatusDirections } from "../../redux/directionsSlice/selectors";
import { selectQueriesData, selectStatusQueries } from "../../redux/queriesSlice/selectors";
import { fetchDirections } from "../../redux/directionsSlice/asyncActions";
import { fetchOrganizations } from "../../redux/organizationsSlice/asyncActions";
import debounce from "lodash.debounce";
import { fetchQueries } from "../../redux/queriesSlice/asyncActions";
import { useAppDispatch } from "../../redux/store";
import AdminPageLayout from "../AdminPageLayout";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
  maintainAspectRatio: false,
  aspectRatio: 1,
};

const dataset = [
	{
		label: "В процессе",
		data: [],
		borderColor: "#1B59F8",
		backgroundColor: "#1B59F8",
		borderWidth: 3,
	},
	{
		label: "Отклонены",
		data: [],
		borderColor: "#CE2A96",
		backgroundColor: "#CE2A96",
		borderWidth: 3,
	},
	{
		label: "Выполнены",
		data: [],
		borderColor: "#66ED7C",
		backgroundColor: "#66ED7C",
		borderWidth: 3,
	},
]

export const Charts: React.FC = memo(() => {
	const [data, setData] = useState({
		labels: monthLabels,
		datasets: []
	})
	const [isLoading, setIsLoading] = useState(true);
	const [dataDirection, setDataDirection] = useState<StatisticItem[]>([])
	const [dataOrganization, setDataOrganization] = useState<StatisticItem[]>([])
	const [dataStatus, setDataStatus] = useState<StatisticItem[]>([])
	const directions = useSelector(selectDirections);
	const organizations = useSelector(selectOrganizations);
	const queries = useSelector(selectQueriesData)
	const statusOrganizations = useSelector(selectOrgStatus);
	const statusDirections = useSelector(selectStatusDirections);
	const statusQuery = useSelector(selectStatusQueries);
	const initiativeDirections = queries.map((query) => query.initiative_direction)
	const initiativeOrganizations = queries.map((query) => query.organization)
	const initiativeStatuses = queries.map((query) => query.status)
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (
			statusDirections === Status.SUCCESS &&
			statusQuery === Status.SUCCESS &&
			statusOrganizations === Status.SUCCESS
		) {
			setIsLoading(false);
		} else {
			setIsLoading(true);
		}
	}, [
		statusDirections,
		statusOrganizations,
		statusQuery
	]);

	const fetchData = debounce(async () => {
		await dispatch(fetchDirections());
		await dispatch(fetchOrganizations());
		await dispatch(fetchQueries({}))
	}, 1000);

	useEffect(() => {
		const dataForGraphic = getAnalyticsForGraphic(queries)
		const updatedDataset =  dataset.map((dataItem) =>
		{ return { ...dataItem, data: dataForGraphic.get(dataItem.label) } })
		if (organizations) {
			setData({...data, datasets: updatedDataset})
			setDataDirection(getAnalyticsForPieChart(initiativeDirections, directions, AnalyticType.DIRECTION))
			setDataOrganization(getAnalyticsForPieChart(initiativeOrganizations, organizations, AnalyticType.ORGANIZATION))
			setDataStatus(getAnalyticsForPieChart(initiativeStatuses, statusOptions, AnalyticType.QUERYSTATUS))
		}
	}, [ organizations, directions, queries ])

	useEffect(() => {
		fetchData()
	}, [])

	if (isLoading) {
		return;
	}

  return (
		<AdminPageLayout>
      <div className={styles.container}>
        <div className={styles.content}>
          <MainText text={"Аналитика"} />
          <div className={styles.contentStatic}>
            <div className={styles.headerContent}>
              <p className={`${styles.numberInitiatives} ${styles.headerItem}`}>
                Количество инициатив : {queries.length}
              </p>
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
                  title={"Инициативы по направлениям"}
                  numInitiatives={queries.length}
									dataPieChart={dataDirection}
                  colorTag1={"#497AF9"}
                  color1={"rgba(27, 90, 248)"}
                  colorTag2={"#789DFB"}
                  color2={"rgba(27, 90, 248, 0.46)"}
                  colorTag3={"#E5E5E5"}
                  color3={"rgba(191, 191, 191, 0.2)"}
                />
              </div>
              <div className={styles.statisticsCardItem}>
                <StatisticsCard
                  title={"Инициативы по компаниям"}
                  numInitiatives={queries.length}
									dataPieChart={dataOrganization}
                  colorTag1={"#65EBAD"}
                  color1={"rgba(101, 235, 174)"}
                  colorTag2={"#87B0ED"}
                  color2={"rgba(27, 90, 248, 0.4)"}
                  colorTag3={"#99C5D3"}
                  color3={"rgba(51, 139, 167, 0.6)"}
                />
              </div>
              <div>
                <StatisticsCard
                  title={"Инициативы по статусам"}
                  numInitiatives={queries.length}
									dataPieChart={dataStatus}
                  colorTag1={"#18B5B5"}
                  color1={"rgba(23, 180, 180)"}
                  colorTag2={"#A5C5E1"}
                  color2={"rgba(143, 183, 217)"}
                  colorTag3={"#B08B8B"}
                  color3={"rgba(97, 23, 23, 0.5)"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
		</AdminPageLayout>
  );
});
