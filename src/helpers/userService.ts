import { useContext, useEffect, useState } from "react";
import useAxios from "./useAxios";
import { AppContext } from "@/app/Context";
import { useAccount } from "@particle-network/connectkit";

export const useUserService = () => {
  const { isConnected } = useAccount()
  const { onCall: getUser, data } = useAxios({
    api: "/user",
    method: "get",
    needToken: true,
  });


  const { onCall: getUserWallet } = useAxios({
    api: "/user/wallet",
    method: "post",
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setUser, setShowChat, setIsReady } = useContext(AppContext)

  useEffect(() => {
    if (isConnected && data?.result?.id) {
      setIsReady(true)
    }
  }, [isConnected, data])


  const fetchUser = async () => {
    setLoading(true);
    setError(null);

    try {
      const userData = await getUser({});
      if (userData?.result?.wallet_address) {
        setShowChat(true)
      }
      if (!userData) throw new Error("User not found.");
      setUser(userData?.result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserWallet = async ({ address }: any) => {

    setLoading(true);
    setError(null);

    try {
      const resp = await getUserWallet({ data: { address: address?.toLowerCase() } });
      if (resp?.result) {
        window.sessionStorage.setItem("token", resp?.result);
        fetchUser();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, fetchUserWallet };
};
