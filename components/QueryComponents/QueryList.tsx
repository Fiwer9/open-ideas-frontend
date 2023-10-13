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
import {DataTable} from "../TableComponent/Table";
import {useSearchNum} from "../../hooks/useSearchNum";
import {useSearchQuery} from "../../hooks/useSearchQuery";
import SearchBar from "../FilterComponents/blocks/SearchBar";
import FilterBar from "../FilterComponents/blocks/FilterBar";
import CheckboxBar from "../FilterComponents/blocks/CheckboxBar";
import {UserResponse} from "../../models/response/UserResponse";
import UsersService from "../../services/UsersService";


export const QueryList = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTags, setSelectedTags] = useState<string[]>(['Инициативы']);
    const [isArchive, setIsArchive] = useState(false)
    const [isExpert, setIsExpert] = useState(false)
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
    const [user, setUser] = useState<UserResponse>()

    useSearchNum(searchNumber, queriesTableData, QueriesService.getQueriesTableData, setIsLoading, setQueriesTableData)
    useSearchQuery(searchTerm, queriesTableData, QueriesService.getQueriesTableData, setIsLoading, setQueriesTableData)
    useEffect(() => {
        fetchData(setQueriesTableData, QueriesService.getQueriesTableData, setIsLoading);
        fetchData(setUser, UsersService.getCurrentUser, Number(sessionStorage.getItem('user_id')));
    }, [isArchive])


    useEffect(() => {
        checkExpertUser();
    }, [user]);

    const checkExpertUser = () => {
        user && user.groups.forEach((group) => {
            setIsExpert(group.name === 'Expert');
        });
    };


    const items = queriesTableData;
    const direct = [...new Set(items.map((item) => getDirectionTranslation(item.initiative_direction)))];
    const status = [...new Set(items.map((item) => getStatusTranslation(item.status)))];

    const columns = [
        {
            title: 'Номер',
            dataIndex: 'id',
            key: 'id',
            width: "5%",
            showSorterTooltip: false,
            sorter: (a: any, b: any) => a.id - b.id,
            onRow: (record: QueriesResponse) => ({
                onClick: () => handleRowClick(record.id)
            }),
            align: "center",
        },
        {
            title: 'Инициатива (Идея)',
            dataIndex: 'name',
            key: 'name',
            width: "60%",
        },
        {
            title: 'Направление',
            dataIndex: 'initiative_direction',
            key: 'initiative_direction',
            render: (text: string) => getDirectionTranslation(text),
            width: "15%",
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
            width: "15%",
            filters: status.map((status) => ({
                    text: status,
                    value: status,
                })),
            onFilter: (value: any, record: any) => getStatusTranslation(record.status).includes(value),
        },
    ];

    const handleRowClick = (queryId: any) => {
        router.push(checkExpert(queryId, queriesTableData) && selectedTags[0] != 'Инициативы' ? `/queries/adminApplication?isExpert=true` : `/queries/application?queryId=${queryId.id}`);
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

    const handleChangeTag = (tag: string, checked: boolean) => {
        const nextSelectedTags = checked
          ? [tag]
          : selectedTags.filter((t) => t === tag);
        setSelectedTags(nextSelectedTags);
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
                <Tabs selectedTags={selectedTags} handleChange={handleChangeTag} isExpert={isExpert} />
                <MainText text={'Инициативы'}/>
                <div className={styles.infContainer}>
                    <SearchBar onSearchTermChange={handleSearchTermChange}
                               onSearchNumberChange={handleSearchNumberChange}
                               placeholderNum={'Номер'}
                               placeholderQuery={'Поиск по идеям'}/>
                    <FilterBar filterText={'Фильтры'}/>
                    <CheckboxBar onToggleArchive={handleToggleArchive} checkboxText={'Архив'}/>
                </div>
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
