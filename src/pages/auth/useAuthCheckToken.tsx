import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useAuthCheckToken = () => {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      router.push("/login");
    }
  }, [router]);
};
