import React, { useEffect, useState } from "react";
import { Slider } from "../SliderComponents/SliderComponents";
import { Tabs } from "../TabsComponent/Tabs";
import { Header } from "../HeaderComponents/Header";
import { MainText } from "../MainTextComponent";
import SearchBar from "../FilterComponents/blocks/SearchBar";
import FilterBar from "../FilterComponents/blocks/FilterBar";
import { FilterOutlined } from "@ant-design/icons";
import router from "next/router";

import styles from "./styles/UsersList.module.scss";
import { DataTable } from "../TableComponent/Table";
import { fetchData, getOrganizationName } from "../../utils/utils";
import OrganizationsService from "../../services/OrganizationsService";
import { OrganizationsResponse } from "../../models/response/OrganizationsResponse";
import { useSelector } from "react-redux";
import { selectUsers } from "../../redux/usersSlice/selectors";
import { useAppDispatch } from "../../redux/store";
import {
  fetchUpdateUsers,
  fetchUsers,
} from "../../redux/usersSlice/asyncActions";
import { SliderSmall } from "../SliderComponents/SliderSmall";
import { fetchUsers } from "../../redux/usersSlice/asyncActions";

export const UsersList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const usersData = useSelector(selectUsers);
  const [organizations, setOrganizations] = useState<OrganizationsResponse[]>(
    [],
  );
  const getEmails = () => [...new Set(usersData?.map((user) => user.email))];
  const dispatch = useAppDispatch();
  const getNames = () => [...new Set(usersData?.map((user) => user.name))];
  const [searchTerm, setSearchTerm] = useState("");
  const [searchNumber, setSearchNumber] = useState("");
  const getOrganizationsFilter = () => [
    ...new Set(organizations?.map((organization) => organization.name)),
  ];
  const [domLoaded, setDomLoaded] = useState(false);
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
      filters: getEmails().map((email) => ({
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
        getOrganizationsFilter().map((organization) => ({
          text: organization,
          value: organization,
        })),
      onFilter: (value: any, record: any) =>
        record.organization.includes(value),
    },
  ];

  useEffect(() => {
    const delay = 3000;
    const fetchDataWithDelay = async () => {
      await new Promise((resolve) => setTimeout(resolve, delay));
      await dispatch(fetchUsers());
      await fetchData(
        setIsLoading,
        setOrganizations,
        OrganizationsService.getOrganizations,
      );
    };
    setIsLoading(true);
    fetchDataWithDelay();
    setIsLoading(false);
    setDomLoaded(true);
  }, []);

  const data = usersData.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    organization: user.department
      ? getOrganizationName(user.department.id, organizations) //TODO
      : "Не назначено",
  }));
  const handleRowClick = (user: any) => {
    router.push(`/users/userCard?userId=${user.id}`);
  };

  return (
    <>
      {domLoaded && (
        <div className={styles.container}>
          <div className={styles.slider}>
            <Slider />
          </div>
          <div className={styles.content}>
            <div className={styles.headerContainer}>
              <Header />
            </div>
            <Tabs />
            <MainText text={"Пользователи"} />
            <div className={styles.infContainer}>
              <SearchBar
                placeholderNum={"Номер"}
                placeholderQuery={"Поиск по пользователям"}
              />
              <div className={styles.filter}>
                <FilterBar icon={<FilterOutlined />} filterText={"Фильтры"} />
              </div>
            </div>
            <DataTable
              data={data}
              columns={columns}
              isLoading={isLoading}
              onRowClick={handleRowClick}
            />
          </div>
          <div className={styles.sliderSmall}>
            <SliderSmall />
          </div>
        </div>
      )}
    </>
  );
};
