export type RecentInitiative = {
  id: number;
  title: string;
  date: string;
  status: string;
};

export type RatingFilters = {
  organization?: string;
  department?: string;
  periodFrom?: string;
  periodTo?: string;
};

export const emptyRatingFilters: RatingFilters = {};

export type EmployeeRecord = {
  id: number;
  employee: string;
  rank: number;
  organization: string;
  department: string;
  periodStart: string;
  periodEnd: string;
  total: number;
  completed: number;
  rejected: number;
  avgImplementationTime: string;
  email: string;
  initiativesSummary: {
    total: number;
    completed: number;
    rejected: number;
  };
  recentInitiatives: RecentInitiative[];
};

export const defaultRecentInitiatives: RecentInitiative[] = [
  {
    id: 1,
    title: "Сделать прикольно",
    date: "25.04.2026",
    status: "В процессе",
  },
  {
    id: 2,
    title: "Сделать прикольно",
    date: "25.04.2026",
    status: "В процессе",
  },
  {
    id: 3,
    title: "Сделать прикольно",
    date: "25.04.2026",
    status: "В процессе",
  },
];
