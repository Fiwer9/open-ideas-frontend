import React from 'react';
import styles from './styles/IdeasList.module.scss';
import { Header } from "../HeaderComponents/Header";
import { Tabs } from "../TabsComponent/Tabs";
import { MainText } from "../MainTextComponent";
import SearchBar from "../FilterComponents/blocks/SearchBar";
import FilterBar from "../FilterComponents/blocks/FilterBar";
import CheckboxBar from "../FilterComponents/blocks/CheckboxBar";
import { PlusCircleOutlined } from "@ant-design/icons";
import router from "next/router";
import { Table } from "antd";
import { Logo } from "../PicturesComponents/Logo";

export const IdeasList = () => {
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
      title: 'Инициатива (Идея)',
      dataIndex: 'initiative',
      key: 'initiative',
      width: "60%",
      filters: [],
    },
    {
      title: 'Направление',
      dataIndex: 'direction',
      key: 'direction',
      width: "15%",
      filters: [],
    },
    {
      title: 'Статус заявки',
      dataIndex: 'status',
      key: 'status',
      width: "15%",
      filters: [],
    },
  ];

  const dataSource = [
    {
      id: '1',
      initiative: 'Сделать так, чтобы не скрипела дверь в кабинете 203',
      direction: 'Рабочее пространство',
      status: 'Заявка отклонена',
    },
    {
      id: '2',
      initiative: 'Нужно, чтобы был диван на третьем этаже',
      direction: 'Рабочее пространство',
      status: 'Инициатива реализована',
    },
    {
      id: '3',
      initiative: 'Закупить больше сканеров, для ускорения работы',
      direction: 'Технологические процессы',
      status: 'Заявка отклонена',
    },
    {
      id: '4',
      initiative: 'Сделать ремонт в кабинете 102',
      direction: 'Рабочее пространство',
      status: 'Инициатива реализована',
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header user_name={'Иванов Иван Иванович'} organization={'Aratrum'} department={'Отдел'}/>
        <div className={styles.header}>
          <div className={styles.logoHeader}>
            <Logo width={190} height={53} />
          </div>
          <div className={styles.tabs}>
            <Tabs />
          </div>
        </div>
        <MainText text={'Инициативы'}/>
        <div className={styles.infContainer}>
          <SearchBar
                     placeholderNum={'Номер'}
                     placeholderQuery={'Поиск по идеям'}/>
          <FilterBar icon={<PlusCircleOutlined />} filterText={'Создать идею'}/>
          <CheckboxBar checkboxText={'Я эксперт'}/>
          <CheckboxBar checkboxText={'Архив'}/>
        </div>
        <Table
          className={styles.table}
          columns={columns}
          dataSource={dataSource}
          onRow={() => ({
            onClick: () => {
              router.push('queries/application');
            },
          })}
          rowKey="id"
          bordered
        />
      </div>
    </div>
  );
};
