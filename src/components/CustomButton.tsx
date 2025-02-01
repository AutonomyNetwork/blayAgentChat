import { useAccount, useChains, useConnect, ConnectButton } from '@particle-network/connectkit';
import profilePic from "../assets/profile-pic.png";

import Image from 'next/image';
import React from 'react';
import { formattedAddress } from '@/helpers/utils';
import { useRouter } from 'next/navigation';
import { config } from './providers';

const CustomButton = () => {
  const { isConnected, address, chainId } = useAccount();
  const { connect } = useConnect()
  const chains = useChains();
  const navigate = useRouter()
  return (
    isConnected ? <div onClick={() => {
      navigate.push("/profile")
    }}>
      <Image src={profilePic} alt='' />
      {formattedAddress(address)}
      {chains?.find(ele => ele.id === chainId)?.name}
    </div> :
      // <button onClick={async () => {
      //   await connect({
      //     connector: config.connectors?.[0]
      //   });
      // }}>
      //   Sign In
      // </button>
      <ConnectButton label='Sign In' />
  );
};

export default CustomButton;