import React, { memo, useEffect, useState } from "react";
import router from "next/router";

import { useSelector } from "react-redux";

import debounce from "lodash.debounce";

import {
  getEmails,
  getOrganizationName,
  getOrganizationsFilter,
} from "../../utils/utils";
import {
  selectUsers,
  selectUsersStatus,
} from "../../redux/usersSlice/selectors";
import { useAppDispatch } from "../../redux/store";
import {
  fetchUsers,
  fetchUsersByName,
} from "../../redux/usersSlice/asyncActions";


import { fetchOrganizations } from "../../redux/organizationsSlice/asyncActions";
import { selectFilters } from "../../redux/filterSlice/selectors";
import {
  selectOrganizations,
  selectOrgStatus,
} from "../../redux/organizationsSlice/selectors";
import { Status } from "../../redux/queriesSlice/types";
import FilterContainer from "../../containers/FilterContainer";
import AdminPageLayout from "../../components/AdminPageLayout";
import { DataTable } from "../../components/TableComponent/Table";
import { MainText } from "../../components/MainTextComponent";

const UsersList: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const usersData = useSelector(selectUsers);
  const organizations = useSelector(selectOrganizations);
  const organizationsStatus = useSelector(selectOrgStatus);
  const usersStatus = useSelector(selectUsersStatus);
  const dispatch = useAppDispatch();
  const { searchValue } = useSelector(selectFilters);

  useEffect(() => {
    if (
      organizationsStatus === Status.SUCCESS &&
      usersStatus === Status.SUCCESS
    ) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [organizationsStatus, usersStatus]);
  const columns: any = [
    {
      title: "Номер",
      dataIndex: "id",
      key: "id",
      width: "5%",
      showSorterTooltip: false,
      sorter: (a: any, b: any) => a.id - b.id,
      align: "center",
    },
    {
      title: "Ф.И.О.",
      dataIndex: "name",
      key: "name",
      width: "50%",
    },
    {
      title: "Почта",
      dataIndex: "email",
      key: "email",
      width: "20%",
      filters:
        usersData.length > 0 &&
        getEmails(usersData).map((email) => ({
          text: email,
          value: email,
        })),
      onFilter: (value: any, record: any) => record.email.includes(value),
    },
    {
      title: "Организация",
      dataIndex: "organization",
      key: "organization",
      width: "20%",
      filters:
        organizations.length > 0 &&
        getOrganizationsFilter(organizations).map((organization) => ({
          text: organization,
          value: organization,
        })),
      onFilter: (value: any, record: any) =>
        record.organization.includes(value),
    },
  ];

  const fetchData = debounce(async () => {
    await dispatch(fetchUsers());
    await dispatch(fetchOrganizations());
  }, 2000);

  const fetchDataByName = async () => {
    await dispatch(fetchUsersByName({ value: searchValue }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchDataByName();
  }, [searchValue]);

  const getData = () =>
    usersData.length > 0 &&
    usersData?.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      organization: user.department
        ? getOrganizationName(user.department.id, organizations)
        : "Не назначено",
    }));

  const handleRowClick = (user: any) => {
    router.push(`/users/userCard?userId=${user.id}`);
  };

  return (
    <AdminPageLayout>
      <MainText text={"Пользователи"} />
      <FilterContainer
        placeholder={"Поиск по пользователям"}
        downloadBtn={true}
      />
      <DataTable
        data={getData()}
        columns={columns}
        isLoading={isLoading}
        onRowClick={handleRowClick}
        locale={"Ещё нет пользователей"}
      />
    </AdminPageLayout>
  );
};

export default memo(UsersList);
