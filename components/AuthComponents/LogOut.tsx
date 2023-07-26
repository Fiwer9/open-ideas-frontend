import React, {useContext} from "react";
import logout from '../../public/img/logout.svg'
import {Context} from "../../pages/_app";
import router from "next/router";
import Image from "next/image";
import styles from './styles/Logout.module.scss'

export const LogOut = () => {
    const { store } = useContext(Context);

    const handleLogout = () => {
        try {
            store.logout();
            router.push('/')
        } catch (error: any) {
            console.log(error.response?.data?.message);
        }
    }
    return (
        <div>
            <Image className={styles.logout} src={logout} width={30} alt={'Выход'} onClick={handleLogout}></Image>
        </div>
    )
}
