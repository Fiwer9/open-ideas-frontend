import React, { useEffect, useState } from "react";
import AdminPageLayout from "../AdminPageLayout";
import { Button } from "antd";
import router from "next/router";
import { changeIsModalSubmitActive } from "../../redux/modalsSlice/slice";
import { useAppDispatch } from "../../redux/store";
import ModalAdditionalText from "../ModalsComponents/ModalAdditionalText";

import styles from './styles/DirectionCard.module.scss'
import {setPageId, setPageName} from "../../redux/menuSlice/slice";
import {useSelector} from "react-redux";
import {selectDirection, selectStatusDirections} from "../../redux/directionsSlice/selectors";
import {deleteDirection, getDirectionById} from "../../redux/directionsSlice/asyncActions";
import {selectUsers, selectUsersStatus} from "../../redux/usersSlice/selectors";
import {fetchUsers} from "../../redux/usersSlice/asyncActions";
import {Status} from "../../redux/queriesSlice/types";
import AdminQuerySkeleton from "../SkeletonComponents/AdminQuerySkeleton";

const DirectionCard: React.FC = () => {
    const { directionId } = router.query as { directionId: string };
    const [isLoading, setIsLoading] = useState(true);
    const currentDirection = useSelector(selectDirection);
    const users = useSelector(selectUsers);
    const statusDirections = useSelector(selectStatusDirections);
    const statusUsers = useSelector(selectUsersStatus);
    const experts = currentDirection.experts && users.filter((user) => currentDirection.experts.indexOf(user.id) !== -1)
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        setTimeout(() => {
            if (
              statusDirections === Status.SUCCESS &&
              statusUsers === Status.SUCCESS
            ) {
                setIsLoading(false);
            }
        }, 1000);
    }, [statusDirections, statusUsers]);

    const handleDeleteDirection = async () => {
        dispatch(changeIsModalSubmitActive(false));
        await dispatch(deleteDirection(Number(directionId)))
        await router.push("/directions");
    };
    
    const fetchData = async () => {
        await dispatch(getDirectionById(Number(directionId)));
        await dispatch(fetchUsers());
        dispatch(setPageId(Number(directionId)));
    }
    
    useEffect(() => {
        directionId && fetchData();
    }, [directionId]);
    
    useEffect(() => {
        currentDirection?.name && dispatch(setPageName(currentDirection.name));
    }, [currentDirection?.name]);
    
    return (
      <>
        <AdminPageLayout>
            {!isLoading ? (
            <div className={styles.content}>
                <div className={styles.nameDirection}>
                    <p className={styles.name}>{currentDirection.name}</p>
                    <p className={styles.date}>Дата создания 25 ноября 2022 г. в 15:25</p>
                </div>

                <div className={styles.infContent}>
                    <div className={styles.row}>
                        <p className={styles.rowText}>Описание направления</p>
                        <p className={styles.rowInf}>
                            {currentDirection.description}
                        </p>
                    </div>

                    <div className={styles.row}>
                        <p className={styles.rowText}>Прикреплённые эксперты</p>
                        <p className={styles.rowInf}>{experts && experts.map((expert) => expert.name).join(', ')}</p>
                    </div>
                </div>
            </div>
              ) : (
              <AdminQuerySkeleton />
              )}
            <div className={styles.btnContainer}>
                <Button
                    type="primary"
                    className={styles.btnBlue}
                    onClick={() => {router.push(`/directions/editingDirection?directionId=${currentDirection.id}`)}}
                >
                    Редактировать данные направления
                </Button>
                <Button
                    danger
                    className={styles.btnRed}
                    onClick={() => {dispatch(changeIsModalSubmitActive(true))}}
                >
                    Удалить направление
                </Button>
            </div>
        </AdminPageLayout>

        <ModalAdditionalText
            text={"Удалить направление?"}
            additionalText={"Восстановить будет невозможно"}
            buttonText={"Удалить направление"}
            handleOk={handleDeleteDirection}
        />
      </>
    );
  };

export default DirectionCard;