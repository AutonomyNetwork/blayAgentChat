'use client';

import { AppContext } from '@/app/Context';
import { ConnectKitProvider, createConfig } from '@particle-network/connectkit';
import { authWalletConnectors } from '@particle-network/connectkit/auth';
import {
  mainnet,
  //  solana
} from '@particle-network/connectkit/chains';
import { evmWalletConnectors } from '@particle-network/connectkit/evm';
// import { wallet, EntryPosition } from '@particle-network/connectkit/wallet';
import React, { useState } from 'react';

//Retrived from https://dashboard.particle.network
const projectId = "27ae829b-29d2-406e-a9e6-fd58bc053eae" as string;
const clientKey = "cPAs6YorCKfOcUIQzO3l6shsDcROIyk42OGBCZPb" as string;
const appId = "6bdacc67-f4c1-4293-b909-bcf9e1cd761e" as string;

if (!projectId || !clientKey || !appId) {
  throw new Error('Please configure the Particle project in .env first!');
}

export const config = createConfig({
  projectId,
  clientKey,
  appId,
  appearance: {
    // Optional, collection of properties to alter the appearance of the connection modal
    // Optional, label and sort wallets (to be shown in the connection modal)
    recommendedWallets: [
      { walletId: 'metaMask', label: 'Recommended' },
      { walletId: 'coinbaseWallet', label: 'popular' },
    ],
    splitEmailAndPhone: false, // Optional, displays Email and phone number entry separately
    collapseWalletList: true, // Optional, hide wallet list behind a button
    hideContinueButton: false, // Optional, remove "Continue" button underneath Email or phone number entry
    connectorsOrder: ['email', 'social', 'wallet'], //  Optional, sort connection methods (index 0 will be placed at the top)
    language: 'en-US', // Optional, also supported ja-JP, zh-CN, zh-TW, and ko-KR
    mode: 'dark', // Optional, changes theme between light, dark, or auto (which will change it based on system settings)
    theme: {
      '--pcm-accent-color': '#e46e1b',
      // ... other options
    },
    filterCountryCallingCode: (countries) => {
      // Optional, whitelist or blacklist phone numbers from specific countries
      return countries.filter((item) => item === 'US');
    },
  },
  walletConnectors: [
    authWalletConnectors({
      // Optional, configure this if you're using social logins
      authTypes: ['email', 'google', 'apple', 'twitter', 'github'], // Optional, restricts the types of social logins supported
      fiatCoin: 'USD', // Optional, also supports CNY, JPY, HKD, INR, and KRW
      promptSettingConfig: {
        // Optional, changes the frequency in which the user is asked to set a master or payment password
        // 0 = Never ask
        // 1 = Ask once
        // 2 = Ask always, upon every entry
        // 3 = Force the user to set this password
        promptMasterPasswordSettingWhenLogin: 1,
        promptPaymentPasswordSettingWhenSign: 1,
      },
    }),
    evmWalletConnectors({
      metadata: { name: 'Blay', icon: '', description: '', url: '' }, // Optional, this is Metadata used by WalletConnect and Coinbase
      // multiInjectedProviderDiscovery: true, // Optional, enables the discovery of multiple injected providers
      walletConnectProjectId: "15c3e98378673ef1aa8017bee196d3db"
    }),
  ],
  // plugins: [
  //   wallet({
  //     // Optional configurations for the attached embedded wallet modal
  //     entryPosition: EntryPosition.BR, // Alters the position in which the modal button appears upon login
  //     visible: true, // Dictates whether or not the wallet modal is included/visible or not
  //     customStyle: {
  //       displayTokenAddresses: ["0x4d224452801ACEd8B2F0aebE155379bb5D594381"], // Display a custom token within the wallet modal
  //       priorityTokenAddresses: ["0x4d224452801ACEd8B2F0aebE155379bb5D594381"],
  //     },
  //   }),
  // ],
  chains: [mainnet],
});

// Export ConnectKitProvider to be used within your index or layout file (or use createConfig directly within those files).
export const ParticleConnectkit = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [isReady, setIsReady] = useState(false);

  return (
    <ConnectKitProvider config={config}>
      <AppContext.Provider value={{ user, setUser, wallet, setWallet, showChat, setShowChat, isReady, setIsReady }}>
        {children}
      </AppContext.Provider>
    </ConnectKitProvider>
  )
};
