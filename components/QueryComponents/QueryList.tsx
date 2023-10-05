import React, {useEffect, useState} from "react";

import styles from "./styles/QueryList.module.scss";
import router from "next/router";
import {QueriesResponse} from "../../models/response/QueriesResponse";
import QueriesService from "../../services/QueriesService";
import {
    checkExpert, fetchData,
    getDirectionTranslation,
    getDirectionTranslationOnEng,
    getStatusClassName,
    getStatusTranslation
} from "../../utils/utils";
import {Slider} from "../SliderComponents/SliderComponents";
import {Header} from "../HeaderComponents/Header";
import {Tabs} from "../TabsComponent/Tabs";
import {MainText} from "../MainTextComponent";
import {Filter} from "../FilterComponents";
import {DataTable} from "../TableComponent/Table";
import {useSearchNum} from "../../hooks/useSearchNum";
import {useSearchQuery} from "../../hooks/useSearchQuery";


export const QueryList = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isArchive, setIsArchive] = useState(false)
    const [queriesTableData, setQueriesTableData] = useState<QueriesResponse[]>([
        {
            id: 1,
            date: "",
            status: "",
            description: '',
            organization: 0,
            expert_users: [],
            implementation_effect: '',
            initiative_direction: '',
            name: '',
            initiator_users: [0],
        }
    ])

    const data = queriesTableData;
    const [searchTerm, setSearchTerm] = useState('');
    const [searchNumber, setSearchNumber] = useState('');

    useSearchNum(searchNumber, queriesTableData, QueriesService.getQueriesTableData, setIsLoading, setQueriesTableData)
    useSearchQuery(searchTerm, queriesTableData, QueriesService.getQueriesTableData, setIsLoading, setQueriesTableData)
    useEffect(() => {
        fetchData(setIsLoading, setQueriesTableData, QueriesService.getQueriesTableData);
    }, [isArchive])

    const items = queriesTableData;
    const direct = [...new Set(items.map((item) => getDirectionTranslation(item.initiative_direction)))];
    const status = [...new Set(items.map((item) => getStatusTranslation(item.status)))];

    const columns = [
        {
            title: 'Номер заявки',
            dataIndex: 'id',
            key: 'id',
            width: "9%",
            showSorterTooltip: false,
            sorter: (a: any, b: any) => a.id - b.id,
            onRow: (record: QueriesResponse) => ({
                onClick: () => handleRowClick(record.id)
            })
        },
        {
            title: 'Инициатива (Идея)',
            dataIndex: 'name',
            key: 'name',
            width: "44%",
        },
        {
            title: 'Направление',
            dataIndex: 'initiative_direction',
            key: 'initiative_direction',
            render: (text: string) => getDirectionTranslation(text),
            width: "16%",
            filters: direct.map((direction) => ({
                text: direction,
                value: direction,
            })),
            onFilter: (value: any, record: any) => record.initiative_direction.includes(getDirectionTranslationOnEng(value)),
        },
        {
            title: 'Статус заявки',
            dataIndex: 'status',
            key: 'status',
            render: (text: string) =>(
                <>
                    {
                        <span className={`${getStatusClassName(styles, text)}`}>{getStatusTranslation(text)}</span>
                    }
                </>
            ),
            width: "16%",
            filters: status.map((status) => ({
                    text: status,
                    value: status,
                })),
            onFilter: (value: any, record: any) => getStatusTranslation(record.status).includes(value),
        },
    ];

    const handleRowClick = (queryId: any) => {
        router.push(checkExpert(queryId, queriesTableData)? `/queries/expert?queryId=${queryId.id}` : `/queries/application?queryId=${queryId.id}`);
    };

    const getData = () => {
        if (isArchive) {
            return queriesTableData.filter((query) => query.status === 'rejected')
        } else if (!isArchive) {
            return queriesTableData.filter((query) => query.status !== 'rejected')
        } else if (searchTerm) {
            return data.map((item) => item.name)
        } else if (searchNumber) {
            return data.map((item) => item.id)
        } else {
            return data
        }
    }

    const handleSearchTermChange = (searchText: any) => {
        setSearchTerm(searchText);
    };

    const handleSearchNumberChange = (searchNum: any) => {
        setSearchNumber(searchNum);
    };

    const handleToggleArchive = (checked: any) => {
        setIsArchive(checked);
    };

    return (
        <div className={styles.container}>
            <Slider />
            <div className={styles.content}>
                <Header user_name={'Иванов Иван Иванович'} organization={'Aratrum'} department={'Отдел'}/>
                <Tabs />
                <MainText text={'Инициативы'}/>
                <Filter onSearchTermChange={handleSearchTermChange}
                        onSearchNumberChange={handleSearchNumberChange}
                        placeholderNum={'Номер'}
                        placeholderQuery={'Поиск по идеям'}
                        filterText={'Фильтры'}
                        checkboxText={'Архив'}
                        onToggleArchive={handleToggleArchive} />
                <DataTable
                  data={getData()}
                  columns={columns}
                  isLoading={isLoading}
                  onRowClick={handleRowClick}
                />
            </div>
        </div>
    );
};
