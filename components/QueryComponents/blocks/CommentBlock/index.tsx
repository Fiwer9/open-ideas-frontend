import { Row } from "antd";
import Image from "next/image";
import { memo } from "react";
import { CommentResponse } from "../../../../models/response/CommentResponse";
import { QueriesResponse } from "../../../../models/response/QueriesResponse";
import { UsersUpdateResponse } from "../../../../models/response/UsersUpdateResponse";
import avatar from "../../../../public/img/AvatarAratrum.svg";
import { formatDate, getUserName } from "../../../../utils/utils";
import styles from "../../styles/ApplicationCard.module.scss";
import stylesAdmin from "../../styles/AdminApplicationCard.module.scss";

type CommentBlockProps = {
  index: number;
  comment: CommentResponse;
  users: UsersUpdateResponse[];
  applicationData: QueriesResponse;
};

export const CommentBlock: React.FC<CommentBlockProps> = memo(
  ({ index, comment, users, applicationData }) => {
    const checkExpert = (commentUser: number) =>
      applicationData.expert_users[0] === commentUser;

    return (
      <Row className={styles.row} key={index}>
        <div className={styles.userContainer}>
          <div className={styles.userAvatar}>
            <Image src={avatar} width={60} alt={"Аватарка"}></Image>
          </div>
          <div className={styles.user}>
            <div className={styles.userName}>
              <p className={styles.name}>
                {users.length > 0 && getUserName(comment.user, users)}
              </p>
              <p className={styles.status}>
                {applicationData.expert_users && checkExpert(comment.user)
                  ? "(Эксперт)"
                  : "(Пользователь)"}
              </p>
            </div>
            <p className={styles.data}>{formatDate(comment.created_at)}</p>
            <p className={styles.comment}>{comment.comment_text}</p>
          </div>
        </div>
      </Row>
    );
  }
);

export const CommentBlockAdmin: React.FC<CommentBlockProps> = memo(
  ({ index, comment, users, applicationData }) => {
    const checkExpert = (commentUser: number) =>
      applicationData.expert_users[0] === commentUser;

    return (
      <div className={stylesAdmin.avatarContainer} key={index}>
        <div className={stylesAdmin.avatar}>
          <div className={stylesAdmin.userImg}>
            <Image src={avatar} alt={"Avatar"} />
          </div>
          <div className={stylesAdmin.infComment}>
            <p className={stylesAdmin.name}>{`${getUserName(
              comment.user,
              users
            )} ${
              applicationData.expert_users && checkExpert(comment.user)
                ? "(Эксперт)"
                : "(Пользователь)"
            }`}</p>
            <p className={stylesAdmin.date}>{formatDate(comment.created_at)}</p>
            <p className={stylesAdmin.commentText}>{comment.comment_text}</p>
          </div>
        </div>
      </div>
    );
  }
);
