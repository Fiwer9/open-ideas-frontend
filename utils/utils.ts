export function getOrganizationName(text: number, organizations: any) {
    return organizations.map((organization: any) => {
        if (organization.id === text) {
            return organization.name
        }
    })
}

export const getDirectionTranslation = (direction: string) => {
    switch (direction) {
        case "tech_process":
            return "Технологические процессы";
        case "business_process":
            return "Бизнес процессы";
        case "work_safety":
            return "Охрана труда";
        case "workspace":
            return "Рабочее пространство";
        default:
            return "";
    }
}

export const getStatusTranslation = (status: string) => {
    switch (status) {
        case "registered":
            return "Зарегистрирована";
        case "check":
            return "На рассмотрении";
        case "analysis":
            return "Анализируется экспертом";
        case "accepted":
            return "На рассмотрении у руководства";
        case "implementation":
            return "Принята к реализации";
        case "rejected":
            return "Отклонена";
        case "done":
            return "Реализована";
        default:
            return "";
    }
};
