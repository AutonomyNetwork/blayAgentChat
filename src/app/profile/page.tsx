"use client";
import CopyIcon from "@/svg/CopyIcon";
import Image from "next/image";
import arrowRight from "../../assets/arrowRight.svg";
import blayLogo from "../../assets/blayLogo.png";
import userAvatar from "../../assets/user-avatar.webp";
import LeftPanel from "../../components/leftPanel";
import { useAccount, useDisconnect } from "@particle-network/connectkit";
import { formattedAddress } from "@/helpers/utils";
import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../Context";
import { useRouter } from "next/navigation";
import { useUserService } from "@/helpers/userService";

export default function Profile() {
  const { address, isDisconnected, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { user } = useContext(AppContext)
  const { fetchUserWallet } = useUserService()
  const navigate = useRouter();
  const timeoutRef = useRef<any>();


  useEffect(() => {
    if (isDisconnected) {
      timeoutRef.current = setTimeout(() => {
        window.sessionStorage.clear();
        navigate.push("/");
      }, 100);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isDisconnected, timeoutRef]);

  useEffect(() => {
    if (isConnected && address) {
      fetchUserWallet({ address })
    }
  }, [isConnected && address]);

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
                    <div>{formattedAddress(user?.wallet_address)}</div>
                  </div>
                  <div>
                    <button onClick={() => {
                      disconnect()
                    }}>Sign Out</button>
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
                          <div>{formattedAddress(address)}</div>
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
