import { useState } from "react";
import telIcon from "../assets/telegram.svg";
import webIcon from "../assets/web.svg";
import xIcon from "../assets/x.svg";
import Image from "next/image";
import CustomButton from "@/components/CustomButton";
import chatIcon from "../assets/chatIcon.svg";
import bridgeIcon from "../assets/bridge.svg";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import { AppContext } from "@/app/Context";
import logoutIcon from "../assets/logout.svg";
import closeIcon from "../assets/close-icon.svg";
import { useDisconnect } from "@particle-network/connectkit";

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useRouter();
  const pathname = usePathname();
  const { disconnect } = useDisconnect();
  const { setNavLoading } = useContext(AppContext);

  return (
    <>
      {/* Burger Menu Button */}
      <button className="burger" onClick={() => setIsOpen(true)}>
        ☰
      </button>

      {/* Right-Side Menu */}
      <div className={`menu ${isOpen ? "open" : ""}`}>
        {/* Close Button */}
        <button className="close" onClick={() => setIsOpen(false)}>
          <Image src={closeIcon} alt="" />
        </button>

        {/* Navigation Links */}
        <div className="mobile-menu">
          <nav>
            <ul>
              <li>
                <CustomButton />
              </li>
              <li>
                <div
                  className="left-panel-chat"
                  onClick={() => {
                    if (pathname !== "/chat") {
                      setNavLoading(true);
                      navigate.push("/chat");
                    }
                  }}
                >
                  <Image src={chatIcon} alt="" />
                  CHAT
                </div>
              </li>
              <li>
                <div className="bridge" onClick={() => {
                  window.open("https://www.bitlayer.org/bridge", "_blank")
                }}>
                  <Image src={bridgeIcon} alt="" />
                  Bridge
                </div>
              </li>
            </ul>
          </nav>
          <div>
            <div className="logout" onClick={() => {
              setNavLoading(true)
              disconnect();
            }}>
              <Image src={logoutIcon} alt="Logout" />
              <div>Logout</div>
            </div>

            <ul className="mobile-social">
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

      {/* Overlay (Click to Close) */}
      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)} />}
    </>
  );
}
