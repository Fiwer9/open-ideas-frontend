import React, { useCallback, useEffect, useMemo, useState } from "react";

import { Alert, Table } from "antd";

import Image from "next/image";

import { FilterOutlined } from "@ant-design/icons";

import { useSelector } from "react-redux";



import { MainText } from "../MainTextComponent";

import SearchBar from "../FilterComponents/blocks/SearchBar";

import FilterBar from "../FilterComponents/blocks/FilterBar";

import AdminPageLayout from "../AdminPageLayout";

import PageLayout from "../PageLayout";

import FilterContainer from "../../containers/FilterContainer";

import { selectSelectedTag } from "../../redux/menuSlice/selectors";

import { selectSearchValue } from "../../redux/filterSlice/selectors";

import { selectOrganizations, selectDepartments } from "../../redux/organizationsSlice/selectors";

import {

  selectRatingEmployees,

  selectRatingErrorMessage,

  selectRatingStatus,

} from "../../redux/ratingSlice/selectors";

import { setSearchValue } from "../../redux/filterSlice/slice";

import { useAppDispatch } from "../../redux/store";

import {

  fetchRatingList,

  fetchRatingUserDetails,

} from "../../redux/ratingSlice/asyncActions";

import { fetchOrganizations, fetchDepartments } from "../../redux/organizationsSlice/asyncActions";

import { Status } from "../../redux/queriesSlice/types";

import { buildRatingRequestParams } from "../../utils/buildRatingRequestParams";

import { usePersistedTablePage } from "../../hooks/usePersistedTablePage";
import { TABLE_PAGE_KEYS } from "../../utils/tablePaginationStorage";



import { RatingFiltersModal } from "./RatingFiltersModal";

import { RatingUserCompactCard } from "./RatingUserCompactCard";

import { RatingUserExpandedModal } from "./RatingUserExpandedModal";

import {

  EmployeeRecord,

  emptyRatingFilters,

  RatingFilters,

} from "./ratingTypes";



import styles from "./styles/RatingList.module.scss";



const getRankIconSrc = (rank: number) =>

  `/img/ranks/rank-${Math.min(Math.max(rank, 1), 5)}.png`;



export const RatingList = () => {

  const dispatch = useAppDispatch();

  const selectedTag = useSelector(selectSelectedTag);

  const searchValue = useSelector(selectSearchValue);

  const organizations = useSelector(selectOrganizations);

  const departments = useSelector(selectDepartments);

  const employees = useSelector(selectRatingEmployees);

  const ratingStatus = useSelector(selectRatingStatus);

  const ratingErrorMessage = useSelector(selectRatingErrorMessage);



  const [isClient, setIsClient] = useState(false);

  const [expandedEmployee, setExpandedEmployee] = useState<EmployeeRecord | null>(

    null

  );

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const [appliedFilters, setAppliedFilters] =

    useState<RatingFilters>(emptyRatingFilters);

  const [draftFilters, setDraftFilters] =

    useState<RatingFilters>(emptyRatingFilters);

  const [hoveredEmployee, setHoveredEmployee] = useState<EmployeeRecord | null>(

    null

  );

  const [hoverPosition, setHoverPosition] = useState<{

    x: number;

    y: number;

  } | null>(null);

  const [isDetailsLoading, setIsDetailsLoading] = useState(false);

  const { currentPage, handlePageChange } = usePersistedTablePage(
    TABLE_PAGE_KEYS.RATING
  );



  const organizationsList = Array.isArray(organizations) ? organizations : [];

  const departmentsList = Array.isArray(departments) ? departments : [];

  const filterOptions = useMemo(

    () => ({

      organizations: organizationsList.map((organization) => organization.name),

      departments: departmentsList.map((department) => department.name),

    }),

    [organizationsList, departmentsList]

  );



  const loadRating = useCallback(() => {

    const params = buildRatingRequestParams({

      filters: appliedFilters,

      searchValue,

      organizations: organizationsList,

      departments: departmentsList,

    });



    dispatch(

      fetchRatingList({

        params,

        filters: appliedFilters,

      })

    );

  }, [appliedFilters, departmentsList, dispatch, organizationsList, searchValue]);



  useEffect(() => {

    setIsClient(true);

    dispatch(setSearchValue(""));

    dispatch(fetchOrganizations());

    dispatch(fetchDepartments({}));

  }, [dispatch]);



  useEffect(() => {

    if (!isClient) {

      return;

    }



    loadRating();

  }, [isClient, loadRating]);



  const openFilterModal = () => {

    setDraftFilters(appliedFilters);

    setIsFilterModalOpen(true);

  };



  const closeFilterModal = () => {

    setIsFilterModalOpen(false);

  };



  const handleSaveFilters = () => {

    setAppliedFilters(draftFilters);

    closeFilterModal();

  };



  const handleResetFilters = () => {

    setDraftFilters(emptyRatingFilters);

  };



  const handleEmployeeClick = async (record: EmployeeRecord) => {

    setExpandedEmployee(record);

    setIsDetailsLoading(true);



    try {

      const detailedEmployee = await dispatch(

        fetchRatingUserDetails({ employee: record })

      ).unwrap();

      setExpandedEmployee(detailedEmployee);

    } catch {

      setExpandedEmployee(record);

    } finally {

      setIsDetailsLoading(false);

    }

  };



  const handleRowHover = (

    record: EmployeeRecord | null,

    event: React.MouseEvent<HTMLTableRowElement> | null

  ) => {

    if (!record || !event) {

      setHoveredEmployee(null);

      setHoverPosition(null);

      return;

    }



    const row = event.currentTarget;

    const rect = row.getBoundingClientRect();

    const offsetX = 16;

    const cardWidth = 300;

    const x = Math.min(

      event.clientX + offsetX,

      window.innerWidth - cardWidth - offsetX

    );

    const y = rect.top + rect.height / 2;



    setHoveredEmployee(record);

    setHoverPosition({ x, y });

  };



  const columns: any = [

    {

      title: "Номер",

      dataIndex: "id",

      key: "id",

      width: "8%",

      align: "center",

      sorter: (a: EmployeeRecord, b: EmployeeRecord) => a.id - b.id,

    },

    {

      title: "Ранг",

      dataIndex: "rank",

      key: "rank",

      width: "10%",

      align: "center",

      sorter: (a: EmployeeRecord, b: EmployeeRecord) => a.rank - b.rank,

      render: (rank: number) => (

        <Image

          src={getRankIconSrc(rank)}

          alt={`Ранг ${rank}`}

          width={28}

          height={28}

          className={styles.rate}

        />

      ),

    },

    {

      title: "Сотрудник",

      dataIndex: "employee",

      key: "employee",

      width: "35%",

      render: (text: string) => <span className={styles.employeeName}>{text}</span>,

    },

    {

      title: "Организация",

      dataIndex: "organization",

      key: "organization",

      width: "15%",

      align: "center",

    },

    {

      title: "Всего инициатив",

      dataIndex: "total",

      key: "total",

      width: "16%",

      align: "center",

      sorter: (a: EmployeeRecord, b: EmployeeRecord) => a.total - b.total,

    },

    {

      title: "Инициатив реализовано",

      dataIndex: "completed",

      key: "completed",

      width: "16%",

      align: "center",

      sorter: (a: EmployeeRecord, b: EmployeeRecord) => a.completed - b.completed,

    },

  ];



  const isRatingLoading = ratingStatus === Status.LOADING;



  const isTableLoading = !isClient || isRatingLoading;



  const ratingTable = (

    <>

      {ratingErrorMessage && (

        <Alert

          type="error"

          showIcon

          message={ratingErrorMessage}

          style={{ marginBottom: 16 }}

        />

      )}

      <div
        className={`${styles.tableWrapper} ${
          isTableLoading ? styles.tableWrapperLoading : ""
        }`}
        style={{ "--table-rows": 10 } as React.CSSProperties}
      >

        <Table

          className={styles.table}

          columns={columns}

          dataSource={employees}

          rowKey="id"

          bordered

          loading={isTableLoading}

          onRow={(record) => ({

            onClick: () => handleEmployeeClick(record),

            onMouseEnter: (event) => handleRowHover(record, event),

            onMouseLeave: () => handleRowHover(null, null),

            className: styles.tableRow,

          })}

          locale={{ emptyText: ratingErrorMessage ?? "Нет данных" }}

          pagination={{

            current: currentPage,

            pageSize: 10,

            position: ["bottomLeft"],

            showSizeChanger: false,

            showTotal: (total, range) =>

              `Показано ${range[0]}-${range[1]} из ${total}`,

            onChange: handlePageChange,

          }}

        />

        {hoveredEmployee && hoverPosition && !isDetailsLoading && (

          <div

            className={styles.hoverCardPopup}

            style={{

              left: hoverPosition.x,

              top: hoverPosition.y,

            }}

          >

            <RatingUserCompactCard employee={hoveredEmployee} />

          </div>

        )}

      </div>

    </>

  );



  const modals = (

    <>

      <RatingUserExpandedModal

        employee={expandedEmployee}

        open={!!expandedEmployee}

        onClose={() => setExpandedEmployee(null)}

        isLoading={isDetailsLoading}

      />

      <RatingFiltersModal

        open={isFilterModalOpen}

        draftFilters={draftFilters}

        organizations={filterOptions.organizations}

        departments={filterOptions.departments}

        onClose={closeFilterModal}

        onSave={handleSaveFilters}

        onReset={handleResetFilters}

        onChange={setDraftFilters}

      />

    </>

  );



  const content = (

    <>

      {ratingTable}

      {modals}

    </>

  );



  if (selectedTag === "Панель администратора") {

    return (

      <AdminPageLayout>

        <MainText text="Рейтинг" />

        <FilterContainer

          placeholder="Поиск по сотруднику"

          onFiltersClick={openFilterModal}

        />

        {content}

      </AdminPageLayout>

    );

  }



  return (

    <PageLayout>

      <MainText text="Рейтинг" />

      <div className={styles.infContainer}>

        <SearchBar

          placeholderNum="Номер"

          placeholderQuery="Поиск по сотруднику"

        />

        <FilterBar

          icon={<FilterOutlined />}

          filterText="Фильтры"

          onClick={openFilterModal}

        />

      </div>

      {content}

    </PageLayout>

  );

};

