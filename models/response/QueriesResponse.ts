export interface QueriesResponse {
  id?: number;
  date: string;
  name: string;
  description: string;
  initiative_direction: number;
  status:
    | "registered"
    | "check"
    | "analysis"
    | "accepted"
    | "implementation"
    | "rejected"
    | "done"
    | "";
  implementation_effect: string;
  organization: number;
  initiator_users: [number];
  expert_users?: [number];
}
