import $api from "../../http";

export const login = async (email: string) => {
    try {
        console.log(email)
        const response = await $api.post('/auth/login', { email });
        return response.data;
    } catch (error: any) {
        console.log(error)
        throw error.response.data;
    }
};

export const logout = async () => {
    try {
        const response = await $api.post('/auth/logout');
        return response.data;
    } catch (error: any) {
        throw error.response.data;
    }
};
