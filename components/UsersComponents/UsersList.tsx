import React, {useEffect, useState} from "react";
import { Slider } from "../SliderComponents/SliderComponents";
import { Tabs } from "../TabsComponent/Tabs";
import { Header } from "../HeaderComponents/Header";
import { MainText } from "../MainTextComponent";
import SearchBar from "../FilterComponents/blocks/SearchBar";
import FilterBar from "../FilterComponents/blocks/FilterBar";
import { FilterOutlined } from "@ant-design/icons";
import router from "next/router";

import styles from "./styles/UsersList.module.scss";
import {DataTable} from "../TableComponent/Table";
import {fetchData, getDirectionTranslationOnEng, getOrganizationName} from "../../utils/utils";
import UsersService from "../../services/UsersService";
import {UsersUpdateResponse} from "../../models/response/UsersUpdateResponse";
import OrganizationsService from "../../services/OrganizationsService";
import {OrganizationsResponse} from "../../models/response/OrganizationsResponse";
import {useSearchNum} from "../../hooks/useSearchNum";
import {useSearchQuery} from "../../hooks/useSearchQuery";


export const UsersList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [usersData, setUsersData] = useState<UsersUpdateResponse[]>([])
  const [organizations, setOrganizations] = useState<OrganizationsResponse[]>([])
  const emails = [...new Set(usersData.map((user) => user.email))];
  const names = [...new Set(usersData.map((user) => user.name))];
  const [searchTerm, setSearchTerm] = useState('');
  const [searchNumber, setSearchNumber] = useState('');
  const organizationsFilter = [...new Set(organizations.map((organization) => organization.name))];
  const columns: any = [
    {
      title: 'Номер',
      dataIndex: 'id',
      key: 'id',
      width: "5%",
      showSorterTooltip: false,
      sorter: (a: any, b: any) => a.id - b.id,
      align: "center",
    },
    {
      title: 'Ф.И.О.',
      dataIndex: 'name',
      key: 'name',
      width: "50%",
      filters: names.map((name) => ({
        text: name,
        value: name,
      })),
      onFilter: (value: any, record: any) => record.name.includes(value),
    },
    {
      title: 'Почта',
      dataIndex: 'email',
      key: 'email',
      width: "20%",
      filters: emails.map((email) => ({
        text: email,
        value: email,
      })),
      onFilter: (value: any, record: any) => record.email.includes(value),
    },
    {
      title: 'Организация',
      dataIndex: 'organization',
      key: 'organization',
      width: "20%",
      filters: organizationsFilter.map((organization) => ({
        text: organization,
        value: organization,
      })),
      onFilter: (value: any, record: any) => record.organization.includes(value),
    },
  ];

  useEffect(() => {
    const delay = 3000;
    const fetchDataWithDelay = async () => {
      await new Promise(resolve => setTimeout(resolve, delay));
      fetchData(setIsLoading, setUsersData, UsersService.getUsersUpdate);
      fetchData(setIsLoading, setOrganizations, OrganizationsService.getOrganizations);
    };
    setIsLoading(true)
    fetchDataWithDelay();
    setIsLoading(false)
  }, []);

  const getData = () => {
    for (let user of usersData) {
      user.organization = getOrganizationName(user.department.organization, organizations);
    }

    return usersData;
  }

  const handleRowClick = (queryId: any) => {
    router.push('/users/userCard')
  };

  const handleSearchTermChange = (searchText: any) => {
    setSearchTerm(searchText);
  };

  const handleSearchNumberChange = (searchNum: any) => {
    setSearchNumber(searchNum);
  };

  useSearchNum(searchNumber, usersData, UsersService.getUsersUpdate, setIsLoading, setUsersData)
  useSearchQuery(searchTerm, usersData, UsersService.getUsersUpdate, setIsLoading, setUsersData)


  return (
    <>
      <div className={styles.container}>
        <Slider/>
        <div className={styles.content}>
          <Header user_name={'Иванов Иван Иванович'} organization={'Aratrum'} department={'Отдел'}/>
          <Tabs />
          <MainText text={'Пользователи'}/>
          <div className={styles.infContainer}>
            <SearchBar
              onSearchTermChange={handleSearchTermChange}
              onSearchNumberChange={handleSearchNumberChange}
              placeholderNum={'Номер'}
              placeholderQuery={'Поиск по пользователям'}/>
            <FilterBar icon={<FilterOutlined />} filterText={'Фильтры'}/>
          </div>
          <DataTable
            data={getData()}
            columns={columns}
            isLoading={isLoading}
            onRowClick={handleRowClick}
          />
        </div>
      </div>
    </>
  );
};
