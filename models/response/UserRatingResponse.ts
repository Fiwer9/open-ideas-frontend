import { QueryStatus } from "./QueriesResponse";

export interface UserRatingRecentInitiative {
  id: number;
  name: string;
  date: string;
  status: QueryStatus | string;
}

export interface UserRatingResponse {
  id: number;
  name: string;
  email: string;
  rank: number;
  department_id?: number;
  department_name?: string;
  department_organization_id?: number;
  department_organization_name?: string;
  organization_id?: number;
  organization_name?: string;
  total_initiatives?: number;
  successful_initiatives?: number;
  rejected_initiatives?: number;
  last_initiative_date?: string | null;
  score?: number;
  avg_implementation_time?: string | number | null;
  recent_initiatives?: UserRatingRecentInitiative[];
}
