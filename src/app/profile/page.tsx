"use client";
import CopyIcon from "@/svg/CopyIcon";
import Image from "next/image";
import arrowRight from "../../assets/arrowRight.svg";
import blayLogo from "../../assets/blayLogo.png";
import userAvatar from "../../assets/user-avatar.webp";
import LeftPanel from "../../components/leftPanel";

export default function Profile() {
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
