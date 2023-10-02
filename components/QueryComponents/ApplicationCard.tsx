import React, {useContext, useEffect, useState} from "react";
import {Card, Form, Radio} from "antd";
import {HeartFilled, HeartOutlined} from "@ant-design/icons";
import {Row, Col} from "antd";
import {Logo} from "../PicturesComponents/Logo";
import {Buttons} from "../ButtonComponent/Button";
import avatar from "../../public/img/avatar.jpg"
import styles from "./styles/ApplicationCard.module.scss";
import router from "next/router";
import QueriesService from "../../services/QueriesService";
import OrganizationsService from "../../services/OrganizationsService";
import {QueriesResponse} from "../../models/response/QueriesResponse";
import {
    formatDateToServer,
    getDirectionTranslation,
    getOrganizationName, getStatusClassName,
    getStatusTranslation
} from "../../utils/utils";
import {OrganizationsResponse} from "../../models/response/OrganizationsResponse";
import CommentService from "../../services/CommentService";
import {CommentResponse} from "../../models/response/CommentResponse";
import UsersService from "../../services/UsersService";
import {UserResponse} from "../../models/response/UserResponse";
import {Context} from "../../pages/_app";
import dayjs from "dayjs";
import Image from "next/image";

type ApplicationCardProps = {
    queryId: string;
    user_status: string;
};

export const ApplicationCard = ({ queryId, user_status }: ApplicationCardProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [organization, setOrganization] = useState<OrganizationsResponse[]>([])
    const [commentValue, setCommentValue] = useState('');
    const [dataComment, setDataComment] = useState<CommentResponse[]>([])
    const [users, setUsers] = useState<UserResponse[]>([])
    const { store } = useContext(Context);
    const [status, setStatus] = useState('')
    const [isLiked, setIsLiked] = useState(false)
    const [applicationData, setApplicationData] = useState<QueriesResponse>({
        name: '',
        initiator_users: [0],
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
                const comments = await CommentService.getComments()
                const users = await UsersService.getUsers()
                setDataComment(comments.data)
                setUsers(users.data)
                for (let user of users.data) {
                    if (user.id === Number(sessionStorage.getItem('user_id'))){
                        for (let query of user.likes) {
                            if (query.id === Number(queryId)) {
                                setIsLiked(true)
                            }
                        }
                    }
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false)
            }
        }
        queryId ? fetchData() : router.push('/queries')

    }, [queryId])



    function getUserName(userId: number) {
        return users.map((user: any) => {
            if (user.id === userId) {
                return user.name
            }
        })
    }

    function formatDate(date: string) {
        const currentDate = date.split('T')
        return dayjs(currentDate[0], 'YYYY-MM-DD').format('DD.MM.YYYY')
    }

    function getLikes() {
        let like = 0;
        for (let user of users) {
            for (let query of user.likes) {
                if (query.id === Number(queryId)) {
                    like += 1;

                }
            }
        }
        return like;
    }

    const sendComment = async (comment: string) => {
        try {
            const userId = sessionStorage.getItem('user_id');
            await store.sendComment(comment, Number(queryId), userId ? Number(userId) : 0);
        } catch (error: any) {
            console.log(error.response?.data?.message);
        }
    }

    const checkExpert = (comment_user: number) => {
        let isExpert = false;

        applicationData.expert_users.forEach((user) => {
            if (user === comment_user) {
                isExpert = true;
            }
        });

        return isExpert;
    }

    const getAllUserLikes = () => {
        const res = []
        for (let user of users) {
            if (user.id === Number(sessionStorage.getItem('user_id'))) {
                for (let query of user.likes) {
                    res.push(query.id)
                }
            }
        }
        return res
    }

    useEffect(() => {

    }, [isLiked])

    const patchAddLike = async (id: number) => {
        try {
            const likes = getAllUserLikes()
            likes.push(Number(queryId))
            await store.patchLike(id, likes);
            const users = await UsersService.getUsers()
            setUsers(users.data)
        } catch (error: any) {
            console.log(error.response?.data?.message);
        }
    }

    const patchRemoveLike = async (id: number) => {
        try {
            const likes = getAllUserLikes()
            const index = likes.indexOf(Number(queryId));
            if(index > -1) {
                likes.splice(index, 1)
            }
            await store.patchLike(id, likes);
            const users = await UsersService.getUsers()
            setUsers(users.data)
        } catch (error: any) {
            console.log(error.response?.data?.message);
        }
    }

    const patchQuery = async (status: string) => {
        try {
            const currentDate = new Date();
            const date = formatDateToServer(currentDate, '-')
            await store.patchQuery(date, applicationData.name, applicationData.description,
                applicationData.initiative_direction, status, applicationData.implementation_effect,
                applicationData.organization, applicationData.initiator_users, Number(queryId));
        } catch (error: any) {
            console.log(error.response?.data?.message);
        }
    }

    if (!queryId) {
        return null;
    }
  return (
      <div>
          <Card className={styles.card} loading={isLoading}>
              <Form className={styles.form}>
                  <Form.Item className={styles.logo}>
                      <div className={styles.headerContainer}>
                          <div className={styles.logo}>
                            <Logo width={147} height={42} />
                          </div>
                          <div className={styles.headerContent}>
                              <div className={styles.iconContainer}>
                                  {isLiked? (
                                      <HeartFilled className={styles.likes} style={{color: '#FF185D'}} onClick={() => {
                                          patchRemoveLike(Number(sessionStorage.getItem('user_id')))
                                          setIsLiked(false)
                                      }}/>
                                  ) : (
                                      <HeartOutlined className={styles.likes} onClick={() => {
                                          patchAddLike(Number(sessionStorage.getItem('user_id')))
                                          setIsLiked(true)
                                      }}/>
                                  )}
                                  <p className={styles.numberLikes}>{getLikes()}</p>
                              </div>
                              <p className={`${styles.statusQuery} ${getStatusClassName(styles, applicationData.status)}`}>{getStatusTranslation(applicationData.status)}</p>
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
                                  <div className={styles.userAvatar}>
                                      <Image src={avatar} width={60} alt={'Аватарка'}></Image>
                                  </div>
                                  <div className={styles.user}>
                                      <div className={styles.userName}>
                                          <p className={styles.name}>{getUserName(comment.user)}</p>
                                          <p className={styles.status}>{checkExpert(comment.user)? '(Эксперт)' : '(Пользователь)'}</p>
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
                          <textarea
                              className={styles.textAreaCustom}
                              placeholder={"Напишите комментарий по этой инициативе"}
                              onChange={(evt: any) => {
                                  setCommentValue(evt.target.value);
                              }}
                              value={commentValue}
                          />
                      </div>
                  </Form.Item>
                  {user_status? (
                    <div className={styles.footerContainerChild}>
                        <div className={styles.buttonsContainer}>
                            <div className={styles.checkboxContainer}>
                                <Radio.Group onChange={(e) => {
                                    setStatus(e.target.value)
                                }} value={status}>
                                    <Radio className={styles.checkbox} value={'rejected'}> Отклонено</Radio>
                                    <Radio className={styles.checkbox} value={'accepted'}>Одобрено для реализации</Radio>
                                </Radio.Group>
                            </div>
                        </div>
                        <div className={styles.submitBtns}>
                            <div className={styles.btnWhite}>
                              <Buttons text={"Отменить"} onClick={() => {
                                  router.push('/queries');
                              }}/>
                            </div>
                            <div className={`${styles.btnBlue} ${styles.btnForm}`}>
                                <Buttons onClick={() => {
                                    commentValue&& sendComment(commentValue);
                                    status&& patchQuery(status)
                                    router.push('/queries')}}
                                         text={"Отправить"}/>
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
                                  commentValue&& sendComment(commentValue);
                              }}/>
                          </div>
                      </div>
                      )}

              </Form>
          </Card>
      </div>
  );
};
