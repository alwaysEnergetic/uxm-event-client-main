import React from "react";
import {
  getChatMessagesQuery,
  sendChatMessageQuery,
} from "src/lib/graphql/schema/connect";
import { getGqlClient } from "src/lib/gqlClient";
import { useState, useEffect } from "react";
import { getUserUID, isLoggedIn } from "src/components/organisms/Auth/auth";
import {objGetPath} from "@muft/dailyfns";
import SendMessage_2 from "./SendMessage_2";
import Comments from "./Comments";
import styles from "./ChatMessages_2.module.scss";
import { Button } from "react-bootstrap";

interface Recipient {
  id: string;
  slug: string;
  fullName: string;
  profileImage: {
    id: string;
    url: string;
  };
}

interface ChatMessagesProps {
  threadId?: string;
  sendTo?: Recipient;
  show: boolean;
  email?: boolean;
}

const ChatMessages_2: React.FC<ChatMessagesProps> = (props) => {
  const { threadId, email = false } = props;
  const [comments, setComments] = useState<any[]>([]);
  const [accessDenied, setAccessDenied] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const [showLoadMore, setShowLoadMore] = useState(false);
  const [limit, setLimit] = useState(10);
  
  const readMessages = () => {
    threadId &&
      getGqlClient()
        .request(getChatMessagesQuery, { threadId: threadId, limit: limit, offset: 0})
        .then((data) => {
          // console.log('limit', limit);
          // console.log(threadId)
          if (data.chatMessages.length >= 10) {
            setShowLoadMore(true);
          }
          let chatMessages = data.chatMessages;
          // console.log("data", chatMessages);
          setComments(chatMessages);
          // console.log("comments", comments);
        })
        .catch((error) => {
          setAccessDenied(true);
          console.error("Error Custom:", error);
        });
  };

  const loadMoreMessages = () => {
    threadId &&
      getGqlClient()
        .request(getChatMessagesQuery, { threadId: threadId, limit:10, offset: comments.length })
        .then((data) => {
          // console.log(threadId)
          if (data.chatMessages.length < 10) {
            setShowLoadMore(false);
          }
          let chatMessages = [...comments, ...data.chatMessages]
          // console.log("data", chatMessages);
          setComments(chatMessages);
          // console.log("comments", comments);
          setLimit(limit + 10);
        })
        .catch((error) => {
          setAccessDenied(true);
          console.error("Error Custom:", error);
        });
  };


  const messageSendHandler = (msg) => {
    getGqlClient()
      .request(sendChatMessageQuery, {
        input: { threadId: threadId, content: msg, email: email },
      })
      .then((data) => {
        readMessages();
      })
      .catch((error) => {
        alert("Please join group first.");
      });
  };

  // const showComments = (comment) => {
  //   return (
  //     <div className={`styles.commentLayer${comment.leaf}`}>
  //       <Comments
  //         threadId={threadId}
  //         comment={comment}
  //         readMessageHandler={readMessages}
  //       />
  //     </div>
  //   );
  // };

  const travesal = (comments) => {
    if (!comments || comments.length == 0) return;
    return comments.map((comment, idx) => {
      return (
        <div className={styles.commentLayer} key={idx} >
          <Comments
            threadId={threadId}
            comment={comment}
            readMessageHandler={readMessages}
            loggedIn={loggedIn}
          />
          {travesal(comment.childs)}
        </div>
      );
    });
  };

  const loggedIn = isLoggedIn();

  useEffect(() => {
    if (!threadId) return;
    readMessages();
  }, [threadId]);

  useEffect(() => {
    setLoaded(threadId !== null);
  }, [props, comments]);

  return (
    <>
      {loaded && (
        <>
          <div className='w-100'>
            <div className={styles.chatMessages}>
              {Array.isArray(comments) ? travesal(comments) : null}
            </div>
            {showLoadMore ? (
                <Button className={styles.loadMoreButton} onClick={loadMoreMessages}>
                  Load More
                </Button>
              ) : null}
          </div>
          <div className={styles.commentBox}>
            {!accessDenied && loggedIn ? (
              <SendMessage_2 onMessage={messageSendHandler} />
            ) : null}
          </div>
        </>
      )}
    </>
  );
};

export default ChatMessages_2;
