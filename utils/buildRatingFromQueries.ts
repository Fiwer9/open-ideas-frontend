import { IDepartment } from "../models/IDepartment";
import { OrganizationsResponse } from "../models/response/OrganizationsResponse";
import {
  QueriesResponse,
  QueryStatus,
} from "../models/response/QueriesResponse";
import { UserRatingResponse } from "../models/response/UserRatingResponse";
import { UserResponse } from "../models/response/UserResponse";

const getOrganizationName = (
  organizationId: number | undefined,
  organizations: OrganizationsResponse[]
) =>
  organizations.find((organization) => organization.id === organizationId)
    ?.name ?? "—";

export const buildRatingFromQueries = ({
  users,
  queries,
  organizations,
}: {
  users: UserResponse[];
  queries: QueriesResponse[];
  organizations: OrganizationsResponse[];
}): UserRatingResponse[] => {
  const stats = new Map<
    number,
    {
      total: number;
      completed: number;
      rejected: number;
      lastDate: string | null;
    }
  >();

  for (const query of queries) {
    for (const userId of query.initiator_users ?? []) {
      const current = stats.get(userId) ?? {
        total: 0,
        completed: 0,
        rejected: 0,
        lastDate: null,
      };

      current.total += 1;
      if (query.status === QueryStatus.DONE) {
        current.completed += 1;
      }
      if (query.status === QueryStatus.REJECTED) {
        current.rejected += 1;
      }
      if (!current.lastDate || query.date > current.lastDate) {
        current.lastDate = query.date;
      }

      stats.set(userId, current);
    }
  }

  const ratedUsers = users
    .filter((user) => stats.has(user.id))
    .map((user) => {
      const stat = stats.get(user.id)!;
      const department = user.department as IDepartment | undefined;

      const rating: UserRatingResponse = {
        id: user.id,
        name: user.name,
        email: user.email,
        rank: 0,
        department_id: department?.id,
        department_name: department?.name,
        organization_id: department?.organization,
        organization_name: getOrganizationName(
          department?.organization,
          organizations
        ),
        total_initiatives: stat.total,
        successful_initiatives: stat.completed,
        rejected_initiatives: stat.rejected,
        last_initiative_date: stat.lastDate,
      };

      return rating;
    })
    .sort(
      (a, b) =>
        (b.successful_initiatives ?? 0) - (a.successful_initiatives ?? 0) ||
        (b.total_initiatives ?? 0) - (a.total_initiatives ?? 0)
    )
    .map((user, index) => ({
      ...user,
      rank: index + 1,
    }));

  return ratedUsers;
};
