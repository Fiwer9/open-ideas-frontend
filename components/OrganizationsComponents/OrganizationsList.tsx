import React from 'react';
import { Header } from "../HeaderComponents/Header";
import { Tabs } from "../TabsComponent/Tabs";
import { MainText } from "../MainTextComponent";
import SearchBar from "../FilterComponents/blocks/SearchBar";
import FilterBar from "../FilterComponents/blocks/FilterBar";
import { Slider } from "../SliderComponents/SliderComponents";
import { FilterOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Table } from "antd";

import styles from './styles/OrganizationsList.module.scss';

export const OrganizationsList = () => {
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
      title: 'Организация',
      dataIndex: 'organization',
      key: 'organization',
      filters: [],
    },
  ];

  const dataSource = [
    {
      id: '1',
      organization: 'РусГидро',
    },
    {
      id: '2',
      organization: 'РусГидро',
    },
    {
      id: '3',
      organization: 'РусГидро',
    },
    {
      id: '4',
      organization: 'РусГидро',
    },
  ];

  return (
    <div className={styles.container}>
      <Slider/>
      <div className={styles.content}>
        <Header user_name={'Иванов Иван Иванович'} organization={'Aratrum'} department={'Отдел'}/>
        <Tabs />
        <MainText text={'Организация и отделы'}/>
        <div className={styles.infContainer}>
          <SearchBar
            placeholderNum={'Номер'}
            placeholderQuery={'Поиск по организация'}/>
          <FilterBar icon={<PlusCircleOutlined />} filterText={'Добавить организацию'}/>
          <FilterBar icon={<FilterOutlined />} filterText={'Фильтры'}/>
        </div>
        <Table
          className={styles.table}
          columns={columns}
          dataSource={dataSource}
          rowKey="id"
          bordered
        />
      </div>
    </div>
  );
};
