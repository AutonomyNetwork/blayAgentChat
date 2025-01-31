"use client";
import { AppContext } from "@/app/Context";
import useAxios from "@/helpers/useAxios";
import CopyIcon from "@/svg/CopyIcon";
import { useAccount } from "@particle-network/connectkit";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import LeftPanel from "../../components/leftPanel";
import arrowRight from "../../assets/arrowRight.svg";
import blayLogo from "../../assets/blayLogo.png";
import userAvatar from "../../assets/user-avatar.webp";

export default function Profile() {
  const navigate = useRouter();
  const { onCall: createUser, loading } = useAxios({
    api: "/user/create",
    method: "post",
    needToken: true,
  });
  const { onCall: sendMessage, loading: msgLoading } = useAxios({
    api: "/user/message",
    method: "post",
    needToken: true,
  });
  const { onCall: getMessages } = useAxios({
    api: "/user/messages",
    method: "get",
    needToken: true,
  });
  const [msg, setMsg] = useState("");
  const [resMsgs, setResMsg] = useState<any>([]);
  const { showChat, setShowChat } = useContext(AppContext);
  const { isDisconnected, isConnecting, isReconnecting } = useAccount();
  const handleToggle = () => {
    createUser({}).then((res) => {
      if (res?.result) setShowChat(true); // Toggle the state
    });
  };

  const bottomRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [resMsgs]);

  useEffect(() => {
    if (!isConnecting && !isReconnecting && isDisconnected) {
      window.sessionStorage.clear();
      navigate.push("/");
    }
  }, [isDisconnected, isConnecting, isReconnecting]);

  useEffect(() => {
    if (showChat) {
      getMessages({}).then((res) => {
        console.log(res?.result);

        if (res?.result?.length) setResMsg(res?.result);
      });
    }
  }, [showChat]);
  return (
    <div className="blay-main">
      <div className="header">
        <Image src={blayLogo} alt="Blay Logo" />
      </div>
      <div className="container flex">
        <div className="item1">
          <LeftPanel />
        </div>
        <div className="item2">
          <div className="item2-block">
            <div className="beta-status">
              <span>Blay </span> is currently in beta{" "}
              <Image src={arrowRight} alt="" />
            </div>
            <div className="chat-interface">
              <div className="profile-block">
                <div>
                  <div className="profile-avatar">
                    <Image src={userAvatar} alt="" />
                    <div>mw3txb...324a</div>
                  </div>
                  <div>
                    <button>Sign Out</button>
                  </div>
                </div>
                <div className="account-block">
                  <div>Account Details</div>
                  <div className="accound-div">
                    <div className="account-item">
                      <div>
                        <div>P</div>
                        <div>
                          <div>Primary Wallet</div>
                          <div>8214yhbkqbdk12847gkhjbk</div>
                        </div>
                        <div>
                          <CopyIcon />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
