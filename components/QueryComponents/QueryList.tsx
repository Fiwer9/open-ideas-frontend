import React, {useEffect, useState} from "react";

import styles from "./styles/QueryList.module.scss";
import {QueriesResponse} from "../../models/response/QueriesResponse";
import QueriesService from "../../services/QueriesService";
import {
    fetchData,
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
import router, { useRouter } from "next/router";
import Cookies from "js-cookie";
import UsersService from "../../services/UsersService";
import {UserResponse} from "../../models/response/UserResponse";
import {OrganizationsResponse} from "../../models/response/OrganizationsResponse";
import OrganizationsService from "../../services/OrganizationsService";
import {FilterOutlined, PlusCircleOutlined} from "@ant-design/icons";
import {Logo} from "../PicturesComponents/Logo";
import {Table} from "antd";


export const QueryList = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isExpert, setIsExpert] = useState(false);
    const [isArchive, setIsArchive] = useState(false)
    const [user, setUser] = useState<UserResponse>()
    const [organization, setOrganization] = useState<OrganizationsResponse>()
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
        router.push(`/queries/adminApplication?queryId=${queryId.id}`);
    };

    useEffect(() => {
        const delay = 3000;
        const fetchDataWithDelay = async () => {
            await new Promise(resolve => setTimeout(resolve, delay));
            fetchData(setIsLoading, setQueriesTableData, QueriesService.getQueriesTableData);
        };
        setIsLoading(true)
        fetchDataWithDelay();
        setIsLoading(false)
        fetchData(setIsLoading, setUser, UsersService.getCurrentUser, sessionStorage.getItem('user_id'));
    }, [isArchive]);


    useEffect(() => {
        user && fetchData(setIsLoading, setOrganization, OrganizationsService.getOrganizationsById, user?.department.organization)
        user && Cookies.set('department', user?.department.name)
        user && Cookies.set('user_name', user?.name)
        organization && Cookies.set('organization', organization.name)
    }, [user]);


    const getData = () => {
        if (isExpert && isArchive) {
            return queriesTableData.filter((query) => query.expert_users.includes(Number(sessionStorage.getItem('user_id'))) && query.status === 'rejected' || query.status === 'registered')
        }
        if (isExpert) {
            return queriesTableData.filter((query) => query.expert_users.includes(Number(sessionStorage.getItem('user_id'))))
        }
        if (isArchive) {
            return queriesTableData.filter((query) => query.status === 'rejected' || query.status === 'registered')
        } else if (!isArchive) {
            return queriesTableData.filter((query) => query.status !== 'rejected' && query.status !== 'registered')
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

    const handleToggleExpert = (checked: any) => {
        setIsExpert(checked);
    };

    const handleRowClickIdea = (queryId: any) => {
        router.push(`/queries/application?queryId=${queryId.id}`);
    }

    const handleCreateQuery = () => {
        router.push('/queries/create');
    }

    return (
      Cookies.get('selectedTag') === 'Панель администратора' ? (
        <div className={styles.container}>
            <Slider />
            <div className={styles.content}>
                <Header user_name={user?.name} organization={organization && organization.name} department={user?.department.name}/>
                <Tabs />
                <MainText text={'Инициативы'}/>
                <div className={styles.infContainer}>
                    <SearchBar onSearchTermChange={handleSearchTermChange}
                               onSearchNumberChange={handleSearchNumberChange}
                               placeholderNum={'Номер'}
                               placeholderQuery={'Поиск по идеям'}/>
                    <FilterBar icon={<FilterOutlined />} filterText={'Фильтры'}/>
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
        ) : (
        <div className={styles.containerIdeas}>
            <div className={styles.contentIdeas}>
                <Header user_name={user?.name} organization={organization && organization.name} department={user?.department.name}/>
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
                      onSearchTermChange={handleSearchTermChange}
                      onSearchNumberChange={handleSearchNumberChange}
                      placeholderNum={'Номер'}
                      placeholderQuery={'Поиск по идеям'}/>
                    <FilterBar icon={<PlusCircleOutlined />} filterText={'Создать идею'} onClick={handleCreateQuery}/>
                    <CheckboxBar onToggleArchive={handleToggleExpert} checkboxText={'Я эксперт'}/>
                    <CheckboxBar onToggleArchive={handleToggleArchive} checkboxText={'Архив'}/>
                </div>
                <DataTable
                  columns={columns}
                  data={getData()}
                  onRowClick={handleRowClickIdea}
                  isLoading={isLoading}
                />
            </div>
        </div>
      )
    );
};
