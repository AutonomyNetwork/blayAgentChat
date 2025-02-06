import { AppContext } from '@/app/Context';
import { useUserService } from '@/helpers/userService';
import { useAccount } from '@particle-network/connectkit';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useRef } from 'react';

const CheckWalletConnected = () => {
  const { fetchUserWallet } = useUserService()
  const { isConnected, address, isDisconnected } = useAccount()
  const { setShowChat } = useContext(AppContext)
  const timeoutRef = useRef<any>();
  const navigate = useRouter();

  useEffect(() => {
    if (address && isConnected)
      fetchUserWallet({ address })
  }, [address, isConnected])

  useEffect(() => {
    if (isDisconnected) {
      timeoutRef.current = setTimeout(() => {
        window.sessionStorage.clear();
        setShowChat(false)
        navigate.push("/");
      }, 100);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isDisconnected, timeoutRef]);
  return null;
};

export default CheckWalletConnected;