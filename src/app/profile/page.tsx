"use client";
import { formattedAddress } from "@/helpers/utils";
import CopyIcon from "@/svg/CopyIcon";
import { useAccount, useDisconnect } from "@particle-network/connectkit";
import Image from "next/image";
import { useContext } from "react";
import arrowRight from "../../assets/arrowRight.svg";
import blayLogo from "../../assets/blayLogo.png";
import userAvatar from "../../assets/user-avatar.webp";
import LeftPanel from "../../components/leftPanel";
import { AppContext } from "../Context";
import lineDot from "../../assets/line.svg";

export default function Profile() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { user } = useContext(AppContext);

  return (
    <div className="blay-main">
 
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
                <div className="profile-signout">
                  <div className="profile-avatar">
                    <Image src={userAvatar} alt="" />
                    <div>{formattedAddress(user?.wallet_address)}</div>
                  </div>
                  <div className="signout-btn">
                    <button
                      onClick={() => {
                        disconnect();
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
                <div className="account-block">
                  <div className="account-heading">Account Details</div>
                  <div className="accound-div">
                    <div className="account-item">
                      <div className="accoount-item1">
                        <div className="account-flex flex1">
                          <div className="acc-item">
                            <div className="p-block">B</div>
                            <div className="p-wallet">
                              <div>Primary Wallet</div>
                              <div>{formattedAddress(address)}</div>
                            </div>
                          </div>
                          <div className="copy-wallet">
                            <CopyIcon />
                          </div>
                        </div>
                        <div className="account-flex flex2">
                          <Image src={lineDot} alt="" className="line" />
                          <div className="acc-item">
                            <div className="p-block">P</div>
                            <div className="p-wallet">
                              <div>My Blay Wallet</div>
                              <div>{formattedAddress(address)}</div>
                            </div>
                          </div>
                          <div className="copy-wallet">
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
    </div>
  );
}
