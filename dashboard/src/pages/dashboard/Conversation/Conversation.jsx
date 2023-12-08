import React, { useState, useEffect, useMemo } from "react";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Divider } from "primereact/divider";
import styles from "./styles.module.scss";

import { useSelector, useDispatch } from "react-redux";

import {
  getAllConversations,
  GetMessagesOfConv,
  sendMessage,
} from "../../../redux/conversation/conversation.actions";

import AvatarComponent from "../../../MyComponents/DataDisplay/Avatar";
import { InputText } from "primereact/inputtext";
import MessageImg from "../../../assets/svgs/message.svg";
import { socket } from "../../../functions/socket.io";
import { isSousAdmin, isSuperAdmin } from "../../../custom/roles";

const Conversation = () => {
  const [Item, setItem] = useState({
    Subject: "",
    Content: "",
    emails: [],
    userType: "user",
  });
  const [Conv, setConv] = useState(null);
  const [msg, setmsg] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.UserReducer.user);

  const { conversations, messages } = useSelector((state) => state.ConvReducer);

  useEffect(() => {
    dispatch(getAllConversations());

    socket.on("message", (data) => {
      console.log(data);
      setmsg((old) => [...old, data.text]);
    });
  }, []);

  useEffect(() => {
    if (Conv) {
      dispatch(GetMessagesOfConv(Conv));
    }
  }, [Conv]);

  useEffect(() => {
    setmsg(messages.map((mess) => ({ user: mess.user, message: mess.text })));
  }, [messages]);

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <h5 className="m-0 mr-2">Conversations</h5>
      </React.Fragment>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button
            icon="pi pi-refresh"
            className="p-button-primary mr-2"
            onClick={() => {}}
          />
        </div>
      </React.Fragment>
    );
  };

  const UserDialogue = ({ conv }) => {
    const { user: us } = conv;
    return (
      <div
        onClick={() => {
          console.log(conv);
          setConv(conv);
          socket.emit("join", user);
        }}
        className={`flex ${styles.dialItem}`}
      >
        <AvatarComponent
          src={null}
          circle={true}
          name={us?.firstName || "N"}
          lastname={us?.lastName || "N"}
        />
        <div className=" flex flex-column justify-content-center ml-2  ">
          <span className=" font-semibold ">
            {`${us?.firstName || "N"} ${us?.lastName || "N"}`}
          </span>
          <span className={`${styles.max1} text-600`}>{us?.email}</span>
        </div>
      </div>
    );
  };

  const LeftSide = () => {
    return (
      <div className={styles.users_list}>
        <div className={styles.top_side}>
          {/*My Avatar*/}
          <div className={styles.avatar}>
            <AvatarComponent
              src={null}
              name={"Hatem"}
              lastname={"Ben Echikh"}
            />
          </div>
          <div className={`p-inputgroup ${styles.input_group}`}>
            <InputText placeholder="Keyword" />
            <Button icon="pi pi-search" />
          </div>
        </div>
        <div className={styles.BottomSide}>
          <div>
            {conversations.map((conv, index) => {
              return <UserDialogue index={index} key={index} conv={conv} />;
            })}
          </div>
        </div>
      </div>
    );
  };

  const NoConversation = () => {
    return (
      <div className={styles.noComment}>
        <div className={styles.buble}>
          <img src={MessageImg} />
        </div>
        <p>Select Conversation</p>
      </div>
    );
  };

  const Message = ({ message }) => {
    const pos =
      isSousAdmin(message?.user) || isSuperAdmin(message?.user)
        ? "left"
        : "right";

    return message && message.user ? (
      <div className={`${styles.msg_container} ${styles[pos]}`}>
        <p className={`${styles.msg} `}>{message.message}</p>
      </div>
    ) : null;
  };

  const ShowConversation = () => {
    const [mess_text, set_mess_text] = useState("");

    const handle_change = (event) => {
      set_mess_text(event.target.value);
    };

    const handle_submit_enter = (event) => {
      if (event.key === "Enter") {
        socket.emit("sendMessage", { user: user, message: mess_text });
        dispatch(
          sendMessage(mess_text, Conv, () => {
            set_mess_text("");
          })
        );
      }
    };

    const handle_submit = () => {
      socket.emit("sendMessage", { user: user, message: mess_text });
      dispatch(
        sendMessage(mess_text, Conv, () => {
          set_mess_text("");
        })
      );
    };

    return (
      <div className={styles.Conversation}>
        <div className={styles.topside}>
          <UserDialogue conv={Conv} />
        </div>
        <div className={styles.bodySide}>
          <div>
            {msg?.map((message, index) => {
              return <Message key={index} message={message} />;
            })}
          </div>
        </div>
        <div className={styles.botSide}>
          <div className={`p-inputgroup ${styles.input_group}`}>
            <InputText
              placeholder="Message"
              onChange={handle_change}
              onKeyDown={handle_submit_enter}
            />
            <Button
              label="send"
              iconPos="right"
              icon="pi pi-send"
              onClick={handle_submit}
            />
          </div>
        </div>
      </div>
    );
  };

  const RightSide = () => {
    return (
      <div className={styles.conv_container}>
        {Conv ? <ShowConversation /> : <NoConversation />}
      </div>
    );
  };

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <Toolbar
            className="mb-4"
            left={leftToolbarTemplate}
            right={rightToolbarTemplate}
          />

          <div className={styles.main}>
            <LeftSide />
            <RightSide />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
