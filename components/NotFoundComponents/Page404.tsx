import React, { memo } from "react";
import Image from "next/image";
import { Logo } from "../PicturesComponents/Logo";
import { Button } from "antd";
import Standart404 from '../../public/img/404.svg'
import router from "next/router";

import styles from './styles/Page404.module.scss'

const Page404: React.FC = memo(() => {
  
    return (
      <>
        <div className={styles.container404}>
            <div className={styles.logoContainer}>
                <div className={styles.logo}>
                    <Logo width={228} height={59} className={styles.logo404}/>
                </div>
            </div>

            <div className={styles.content404}>
                <Image src={Standart404} alt={"404"} className={styles.image} layout='responsive' />
                <div className={styles.infPage404}>
                    <p className={styles.title404}>Страница не найдена</p>
                    <p className={styles.text404}>К сожалению, страница не нашлась. Вернитесь на главную <br/> 
                                                    страницу и попробуйте снова или напишите на нашу почту: <br/> 
                                                    <strong>help@aratrum.ru</strong>
                    </p>
                    <Button 
                        className={styles.btn404} 
                        type="primary"
                        size="large"
                        onClick={() => {router.push(`/queries`)}}
                    >
                            Вернуться на главную
                    </Button>
                </div>
            </div>
        </div>
      </>
    );
  });

export default Page404;