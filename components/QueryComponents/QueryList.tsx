import React, { useEffect, useState } from "react";

import styles from "./styles/QueryList.module.scss";
import { QueriesResponse } from "../../models/response/QueriesResponse";
import {
  getDirectionName,
  checkExpert,
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
import { fetchQueries } from "../../redux/queriesSlice/asyncActions";
import { fetchDirections } from "../../redux/directionsSlice/asyncActions";

export const QueryList = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isExpert, setIsExpert] = useState(false);
  const directions = useSelector(selectDirections);
  const directionsStatus = useSelector(selectStatusDirections);
  const queriesStatus = useSelector(selectStatusQueries);
  const dispatch = useAppDispatch();
  const [isArchive, setIsArchive] = useState(false);
  const { user_id } = useSelector(selectCurrentUser);
  const queriesTableData = useSelector(selectQueriesData);

  const data = queriesTableData;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchNumber, setSearchNumber] = useState("");

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
  const direct = [...new Set(directions?.map((item) => item.name))];
  const status = [
    ...new Set(queriesTableData?.map((item) => statusTranslation[item.status])),
  ];

  const columns = [
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
      filters: direct.map((direction) => ({
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
      filters: status?.map((status) => ({
        text: status,
        value: status,
      })),
      onFilter: (value: any, record: any) =>
        statusTranslation[record.status.includes(value)],
    },
  ];

  useEffect(() => {
    dispatch(fetchDirections());
    dispatch(fetchQueries({}));
  }, []);

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
    } else if (searchTerm) {
      return data.map((item) => item.name);
    } else if (searchNumber) {
      return data.map((item) => item.id);
    } else {
      return data;
    }
  };

  const handleSearchTermChange = (searchText: any) => {
    setSearchTerm(searchText);
  };

  const handleSearchNumberChange = (searchNum: any) => {
    setSearchNumber(searchNum);
  };

  const handleToggleArchive = (checked: any) => {
    setIsArchive(checked);
  };

  const handleToggleExpert = (checked: any) => {
    setIsExpert(checked);
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
            onSearchTermChange={handleSearchTermChange}
            onSearchNumberChange={handleSearchNumberChange}
            placeholderNum={"Номер"}
            placeholderQuery={"Поиск по идеям"}
          />
          <FilterBar icon={<FilterOutlined />} filterText={"Фильтры"} />
          <CheckboxBar
            onToggleArchive={handleToggleArchive}
            checkboxText={"Архив"}
          />
        </div>
        <DataTable
          data={queriesTableData}
          columns={columns}
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
            onSearchTermChange={handleSearchTermChange}
            onSearchNumberChange={handleSearchNumberChange}
            placeholderNum={"Номер"}
            placeholderQuery={"Поиск по идеям"}
          />
          <FilterBar
            icon={<PlusCircleOutlined />}
            filterText={"Создать идею"}
            onClick={handleCreateQuery}
          />
          <CheckboxBar
            onToggleArchive={handleToggleExpert}
            checkboxText={"Я эксперт"}
          />
          <CheckboxBar
            onToggleArchive={handleToggleArchive}
            checkboxText={"Архив"}
          />
        </div>
        <DataTable
          columns={columns}
          data={getData() as QueriesResponse[]}
          onRowClick={handleRowClickIdea}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};
