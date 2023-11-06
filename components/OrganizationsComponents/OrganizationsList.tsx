import React, { useState } from "react";
import { Header } from "../HeaderComponents/Header";
import { Tabs } from "../TabsComponent/Tabs";
import { MainText } from "../MainTextComponent";
import SearchBar from "../FilterComponents/blocks/SearchBar";
import FilterBar from "../FilterComponents/blocks/FilterBar";
import { Slider } from "../SliderComponents/SliderComponents";
import { FilterOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Table, Form, Input } from "antd";

import styles from './styles/OrganizationsList.module.scss';
import router from "next/router";
import Modal from "../ModalsComponents/Modal";

function ContentModal() {
  return <div className={styles.contentMod}>
            <Form.Item>
              <Input placeholder={"Напишите название организации"} className={styles.inp} />
            </Form.Item>
            <Form.Item>
              <Input placeholder={"Напишите название отдела"} className={styles.inp}/>
            </Form.Item>
            <Form.Item>
              <FilterBar icon={<PlusCircleOutlined />} filterText={'Добавить отдел'}/>
            </Form.Item>
          </div>;
}

export const OrganizationsList = () => {
  const [modalActive, setModalActive] = useState(false);
  const layout = <ContentModal />;

  const closeModal = () => {
    setModalActive(false);
  };

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
    <>
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
            <FilterBar icon={<PlusCircleOutlined />} filterText={'Добавить организацию'} onClick={() => {
              setModalActive(true);
            }} />
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

      <Modal
        active={modalActive} setActive={setModalActive}
        text1={"Добавить организацию"}
        classNameBtn1={styles.btnWhite}
        textBtn1={"Назад"}
        classNameBtn2={styles.btnBlue}
        textBtn2={"Добавить организацию"}
        onClick1={closeModal}
        onClick2={() => router.push('/organizations')}
        stylesContentModal={styles.contentModal}
        layout={layout}
      />
    </>
  );
};
