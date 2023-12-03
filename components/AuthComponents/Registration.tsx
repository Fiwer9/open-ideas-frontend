import React, {useContext, useEffect, useState} from "react";
import {Form, Input, Select} from "antd";
import {InputLabel} from "../InputLabelComponent/InputLabel";
import {Logo} from "../PicturesComponents/Logo";
import {Buttons} from "../ButtonComponent/Button";

import styles from './styles/Registration.module.scss';
import router from "next/router";
import {OrganizationsResponse} from "../../models/response/OrganizationsResponse";
import OrganizationsService from "../../services/OrganizationsService";
import {IDepartment} from "../../models/IDepartment";
import {Context} from "../../pages/_app";

export const Registration = () => {
    const { store } = useContext(Context);
    const [name, setName] = useState<string>('');
    const [organization, setOrganization] = useState<string>('');
    const [department, setDepartment] = useState('');
    const [allDepartments, setAllDepartments] = useState<IDepartment[]>([])
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [orgId, setOrgId] = useState<number>(0)

    const [allOrganizations, setAllOrganizations] = useState<OrganizationsResponse[]>([])

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const organizations = await OrganizationsService.getOrganizations()
                const departments = await OrganizationsService.getDepartments()
                setAllOrganizations(organizations.data)
                setAllDepartments(departments.data)
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false)
            }
        }

        fetchData();
    }, [])

    let optionsDep = allDepartments
        .filter(department => department.organization === orgId)
        .map(department => ({
            value: department.name,
            label: department.name
        }));

    useEffect(() => {
        for (let org of allOrganizations) {
            if (org.name === organization) {
                setOrgId(org.id)
            }
        }
        optionsDep = []

    }, [organization])

    const handleInputChange = (evt: any) => {
        setName(evt.target.value);
        setError(null)
    };

    const optionsOrg = allOrganizations.map(org => ({
        value: org.name,
        label: org.name
    }));

    const handleSubmitButton = async () => {
        try {
            let departmentId = 0;
            for (let dep of allDepartments) {
                if(dep.name === department) {
                    departmentId = dep.id
                }
            }
            await store.putRegistration(name, departmentId)
            router.push('/queries')
        } catch (error: any) {
            console.error(error.response.data.message)
        }
    }

    return (
        <div className={styles.container}>
            <Form className={styles.form}>
                <Form.Item className={styles.logo}>
                    <Logo width={112} height={32}/>
                </Form.Item>
                <Form.Item className={styles.content}>
                    <InputLabel className={styles.title} title={"Введите своё Ф. И. О."}/>
                    <div className={styles.input}>
                        <Input onChange={handleInputChange} placeholder={"Напишите фамилию, имя и отчество"} required/>
                    </div>
                </Form.Item>
                <Form.Item className={styles.contentSelect} required={true}>
                    <InputLabel className={styles.contentSelectTitle} title={"Выберите свою организацию"}/>
                    <div className={styles.mySelectContainer}>
                        <Select
                          showSearch
                          filterOption={(input, option) => (option?.label ?? '').includes(input)}
                          filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                          }
                            loading={isLoading}
                            className={styles.select}
                            placeholder={"Название организации"}
                            options={optionsOrg}
                            onChange={(e: any) => {
                                setOrganization(e)
                            }}
                        />
                    </div>
                </Form.Item>
                {organization && (
                    <Form.Item className={styles.contentSelect} required={true}>
                        <InputLabel className={styles.contentSelectTitle} title={"Выберите свой отдел"}/>
                        <div className={styles.mySelectContainer}>
                            <Select
                              showSearch
                              filterOption={(input, option) => (option?.label ?? '').includes(input)}
                              filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                              }
                                loading={isLoading}
                                className={styles.select}
                                placeholder={"Название отдела"}
                                options={optionsDep}
                                onChange={(e: any) => {
                                    setDepartment(e)
                                }}
                            />
                        </div>
                    </Form.Item>
                )}
                <div className={styles.containerBtn}>
                    <div className={name && organization && department && !error ? styles.btnBlue : styles.disabledBtn}>
                        <Buttons
                            text={"Зарегистрироваться"}
                            props={name && organization && department && !error ? "submit" : "disabled"}
                            type={"submit"}
                            onClick={() => {
                            if (name && organization && department && !error) {
                                handleSubmitButton()
                            }
                        }}/>
                    </div>
                </div>
            </Form>
        </div>
    );
};
