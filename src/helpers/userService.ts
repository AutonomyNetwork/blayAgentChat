import { useContext, useState } from "react";
import useAxios from "./useAxios";
import { AppContext } from "@/app/Context";

export const useUserService = () => {
  const { onCall: getUser } = useAxios({
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
  const { setUser, setShowChat } = useContext(AppContext)


  const fetchUser = async () => {
    setLoading(true);
    setError(null);

    try {
      const userData = await getUser({});
      if (userData?.result?.wallet_address) {
        setShowChat(true)
      }
      if (!userData) throw new Error("User not found.");
      setUser(userData);
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
