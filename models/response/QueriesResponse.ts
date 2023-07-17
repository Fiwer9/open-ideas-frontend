export interface QueriesResponse {
    id: number;
    date: string;
    name: string;
    description: string;
    initiative_direction: string;
    status: string;
    implementation_effect: string;
    organization: number;
    initiator_users: [number];
    expert_users: [];
}
