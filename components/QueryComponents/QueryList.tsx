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
import {getDirectionTranslation, getOrganizationName, getStatusTranslation} from "../../utils/utils";
import UsersService from "../../services/UsersService";
import {UserResponse} from "../../models/response/UserResponse";

export const QueryList = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [organizations, setOrganizations] = useState<OrganizationsResponse[]>([])
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
    }, [])

    const columns = [
        {
            title: 'Номер заявки',
            dataIndex: 'id',
            key: 'id',
            sorter: {},
            width: "9%",
            onRow: (record: QueriesResponse) => ({
                onClick: () => handleRowClick(record.id)
            })
        },
        {
            title: 'Инициатива (Идея)',
            dataIndex: 'name',
            key: 'name',
            width: "44%",
            filters: []
        },
        {
            title: 'Направление',
            dataIndex: 'initiative_direction',
            key: 'initiative_direction',
            render: (text: string) => getDirectionTranslation(text),
            width: "16%",
            filters: []
        },
        {
            title: 'Организация',
            dataIndex: 'organization',
            key: 'organization',
            render: (text: number) => getOrganizationName(text, organizations),
            width: "16%",
            filters: []
        },
        {
            title: 'Статус заявки',
            dataIndex: 'status',
            key: 'status',
            render: (text: string) => getStatusTranslation(text),
            width: "16%",
            filters: []
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
                        <Checkbox className={styles.checkbox}>Архив</Checkbox>
                    </div>
                </div>
                <div className={styles.tableContainer}>
                    <Table
                        className={styles.table}
                        dataSource={queriesTableData}
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
