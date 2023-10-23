import React from "react";
import styles from "./styles/EditingApplication.module.scss";
import { Slider } from "../SliderComponents/SliderComponents";
import { Button, Form, Input, Select, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Header } from "../HeaderComponents/Header";
import { Tabs } from "../TabsComponent/Tabs";
import { UploadOutlined } from "@ant-design/icons";


export const EditingApplication = () => {

  return (
    <>
      <div className={styles.container}>
        <Slider />
        <div className={styles.content}>
          <Header user_name={'Иванов Иван Иванович'} organization={'Aratrum'} department={'Отдел'}/>
          <Tabs />
          <Form
            layout="vertical"
            className={styles.contentContainer}
          >
            <p className={styles.textHeader}>Редактирование инициативы</p>

            <div className={styles.inpContainer}>
              <div className={styles.formContainer}>
                <Form.Item
                  className={styles.formItem}
                  label={"Инициатива (Идея)"}
                  name={"initiative"}
                  rules={[{
                    required: true,
                    message: 'Введите название инициативы'
                  }]}
                >
                  <Input className={styles.inp} />
                </Form.Item>
                <Form.Item
                  className={styles.formItem}
                  label={'Описание инициативы'}
                  name={'description'}
                  rules={[{
                    required: true,
                    message: 'Введите описание инициативы'
                  }]}
                >
                  <TextArea
                    className={styles.formField}
                    rows={5}
                    required
                  />
                </Form.Item>
                <Form.Item
                  className={styles.formItem}
                  label={'Эффект от доработки'}
                  name={'modification'}
                  rules={[{
                    required: true,
                    message: 'Введите эффект от доработки'
                  }]}
                >
                  <TextArea
                    className={styles.formField}
                    rows={5}
                    required
                  />
                </Form.Item>
                <Form.Item
                  className={styles.formItem}
                  label={'Направление'}
                  name={'direction'}
                  rules={[{
                    required: true,
                    message: 'Выберете направление инициативы'
                  }]}
                >
                  <Select
                    className='select'
                    style={{height: 40}}
                    defaultValue="Направление инициативы"
                    options={[
                      { value: 'value1', label: 'Технические процессы' },
                      { value: 'value2', label: 'IT процессы' },
                      { value: 'value3', label: 'Рабочие процессы' },
                    ]}
                    aria-required={true}
                  />
                </Form.Item>
                <Form.Item
                  className={styles.formItem}
                  label={'Организация'}
                  name={'organization'}
                  rules={[{
                    required: true,
                    message: 'Выберете организацию'
                  }]}
                >
                  <Select
                    className='select'
                    style={{height: 40}}
                    defaultValue="Организация"
                    options={[
                      { value: 'value1', label: 'LamArt' },
                      { value: 'value2', label: 'Aratrum' },
                      { value: 'value3', label: 'Газпром' },
                    ]}
                    aria-required={true}
                  />
                </Form.Item>
                <Form.Item
                  className={styles.formItem}
                  label={'Отдел'}
                  name={'department'}
                  rules={[{
                    required: true,
                    message: 'Выберете отдел'
                  }]}
                >
                  <Select
                    className='select'
                    style={{height: 40}}
                    defaultValue="Отдел"
                    options={[
                      { value: 'value1', label: 'IT отдел' },
                      { value: 'value2', label: 'Юридический отдел' },
                      { value: 'value3', label: 'Экономический отдел' },
                    ]}
                    aria-required={true}
                  />
                </Form.Item>
                <Form.Item
                  className={styles.formItem}
                  label={'Назначенный эксперт'}
                  name={'expert'}
                  rules={[{
                    required: true,
                    message: 'Выберете эксперта'
                  }]}
                >
                  <Select
                    className='select'
                    style={{height: 40}}
                    defaultValue="Назначенный эксперт"
                    options={[
                      { value: 'value1', label: 'Иванов Олег' },
                      { value: 'value2', label: 'Иванов Иван' },
                      { value: 'value3', label: 'Иванов Дмитрий' },
                    ]}
                    aria-required={true}
                  />
                </Form.Item>
              </div>

              <div className={styles.files}>
                <Form.Item
                  className={styles.formItem}
                  label={'Дополнительные файлы'}
                  name={'file'}
                >
                  <Upload
                    maxCount={5}
                    accept=".webm, .pdf, .doc, .docx, .odt, .xml, application/*, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, image/*, .png, video/*, audio/*"
                    multiple
                    className='upload'
                  >
                    <Button className='uploadBtn' icon={<UploadOutlined />}>Загрузить</Button>
                  </Upload>
                </Form.Item>
              </div>
            </div>
          </Form>

          <div className={styles.btnContainer}>
            <Button className={styles.btnFooter}>
              <span>Сохранить изменения</span></Button>
          </div>
        </div>
      </div>
    </>
  );
};
