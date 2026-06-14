import dayjs from "dayjs";

import { EmployeeRecord, RatingFilters } from "./ratingTypes";

const overlapsPeriod = (
  employeeStart: string,
  employeeEnd: string,
  filterFrom?: string,
  filterTo?: string
) => {
  if (!filterFrom && !filterTo) {
    return true;
  }

  const empStart = dayjs(employeeStart);
  const empEnd = dayjs(employeeEnd);
  const from = filterFrom ? dayjs(filterFrom) : null;
  const to = filterTo ? dayjs(filterTo) : null;

  if (from && empEnd.isBefore(from, "day")) {
    return false;
  }
  if (to && empStart.isAfter(to, "day")) {
    return false;
  }

  return true;
};

export const filterEmployees = (
  employees: EmployeeRecord[],
  filters: RatingFilters
) =>
  employees.filter((employee) => {
    if (filters.organization && employee.organization !== filters.organization) {
      return false;
    }
    if (filters.department && employee.department !== filters.department) {
      return false;
    }
    if (
      !overlapsPeriod(
        employee.periodStart,
        employee.periodEnd,
        filters.periodFrom,
        filters.periodTo
      )
    ) {
      return false;
    }
    return true;
  });

export const getUniqueFilterOptions = (employees: EmployeeRecord[]) => ({
  organizations: [...new Set(employees.map((e) => e.organization))],
  departments: [...new Set(employees.map((e) => e.department))],
});
