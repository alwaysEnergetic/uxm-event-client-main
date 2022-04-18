import { useEffect, useState } from "react";
import styles from "./Comments.module.scss";
import Link from "next/link";
import Image from "next/image";
import {objGetPath} from "@muft/dailyfns";
import { noImageUrl } from "src/lib/constant";
import { sendChatMessageQuery } from "src/lib/graphql/schema/connect";
import { getGqlClient } from "src/lib/gqlClient";
import SendMessage_2 from "./SendMessage_2";

interface CommentsProps {
  comment: any;
  threadId: any;
  index?: any;
  readMessageHandler: any;
  loggedIn: any;
}

const Comments: React.FC<CommentsProps> = (props) => {
  const { comment, threadId, index, readMessageHandler, loggedIn } = props;
  const [show, setShow] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const options: any = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  // const messageSendHandler = (comment) => {
  //   gqlClient
  //     .request(sendChatMessageQuery, {
  //       input: { threadId: threadId, content: comment },
  //     })
  //     .then((data) => {
  //       readMessageHandler();
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       alert("Please join group first.");
  //     });
  // };

  const isChild = (comment) => {
    if ("childs" in comment) {
      setShowReply(true);
    }
  };
  const imageUrl = objGetPath(comment, "user.profileImage.url", noImageUrl);
  const createdAt = new Date(comment.createdAt).toLocaleDateString(
    undefined,
    options
  );

  const replyMessageHandler = (msg) => {
    getGqlClient()
      .request(sendChatMessageQuery, {
        input: { threadId: threadId, content: msg, parentId: comment.id },
      })
      .then((data) => {
        readMessageHandler();
      })
      .catch((error) => {
        alert("Please join group first.");
      });
  };
  const showMessageID = () => {
    console.log(comment.id);
    setShow(true);
  };

  useEffect(() => {
    isChild(comment);
  });

  return (
    <div key={index} className={styles.messageBox}>
      <div className={styles.messageWrap}>
        <div className={styles.imgWrap}>
          <Image
            src={imageUrl}
            alt={comment.user.fullName}
            width='50'
            height='50'
          />
        </div>
        <div className={styles.content}>
          <div className={styles.messageInfo}>
            <div className={styles.fullName}>
              <Link href={"/users/" + comment.user.id}>
                <a className=''>{comment.user.fullName}</a>
              </Link>
            </div>
            <div className={styles.dated}>{createdAt}</div>
          </div>
          <div className={styles.message} key={index}>
            {comment.content}
          </div>
        </div>
      </div>
      {showReply && (
        <div className={styles.bottomLayer}>
          {loggedIn && (
            <button className={styles.replybtn} onClick={showMessageID}>
              Reply
            </button>
          )}
          {show && (
            <SendMessage_2
              onMessage={replyMessageHandler}
              placeHolder='Add a reply...'
              setShow={setShow}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Comments;
