import { IDepartment } from "../models/IDepartment";
import { OrganizationsResponse } from "../models/response/OrganizationsResponse";
import { RatingFilters } from "../components/ratingComponents/ratingTypes";
import { FetchRatingArgs } from "../redux/ratingSlice/types";

export const buildRatingRequestParams = ({
  filters,
  searchValue,
  organizations,
  departments,
}: {
  filters: RatingFilters;
  searchValue: string;
  organizations: OrganizationsResponse[];
  departments: IDepartment[];
}): FetchRatingArgs => {
  const params: FetchRatingArgs = {};

  if (searchValue.trim()) {
    const numericSearch = Number(searchValue.trim());
    if (!Number.isNaN(numericSearch) && searchValue.trim() !== "") {
      params.rank = numericSearch;
    } else {
      params.search = searchValue.trim();
    }
  }

  if (filters.organization) {
    const organization = organizations.find(
      (item) => item.name === filters.organization
    );
    if (organization) {
      params.organization_id = organization.id;
    }
    params.organization_name = filters.organization;
  }

  if (filters.department) {
    const department = departments.find(
      (item) => item.name === filters.department
    );
    if (department) {
      params.department_id = department.id;
    }
    params.department_name = filters.department;
  }

  if (filters.periodFrom) {
    params.start_date = filters.periodFrom;
  }

  if (filters.periodTo) {
    params.end_date = filters.periodTo;
  }

  return params;
};
