"use client";
import { AppContext } from "@/app/Context";
import CustomButton from "@/components/CustomButton";
import useAxios from "@/helpers/useAxios";
// import { useAccount } from "@particle-network/connectkit";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import chatIcon from "../assets/chatIcon.svg";
import telIcon from "../assets/telegram.svg";
import webIcon from "../assets/web.svg";
import xIcon from "../assets/x.svg";

export default function LeftPanel() {
  const navigate = useRouter();

  const { onCall: getMessages } = useAxios({
    api: "/user/messages",
    method: "get",
    needToken: true,
  });
  const [resMsgs, setResMsg] = useState<any>([]);
  const { showChat } = useContext(AppContext);
  // const { isDisconnected, isConnecting, isReconnecting } = useAccount();
 

  const bottomRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [resMsgs]);

  // useEffect(() => {
  //   if (!isConnecting && !isReconnecting && isDisconnected) {
  //     window.sessionStorage.clear();
  //     navigate.push("/");
  //   }
  // }, [isDisconnected, isConnecting, isReconnecting]);

  useEffect(() => {
    if (showChat) {
      getMessages({}).then((res) => {
        console.log(res?.result);

        if (res?.result?.length) setResMsg(res?.result);
      });
    }
  }, [showChat]);
  return (
    <div className="item-block">
      <div className="left-panel">
        <div className="left-panel-chat">
          <Image src={chatIcon} alt="" />
          CHAT
        </div>
        <div className="bottom-signin">
          <CustomButton />
          <ul>
            <li>
              <a href="">
                <Image src={telIcon} alt="telegram" />
              </a>
            </li>
            <li>
              <a href="">
                <Image src={xIcon} alt="twitter" />
              </a>
            </li>
            <li>
              <a href="">
                <Image src={webIcon} alt="Website" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
