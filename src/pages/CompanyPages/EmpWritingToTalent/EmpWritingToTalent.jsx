import React, { useEffect, useRef, useState } from "react";
import styles from "../../UserDashboard/ReplyToEmployer/styles.module.scss";
import styles2 from "./styles.module.scss";

import TextArea from "../../../components/inputs/TextArea";
import BtnOrange from "../../../components/buttons/BtnOrange/BtnOrange";
import UserNavbar from "../../../layouts/Navbars/UserNavbar/UserNavbar";
import MainFooter from "../../../layouts/Footers/MainFooter/MainFooter";

import RechInputs1 from "../../../components/RechInputs/RechInputs1/RechInputs1";
import UserMail from "../../../components/cards/UserMail/UserMail";

import { Formik } from "formik";
import { Form } from "../../../components/Form/Form";

import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import {
  GetMyDiscussions,
  SendMessage,
  GetMessagesByDiscussion,
} from "../../../services/Mess.serv";
import { useSelector } from "react-redux";

const commentSchema = Yup.object().shape({
  comment: Yup.string().required("comment is a required field"),
});

const initialValues = {
  comment: "",
};

function EmpWritingToTalent() {
  const [discs, setDiscs] = useState([]);
  const [disc, setDisc] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messages_io, setMessages_io] = useState([]);
  const ref_fn = useRef(null);

  const socket = useSelector((state) => state.users.socket);
  const user = useSelector((state) => state.users.data);

  const GetDiscusionsMutation = useMutation(GetMyDiscussions, {
    onError: (error) => {},
    onSuccess: (data) => {
      setDiscs(data);
    },
  });

  const SendMessageMutation = useMutation(SendMessage, {
    onError: (error) => {},
    onSuccess: (data) => {
      ref_fn?.current?.click();
    },
  });

  const GetMessagesMotation = useMutation(GetMessagesByDiscussion, {
    onError: (error) => {},
    onSuccess: (data) => {
      setMessages(data?.messages);
    },
  });

  useEffect(() => {
    GetDiscusionsMutation.mutate();
  }, []);

  useEffect(() => {
    if (disc) {
      GetMessagesMotation.mutate(disc._id);
    }
  }, [disc]);

  useEffect(() => {
    if (socket && disc) {
      socket.emit("join-chat", disc._id);
    }
  }, [socket, disc]);

  useEffect(() => {
    if (socket) {
      socket.on("message", (data) => {
        setMessages_io((prevMessages) => [...prevMessages, data]);
      });
    }
  }, [socket]);

  const handle_sibmit = (values) => {
    const data = {
      content: values.comment,
      discussionId: disc._id,
    };
    socket.emit("sendMessage", {
      discussion_id: disc._id,
      user_id: user._id,
      message: values.comment,
    });
    SendMessageMutation.mutate(data);
  };

  return (
    <div className={`${styles.main} `}>
      <UserNavbar />

      <div className={`${styles["content"]} ${styles2.content}`}>
        <div className={styles["part1"]}>
          <RechInputs1
            placeholder="Search messages"
            className={styles["search"]}
          />

          <h2 className={styles["title"]}>Messages</h2>

          {discs.map((item, key) => {
            return (
              <UserMail
                key={key}
                data={item.user}
                time={item.createdAt}
                onClick={() => {
                  setDisc(item);
                }}
                className={styles["user-mail"]}
                isTalent={true} // this is gonna render a talent
              />
            );
          })}

          <hr className={styles["hr"]} />

          <h2 className={styles["title"]}>Others</h2>

          {/* {others.map((item, key) => {
            return (
              <UserMail
                key={key}
                data={item}
                className={styles["user-mail"]}
                isTalent={true}
              />
            );
          })} */}
        </div>

        {disc && (
          <div className={styles["part2"]}>
            <UserMail
              data={disc.user}
              time={disc.createdAt}
              className={styles["user-mail"]}
              isTalent={true}
            />

            <div className={`${styles.messages} ${styles2.messages}`}>
              {messages.map((message, key) => {
                return (
                  <div
                    key={key}
                    className={
                      message.UserType === "Company"
                        ? styles.right
                        : styles.left
                    }
                  >
                    <p>{message.content}</p>
                  </div>
                );
              })}

              {messages_io.map((message, key) => {
                return (
                  <div
                    key={key}
                    className={
                      message.user_id === user._id ? styles.right : styles.left
                    }
                  >
                    <p>{message.message}</p>
                  </div>
                );
              })}

              {/* <div className={styles.right}>
                <p>welcome and nice to meet you</p>
              </div> */}
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={commentSchema}
              onSubmit={handle_sibmit}
            >
              {({ handleSubmit, setFieldValue, setFieldError }) => (
                <Form
                  onSubmit={handleSubmit}
                  className={`${styles.form} ${styles2.form}`}
                  method="post"
                >
                  <div
                    ref={ref_fn}
                    onClick={() => {
                      setFieldValue("comment", "");
                      setFieldError("comment", "");
                    }}
                  />
                  <TextArea
                    rows={5}
                    className={styles["text-area"]}
                    name="comment"
                  />

                  <div className={styles["btn-container"]}>
                    <BtnOrange type="submit">Send</BtnOrange>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>

      <MainFooter />
    </div>
  );
}

export default EmpWritingToTalent;
