import { QueriesResponse, QueryStatus } from "../models/response/QueriesResponse";
import { UserRatingResponse } from "../models/response/UserRatingResponse";
import { EmployeeRecord, RecentInitiative } from "../components/ratingComponents/ratingTypes";
import { RatingFilters } from "../components/ratingComponents/ratingTypes";
import { formatDate, statusTranslation } from "./utils";

const formatAvgImplementationTime = (
  value: string | number | null | undefined
) => {
  if (value === null || value === undefined || value === "") {
    return "—";
  }
  return String(value);
};

const mapRecentInitiatives = (
  initiatives: UserRatingResponse["recent_initiatives"]
): RecentInitiative[] =>
  (initiatives ?? []).map((item) => ({
    id: item.id,
    title: item.name,
    date: item.date ? formatDate(item.date) : "—",
    status:
      typeof item.status === "string" && item.status in statusTranslation
        ? statusTranslation[item.status as QueryStatus]
        : String(item.status),
  }));

export const mapUserRatingToEmployee = (
  user: UserRatingResponse,
  filters: RatingFilters = {}
): EmployeeRecord => ({
  id: user.id,
  employee: user.name,
  rank: user.rank ?? 0,
  organization:
    user.organization_name ?? user.department_organization_name ?? "—",
  department: user.department_name ?? "—",
  periodStart: filters.periodFrom ?? "",
  periodEnd: filters.periodTo ?? "",
  total: user.total_initiatives ?? 0,
  completed: user.successful_initiatives ?? 0,
  rejected: user.rejected_initiatives ?? 0,
  avgImplementationTime: formatAvgImplementationTime(
    user.avg_implementation_time
  ),
  email: user.email,
  initiativesSummary: {
    total: user.total_initiatives ?? 0,
    completed: user.successful_initiatives ?? 0,
    rejected: user.rejected_initiatives ?? 0,
  },
  recentInitiatives: mapRecentInitiatives(user.recent_initiatives),
});

export const enrichEmployeeWithQueries = (
  employee: EmployeeRecord,
  queries: QueriesResponse[]
): EmployeeRecord => {
  const userQueries = queries.filter((query) =>
    (query.initiator_users ?? []).some((userId) => userId === employee.id)
  );

  if (!userQueries.length) {
    return employee;
  }

  const completed = userQueries.filter(
    (query) => query.status === QueryStatus.DONE
  ).length;
  const rejected = userQueries.filter(
    (query) => query.status === QueryStatus.REJECTED
  ).length;

  const recentInitiatives: RecentInitiative[] = [...userQueries]
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    .slice(0, 3)
    .map((query) => ({
      id: query.id ?? 0,
      title: query.name,
      date: query.date ? formatDate(query.date) : "—",
      status: statusTranslation[query.status],
    }));

  return {
    ...employee,
    total: userQueries.length,
    completed,
    rejected,
    initiativesSummary: {
      total: userQueries.length,
      completed,
      rejected,
    },
    recentInitiatives:
      recentInitiatives.length > 0
        ? recentInitiatives
        : employee.recentInitiatives,
  };
};
