export function getOrganizationName(text: number, organizations: any) {
    return organizations.map((organization: any) => {
        if (organization.id === text) {
            return organization.name
        }
    })
}

export function getOrganizationId(text: number, organizations: any) {
    return organizations.map((organization: any) => {
        if (organization.id === text) {
            return organization.id
        }
    })
}

export function formatDateToServer(date: any, separator='.') {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}${separator}${month}${separator}${day}`;
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

export const getDirectionTranslationOnEng = (direction: string) => {
    switch (direction) {
        case "Технологические процессы":
            return "tech_process";
        case "Бизнес процессы":
            return "business_process";
        case "Охрана труда":
            return "work_safety";
        case "Рабочее пространство":
            return "workspace";
        default:
            return "";
    }
}
