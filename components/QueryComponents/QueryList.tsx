import React from "react";
import {Checkbox, Table, Button} from "antd";
import {InputPattern} from "../InputComponent/Input";
import {Buttons} from "../ButtonComponent/Button";

import styles from "./styles/QueryList.module.scss";
import router from "next/router";
import type { ColumnsType } from 'antd/es/table';

interface DataType {
    key: React.Key;
    number: number;
    initiative: string;
    direction: string;
    organization: string;
    status: string;
}

export const QueryList = () => {
    const dataSource : DataType[] = [
        {
            key: '1',
            number: 1,
            initiative: 'Сделать так, чтобы не дуло в кабинете 303',
            direction: 'Рабочее пространство',
            organization: 'Волжская ГЭС',
            status: 'Анализ заявки экспертом',
        },
        {
            key: '2',
            number: 2,
            initiative: 'Нужно, чтобы был кулер на втором этаже',
            direction: 'Рабочее пространство',
            organization: 'Воткинская ГЭС',
            status: 'Анализ заявки экспертом',
        },
        {
            key: '3',
            number: 3,
            initiative: 'Закупить больше принтеров, для ускорения работы',
            direction: 'Технологические процессы',
            organization: 'Волжская ГЭС',
            status: 'Заявка принята к реализации',
        },
        {
            key: '4',
            number: 4,
            initiative: 'Сделать ремонт в кабинете 501',
            direction: 'Технологические процессы',
            organization: 'Воткинская ГЭС',
            status: 'Заявка принята к реализации',
        },
    ];

    const direct = ['Технологические процессы', 'Бизнес процессы', 'Охрана труда', 'Рабочее пространство'];
    const org = ['Волжская ГЭС', 'Воткинская ГЭС'];
    const status = ['Зарегистрирована', 'На рассмотрении', 'Анализируется экспертом', 'На рассмотрении у руководства', 'Принята к реализации', 'Отклонена', 'Реализована'];

    const columns: ColumnsType<DataType> = [
        {
            title: 'Номер заявки',
            dataIndex: 'number',
            width: "9%",
            showSorterTooltip: false,
            sorter: (a, b) => a.number - b.number,
        },
        {
            title: 'Инициатива (Идея)',
            dataIndex: 'initiative',
            key: 'initiative',
            width: "44%",
        },
        {
            title: 'Направление',
            dataIndex: 'direction',
            key: 'direction',
            width: "16%",
            filters: direct.map((direction) => ({
                text: direction,
                value: direction,
            })),
            onFilter: (value: any, record: any) => record.direction === value,
        },
        {
            title: 'Организация',
            dataIndex: 'organization',
            key: 'organization',
            width: "16%",
            filters: org.map((organization) => ({
                text: organization,
                value: organization,
            })),
            onFilter: (value: any, record: any) => record.organization === value,
        },
        {
            title: 'Статус заявки',
            dataIndex: 'status',
            key: 'status',
            width: "16%",
            filters: status.map((status) => ({
                    text: status,
                    value: status,
                })),
            onFilter: (value: any, record: any) => record.status === value,
        },
    ];

    const handleRowClick = (link: String) => {
        router.push(`/queries/application`);
        // router.push(`/queries/${link}`);
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>Заявки</h1>
                </div>
                <div className={styles.infContainer}>
                    <div className={styles.inputContainer}>
                        <div className={styles.inputNumber}>
                            <InputPattern placeholder={"Номер заявки"}/>
                        </div>
                        <div className={styles.inputSearch}>
                            <InputPattern placeholder={"Поиск по идеям"}/>
                        </div>
                    </div>
                    <div className={styles.btnContainer}>
                        <div className={styles.btnBlue}>
                            <Buttons onClick={() => router.push(`/queries/create`)} text={"Создать заявку"}/>
                        </div>
                        <Checkbox className={styles.checkbox}>Архив</Checkbox>
                    </div>
                </div>
                <div className={styles.tableContainer}>
                    <Table
                        className={styles.table}
                        dataSource={dataSource}
                        columns={columns}
                        onRow={(element) => ({
                            onClick: () => handleRowClick(element.key),
                        })}
                    />
                </div>
                <div className={styles.linkContainer}>
                    <Button onClick={() => router.push(`/`)} className={styles.link} type="link">НАЗАД</Button>
                </div>
            </div>
        </div>
    );
};
