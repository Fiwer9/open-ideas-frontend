import { QueriesResponse } from "../models/response/QueriesResponse";
import { UserResponse } from "../models/response/UserResponse";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import Cookies from "js-cookie";
import { DirectionResponse } from "../models/response/DirectionResponse";
import { IDepartment } from "../models/IDepartment";
import { OrganizationsResponse } from "../models/response/OrganizationsResponse";
import { UsersUpdateResponse } from "../models/response/UsersUpdateResponse";

export function getDepartmentName(
  depId: number | undefined,
  departments: IDepartment[]
) {
  for (let dep of departments) {
    if (dep.id === depId) {
      return dep.name;
    }
  }
}
export function getOrganizationName(
  id: number,
  organizations: OrganizationsResponse[]
) {
  const { name } = organizations.find((organization) => organization.id === id);
  return name;
}

export function getOrganizationId(text: number, organizations: any) {
  for (let org of organizations) {
    if (org.id === text) {
      return org.id;
    }
  }
}

export function getStatusClassName(styles: any, status: string) {
  switch (status) {
    case "registered":
      return styles.statusRegistered;
    case "check":
      return styles.statusCheck;
    case "analysis":
      return styles.statusAnalysis;
    case "accepted":
      return styles.statusAccepted;
    case "implementation":
      return styles.statusImplementation;
    case "rejected":
      return styles.statusRejected;
    case "done":
      return styles.statusDone;
    default:
      return "";
  }
}

export function formatDate(date: string) {
  const currentDate = date.split("T");
  return dayjs(currentDate[0], "YYYY-MM-DD").format("DD.MM.YYYY");
}

export function formatDateRu(date: string) {
  dayjs.locale("ru");
  const currentDate = date.split("T");
  return dayjs(currentDate[0]).format("DD MMMM YYYY г.");
}

export function formatDateToServer(date: Date, separator = ".") {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}${separator}${month}${separator}${day}`;
}

export const getAllUserLikes = (
  users: UsersUpdateResponse[],
  user_id: number
) => {
  const { likes } = users.find((user) => user.id === user_id);
  return [...likes];
};
export const getDirectionName = (
  directionId: number,
  directions: DirectionResponse[]
) => {
  const { name } = directions.find((direction) => direction.id === directionId);
  return name;
};

export const getDirections = (directions: DirectionResponse[]) => [
  ...new Set(directions.map((item) => item.name)),
];

export const getStatus = (queriesTableData: QueriesResponse[]) => [
  ...new Set(queriesTableData.map((item) => statusTranslation[item.status])),
];

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
};

export const statusTranslation = {
  registered: "Зарегистрирована",
  check: "На рассмотрении",
  analysis: "Анализируется экспертом",
  accepted: "На рассмотрении у руководства",
  implementation: "Принята к реализации",
  rejected: "Отклонена",
  done: "Выполнена",
};

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
};

export const checkExpert = (query: QueriesResponse) => {
  return (
    query.expert_users[0] ===
    Number(JSON.parse(sessionStorage.getItem("user")).user_id)
  );
};

export const fetchData = async (
  setIsLoading: any,
  setData: any,
  getData: any,
  arg?: any
) => {
  setIsLoading(true);
  try {
    const data = arg ? await getData(arg) : await getData();
    setData(data?.data);
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading && setIsLoading(false);
  }
};

export const getRouteTranslation = (route: string) => {
  switch (route) {
    case "queries":
      return "Таблица инициатив";
    case "create":
      return "Создание инициативы";
    case "editingApplication":
      return "Редактирование инициативы";
    case "settings":
      return "Настройки";
    case `adminApplication?queryId=${Cookies.get("queryId")}`:
      return Cookies.get("queryName");
    case `editingApplication?queryId=${Cookies.get("queryId")}`:
      return `${Cookies.get("queryName")} (Редактирование)`;
    case "users":
      return "Таблица пользователей";
    case `userCard?userId=${Cookies.get("userId")}`:
      return Cookies.get("userName");
    case `editingUser?userId=${Cookies.get("userId")}`:
      return `${Cookies.get("userName")} (Редактирование)`;
    default:
      return "";
  }
};

export function getUserName(userId: number, users: UsersUpdateResponse[]) {
  const user = users.find((user) => user.id === userId);
  if (user) {
    return user.name;
  }
  return "Аноним";
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

export function getAuthor(
  users_id: [number],
  users: UserResponse[],
  setUser: any
) {
  for (let id of users_id) {
    for (let user of users) {
      if (id === user.id) {
        setUser(user);
      }
    }
  }
}
