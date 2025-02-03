import {
  ConnectButton,
  useAccount,
  useChains
} from "@particle-network/connectkit";
import profilePic from "../assets/profile-pic.png";

import { AppContext } from "@/app/Context";
import { formattedAddress } from "@/helpers/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const CustomButton = () => {
  const { isConnected, address, chainId } = useAccount();
  const { setNavLoading } = useContext(AppContext)
  const chains = useChains();
  const navigate = useRouter();
  return isConnected ? (
    <div
      onClick={() => {
        setNavLoading(true)
        navigate.push("/profile");
      }}
      className="profile-address"
    >
      <Image src={profilePic} alt="" />
      <div>
        {formattedAddress(address)}
        <div className="chain-name"> {chains?.find((ele) => ele.id === chainId)?.name}</div>
      </div>
    </div>
  ) : (
    <ConnectButton label="Sign In" />
  );
};

export default CustomButton;
