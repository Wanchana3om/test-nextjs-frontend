import { useRouter } from "next/router";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext<any>(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<string>("");
  const [userId, setUserId] = useState<any>(null);

  const signIn = async (username: string) => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/user/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
      }),
    });

    const { data } = await res.json();
    const accessToken = data?.accessToken;
    const user = data?.username;
    const userId = data?.id;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("userId", userId);
    localStorage.setItem("user", user);

    setUser(user);
    setUserId(userId);

    router.push("/");
  };

  const logOut = () => {
    localStorage.removeItem("accessToken");
    router.push("/login");
  };

  const getProfile = useCallback(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser || "");
      const storedUserId = localStorage.getItem("userId");
      setUserId(storedUserId || "");
    }
  }, []);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <AuthContext.Provider
      value={{
        user,
        userId,
        signIn,
        logOut,
        getProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
