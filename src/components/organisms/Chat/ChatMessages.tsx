import { useState, useEffect, useRef } from "react";
import SendMessage from "./SendMessage";
import styles from "./ChatMessages.module.scss";
import { getGqlClient } from "src/lib/gqlClient";
import {
  getChatMessagesQuery,
  sendChatMessageQuery,
} from "src/lib/graphql/schema/connect";
import { getUserUID, isLoggedIn } from "src/components/organisms/Auth/auth";
import Image from "next/image";
import {objGetPath} from "@muft/dailyfns";
import { noImageUrl } from "src/lib/constant";
import classnames from "classnames";
import LineBreak from "src/components/shared/LineBreak";
import Link from 'next/link'

interface Recipient {
  id: string;
  slug: string;
  fullName: string;
  profileImage: {
    id: string;
    url: string;
  };
}

interface MessageUser {
  id: string;
  slug: string;
  fullName: string;
  profileImage: {
    id: string;
    url: string;
  };
}

interface Message {
  content: string;
  createdAt: Date;
  id: string;
  userId: string;
  user: MessageUser;
}

interface ChatMessagesProps {
  threadId?: string;
  sendTo?: Recipient;
  show: boolean;
  email?: boolean;
}

function useInterval(callback, delay) {
  const savedCallback = useRef<any>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback?.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const ChatMessages: React.FC<ChatMessagesProps> = (props) => {
  const { email = false } = props;
  const [messages, setMessages] = useState<Message[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);
  // const [recipient, setRecipient] = useState<Recipient | null>(null);
  // const [refresh, setRefresh] = useState(false);

  const readMessages = () => {
    // console.log("readMessages", props);
    props.threadId &&
      getGqlClient()
        .request(getChatMessagesQuery, { threadId: props.threadId })
        .then((data) => {
          setMessages(data.chatMessages?.reverse());
        })
        .catch((error) => {
          setAccessDenied(true);
          console.error("Error Custom:", error);
        });
  };

  const getAccessDenied = () => {
    return accessDenied;
  };

  useEffect(() => {
    // console.log("useEffect", props);
    if (!props.threadId) return;
    readMessages();

    // const msgCheckInterval = setInterval(() => {
    //   console.log("Interval", getAccessDenied())
    //   // if(accessDenied) return;
    //   // readMessages();
    // }, 2000)
    // return () => clearInterval(msgCheckInterval);
  }, [props.threadId]);

  useInterval(() => {
    // console.log(accessDenied)
    if (accessDenied || !isLoggedIn()) return;
    readMessages();
  }, 2000);

  useEffect(() => {
    // props.threadId && console.log('From ChatMessage', props.threadId);
    // props.sendTo && console.log('SendTo',props.sendTo);
    setLoaded(false);
    // readMessages();
    // setRecipient(props.sendTo);
    setLoaded(props.threadId !== null);
    // setRefresh(false);
  }, [props, messages]);

  const messageSendHandler = (msg) => {
    getGqlClient()
      .request(sendChatMessageQuery, {
        input: { threadId: props.threadId, content: msg, email: email },
      })
      .then((data) => {
        readMessages();
      })
      .catch((error) => {
        alert("Please join group first.");
        // console.error('Error Custom:', error);
      });
  };

  const loggedIn = isLoggedIn()

  return (
    <>
      {loaded && (
        <>
          <div className='w-100'>
            {/* <div className={`${styles.chatHeader} border-bottom`}>
          <img src={recipient.profileImage ? recipient.profileImage.url : 'https://i.imgur.com/zDxXZKk.png'}/>
          <span>{recipient.fullName}</span>
        </div> */}
            <div className={styles.chatMessages}>
              {messages &&
                messages.map((message, idx) => {
                  // console.log(message)
                  const imageUrl = objGetPath(
                    message,
                    "user.profileImage.url",
                    noImageUrl
                  );
                  const sentByMe =
                    getUserUID() == message.user.id ? true : false;
                  const messageCssClass = classnames(styles.message, {
                    [styles.messageRight]: sentByMe,
                  });
                  const options: any = {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  };
                  const createdAt = new Date(
                    message.createdAt
                  ).toLocaleDateString(undefined, options);

                  return (
                    <div className={messageCssClass} key={idx}>
                      <div className={styles.imgWrap}>
                        <Image
                          src={imageUrl}
                          alt={message.user.fullName}
                          width='50'
                          height='50'
                        />
                      </div>
                      <div className={styles.contentWrap}>
                        <div className={styles.content}>
                          
                          <LineBreak text={message.content} />
                        </div>
                        <div className={styles.messageInfo}>
                          <div className={styles.fullName}>
                            <Link href={"/users/" + message.user.id}>
                              <a className="">{message.user.fullName}</a>
                            </Link>
                          </div>
                          <div className={styles.dated}>{createdAt}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {!accessDenied && loggedIn ? <SendMessage onMessage={messageSendHandler} /> : null }
        </>
      )}
    </>
  );
};

export default ChatMessages;
