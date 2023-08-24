import {useEffect, useState} from "react";
import {useRouter} from "next/router";

export const useAuthenticatedUser = () => {
    const router = useRouter();
    const [isUserAuthorized, setIsUserAuthorized] = useState(false)

    useEffect(() => {
        const checkUserStatus = () => {
            if (!sessionStorage.getItem('user_id')) {
                router.push('/')
                return false
            } else {
                return true
            }
        };

        setIsUserAuthorized(checkUserStatus());
    }, []);


    return isUserAuthorized
};
