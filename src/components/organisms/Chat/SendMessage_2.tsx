import { useRef, useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDollyFlatbedAlt, faEnvelope } from "@symbolia/plsicon"
import { useForm } from "react-hook-form";
import { getGqlClient } from "src/lib/gqlClient";
import styles from "./MessageBox.module.scss";
import { queryUserProfile } from "src/lib/graphql/schema/connect";
import { gqlErrorFirstMessage } from "@muft/dailyfns"
import Image from "next/image";
import {objGetPath} from "@muft/dailyfns";
import { noImageUrl } from "src/lib/constant";
import { Button } from "react-bootstrap"


interface SendMessageProps {
    onMessage: (msg: string) => void
    placeHolder?: string;
    readMessages?: any;
    setShow?: any;
}

const SendMessage_2: React.FC<SendMessageProps> = (props) => {
    const { register, handleSubmit, reset } = useForm();
    const [user, setUser] = useState(false)
    const { placeHolder = "Make a comment", onMessage, setShow} = props

    const onSubmit = (data) => {
        if (data.msgInput.trim()) {
            let message = data.msgInput.trim()
            onMessage(message);
        }
        setShow(false)
        reset();
    }


    const fetchUserInfo = async () => {
        getGqlClient()
            .request(queryUserProfile)
            .then((res) => {
                // console.log(res.user)
                setUser(res.user);
            })
            .catch((err) => {
                const msg = gqlErrorFirstMessage(err, {
                    capitalize: true,
                });
            })
    };

    const autoResize = (e) => {
        e.target.style.height = "1px";
        e.target.style.height = `${e.target.scrollHeight}px`;
    }

    const ImageUrl = objGetPath(user, "profileImage.url") || noImageUrl;

    useEffect(() => {
        fetchUserInfo();
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.sendMessageWrap}>
            <div className={styles.messageBoxWrap}>
                <div className={styles.imgWrap}>
                    <img
                        className={styles.img}
                        src={ImageUrl}
                        alt="{user.fullName}"

                    />
                </div>
                    <textarea
                        rows={1}
                        placeholder={placeHolder}
                        maxLength={10000}
                        className={styles.messageInput}
                        {...register('msgInput', { required: true })}
                        onInput={(e) => {autoResize(e)}}
                    />
            </div>
            <Button type='submit' className={styles.postButton}>Post</Button>
        </form>
    )
}

export default SendMessage_2;