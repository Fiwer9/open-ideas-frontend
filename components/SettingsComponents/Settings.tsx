import { Slider } from "../SliderComponents/SliderComponents";
import styles from "./styles/Settings.module.scss";
import { Col, InputNumber } from "antd";
import React from "react";
import { Header } from "../HeaderComponents/Header";
import { Tabs } from "../TabsComponent/Tabs";
import { MainText } from "../MainTextComponent";
import SwitchBar from "../FilterComponents/blocks/SwitchBar";



export const Settings = () => {

  return (
    <>
      <div className={styles.container}>
        <Slider/>
        <div className={styles.content}>
          <Header user_name={'Иванов Иван Иванович'} organization={'Aratrum'} department={'Отдел'}/>
          <Tabs />
          <MainText text={'Настройки'}/>
          <div className={styles.settingsContainer}>
            <Col className={styles.column}>
              <div className={styles.row}>
                <p className={styles.rowText}>Почта</p>
              </div>
              <div className={styles.row}>
                <p className={styles.rowText}>Максимальное число загружаемых файлов</p>
                <InputNumber className={'inputNumber'} min={0} defaultValue={1} />
              </div>
              <div className={styles.row}>
                <p className={styles.rowText}>Максимальный размер файла</p>
                <InputNumber className={'inputNumber'} min={0} defaultValue={1024} />
              </div>
            </Col>

            <div className={styles.switchContainer}>
              <SwitchBar
                checkboxText={'Анонимные инициативы'}
                hintText={'Возможность изменять поле Ф. И. О. при создании инициативы'}
              />
              <SwitchBar
                checkboxText={'Прикладывание файлов'}
                hintText={'Возможность прикладывать файлы при создании инициативы'}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
