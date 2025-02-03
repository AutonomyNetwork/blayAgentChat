"use client";
import CustomButton from "@/components/CustomButton";
// import { useAccount } from "@particle-network/connectkit";
import Image from "next/image";
// import { useRouter } from "next/navigation";
import chatIcon from "../assets/chatIcon.svg";
import telIcon from "../assets/telegram.svg";
import webIcon from "../assets/web.svg";
import xIcon from "../assets/x.svg";
import blayLogo from "../assets/blayLogo.png";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AppContext } from "@/app/Context";

export default function LeftPanel() {
  const navigate = useRouter();
  const { setNavLoading } = useContext(AppContext)
  return (
    <div className="item-block">
      <div className="left-panel">
        <div>
          <div className="header">
            <Image src={blayLogo} alt="Blay Logo" />
          </div>
          <div className="left-panel-chat" onClick={() => {
            setNavLoading(true)
            navigate.push("/chat")
          }}>
            <Image src={chatIcon} alt="" />
            CHAT
          </div>
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
