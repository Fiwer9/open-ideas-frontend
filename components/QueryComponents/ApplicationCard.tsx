import React, {useContext, useEffect, useState} from "react";
import {Card, Form} from "antd";
import {HeartOutlined} from "@ant-design/icons";
import {Row, Col} from "antd";
import {Logo} from "../PicturesComponents/Logo";
import {Buttons} from "../ButtonComponent/Button";

import styles from "./styles/ApplicationCard.module.scss";
import router from "next/router";
import QueriesService from "../../services/QueriesService";
import OrganizationsService from "../../services/OrganizationsService";
import {QueriesResponse} from "../../models/response/QueriesResponse";
import {getDirectionTranslation, getOrganizationName, getStatusTranslation} from "../../utils/utils";
import {OrganizationsResponse} from "../../models/response/OrganizationsResponse";
import CommentService from "../../services/CommentService";
import {CommentResponse} from "../../models/response/CommentResponse";
import UsersService from "../../services/UsersService";
import {UserResponse} from "../../models/response/UserResponse";
import {Context} from "../../pages/_app";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";

export const ApplicationCard = ({queryId}: { queryId: string }, {children}: any) => {
    const [isLoading, setIsLoading] = useState(false);
    const [organization, setOrganization] = useState<OrganizationsResponse[]>([])
    const [commentValue, setCommentValue] = useState('');
    const [dataComment, setDataComment] = useState<CommentResponse[]>([])
    const [users, setUsers] = useState<UserResponse[]>([])
    const { store } = useContext(Context);
    const [applicationData, setApplicationData] = useState<QueriesResponse>({
        name: '',
        initiator_users: [],
        implementation_effect: '',
        initiative_direction: '',
        organization: 0,
        expert_users: [],
        status: '',
        description: '',
        date: '',
        id: 0
    })

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const data = await QueriesService.getQueriesTableDataById(queryId)
                const organizations = await OrganizationsService.getOrganizations()
                setApplicationData(data.data)
                setOrganization(organizations.data)
                console.log(applicationData)
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false)
            }
        }
        queryId ? fetchData() : router.push('/queries')

    }, [queryId])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await CommentService.getComments()
                const users = await UsersService.getUsers()
                setDataComment(data.data)
                setUsers(users.data)
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [])

    function getStatusClassName(status: string) {
        switch (status) {
            case 'registered':
                return styles.statusRegistered;
            case 'check':
                return styles.statusCheck;
            case 'analysis':
                return styles.statusAnalysis;
            case 'accepted':
                return styles.statusAccepted;
            case 'implementation':
                return styles.statusImplementation;
            case 'rejected':
                return styles.statusRejected;
            case 'done':
                return styles.statusDone;
            default:
                return '';
        }
    }

    function getUserName(userId: number) {
        return users.map((user: any) => {
            if (user.id === userId) {
                return user.name
            }
        })
    }

    function getStatusUser(userId: number) {
        return users.map((user: any) => {
            if (user.id === userId) {
                return user.groups.map((group: any) => group.name)
            }
        })
    }

    function formatDate(date: string) {
        const currentDate = date.split('T')
        return dayjs(currentDate[0], 'YYYY-MM-DD').format('DD.MM.YYYY')
    }

    function getLikes() {
        let like = 0;
       return (users.map((user) => {
            return user.likes.map((query) => {
                if (query.id === Number(queryId)) {
                    like += 1;
                    return like;
                }
                return like;
            })
        }))
    }

    const sendComment = async (comment: string) => {
        try {
            const userId = sessionStorage.getItem('user_id');
            await store.sendComment(comment, Number(queryId), userId ? Number(userId) : 0);
        } catch (error: any) {
            console.log(error.response?.data?.message);
        }
    }

    const patchLike = async (id: number) => {
        try {
            await store.patchLike(id, [Number(queryId)]);
            const users = await UsersService.getUsers()
            setUsers(users.data)
        } catch (error: any) {
            console.log(error.response?.data?.message);
        }
    }

    if (!queryId) {
        return null;
    }
  return (
      <Card className={styles.card} loading={isLoading}>
          <Form className={styles.form}>
              <Form.Item className={styles.logo}>
                  <div className={styles.headerContainer}>
                      <div className={styles.logo}>
                        <Logo width={147} height={42} />
                      </div>
                      <div className={styles.headerContent}>
                          <div className={styles.iconContainer}>
                              <HeartOutlined className={styles.likes} onClick={() => patchLike(Number(sessionStorage.getItem('user_id')))}/>
                              <p className={styles.numberLikes}>{getLikes()}</p>
                          </div>
                          <p className={`${styles.statusQuery} ${getStatusClassName(applicationData.status)}`}>{getStatusTranslation(applicationData.status)}</p>
                      </div>
                  </div>
              </Form.Item>
              <Col className={styles.col}>
                  <Row className={styles.row}>
                      <p className={styles.rowText}>Номер заявки:</p>
                      <p className={styles.rowInf}>{applicationData.id}</p>
                  </Row>
                  <Row className={styles.row}>
                      <p className={styles.rowText}>Инициатива (Идея):</p>
                      <p className={styles.rowInf}>{applicationData.name}</p>
                  </Row>
                  <Row className={styles.row}>
                      <p className={styles.rowText}>Описание инициативы:</p>
                      <p className={styles.rowInf}>{applicationData.description}</p>
                  </Row>
                  <Row className={styles.row}>
                      <p className={styles.rowText}>Направление:</p>
                      <p className={styles.rowInf}>{getDirectionTranslation(applicationData.initiative_direction)}</p>
                  </Row>
                  <Row className={styles.row}>
                      <p className={styles.rowText}>Организация:</p>
                      <p className={styles.rowInf}>{getOrganizationName(applicationData.organization, organization)}</p>
                  </Row>
                  <Row className={styles.row}>
                      <p className={`${styles.rowText} ${styles.comments}`}>Комментарии:</p>
                  </Row>
                  {dataComment
                      .filter((comment) => comment.query === Number(queryId))
                      .map((comment, index) => (
                      <Row className={styles.row} key={index}>
                          <div className={styles.userContainer}>
                              <div className={styles.userAvatar}></div>
                              <div className={styles.user}>
                                  <div className={styles.userName}>
                                      <p className={styles.name}>{getUserName(comment.user)}</p>
                                      <p className={styles.status}>{getStatusUser(comment.user)}</p>
                                  </div>
                                  <p className={styles.data}>{formatDate(comment.created_at)}</p>
                                  <p className={styles.comment}>{comment.comment_text}</p>
                              </div>
                          </div>
                      </Row>
                      ))}
              </Col>
              <Form.Item className={styles.textAreaContainer}>
                  <p className={styles.textAreaTitle}>Оставьте свой комментарий по инициативе здесь:</p>
                  <div className={styles.textArea}>
                      <TextArea
                          className={styles.textAreaCustom}
                          placeholder={"Напишите комментарий по этой инициативе"}
                          onChange={(evt: any) => {
                              setCommentValue(evt.target.value);
                          }}
                          value={commentValue}
                      />
                  </div>
              </Form.Item>
              {children? (
                <div className={styles.footerContainerChild}>
                    <div className={styles.buttonsContainer}>
                        {children}
                    </div>
                    <div className={styles.submitBtns}>
                        <div className={styles.btnWhite}>
                          <Buttons text={"Отменить"} onClick={() => {
                              router.push('/queries');
                              sendComment(commentValue);
                          }}/>
                        </div>
                        <div className={`${styles.btnBlue} ${styles.btnForm}`}>
                            <Buttons onClick={() => router.push('/queries')} text={"Отправить"}/>
                        </div>
                    </div>
              </div>
                  ) : (
                  <div className={styles.footerContainer}>
                      <div className={styles.btnWhite}>
                          <Buttons onClick={() => router.push("/queries")} text={"Отменить"} />
                      </div>
                      <div className={`${styles.btnBlue} ${styles.btnForm}`}>
                          <Buttons text={"Отправить"} type='submit' onClick={() => {
                              router.push('/queries');
                              sendComment(commentValue);
                          }}/>
                      </div>
                  </div>
                  )}

          </Form>
      </Card>
  );
};
