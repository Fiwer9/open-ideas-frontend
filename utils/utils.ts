import {QueriesResponse} from "../models/response/QueriesResponse";

export function getOrganizationName(text: number, organizations: any) {
    for (let org of organizations) {
        if (org.id === text) {
            return org.name
        }
    }
}

export function getOrganizationId(text: number, organizations: any) {
    for (let org of organizations) {
        if (org.id === text) {
            return org.id
        }
    }
}

export function getStatusClassName(styles: any, status: string) {
    switch (status) {
        case 'registered':
            return styles.statusRegistered;
        case 'check':
            return styles.statusCheck;
        case 'analysis':
            return styles.statusAnalysis;
        case 'accepted':
            return styles.statusAccepted;
        case 'implementation':
            return styles.statusImplementation;
        case 'rejected':
            return styles.statusRejected;
        case 'done':
            return styles.statusDone;
        default:
            return '';
    }
}

export function formatDateToServer(date: any, separator='.') {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}${separator}${month}${separator}${day}`;
}

export const getDirectionTranslation = (direction: string) => {
    switch (direction) {
        case "tech_process":
            return "Технологические процессы";
        case "business_process":
            return "Бизнес процессы";
        case "work_safety":
            return "Охрана труда";
        case "workspace":
            return "Рабочее пространство";
        default:
            return "";
    }
}

export const getStatusTranslation = (status: string) => {
    switch (status) {
        case "registered":
            return "Зарегистрирована";
        case "check":
            return "На рассмотрении";
        case "analysis":
            return "Анализируется экспертом";
        case "accepted":
            return "На рассмотрении у руководства";
        case "implementation":
            return "Принята к реализации";
        case "rejected":
            return "Отклонена";
        case "done":
            return "Реализована";
        default:
            return "";
    }
};

export const getDirectionTranslationOnEng = (direction: string) => {
    switch (direction) {
        case "Технологические процессы":
            return "tech_process";
        case "Бизнес процессы":
            return "business_process";
        case "Охрана труда":
            return "work_safety";
        case "Рабочее пространство":
            return "workspace";
        default:
            return "";
    }
}



export const checkExpert = (queryId: any, data: QueriesResponse[]) => {
    let isExpert = false;

    data.forEach((query) => {
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

export const fetchData = async (setData: any, getData: any, arg? : any, setIsLoading?: any) => {
    setIsLoading && setIsLoading(true)
    try {
        const data = arg? await getData(arg) : await getData()
        setData(data.data);
    } catch (error) {
        console.error(error);
    } finally {
        setIsLoading && setIsLoading(false)
    }
}
