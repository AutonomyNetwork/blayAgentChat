import { useContext, useEffect, useState } from "react";
import useAxios from "./useAxios";
import { AppContext } from "@/app/Context";

export const userService = () => {
  const { onCall: getUser } = useAxios({
    api: "/user",
    method: "get",
    needToken: true,
  });

  const { onCall: createUser, data: createUserData, } = useAxios({
    api: "/user/create",
    method: "post",
    needToken: true,
  });

  const { onCall: getUserWallet } = useAxios({
    api: "/user/wallet",
    method: "post",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setUser, setWallet } = useContext(AppContext)


  const fetchUser = async () => {
    setLoading(true);
    setError(null);

    try {
      const userData = await getUser({});
      console.log(userData);

      if (!userData) throw new Error("User not found.");
      setUser(userData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createUserIfNotExists = async () => {
    setLoading(true);
    setError(null);

    try {
      await createUser({});
      if (!createUserData) throw new Error("Failed to create user.");
      setUser(createUserData);
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
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, fetchUserWallet };
};
