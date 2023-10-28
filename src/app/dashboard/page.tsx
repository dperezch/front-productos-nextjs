"use client";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  console.log(session);

  const getProductos = async() => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/productos`,{
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session?.user?.token}`,
        }
    })
    const data = await res.json();
    console.log(data);
    
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>
        <button
            onClick={getProductos}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
        >
            Get productos
        </button>
    </div>
  );
};
export default Dashboard;
