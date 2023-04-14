import Image from "next/image";
import { Inter } from "next/font/google";
import { useAccount, useConnect } from "wagmi";
export default function Home() {
  const { connectors, connect, error, isLoading, pendingConnector } =
    useConnect();
  const { isConnected } = useAccount();

  const connectUser = (connector) => {
    connect({
      connector,
    });
  };
  const PROJECT_ID = process.env.PROJECT_ID;
  if (PROJECT_ID) {
    console.log("projectid" + PROJECT_ID);
  }

  console.log(connectors);
  return (
    <main className="">
      <h1>Hackathon Challenge</h1>
      <h1>Connect Wallet</h1>
      <div className="allConnectors flex flex-col w-56">
        {connectors &&
          connectors.map((eachConnector, index) => (
            <button
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mb-3"
              key={index}
              onClick={() => connectUser(eachConnector)}
            >
              {eachConnector.name}
              {!eachConnector.ready ? "Not Supported" : null}
              {isLoading &&
                eachConnector.id === pendingConnector.id &&
                "Please Wait...."}
            </button>
          ))}

        {error && <h1>{error.message}</h1>}
      </div>
    </main>
  );
}
