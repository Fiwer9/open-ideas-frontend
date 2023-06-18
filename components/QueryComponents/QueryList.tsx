import React from "react";
import {Checkbox, Table, Button} from "antd";
import {InputPattern} from "../InputComponent/Input";
import {Buttons} from "../ButtonComponent/Button";

import styles from "./styles/QueryList.module.scss";
import router from "next/router";

export const QueryList = () => {
    const dataSource = [
        {
            key: '1',
            number: '1',
            initiative: 'Сделать так, чтобы не дуло в кабинете 303',
            direction: 'Рабочее пространство',
            organization: 'Волжская ГЭС',
            status: 'Анализ заявки экспертом',
        },
        {
            key: '2',
            number: '2',
            initiative: 'Нужно, чтобы был кулер на втором этаже',
            direction: 'Рабочее пространство',
            organization: 'Воткинская ГЭС',
            status: 'Анализ заявки экспертом',
        },
        {
            key: '3',
            number: '3',
            initiative: 'Закупить больше принтеров, для ускорения работы',
            direction: 'Технологические процессы',
            organization: 'Волжская ГЭС',
            status: 'Заявка принята к реализации',
        },
        {
            key: '4',
            number: '4',
            initiative: 'Сделать ремонт в кабинете 501',
            direction: 'Технологические процессы',
            organization: 'Воткинская ГЭС',
            status: 'Заявка принята к реализации',
        },
    ];

    const columns = [
        {
            title: 'Номер заявки',
            dataIndex: 'number',
            sorter: {},
            width: "9%",
        },
        {
            title: 'Инициатива (Идея)',
            dataIndex: 'initiative',
            key: 'initiative',
            width: "44%",
            filters: []
        },
        {
            title: 'Направление',
            dataIndex: 'direction',
            key: 'direction',
            width: "16%",
            filters: []
        },
        {
            title: 'Организация',
            dataIndex: 'organization',
            key: 'organization',
            width: "16%",
            filters: []
        },
        {
            title: 'Статус заявки',
            dataIndex: 'status',
            key: 'status',
            width: "16%",
            filters: []
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
