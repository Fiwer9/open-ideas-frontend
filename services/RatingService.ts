import { AxiosResponse } from "axios";

import $api, { API_URL_TOKEN } from "../http";
import { QueriesResponse } from "../models/response/QueriesResponse";
import { ResponseInterface } from "../models/response/ResponseInterface";
import { UserRatingResponse } from "../models/response/UserRatingResponse";
import { FetchRatingArgs } from "../redux/ratingSlice/types";

export default class RatingService {
  static async getQuerySortRatings(
    params: FetchRatingArgs = {}
  ): Promise<AxiosResponse<ResponseInterface<UserRatingResponse[]>>> {
    return $api.get("/users/query_sort/", {
      params: {
        search: params.search,
        rank: params.rank,
        organization_name: params.organization_name,
        department_name: params.department_name,
        start_date: params.start_date,
        end_date: params.end_date,
      },
    });
  }

  static async getAnalyticsRatings(
    params: FetchRatingArgs = {}
  ): Promise<AxiosResponse<ResponseInterface<UserRatingResponse[]>>> {
    return $api.get(`${API_URL_TOKEN}/analytics/user-rating/`, {
      params: {
        search: params.search,
        organization_id: params.organization_id,
        department_id: params.department_id,
        period: params.period ?? "all_time",
        ordering: params.ordering ?? "-score",
        page: params.page,
        page_size: params.page_size,
      },
    });
  }

  static async getUserRatingById(
    userId: number
  ): Promise<AxiosResponse<ResponseInterface<UserRatingResponse>>> {
    return $api.get(`/users/user_rating/${userId}/`);
  }

  static async getQueriesForRating(): Promise<
    AxiosResponse<ResponseInterface<QueriesResponse[]>>
  > {
    return $api.get("/queries/queries/");
  }
}
