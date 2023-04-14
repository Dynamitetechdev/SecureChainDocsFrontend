import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";
import { WagmiConfig, createClient, configureChains, mainnet } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { InjectedConnector } from "wagmi/connectors/injected";
// const PROJECT_ID = process.env.PROJECT_ID;

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [
    alchemyProvider({
      apiKey: "AnUFm6zrMFdoAuF0gwTBRxBASoFnO3Y1",
    }),
    publicProvider(),
  ]
);
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: "3e37bde473a0c1506472373088316159",
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "injected",
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

const Layouts = ({ children }) => {
  return (
    <NotificationProvider>
      <MoralisProvider initializeOnMount={false}>
        <WagmiConfig client={client}>{children}</WagmiConfig>
      </MoralisProvider>
    </NotificationProvider>
  );
};

export default Layouts;
