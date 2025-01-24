import Image from "next/image";
import Link from "next/link";
import blayLogo from "../assets/blayLogo.png";
import landingImg from "../assets/landing-graphics.svg";
import telIcon from "../assets/telegram.svg";
import webIcon from "../assets/web.svg";
import xIcon from "../assets/x.svg";

export default function Landing() {
  return (
    <div className="blay-main">
      <div className="header">
        <Image src={blayLogo} alt="Blay Logo" />
      </div>
      <div className="landing-container">
        <div className="landing-main">
          <div className="landing-block">
            <Image src={landingImg} alt="" className="landing-img" />
            <div className="landing-graphics">
              <div>Let’s make things happen</div>
              <div>
                Plunge headfirst into the wacky world of Blay—create wild
                images, join outrageous campaigns, and rack up XP like a pro
                create wild images, join outrageous campaigns, and rack up XP
                like a pro
              </div>
            </div>
          </div>
          <div className="bottom-signin">
            <button>
              <Link href="/chat">Sign In</Link>
            </button>
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
  );
}
