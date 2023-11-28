import {QueriesResponse} from "../models/response/QueriesResponse";
import {UserResponse} from "../models/response/UserResponse";
import dayjs from "dayjs";
import 'dayjs/locale/ru';
import Cookies from "js-cookie";

export function getOrganizationName(text: number | undefined, organizations: any) {
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

export function formatDate(date: string) {
    const currentDate = date.split('T')
    return dayjs(currentDate[0], 'YYYY-MM-DD').format('DD.MM.YYYY')
}

export function formatDateRu(date: string) {
    dayjs.locale('ru');
    const currentDate = date.split('T')
    return dayjs(currentDate[0]).format('DD MMMM YYYY г.');
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
            return "Выполнена";
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

export const fetchData = async (setIsLoading: any, setData: any, getData: any,  arg? : any) => {
    setIsLoading(true)
    try {
        const data = arg? await getData(arg) : await getData()
        setData(data.data);
    } catch (error) {
        console.error(error);
    } finally {
        setIsLoading && setIsLoading(false)
    }
}

export const getRouteTranslation = (route: string) => {
    switch (route) {
        case "queries":
            return "Таблица инициатив";
        case "create":
            return "Создание инициативы";
        case "editingApplication":
            return "Редактирование инициативы";
        case 'settings':
            return 'Настройки'
        case `adminApplication?queryId=${Cookies.get('queryId')}`:
            return Cookies.get('queryName');
        case `editingApplication?queryId=${Cookies.get('queryId')}`:
            return `${Cookies.get('queryName')} (Редактирование)`;
        case "users":
            return "Таблица пользователей";
        case `userCard?userId=${Cookies.get('userId')}`:
            return Cookies.get('userName');
        default:
            return "";
    }
}


export function getUserName(userId: number, users: UserResponse[]) {
    const user = users.find((user) => user.id === userId);
    if (user) {
        return user.name;
    }
    return "Аноним";
}


const getAllUserLikes = (users: UserResponse[]) => {
    const res = []
    for (let user of users) {
        if (user.id === Number(sessionStorage.getItem('user_id'))) {
            for (let query of user.likes) {
                res.push(query.id)
            }
        }
    }
    return res
}


export function getLikes(users: UserResponse[], queryId: string) {
    let like = 0;
    for (let user of users) {
        for (let query of user.likes) {
            if (query.id === Number(queryId)) {
                like += 1;

            }
        }
    }
    return like;
}

export function getAuthor(users_id: [number], users: UserResponse[], setUser: any) {
    for (let id of users_id) {
        for (let user of users) {
            if (id === user.id) {
                setUser(user)
            }
        }
    }
}
