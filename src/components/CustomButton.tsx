import {
  useAccount,
  useChains,
  useConnect,
  ConnectButton,
} from "@particle-network/connectkit";
import profilePic from "../assets/profile-pic.png";

import Image from "next/image";
import React from "react";
import { formattedAddress } from "@/helpers/utils";
import { useRouter } from "next/navigation";
import { config } from "./providers";

const CustomButton = () => {
  const { isConnected, address, chainId } = useAccount();
  const { connect } = useConnect();
  const chains = useChains();
  const navigate = useRouter();
  return isConnected ? (
    <div
      onClick={() => {
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
