import React, { memo } from "react";
import { DirectionItem } from "./DirectionItem";
import AdminPageLayout from "../AdminPageLayout";
import { MainText } from "../MainTextComponent";
import { PlusCircleOutlined } from "@ant-design/icons";
import FilterBar from "../FilterComponents/blocks/FilterBar";
import router from "next/router";

import styles from './styles/DirectionsPage.module.scss'

export const DirectionsPage: React.FC = memo(() => {
    const handleCreateQuery = () => {
        router.push("/queries/create");
    };
  
    return (
      <>
        <AdminPageLayout>
            <div className={styles.headerDirectionPage}>
                <MainText text={"Направления"} />
                <FilterBar
                        icon={<PlusCircleOutlined />}
                        filterText={"Добавить направление"}
                        onClick={handleCreateQuery}
                />
            </div>
            <div className={styles.directionsPage}>
                <DirectionItem 
                    nameDirection={'Производственное'}
                    titleDescr={'Описание направления'}
                    textDescr={'Направление занимающийся планово - экономическим обоснованием деятельности производства. Направление занимающийся планово - экономическим обоснованием деятельности производства.Направление занимающийся планово - экономическим обоснованием деятельности производства.Направление занимающийся планово - экономическим обоснованием деятельности производства.'}
                    titleExperts={'Прикреплённые эксперты'}
                    textExperts={'Иванов И. И., Бабушкин Б.Б., Иванов И. И., Бабушкин Б.Б.,Бабушкин Б.Б.,'}
                />
                <DirectionItem 
                    nameDirection={'Производственное'}
                    titleDescr={'Описание направления'}
                    textDescr={'Направление занимающийся планово - экономическим обоснованием деятельности производства. Направление занимающийся планово - экономическим обоснованием деятельности производства.Направление занимающийся планово - экономическим обоснованием деятельности производства.Направление занимающийся планово - экономическим обоснованием деятельности производства.'}
                    titleExperts={'Прикреплённые эксперты'}
                    textExperts={'Иванов И. И., Бабушкин Б.Б., Иванов И. И., Бабушкин Б.Б.,Бабушкин Б.Б.,'}
                />
                <DirectionItem 
                    nameDirection={'Производственное'}
                    titleDescr={'Описание направления'}
                    textDescr={'Направление занимающийся планово - экономическим обоснованием деятельности производства. Направление занимающийся планово - экономическим обоснованием деятельности производства.Направление занимающийся планово - экономическим обоснованием деятельности производства.Направление занимающийся планово - экономическим обоснованием деятельности производства.'}
                    titleExperts={'Прикреплённые эксперты'}
                    textExperts={'Иванов И. И., Бабушкин Б.Б., Иванов И. И., Бабушкин Б.Б.,Бабушкин Б.Б.,'}
                />
            </div>
        </AdminPageLayout>
      </>
    );
  });