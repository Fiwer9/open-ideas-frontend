import React, { memo } from "react";
import Image from "next/image";
import { Logo } from "../PicturesComponents/Logo";

import styles from './styles/Page404.module.scss'
import { Button } from "antd";
import Standart404 from '../../public/img/404.png'

const Page404: React.FC = memo(() => {
  
    return (
      <>
        <div className={styles.container404}>
            <div className={styles.logoContainer}>
                <div className={styles.logo}>
                    <Logo width={200} height={50}/>
                </div>
            </div>

            <div className={styles.content404}>
                <Image src={Standart404} alt={"404"} />
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