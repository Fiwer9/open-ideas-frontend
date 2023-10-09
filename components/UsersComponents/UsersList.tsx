import React from "react";
import { Slider } from "../SliderComponents/SliderComponents";
import { Tabs } from "../TabsComponent/Tabs";
import { Header } from "../HeaderComponents/Header";
import { MainText } from "../MainTextComponent";
import SearchBar from "../FilterComponents/blocks/SearchBar";
import FilterBar from "../FilterComponents/blocks/FilterBar";
import { Table } from "antd";
import router from "next/router";

import styles from "./styles/UsersList.module.scss";


export const UsersList = () => {
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
      filters: [],
    },
    {
      title: 'Почта',
      dataIndex: 'email',
      key: 'email',
      width: "20%",
      filters: [],
    },
    {
      title: 'Организация',
      dataIndex: 'organization',
      key: 'organization',
      width: "20%",
      filters: [],
    },
  ];

  const dataSource = [
    {
      id: '1',
      name: 'Иванов Иван Иванович',
      email: 'example@mail.ru',
      organization: 'Aratrum',
    },
    {
      id: '2',
      name: 'Иванов Иван Иванович',
      email: 'example@mail.ru',
      organization: 'Aratrum',
    },
    {
      id: '3',
      name: 'Иванов Иван Иванович',
      email: 'example@mail.ru',
      organization: 'Aratrum',
    },
    {
      id: '4',
      name: 'Иванов Иван Иванович',
      email: 'example@mail.ru',
      organization: 'Aratrum',
    },
  ];

  return (
    <>
      <div className={styles.container}>
        <Slider/>
        <div className={styles.content}>
          <Header user_name={'Иванов Иван Иванович'} organization={'Aratrum'} department={'Отдел'}/>
          <Tabs />
          <MainText text={'Пользователи'}/>
          <div className={styles.infContainer}>
            <SearchBar placeholderNum={'Номер'}
                       placeholderQuery={'Поиск по идеям'}/>
            <FilterBar filterText={'Фильтры'}/>
          </div>
          <Table
            className={styles.table}
            columns={columns}
            dataSource={dataSource}
            onRow={() => ({
              onClick: () => {
                router.push('/users/userCard');
              },
            })}
            rowKey="id"
            bordered
          />
        </div>
      </div>
    </>
  );
};
