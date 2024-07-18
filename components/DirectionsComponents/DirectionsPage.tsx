import React, {memo, useEffect, useState} from "react";
import AdminPageLayout from "../AdminPageLayout";
import {MainText} from "../MainTextComponent";
import {PlusCircleOutlined} from "@ant-design/icons";
import FilterBar from "../FilterComponents/blocks/FilterBar";
import router from "next/router";
import ModalCreateDirection from "../ModalsComponents/ModalCreateDirection";
import styles from './styles/DirectionsPage.module.scss'
import DirectionItem from "./DirectionItem";
import {useSelector} from "react-redux";
import {selectDirections, selectStatusDirections} from "../../redux/directionsSlice/selectors";
import {useAppDispatch} from "../../redux/store";
import {Status} from "../../redux/queriesSlice/types";
import {createDirection, fetchDirections} from "../../redux/directionsSlice/asyncActions";
import {selectUsers, selectUsersStatus} from "../../redux/usersSlice/selectors";
import {fetchUsers} from "../../redux/usersSlice/asyncActions";
import {DirectionResponse} from "../../models/response/DirectionResponse";
import {PostDirectionArgs} from "../../redux/directionsSlice/types";
import {setStatusDirections} from "../../redux/directionsSlice/slice";

const DirectionsPage: React.FC = memo(() => {
    const [isLoading, setIsLoading] = useState(true);
    const directions = useSelector(selectDirections);
    const users = useSelector(selectUsers);
    const directionsStatus = useSelector(selectStatusDirections);
    const usersStatus = useSelector(selectUsersStatus);
    const dispatch = useAppDispatch();
    const [modalCreateDirection, setModalCreateDirection] = useState(false);
    const closeModal = () => {
        setModalCreateDirection(false);
    };
    
    const createDirectionModal = async (data: PostDirectionArgs) => {
        await dispatch(createDirection(data))
        dispatch(setStatusDirections(Status.WAITING))
        setModalCreateDirection(false);
    }
    
    const fetchData = async () => {
        await dispatch(fetchDirections());
        await dispatch(fetchUsers());
    }
    
    useEffect(() => {
        if (
          directionsStatus === Status.SUCCESS &&
          usersStatus === Status.SUCCESS
        )
        {
            setIsLoading(false);
        }
    }, [directionsStatus, usersStatus])
    
    useEffect(() => {
        fetchData()
    }, [])
    
    const handleDirectionItemClick = (direction: DirectionResponse) => {
        router.push(`/directions/directionCard?directionId=${direction.id}`)
    }
  
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
                {directions.map((direction) =>
                  <DirectionItem
                    direction={direction}
                    users={users}
                    onClickCard={() => handleDirectionItemClick(direction)}
                  />
                )}
            </div>
        </AdminPageLayout>

        <ModalCreateDirection
            active={modalCreateDirection}
            setActive={setModalCreateDirection}
            users={users}
            onClickCancel={closeModal}
        />
      </>
    );
  });

  export default DirectionsPage;