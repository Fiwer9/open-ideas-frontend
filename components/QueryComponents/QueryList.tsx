"use client";

import React, { memo, useEffect, useMemo, useState } from "react";

import { useRouter } from "next/router";

import { PlusCircleOutlined } from "@ant-design/icons";

import { useSelector } from "react-redux";

import {
  QueriesResponse,
  QueryStatus,
} from "../../models/response/QueriesResponse";
import {
  getDirectionName,
  getDirections,
  getStatus,
  getStatusClassName,
  statusTranslation,
} from "../../utils/utils";
import { MainText } from "../MainTextComponent";
import { DataTable } from "../TableComponent/Table";
import FilterBar from "../FilterComponents/blocks/FilterBar";
import FilterCheckboxBar from "../FilterComponents/blocks/FilterCheckboxBar";
import SearchBar from "../FilterComponents/blocks/SearchBar";

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
  fetchQueries,
  fetchQueriesByName,
} from "../../redux/queriesSlice/asyncActions";
import { fetchDirections } from "../../redux/directionsSlice/asyncActions";
import { selectFilters } from "../../redux/filterSlice/selectors";
import { Status } from "../../redux/queriesSlice/types";
import { TABLE_PAGE_KEYS } from "../../utils/tablePaginationStorage";
import { selectSelectedTag } from "../../redux/menuSlice/selectors";
import { setPageId, setPageName } from "../../redux/menuSlice/slice";

import {
  getQueryFilterByArchive,
  getQueryFilterByExpert,
} from "../../utils/getQueryFilter";
import ModalDrafts from "../ModalsComponents/ModalDrafts";
import Modal from "../ModalsComponents/Modal";
import AdminPageLayout from "../AdminPageLayout";
import FilterContainer from "../../containers/FilterContainer";
import PageLayout from "../PageLayout";

import styles from "./styles/QueryList.module.scss";

const EMPTY_TABLE_MESSAGE = "Тут ещё нет идей";

export const QueryList = () => {
  const router = useRouter();
  const directions = useSelector(selectDirections);
  const directionsStatus = useSelector(selectStatusDirections);
  const queriesStatus = useSelector(selectStatusQueries);
  const dispatch = useAppDispatch();
  const { user_id } = useSelector(selectCurrentUser);
  const queriesTableData = useSelector(selectQueriesData);
  const selectedTag = useSelector(selectSelectedTag);
  const { searchValue, isArchive, isExpert } = useSelector(selectFilters);
  const [isClient, setIsClient] = useState(false);
  const [modalDrafts, setModalDrafts] = useState(false);
  const [modalCreateQuery, setModalCreateQuery] = useState(false);

  const closeModal = () => {
    setModalDrafts(false);
    setModalCreateQuery(false);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    dispatch(fetchDirections());
  }, [dispatch]);

  useEffect(() => {
    if (searchValue.trim()) {
      dispatch(fetchQueriesByName({ value: searchValue }));
      return;
    }

    dispatch(fetchQueries({}));
  }, [dispatch, searchValue]);

  const tableData = useMemo(() => {
    if (isExpert && isArchive) {
      return queriesTableData.filter(
        (query) =>
          (query.expert_users?.includes(user_id) &&
            query.status === QueryStatus.REJECTED) ||
          query.status === QueryStatus.DONE
      );
    }

    if (isExpert) {
      return getQueryFilterByExpert(queriesTableData, isExpert, user_id);
    }

    return getQueryFilterByArchive(queriesTableData, isArchive);
  }, [isArchive, isExpert, queriesTableData, user_id]);

  const isQueriesPending =
    queriesStatus === Status.LOADING || queriesStatus === Status.WAITING;
  const isDirectionsPending =
    directionsStatus === Status.LOADING || directionsStatus === Status.WAITING;
  const showLoading =
    !isClient || isQueriesPending || isDirectionsPending;
  const emptyTableMessage =
    !showLoading &&
    queriesStatus === Status.SUCCESS &&
    directionsStatus === Status.SUCCESS &&
    tableData.length === 0
      ? EMPTY_TABLE_MESSAGE
      : "";

  const getColumns = () => [
    {
      title: "Номер",
      dataIndex: "id",
      key: "id",
      width: "5%",
      showSorterTooltip: false,
      sorter: (a: QueriesResponse, b: QueriesResponse) =>
        (a.id ?? 0) - (b.id ?? 0),
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
        text: direction.name,
        value: direction.id,
      })),
      onFilter: (value: number, record: QueriesResponse) =>
        record.initiative_direction === value,
    },
    {
      title: "Статус заявки",
      dataIndex: "status",
      key: "status",
      render: (text: QueryStatus) => (
        <span className={`${getStatusClassName(styles, text)}`}>
          {statusTranslation[text]}
        </span>
      ),
      width: "15%",
      filters: getStatus(queriesTableData)?.map((status) => ({
        text: status,
        value: status,
      })),
      onFilter: (value: any, record: any) => {
        return statusTranslation[record.status] === value;
      },
    },
  ];

  const handleRowClick = (query: QueriesResponse) => {
    if (!query.id) {
      return;
    }

    dispatch(setPageName(query.name));
    dispatch(setPageId(query.id));
    router.push(`/queries/adminApplication?queryId=${query.id}`);
  };

  const handleRowClickIdea = (query: QueriesResponse) => {
    if (!query.id) {
      return;
    }

    dispatch(setPageName(query.name));
    dispatch(setPageId(query.id));
    router.push(`/queries/application?queryId=${query.id}`);
  };

  return (
    <>
      {selectedTag === "Панель администратора" ? (
        <AdminPageLayout>
          <MainText text={"Инициативы"} />
          <FilterContainer placeholder={"Поиск по идеям"} />
          <DataTable
            data={tableData}
            columns={getColumns()}
            isLoading={showLoading}
            onRowClick={handleRowClick}
            locale={emptyTableMessage}
            paginationStorageKey={TABLE_PAGE_KEYS.QUERIES_ADMIN}
          />
        </AdminPageLayout>
      ) : (
        <PageLayout>
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
                  onClick={() => {
                    setModalCreateQuery(true);
                  }}
                />
                <FilterBar
                  filterText={"Мои черновики"}
                  onClick={() => {
                    setModalDrafts(true);
                  }}
                />
                <FilterCheckboxBar checkboxText={"Я эксперт"} />
              </div>
              <div className={styles.btnContainer}>
                <FilterCheckboxBar checkboxText={"Архив"} />
              </div>
            </div>
          </div>
          <DataTable
            columns={getColumns()}
            data={tableData}
            onRowClick={handleRowClickIdea}
            isLoading={showLoading}
            locale={emptyTableMessage}
            paginationStorageKey={TABLE_PAGE_KEYS.QUERIES}
          />
          <Modal
            active={modalCreateQuery}
            setActive={setModalCreateQuery}
            text1={"Создание идеи"}
            text2={
              "Ранее вы создавали идею, хотите продолжить заполнение старой или создать новую?"
            }
            classNameBtn1={styles.btnWhite}
            textBtn1={"Создать новую"}
            classNameBtn2={styles.btnBlue}
            textBtn2={"Мои черновики"}
            onClick1={() => router.push("/queries/create")}
            onClick2={() => {
              setModalDrafts(true);
              setModalCreateQuery(false);
            }}
          />
          <ModalDrafts
            active={modalDrafts}
            setActive={setModalDrafts}
            text={"Мои черновики"}
            classNameBtn={styles.btnBlueBorder}
            textBtn={"Назад"}
            onClick={closeModal}
          />
        </PageLayout>
      )}
    </>
  );
};
