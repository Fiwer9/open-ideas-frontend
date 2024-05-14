import React, { memo, useState } from "react";
import { DirectionItem } from "./DirectionItem";
import AdminPageLayout from "../AdminPageLayout";
import { MainText } from "../MainTextComponent";
import { PlusCircleOutlined } from "@ant-design/icons";
import FilterBar from "../FilterComponents/blocks/FilterBar";
import router from "next/router";
import ModalCreateDirection from "../ModalsComponents/ModalCreateDirection";

import styles from './styles/DirectionsPage.module.scss'

interface directionsProps {
	nameDirection: string
	titleDescr: string
	textDescr: string
	titleExperts: string
	textExperts: string
};

const directionsInf: directionsProps = {
    nameDirection: 'Производственное',
    titleDescr: 'Описание направления',
    textDescr: 'Направление занимающийся планово - экономическим обоснованием деятельности производства. Направление занимающийся планово - экономическим обоснованием деятельности производства.Направление занимающийся планово - экономическим обоснованием деятельности производства.Направление занимающийся планово - экономическим обоснованием деятельности производства.',
    titleExperts:  'Прикреплённые эксперты',
    textExperts: 'Иванов И. И., Бабушкин Б.Б., Иванов И. И., Бабушкин Б.Б.,Бабушкин Б.Б.,'
};

export const DirectionsPage: React.FC = memo(() => {
    const [modalCreateDirection, setModalCreateDirection] = useState(false);

    const closeModal = () => {
        setModalCreateDirection(false);
    };
  
    return (
      <>
        <AdminPageLayout>
            <div className={styles.headerDirectionPage}>
                <MainText text={"Направления"} />
                <FilterBar
                        icon={<PlusCircleOutlined />}
                        filterText={"Добавить направление"}
                        onClick={() => {
                            setModalCreateDirection(true);
                        }}
                />
            </div>
            <div className={styles.directionsPage}>
                <DirectionItem 
                    directionsInf = {directionsInf}
                    onClickCard={() => router.push(`/directions/directionCard`)}
                />
                <DirectionItem 
                    directionsInf = {directionsInf}
                    onClickCard={() => router.push(`/directions/directionCard`)}
                />
                <DirectionItem 
                    directionsInf = {directionsInf}
                    onClickCard={() => router.push(`/directions/directionCard`)}
                />
            </div>
        </AdminPageLayout>

        <ModalCreateDirection
            active={modalCreateDirection}
            setActive={setModalCreateDirection}
            onClickCancel={closeModal}
            onClickCreate={() => router.push(`/directions/directionCard`)}
        />
      </>
    );
  });