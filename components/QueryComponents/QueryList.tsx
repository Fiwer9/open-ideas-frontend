import React, { memo, useCallback, useEffect, useState } from "react";

import styles from "./styles/QueryList.module.scss";
import { QueriesResponse } from "../../models/response/QueriesResponse";
import {
  checkExpert,
  getDirectionName,
  getStatusClassName,
  statusTranslation,
} from "../../utils/utils";
import { Slider } from "../SliderComponents/SliderComponents";
import { Header } from "../HeaderComponents/Header";
import { Tabs } from "../TabsComponent/Tabs";
import { MainText } from "../MainTextComponent";
import { DataTable } from "../TableComponent/Table";
import SearchBar from "../FilterComponents/blocks/SearchBar";
import FilterBar from "../FilterComponents/blocks/FilterBar";
import CheckboxBar from "../FilterComponents/blocks/CheckboxBar";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
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
import { fetchQueriesByName } from "../../redux/queriesSlice/asyncActions";
import { fetchDirections } from "../../redux/directionsSlice/asyncActions";
import { selectFilters } from "../../redux/filterSlice/selectors";
import { Status } from "../../redux/queriesSlice/types";

export const QueryList: React.FC = memo(() => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const directions = useSelector(selectDirections);
  const directionsStatus = useSelector(selectStatusDirections);
  const queriesStatus = useSelector(selectStatusQueries);
  const dispatch = useAppDispatch();
  const { user_id } = useSelector(selectCurrentUser);
  const queriesTableData = useSelector(selectQueriesData);

  const { searchValue, isArchive, isExpert } = useSelector(selectFilters);
  const [searchNumber, setSearchNumber] = useState("");

  useEffect(() => {
    if (
      directionsStatus === Status.LOADING ||
      queriesStatus === Status.LOADING
    ) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [directionsStatus, queriesStatus]);

  useEffect(() => {}, []);
  // useSearchNum(
  //   searchNumber,
  //   queriesTableData,
  //   QueriesService.getQueriesTableData,
  //   setIsLoading,
  //   setQueriesTableData
  // );
  // useSearchQuery(
  //   searchTerm,
  //   queriesTableData,
  //   QueriesService.getQueriesTableData,
  //   setIsLoading,
  //   setQueriesTableData
  // );
  const getDirections = () => [
    ...new Set(directions?.map((item) => item.name)),
  ];
  const getStatus = () => [
    ...new Set(queriesTableData?.map((item) => statusTranslation[item.status])),
  ];

  const getColumns = useCallback(
    () => [
      {
        title: "Номер",
        dataIndex: "id",
        key: "id",
        width: "5%",
        showSorterTooltip: false,
        sorter: (a: any, b: any) => a.id - b.id,
        onRow: (record: QueriesResponse) => ({
          onClick: () => handleRowClick(record.id),
        }),
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
          getDirectionName(directionId, directions),
        filters: getDirections().map((direction) => ({
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
        filters: getStatus()?.map((status) => ({
          text: status,
          value: status,
        })),
        onFilter: (value: any, record: any) =>
          statusTranslation[record.status.includes(value)],
      },
    ],
    []
  );

  useEffect(() => {
    dispatch(fetchDirections());
  }, []);

  useEffect(() => {
    dispatch(fetchQueriesByName({ value: searchValue }));
  }, [searchValue]);

  const handleRowClick = (queryId: any) => {
    Cookies.set("queryId", queryId.id);
    router.push(`/queries/adminApplication?queryId=${queryId.id}`);
  };

  const getData = () => {
    if (isExpert && isArchive) {
      return queriesTableData?.filter(
        (query) =>
          (query.expert_users.includes(Number(user_id)) &&
            query.status === "rejected") ||
          query.status === "registered"
      );
    }
    if (isExpert) {
      return queriesTableData?.filter((query) =>
        query.expert_users.includes(Number(user_id))
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

  const handleSearchNumberChange = (searchNum: any) => {
    setSearchNumber(searchNum);
  };

  const handleRowClickIdea = (queryId: any) => {
    Cookies.set("queryId", queryId.id);
    const isExpert = checkExpert(queryId, queriesTableData);
    !isExpert
      ? router.push(`/queries/application?queryId=${queryId.id}`)
      : router.push(`/queries/expert?queryId=${queryId.id}`);
  };

  const handleCreateQuery = () => {
    router.push("/queries/create");
  };

  return Cookies.get("selectedTag") === "Панель администратора" ? (
    <div className={styles.container}>
      <Slider />
      <div className={styles.content}>
        <Header />
        <Tabs />
        <MainText text={"Инициативы"} />
        <div className={styles.infContainer}>
          <SearchBar
            onSearchNumberChange={handleSearchNumberChange}
            placeholderNum={"Номер"}
            placeholderQuery={"Поиск по идеям"}
          />
          <FilterBar icon={<FilterOutlined />} filterText={"Фильтры"} />
          <CheckboxBar checkboxText={"Архив"} />
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
        <Header />
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
            onSearchNumberChange={handleSearchNumberChange}
            placeholderNum={"Номер"}
            placeholderQuery={"Поиск по идеям"}
          />
          <FilterBar
            icon={<PlusCircleOutlined />}
            filterText={"Создать идею"}
            onClick={handleCreateQuery}
          />
          <CheckboxBar checkboxText={"Я эксперт"} />
          <CheckboxBar checkboxText={"Архив"} />
        </div>
        <DataTable
          columns={getColumns()}
          data={getData() as QueriesResponse[]}
          onRowClick={handleRowClickIdea}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
});
