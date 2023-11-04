import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface FetchDataResponse {
  isLoading: boolean;
  error: any;
  data: any;
}

export default function useFetchDatos(url: string): FetchDataResponse {
  const [data, setData] = useState<any>();
  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${session?.user?.token}`,
            },
          }
        );
        const datos = await response.json();
        setData(datos);
      } catch (err) {
        setError(err);
      }
      setIsLoading(false);
    }
    if (status === "authenticated") {
      fetchData();
      console.log(data);
      
    }
  }, []);

  return { isLoading, error, data };
}
