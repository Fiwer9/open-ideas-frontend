import React, {useEffect, useState} from "react";
import {Button, Checkbox, Table} from "antd";
import {InputPattern} from "../InputComponent/Input";
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
    getOrganizationName,
    getStatusTranslation
} from "../../utils/utils";
import UsersService from "../../services/UsersService";
import {UserResponse} from "../../models/response/UserResponse";

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
    const org = [...new Set(organiz.map((item) => item.name))];
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
            title: 'Организация',
            dataIndex: 'organization',
            key: 'organization',
            render: (text: number) => getOrganizationName(text, organizations),
            width: "16%",
            filters: org.map((organization) => ({
                text: organization,
                value: organization,
            })),
            onFilter: (value: any, record: any) => getOrganizationName(record.organization, organizations).includes(value),

        },
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
                    console.log(user, Number(sessionStorage.getItem('user_id')));
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
                        <Checkbox className={styles.checkbox} onChange={(e) => setIsArchive(e.target.checked)}>Архив</Checkbox>
                    </div>
                </div>
                <div className={styles.tableContainer}>
                    <Table
                        className={styles.table}
                        dataSource={isArchive? queriesTableData.filter((query) => query.status === 'rejected')
                        : queriesTableData.filter((query) => query.status !== 'rejected')}
                        columns={columns}
                        loading={isLoading}
                        onRow={(element: any) => ({
                            onClick: () => {
                                console.log(element)
                                handleRowClick(element)
                            },
                        })}
                        rowKey="id"
                    />
                </div>
                <div className={styles.linkContainer}>
                    <Button onClick={() => router.push(`/`)} className={styles.link} type="link">НАЗАД</Button>
                </div>
            </div>
        </div>
    );
};
