import {
  QueriesResponse,
  QueryStatus,
} from "../models/response/QueriesResponse";

export const getQueryFilterByArchive = (
  data: QueriesResponse[],
  isArchive: boolean
): QueriesResponse[] => {
  if (isArchive) {
    return data.filter(
      (query) =>
        query.status === QueryStatus.REJECTED ||
        query.status === QueryStatus.DONE
    );
  }

  return data.filter(
    (query) =>
      query.status !== QueryStatus.REJECTED && query.status !== QueryStatus.DONE
  );
};

export const getQueryFilterByExpert = (
  data: QueriesResponse[],
  isExpert: boolean,
  user_id: number
): QueriesResponse[] => {
  if (!isExpert) {
    return data;
  }

  return data.filter(
    (query) =>
      query.expert_users?.includes(user_id) &&
      query.status !== QueryStatus.DONE &&
      query.status !== QueryStatus.REJECTED
  );
};
