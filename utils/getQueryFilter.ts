import {
  QueriesResponse,
  QueryStatus,
} from "../models/response/QueriesResponse";

export const getQueryFilterByArchive = (
  data: QueriesResponse[],
  isArchive: boolean,
) => {
  if (isArchive) {
    return data?.filter(
      (query) =>
        query.status === QueryStatus.REJECTED ||
        query.status === QueryStatus.DONE,
    );
  }
  return data?.filter(
    (query) =>
      query.status !== QueryStatus.REJECTED &&
      query.status !== QueryStatus.DONE,
  );
};

export const getQueryFilterByExpert = (
  data: QueriesResponse[],
  isExpert: boolean,
  user_id: number,
) => {
  if (isExpert) {
    return data?.filter(
      (query) =>
        query.expert_users.includes(user_id) &&
        query.status !== QueryStatus.DONE &&
        query.status !== QueryStatus.REJECTED,
    );
  }
};
