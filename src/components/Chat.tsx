"use client";
import { AppContext } from "@/app/Context";
import useAxios from "@/helpers/useAxios";
import ShareIcon from "@/svg/ShareIcon";
import { useAccount } from "@particle-network/connectkit";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import arrowRight from "../assets/arrowRight.svg";
import linkArrow from "../assets/ArrowSquareOut.svg";
import blayLogo from "../assets/blayLogo.png";
import chatSend from "../assets/chatSend.svg";
import loader from "../assets/loader.gif";
import profilePic from "../assets/profile-pic.png";
import smartWallet from "../assets/smart-wallet.svg";
import chatLoading from "../assets/typing.gif";
import userAvatar from "../assets/user-avatar.webp";
import LeftPanel from "./leftPanel";
import Terminal from "./Terminal";

export default function Chat() {
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
  const { isDisconnected, isConnecting } = useAccount();

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
    if (!isConnecting && isDisconnected) {
      window.sessionStorage.clear();
      navigate.push("/");
    }
  }, [isDisconnected, isConnecting]);

  console.log({
    isDisconnected, isConnecting
  })

  useEffect(() => {
    if (showChat) {
      getMessages({}).then((res) => {
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
              {showChat === false ? (
                <div className="connect-block">
                  <div className="connect-item">
                    <div className="connect-smart">
                      <div className="connect-smart-item">
                        <div>
                          <Image src={smartWallet} alt="" />
                        </div>
                        <div className="create-info">
                          <div>Create smart wallet</div>
                          <div>
                            Set up a delegated wallet for agent interactions
                            with blockchain
                          </div>
                        </div>
                      </div>
                      {loading ? (
                        <div className="loader-block">
                          <Image src={loader} alt="" />
                        </div>
                      ) : (
                        <div className="create-wallet">
                          <button onClick={handleToggle}>Create wallet</button>
                        </div>
                      )}
                    </div>
                    <div className="connect-smart">
                      <div className="connect-smart-item">
                        <div>
                          <Image src={smartWallet} alt="" />
                        </div>
                        <div className="create-info">
                          <div>Bridge Funds </div>
                          <div>Add funds to smart wallet to get started</div>
                        </div>
                      </div>
                      <div className="create-wallet">
                        <button>Bridge</button>
                      </div>
                    </div>
                    <div className="connect-smart">
                      <div className="connect-smart-item">
                        <div>
                          <Image src={smartWallet} alt="" />
                        </div>
                        <div className="create-info">
                          <div>Learn more </div>
                          <div>Read more about Blay </div>
                        </div>
                      </div>
                      <div className="">
                        <Link href="">
                          <Image src={linkArrow} alt="" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="chat-section">
                  <div
                    style={{ overflowY: "auto", height: "58vh" }}
                    className="chat-flow"
                  >
                    <div>
                      <div>
                        <Terminal />
                      </div>
                      <div className="chat-default">
                        <ul>
                          <li>
                            <div
                              onClick={() => {
                                // setResMsg((prev: any) => [
                                //   ...prev,
                                //   {
                                //     type: "user",
                                //     msg: "swap 0.00001 BTC to USDT with slipage of $2",
                                //   },
                                // ]);
                                setMsg("swap 0.00001 BTC to USDT with slipage of 1")
                              }}
                            >
                              <ShareIcon />
                              <div>Swap tokens</div>
                            </div>
                          </li>
                          <li>
                            <div
                              onClick={() => {
                                setResMsg((prev: any) => [
                                  ...prev,
                                  { type: "user", msg: "BTC price" },
                                ]);
                                sendMessage({
                                  data: { message: "BTC price" },
                                }).then((res) => {
                                  setResMsg((prev: any) => [
                                    ...prev,
                                    { type: "api", msg: res.result },
                                  ]);
                                });
                              }}
                            >
                              <ShareIcon />
                              <div>BTC price</div>
                            </div>
                          </li>
                          <li>
                            <div
                              onClick={() => {
                                setResMsg((prev: any) => [
                                  ...prev,
                                  { type: "user", msg: "My account balance" },
                                ]);
                                sendMessage({
                                  data: { message: "My account balance" },
                                }).then((res) => {
                                  setResMsg((prev: any) => [
                                    ...prev,
                                    { type: "api", msg: res.result },
                                  ]);
                                });
                              }}
                            >
                              <ShareIcon />
                              <div>My account balance</div>
                            </div>
                          </li>
                          <li>
                            <div
                              onClick={() => {
                                // setResMsg((prev: any) => [
                                //   ...prev,
                                //   { type: "user", msg: "send 0.00001 BTC to" },
                                // ]);
                                setMsg("send 0.00001 BTC to")
                              }}
                            >
                              <ShareIcon />
                              <div>Send BTC to</div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="chat-block">
                      {resMsgs?.map((itm: any, i: number) => (
                        <div key={i}>
                          {itm.reply ? (
                            <>
                              <div className="user-avatar">
                                <div className="user-chat">{itm.message}</div>
                                <div className="user-avatar-img">
                                  <Image src={userAvatar} alt="user" />
                                </div>
                              </div>
                              <div className="agent-chat">
                                <div>
                                  <Image src={profilePic} alt="" />
                                </div>
                                <div className="agent-msg">
                                  <ReactMarkdown key={i}>
                                    {itm.reply}
                                  </ReactMarkdown>
                                </div>
                              </div>
                            </>
                          ) : itm.type === "api" ? (
                            <div className="agent-chat">
                              <div>
                                <Image src={profilePic} alt="" />
                              </div>
                              <div className="agent-msg">
                                <ReactMarkdown key={i}>{itm.msg}</ReactMarkdown>
                              </div>
                            </div>
                          ) : (
                            <div className="user-chat">{itm.msg}</div>
                          )}
                        </div>
                      ))}
                    </div>
                    {msgLoading ? (
                      <div className="agent-chat">
                        <div>
                          <Image src={profilePic} alt="" />
                        </div>
                        <div className="agent-msg">
                          <Image src={chatLoading} alt="" />
                        </div>
                      </div>
                    ) : null}
                    <div ref={bottomRef} />
                  </div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setResMsg((prev: any) => [
                        ...prev,
                        { type: "user", msg: msg },
                      ]);
                      sendMessage({ data: { message: msg } })
                        .then((res) => {
                          setResMsg((prev: any) => [
                            ...prev,
                            { type: "api", msg: res.result },
                          ]);
                          setMsg("");
                        })
                        .catch((err: any) => {
                          if (err) setMsg("");
                        });
                    }}
                  >
                    <div className="chat-input">
                      <input
                        disabled={msgLoading}
                        type="text"
                        value={msgLoading ? "Thinking..." : msg}
                        placeholder="Message Blay"
                        onChange={(e) => {
                          setMsg(e.target.value);
                        }}
                      />
                      <button>
                        <Image src={chatSend} alt="Send" />
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
