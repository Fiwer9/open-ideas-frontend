import React, {useEffect, useState} from "react";
import {Breadcrumb,  Checkbox, Input, Table} from "antd";
import {Buttons} from "../ButtonComponent/Button";

import styles from "./styles/QueryList.module.scss";
import router from "next/router";
import {QueriesResponse} from "../../models/response/QueriesResponse";
import QueriesService from "../../services/QueriesService";
import {OrganizationsResponse} from "../../models/response/OrganizationsResponse";
import OrganizationsService from "../../services/OrganizationsService";
import {
    getDirectionTranslation,
    getDirectionTranslationOnEng,
    getStatusTranslation
} from "../../utils/utils";
import UsersService from "../../services/UsersService";
import {UserResponse} from "../../models/response/UserResponse";
import {LogOut} from "../AuthComponents/LogOut";
import {Slider} from "../SliderComponents/SliderComponents";

export const QueryList = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [organizations, setOrganizations] = useState<OrganizationsResponse[]>([])
    const [isArchive, setIsArchive] = useState(false)
    const [user, setUser] = useState<UserResponse>(
        {
            id: 0,
            password: '',
            last_login: '',
            is_superuser: false,
            username: '',
            first_name: '',
            last_name: '',
            is_staff: false,
            is_active: false,
            date_joined: '',
            name: '',
            email: '',
            department: {
                id: 0,
                organization: 0,
                name: ''
            },
            groups: [],
            user_permissions: [],
            likes: [],
        }
    )
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

    const filterQuery = async (searchText: any, listOfQuery: QueriesResponse[]) => {
        if (!searchText) {
            const data = await QueriesService.getQueriesTableData()
            return data.data;
        } else {
            return listOfQuery.filter(({ name }) =>
                name.toLowerCase().includes(searchText.toLowerCase())
            );
        }
    };

    const filterNumber = async (searchNum: any, listOfQuery: QueriesResponse[]) => {
        if (!searchNum) {
            const data = await QueriesService.getQueriesTableData()
            return data.data;
        } else {
            return listOfQuery.filter(({id}) =>
                id.toString().includes(searchNum.toString())
            );
        }
    };


    useEffect(() => {
        setIsLoading(true);
        const debounce = setTimeout(async () => {
            const data = await QueriesService.getQueriesTableData();
            const filteredQuery = filterQuery(searchTerm, data.data);
            setQueriesTableData(await filteredQuery);
            setIsLoading(false);
        }, 300);

        return () => clearTimeout(debounce);
    }, [searchTerm]);


    useEffect(() => {
        setIsLoading(true);
        const debounce = setTimeout(async () => {
            const data = await QueriesService.getQueriesTableData();
            const filteredQuery = filterNumber(searchNumber, data.data);
            setQueriesTableData(await filteredQuery);
            setIsLoading(false);
        }, 300);

        return () => clearTimeout(debounce);
    }, [searchNumber]);


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const data = await QueriesService.getQueriesTableData()
                const organizations = await OrganizationsService.getOrganizations()
                const user = await UsersService.getCurrentUser(Number(sessionStorage.getItem('user_id')))
                setQueriesTableData(data.data);
                setOrganizations(organizations.data);
                setUser(user.data)
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false)
            }
        }

        fetchData();
    }, [isArchive])

    const items = queriesTableData;
    const organiz = organizations;
    const direct = [...new Set(items.map((item) => getDirectionTranslation(item.initiative_direction)))];
    // const org = [...new Set(organiz.map((item) => item.name))];
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
        // {
        //     title: 'Организация',
        //     dataIndex: 'organization',
        //     key: 'organization',
        //     render: (text: number) => getOrganizationName(text, organizations),
        //     width: "16%",
        //     filters: org.map((organization) => ({
        //         text: organization,
        //         value: organization,
        //     })),
        //     onFilter: (value: any, record: any) => getOrganizationName(record.organization, organizations).includes(value),
        //
        // },
        {
            title: 'Статус заявки',
            dataIndex: 'status',
            key: 'status',
            render: (text: string) => getStatusTranslation(text),
            width: "16%",
            filters: status.map((status) => ({
                    text: status,
                    value: status,
                })),
            onFilter: (value: any, record: any) => getStatusTranslation(record.status).includes(value),
        },
    ];

    const checkExpert = (queryId: any) => {
        let isExpert = false;

        queriesTableData.forEach((query) => {
            if (queryId.id === query.id) {
                query.expert_users.forEach((user) => {
                    if (user === Number(sessionStorage.getItem('user_id'))) {
                        isExpert = true;
                    }
                });
            }
        });

        return isExpert;
    }

    const handleRowClick = (queryId: any) => {
        router.push(checkExpert(queryId)? `/queries/expert?queryId=${queryId.id}` : `/queries/application?queryId=${queryId.id}`);
        // router.push(`/queries/${link}`);
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


    return (
        <div className={styles.container}>
            <Slider />
            <div className={styles.content}>
                <Breadcrumb style={{ margin: '16px 0', position: 'absolute', top: '12.5px', left: '24px' }}>
                    <Breadcrumb.Item>Панель администратора</Breadcrumb.Item>
                    <Breadcrumb.Item>Таблица инициатив</Breadcrumb.Item>
                </Breadcrumb>
                <div className={styles.tabsContainer}>
                    {/*<div className={styles.tabs}>*/}
                    {/*    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;*/}
                    {/*</div>*/}
                </div>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>Инициативы</h1>
                </div>
                <div className={styles.infContainer}>
                    <div className={styles.inputContainer}>
                        <div className={styles.inputNumber}>
                            <Input
                                placeholder={"Номер заявки"}
                                onChange={(event: any) => setSearchNumber(event.target.value)}
                            />
                        </div>
                        <div className={styles.inputSearch}>
                            <Input
                                placeholder={"Поиск по идеям"}
                                onChange={(event: any) => setSearchTerm(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className={styles.btnContainer}>
                        <div className={styles.btnBlue}>
                            <Buttons onClick={() => router.push(`/queries/create`)} text={"Создать заявку"}/>
                        </div>
                        <Checkbox className={styles.checkbox} onChange={(e) => setIsArchive(e.target.checked)}>Архив</Checkbox>
                    </div>
                </div>
                <div className={styles.tableContainer}>
                    <Table
                        className={styles.table}
                        dataSource={getData()}
                        columns={columns}
                        loading={isLoading}
                        onRow={(element: any) => ({
                            onClick: () => {
                                handleRowClick(element)
                            },
                        })}
                        rowKey="id"
                    />
                </div>
                <div className={styles.linkContainer}>
                    <LogOut/>
                </div>
            </div>
        </div>
    );
};
