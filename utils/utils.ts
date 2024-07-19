import {
  QueriesResponse,
  QueryStatus,
  QueryStatusTranslate,
} from "../models/response/QueriesResponse";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { DirectionResponse } from "../models/response/DirectionResponse";
import { IDepartment } from "../models/IDepartment";
import { OrganizationsResponse } from "../models/response/OrganizationsResponse";
import { UserResponse } from "../models/response/UserResponse";

export function getDepartmentName(
  depId: number | undefined,
  departments: IDepartment[],
) {
  for (let dep of departments) {
    if (dep.id === depId) {
      return dep.name;
    }
  }
}

export const getNames = (users: UserResponse[]) => [
  ...new Set(users?.map((user) => user.name)),
];

export const getEmails = (users: UserResponse[]) => [
  ...new Set(users?.map((user) => user.email)),
];
export function getQueriesByNumber(queries: QueriesResponse[]) {
  return queries.map((query) => `№${query.id}`);
}

export const getOrganizationsFilter = (
  organizations: OrganizationsResponse[],
) => [...new Set(organizations?.map((organization) => organization.name))];
export function getOrganizationName(
  id: number,
  organizations: OrganizationsResponse[],
) {
  try {
    const { name } = organizations.find(
      (organization) => organization.id === id,
    );
    return name;
  } catch (e) {
    return "Неизвестно";
  }
}

export function getOrganizationId(text: number, organizations: any) {
  for (let org of organizations) {
    if (org.id === text) {
      return org.id;
    }
  }
}

export function getOrganizationNameById(
  orgName: string,
  organizations: OrganizationsResponse[],
) {
  const data = organizations.find((org) => org.name === orgName);
  return data.id;
}

export const statusClassName = (styles: any) => ({
  registered: styles.statusRegistered,
  check: styles.statusCheck,
  analysis: styles.statusAnalysis,
  accepted: styles.statusAccepted,
  implementation: styles.statusImplementation,
  rejected: styles.statusRejected,
  done: styles.statusDone,
});

export function getStatusClassName(styles: any, status: QueryStatus) {
  switch (status) {
    case QueryStatus.REGISTERED:
      return styles.statusRegistered;
    case QueryStatus.CHECK:
      return styles.statusCheck;
    case QueryStatus.ANALYSIS:
      return styles.statusAnalysis;
    case QueryStatus.ACCEPTED:
      return styles.statusAccepted;
    case QueryStatus.IMPLEMENTATION:
      return styles.statusImplementation;
    case QueryStatus.REJECTED:
      return styles.statusRejected;
    case QueryStatus.DONE:
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
  try {
    dayjs.locale("ru");
    const currentDate = date.split("T");
    return dayjs(currentDate[0]).format("DD MMMM YYYY г.");
  } catch (e) {
    return "";
  }
}

export function formatDateToServer(date: Date, separator = ".") {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}${separator}${month}${separator}${day}`;
}

export const getAllUserLikes = (users: UserResponse[], user_id: number) => {
  const { likes } = users.find((user) => user.id === user_id);
  return [...likes];
};
export const getDirectionName = (
  directionId: number,
  directions: DirectionResponse[],
) => {
  try {
    const { name } = directions.find(
      (direction) => direction.id === directionId,
    );
    return name;
  } catch (e) {
    return "Неизвестно";
  }
};

export const getDirections = (directions: DirectionResponse[]) => {
  const directionsId = [...new Set(directions.map((item) => item.id))];
  return directions.filter((direction, i) => direction.id === directionsId[i]);
};

export const getStatus = (queriesTableData: QueriesResponse[]) => [
  ...new Set(queriesTableData.map((item) => statusTranslation[item.status])),
];

export const statusTranslation = {
  registered: QueryStatusTranslate.REGISTERED,
  check: QueryStatusTranslate.CHECK,
  analysis: QueryStatusTranslate.ANALYSIS,
  accepted: QueryStatusTranslate.ACCEPTED,
  implementation: QueryStatusTranslate.IMPLEMENTATION,
  rejected: QueryStatusTranslate.REJECTED,
  done: QueryStatusTranslate.DONE,
};

export const checkExpert = (query: QueriesResponse) => {
  return (
    query.expert_users[0] ===
    Number(JSON.parse(localStorage.getItem("user")).user_id)
  );
};

export const fetchData = async (
  setIsLoading: any,
  setData: any,
  getData: any,
  arg?: any,
) => {
  setIsLoading(true);
  try {
    const { data } = arg ? await getData(arg) : await getData();
    setData(data.data);
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading && setIsLoading(false);
  }
};

export const getRouteTranslation = (
  route: string,
  pageName: string,
  pageId: number,
) => {
  switch (route) {
    case "queries":
      return "Таблица инициатив";
    case "create":
      return "Создание инициативы";
    case "editingApplication":
      return "Редактирование инициативы";
    case "settings":
      return "Настройки";
    case `adminApplication?queryId=${pageId}`:
      return pageName;
    case `editingApplication?queryId=${pageId}`:
      return `${pageName} (Редактирование)`;
    case "users":
      return "Таблица пользователей";
    case "directions":
      return "Направления"
    case `directionCard?directionId=${pageId}`:
      return pageName;
    case `editingDirection?directionId=${pageId}`:
      return `${pageName} (Редактирование)`;
		case "charts":
			return "Графики";
    case `userCard?userId=${pageId}`:
      return pageName;
    case `editingUser?userId=${pageId}`:
      return `${pageName} (Редактирование)`;
    default:
      return "";
  }
};

export function getUserName(userId: number, users: UserResponse[]) {
  const user = users.find((user) => user.id === userId);
  if (user) {
    return user.name;
  }
  return "Аноним";
}

export function getAuthor(users_id: [number], users: UserResponse[]) {
  try {
    const { name } = users.find((user) => user.id === users_id[0]);
    return name;
  } catch (e) {
    return "Не назначено";
  }
}
