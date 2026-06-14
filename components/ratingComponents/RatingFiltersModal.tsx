import React, { memo, useEffect } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { DatePicker, Form, Modal, Select } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import "dayjs/locale/ru";

import Logo from "../PicturesComponents/Logo";
import { Buttons } from "../ButtonComponent/Button";
import modalStyles from "../ModalsComponents/styles/Modal.module.scss";

import { RatingFilters, emptyRatingFilters } from "./ratingTypes";

import styles from "./styles/RatingFiltersModal.module.scss";

dayjs.locale("ru");

type RatingFiltersFormValues = {
  organization?: string;
  department?: string;
  periodRange?: [Dayjs, Dayjs] | null;
};

interface RatingFiltersModalProps {
  open: boolean;
  draftFilters: RatingFilters;
  organizations: string[];
  departments: string[];
  onClose: () => void;
  onSave: () => void;
  onReset: () => void;
  onChange: (filters: RatingFilters) => void;
}

const toFormValues = (filters: RatingFilters): RatingFiltersFormValues => ({
  organization: filters.organization,
  department: filters.department,
  periodRange:
    filters.periodFrom && filters.periodTo
      ? [dayjs(filters.periodFrom), dayjs(filters.periodTo)]
      : null,
});

const toRatingFilters = (values: RatingFiltersFormValues): RatingFilters => ({
  organization: values.organization,
  department: values.department,
  periodFrom: values.periodRange?.[0]?.format("YYYY-MM-DD"),
  periodTo: values.periodRange?.[1]?.format("YYYY-MM-DD"),
});

export const RatingFiltersModal: React.FC<RatingFiltersModalProps> = memo(
  ({
    open,
    draftFilters,
    organizations,
    departments,
    onClose,
    onSave,
    onReset,
    onChange,
  }) => {
    const [form] = Form.useForm<RatingFiltersFormValues>();

    useEffect(() => {
      if (open) {
        form.setFieldsValue(toFormValues(draftFilters));
      }
    }, [open, draftFilters, form]);

    const handleValuesChange = (
      _: Partial<RatingFiltersFormValues>,
      allValues: RatingFiltersFormValues
    ) => {
      onChange(toRatingFilters(allValues));
    };

    const handleReset = () => {
      form.setFieldsValue(toFormValues(emptyRatingFilters));
      onReset();
    };

    return (
      <Modal
        open={open}
        onCancel={onClose}
        footer={null}
        closable={false}
        centered
        width={440}
        destroyOnClose
        className={`${modalStyles.modalForm} ${styles.modal}`}
      >
        <div className={styles.logo}>
          <Logo width={126.82} height={36} />
        </div>

        <div className={styles.header}>
          <h2 className={styles.title}>Фильтры</h2>
          <button type="button" className={styles.resetBtn} onClick={handleReset}>
            <CloseOutlined />
            <span>Сбросить все фильтры</span>
          </button>
        </div>

        <div className={styles.divider} />

        <Form
          form={form}
          layout="vertical"
          className={styles.form}
          onValuesChange={handleValuesChange}
          initialValues={toFormValues(emptyRatingFilters)}
        >
          <Form.Item label="Организация" name="organization">
            <Select
              allowClear
              placeholder="Выбрать"
              options={organizations.map((value) => ({ value, label: value }))}
            />
          </Form.Item>
          <Form.Item label="Отдел" name="department">
            <Select
              allowClear
              placeholder="Выбрать"
              options={departments.map((value) => ({ value, label: value }))}
            />
          </Form.Item>
          <Form.Item label="Период" name="periodRange">
            <DatePicker.RangePicker
              format="DD.MM.YYYY"
              placeholder={["С", "По"]}
              className={styles.periodRange}
            />
          </Form.Item>
        </Form>

        <div className={styles.divider} />

        <div className={modalStyles.btnContainer}>
          <Buttons
            className={modalStyles.btnWhite}
            type="button"
            text="Назад"
            onClick={onClose}
          />
          <Buttons
            className={modalStyles.btnBlue}
            type="button"
            text="Сохранить"
            onClick={onSave}
          />
        </div>
      </Modal>
    );
  }
);

RatingFiltersModal.displayName = "RatingFiltersModal";
