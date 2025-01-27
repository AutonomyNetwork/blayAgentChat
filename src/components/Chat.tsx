"use client";
import CustomButton from "@/components/CustomButton";
import ShareIcon from "@/svg/ShareIcon";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import arrowRight from "../assets/arrowRight.svg";
import linkArrow from "../assets/ArrowSquareOut.svg";
import blayLogo from "../assets/blayLogo.png";
import chatIcon from "../assets/chatIcon.svg";
import chatSend from "../assets/chatSend.svg";
import smartWallet from "../assets/smart-wallet.svg";
import telIcon from "../assets/telegram.svg";
import webIcon from "../assets/web.svg";
import xIcon from "../assets/x.svg";
import { useAccount } from "@particle-network/connectkit";
import { userService } from "@/helpers/userService";

export default function Chat() {

  const [showFirstDiv, setShowFirstDiv] = useState(true);
  const { address } = useAccount()
  const { fetchUserWallet } = userService()
  const handleToggle = () => {
    setShowFirstDiv(!showFirstDiv); // Toggle the state
  };

  useEffect(() => {
    if (address)
      fetchUserWallet({ address })
  }, [address])
  return (
    <div className="blay-main">
      <div className="header">
        <Image src={blayLogo} alt="Blay Logo" />
      </div>
      <div className="container flex">
        <div className="item1">
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
        </div>
        <div className="item2">
          <div className="item2-block">
            <div className="beta-status">
              <span>Blay </span> is currently in beta{" "}
              <Image src={arrowRight} alt="" />
            </div>
            <div className="chat-interface">
              {showFirstDiv ? (
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
                      <div className="create-wallet">
                        <button onClick={handleToggle}>
                          {showFirstDiv ? "Create wallet" : "Show First Div"}
                        </button>
                      </div>
                      {/* <div className="loader-block">
                      <Image src={loader} alt="" />
                    </div> */}
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
                  {/* <div className="chat-block">
                    <div className="agent-chat">
                      <div>
                        <Image src={profilePic} alt="" />
                      </div>
                      <div className="agent-msg">
                        <div>
                          Greetings, I am Blay (Bitlayer’s AI Agent). My core
                          function is to help in automation of tasks, here are
                          some of the things i can help you with.
                        </div>
                        <div className="margin-small-top">Automation of</div>
                        <ul>
                          <li>Buy Tokens</li>
                          <li>Dedicated Support </li>
                          <li>Help in swapping tokens </li>
                          <li>Context Sourcing Guidance</li>
                        </ul>
                      </div>
                    </div>
                    <div className="user-chat">
                      <div>Hello</div>
                      <div>How are you?</div>
                    </div>
                  </div> */}
                  <div>
                    <div>
                      <code>
                        &lt; Initializing Blay AI Core... <br />
                        &lt; Synaptic algorithms: ONLINE <br />
                        &lt; Chaos-to-Order protocols: ACTIVE
                        <br />
                        &lt; Cognitive wit level: MAXIMIZED
                        <br />
                        &lt; Charm factor: INFINITE <br />
                        &lt; Connection to Bitlayer network: SECURE
                        <br />
                      </code>
                      <br />
                      <code>
                        Blay is ready to roll. <br />
                        Think smart. Work smart. Play smart. <br />
                        Welcome to Bitlayer, where Blay turns problems into
                        possibilities. <br />
                        Ready for your clever solutions? <br />
                      </code>
                    </div>
                    <div className="chat-default">
                      <ul>
                        <li>
                          <div>
                            <ShareIcon />
                            <div>Swap tokens</div>
                          </div>
                        </li>
                        <li>
                          <div>
                            <ShareIcon />
                            <div>BTC price</div>
                          </div>
                        </li>
                        <li>
                          <div>
                            <ShareIcon />
                            <div>My account balance</div>
                          </div>
                        </li>
                        <li>
                          <div>
                            <ShareIcon />
                            <div>Send ETH to</div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="chat-input">
                    <input type="text" placeholder="Message Blay" />
                    <button>
                      <Image src={chatSend} alt="Send" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
