import { createAsyncThunk } from "@reduxjs/toolkit";

import RatingService from "../../services/RatingService";
import UsersService from "../../services/UsersService";
import OrganizationsService from "../../services/OrganizationsService";
import { ResponseInterface } from "../../models/response/ResponseInterface";
import { UserRatingResponse } from "../../models/response/UserRatingResponse";
import { FetchRatingArgs } from "./types";
import {
  enrichEmployeeWithQueries,
  mapUserRatingToEmployee,
} from "../../utils/mapUserRatingToEmployee";
import {
  getResponseErrorMessage,
  normalizeRatingList,
} from "../../utils/normalizeRatingList";
import { buildRatingFromQueries } from "../../utils/buildRatingFromQueries";
import { EmployeeRecord } from "../../components/ratingComponents/ratingTypes";
import { RatingFilters } from "../../components/ratingComponents/ratingTypes";

const loadRatingsFromResponse = (
  response: ResponseInterface<UserRatingResponse[]>
) => {
  if (response.error?.is_error) {
    return {
      items: [] as UserRatingResponse[],
      count: 0,
      errorMessage: getResponseErrorMessage(response),
    };
  }

  const normalized = normalizeRatingList(response);

  return {
    ...normalized,
    errorMessage: null as string | null,
  };
};

export const fetchRatingList = createAsyncThunk<
  { employees: EmployeeRecord[]; count: number; errorMessage: string | null },
  {
    params?: FetchRatingArgs;
    filters?: RatingFilters;
  }
>("rating/fetchRatingList", async ({ params = {}, filters = {} }) => {
  const { data: querySortData } = await RatingService.getQuerySortRatings(params);
  let { items, count, errorMessage } = loadRatingsFromResponse(querySortData);

  if (!items.length) {
    const { data: analyticsData } = await RatingService.getAnalyticsRatings(params);
    const analyticsResult = loadRatingsFromResponse(analyticsData);

    if (analyticsResult.items.length) {
      items = analyticsResult.items;
      count = analyticsResult.count;
      errorMessage = null;
    } else if (!errorMessage) {
      errorMessage = analyticsResult.errorMessage;
    }
  }

  if (!items.length) {
    const [{ data: usersData }, { data: queriesData }, { data: orgsData }] =
      await Promise.all([
        UsersService.getUsers(),
        RatingService.getQueriesForRating(),
        OrganizationsService.getOrganizations(),
      ]);

    if (
      !usersData.error?.is_error &&
      !queriesData.error?.is_error &&
      Array.isArray(usersData.data) &&
      Array.isArray(queriesData.data)
    ) {
      items = buildRatingFromQueries({
        users: usersData.data,
        queries: queriesData.data,
        organizations: orgsData.error?.is_error ? [] : orgsData.data ?? [],
      });
      count = items.length;
      errorMessage = null;
    }
  }

  if (errorMessage && !items.length) {
    throw new Error(errorMessage);
  }

  return {
    employees: items.map((item) => mapUserRatingToEmployee(item, filters)),
    count,
    errorMessage: null,
  };
});

export const fetchRatingUserDetails = createAsyncThunk<
  EmployeeRecord,
  { employee: EmployeeRecord }
>("rating/fetchRatingUserDetails", async ({ employee }) => {
  const [{ data: ratingData }, { data: queriesData }] = await Promise.all([
    RatingService.getUserRatingById(employee.id),
    RatingService.getQueriesForRating(),
  ]);

  let detailedEmployee = employee;

  if (!ratingData.error.is_error && ratingData.data) {
    const user = ratingData.data as UserRatingResponse & {
      department?: { name?: string; organization?: { name?: string } };
    };

    detailedEmployee = {
      ...employee,
      employee: user.name ?? employee.employee,
      email: user.email ?? employee.email,
      rank: user.rank ?? employee.rank,
      department:
        user.department_name ??
        user.department?.name ??
        employee.department,
      organization:
        user.organization_name ??
        user.department?.organization?.name ??
        employee.organization,
      total: user.total_initiatives ?? employee.total,
      completed: user.successful_initiatives ?? employee.completed,
      rejected: user.rejected_initiatives ?? employee.rejected,
      avgImplementationTime:
        user.avg_implementation_time !== undefined &&
        user.avg_implementation_time !== null
          ? String(user.avg_implementation_time)
          : employee.avgImplementationTime,
      initiativesSummary: {
        total: user.total_initiatives ?? employee.initiativesSummary.total,
        completed:
          user.successful_initiatives ?? employee.initiativesSummary.completed,
        rejected:
          user.rejected_initiatives ?? employee.initiativesSummary.rejected,
      },
    };
  }

  if (!queriesData.error.is_error && Array.isArray(queriesData.data)) {
    detailedEmployee = enrichEmployeeWithQueries(
      detailedEmployee,
      queriesData.data
    );
  }

  return detailedEmployee;
});
