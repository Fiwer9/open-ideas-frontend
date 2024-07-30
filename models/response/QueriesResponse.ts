export enum QueryStatus {
  REGISTERED = "registered",
  CHECK = "check",
  ANALYSIS = "analysis",
  ACCEPTED = "accepted",
  IMPLEMENTATION = "implementation",
  REJECTED = "rejected",
  DONE = "done",
}

export enum QueryStatusTranslate {
  REGISTERED = "Зарегистрирована",
  CHECK = "На рассмотрении",
  ANALYSIS = "Анализируется экспертом",
  ACCEPTED = "На рассмотрении у руководства",
  IMPLEMENTATION = "Принята к реализации",
  REJECTED = "Отклонена",
  DONE = "Выполнена",
}

export interface QueriesResponse {
  id?: number;
  date: string;
  name: string;
  description: string;
  initiative_direction: number;
  status: QueryStatus;
  implementation_effect: string;
  organization: number;
  planned_implementation_date: string;
  initiator_users: [number];
  expert_users?: [number];
}
