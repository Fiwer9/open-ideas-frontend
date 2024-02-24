import React, { memo, useCallback, useEffect, useState } from "react";

import styles from "./styles/QueryList.module.scss";
import { QueriesResponse } from "../../models/response/QueriesResponse";
import {
  checkExpert,
  getDirectionName,
  getDirections,
  getStatus,
  getStatusClassName,
  statusTranslation,
} from "../../utils/utils";
import { Slider } from "../SliderComponents/SliderComponents";
import { Header } from "../HeaderComponents/Header";
import { Tabs } from "../TabsComponent/Tabs";
import { MainText } from "../MainTextComponent";
import { DataTable } from "../TableComponent/Table";
import FilterBar from "../FilterComponents/blocks/FilterBar";
import CheckboxBar from "../FilterComponents/blocks/CheckboxBar";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import SearchBar from "../FilterComponents/blocks/SearchBar";
import { FilterOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Logo } from "../PicturesComponents/Logo";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/authSlice/selectors";
import {
  selectDirections,
  selectStatusDirections,
} from "../../redux/directionsSlice/selectors";
import {
  selectQueriesData,
  selectStatusQueries,
} from "../../redux/queriesSlice/selectors";
import { useAppDispatch } from "../../redux/store";
import {
  fetchQueriesByName,
  fetchQueries,
} from "../../redux/queriesSlice/asyncActions";
import { fetchDirections } from "../../redux/directionsSlice/asyncActions";
import { selectFilters } from "../../redux/filterSlice/selectors";
import { Status } from "../../redux/queriesSlice/types";
import { selectSelectedTag } from "../../redux/menuSlice/selectors";
import { setStatusUsers } from "../../redux/usersSlice/slice";
import { setStatusQueries } from "../../redux/queriesSlice/slice";
import { setStatusDirections } from "../../redux/directionsSlice/slice";
import { setStatusOrganizations } from "../../redux/organizationsSlice/slice";
import debounce from "lodash.debounce";
import { selectOrgStatus } from "../../redux/organizationsSlice/selectors";

export const QueryList: React.FC = memo(() => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const directions = useSelector(selectDirections);
  const directionsStatus = useSelector(selectStatusDirections);
  const queriesStatus = useSelector(selectStatusQueries);
  const dispatch = useAppDispatch();
  const { user_id } = useSelector(selectCurrentUser);
  const queriesTableData = useSelector(selectQueriesData);
  const selectedTag = useSelector(selectSelectedTag);
  const { searchValue, isArchive, isExpert } = useSelector(selectFilters);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (
      directionsStatus === Status.SUCCESS &&
      queriesStatus === Status.SUCCESS
    ) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [directionsStatus, queriesStatus]);

  const getColumns = () => [
    {
      title: "Номер",
      dataIndex: "id",
      key: "id",
      width: "5%",
      showSorterTooltip: false,
      sorter: (a: QueriesResponse, b: QueriesResponse) => a.id - b.id,
      align: "center",
    },
    {
      title: "Инициатива (Идея)",
      dataIndex: "name",
      key: "name",
      width: "60%",
    },
    {
      title: "Направление",
      dataIndex: "initiative_direction",
      key: "initiative_direction",
      width: "15%",
      render: (directionId: number) =>
        directions.length > 0 && getDirectionName(directionId, directions),
      filters: getDirections(directions).map((direction) => ({
        text: direction,
        value: direction,
      })),
      onFilter: (value: any, record: any) => record.name.includes(value),
    },
    {
      title: "Статус заявки",
      dataIndex: "status",
      key: "status",
      render: (text: string) => (
        <>
          {
            <span className={`${getStatusClassName(styles, text)}`}>
              {statusTranslation[text]}
            </span>
          }
        </>
      ),
      width: "15%",
      filters: getStatus(queriesTableData)?.map((status) => ({
        text: status,
        value: status,
      })),
      onFilter: (value: any, record: any) =>
        statusTranslation[record.status.includes(value)],
    },
  ];

  const fetchData = debounce(async () => {
    await dispatch(fetchDirections());
    await dispatch(fetchQueries());
  }, 2000);

  const fetchDataByName = useCallback(async () => {
    await dispatch(fetchQueriesByName({ value: searchValue }));
  }, [searchValue]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchDataByName();
  }, [searchValue]);

  const handleRowClick = (queryId: QueriesResponse) => {
    Cookies.set("queryId", String(queryId.id));
    router.push(`/queries/adminApplication?queryId=${queryId.id}`);
  };

  const getData = () => {
    if (isExpert && isArchive) {
      return queriesTableData?.filter(
        (query) =>
          (query.expert_users.includes(user_id) &&
            query.status === "rejected") ||
          query.status === "registered"
      );
    }
    if (isExpert) {
      return queriesTableData?.filter((query) =>
        query.expert_users.includes(user_id)
      );
    }
    if (isArchive) {
      return queriesTableData?.filter(
        (query) => query.status === "rejected" || query.status === "registered"
      );
    } else if (!isArchive) {
      return queriesTableData?.filter(
        (query) => query.status !== "rejected" && query.status !== "registered"
      );
    }
  };

  const handleRowClickIdea = (queryId: QueriesResponse) => {
    const isExpert = checkExpert(queryId);
    !isExpert
      ? router.push(`/queries/application?queryId=${queryId.id}`)
      : router.push(`/queries/expert?queryId=${queryId.id}`);
    dispatch(setStatusUsers(Status.WAITING));
    dispatch(setStatusQueries(Status.WAITING));
    dispatch(setStatusDirections(Status.WAITING));
    dispatch(setStatusOrganizations(Status.WAITING));
  };

  const handleCreateQuery = () => {
    router.push("/queries/create");
  };

  if (!isClient) {
    return;
  }

  return (
    <>
      {selectedTag === "Панель администратора" ? (
        <div className={styles.container}>
          <div className={styles.slider}>
            <Slider />
          </div>
          <div className={styles.content}>
            <div className={styles.headerContainer}>
              <Header />
            </div>
            <Tabs />
            <MainText text={"Инициативы"} />
            <div className={styles.infContainer}>
              <SearchBar
                placeholderNum={"Номер"}
                placeholderQuery={"Поиск по идеям"}
              />
              <div className={styles.filterContainer}>
                <FilterBar icon={<FilterOutlined />} filterText={"Фильтры"} />
                <CheckboxBar checkboxText={"Архив"} />
              </div>
            </div>
            <DataTable
              data={getData() as QueriesResponse[]}
              columns={getColumns()}
              isLoading={isLoading}
              onRowClick={handleRowClick}
            />
          </div>
        </div>
      ) : (
        <div className={styles.containerIdeas}>
          <div className={styles.contentIdeas}>
            <div className={styles.headerContainer}>
              <Header />
            </div>
            <div className={styles.header}>
              <div className={styles.logoHeader}>
                <Logo width={190} height={53} />
              </div>
              <div className={styles.tabs}>
                <Tabs />
              </div>
            </div>
            <MainText text={"Инициативы"} />
            <div className={styles.infContainer}>
              <SearchBar
                placeholderNum={"Номер"}
                placeholderQuery={"Поиск по идеям"}
                stylesSearch={styles.searchBar}
              />
              <div className={styles.btnHead}>
                <div className={styles.btnContainerFilt}>
                  <FilterBar
                    icon={<PlusCircleOutlined />}
                    filterText={"Создать идею"}
                    onClick={handleCreateQuery}
                  />
                  <CheckboxBar checkboxText={"Я эксперт"} />
                </div>
                <div className={styles.btnContainer}>
                  <CheckboxBar checkboxText={"Архив"} />
                </div>
              </div>
            </div>
            <DataTable
              columns={directions.length > 0 && getColumns()}
              data={getData() as QueriesResponse[]}
              onRowClick={handleRowClickIdea}
              isLoading={isLoading}
            />
          </div>
        </div>
      )}
    </>
  );
});
