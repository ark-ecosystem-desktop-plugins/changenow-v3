import React from "react";

const WalletContext = React.createContext();

export const WalletProvider = ({ api, children }) => {
    return <WalletContext.Provider value={api}>{children}</WalletContext.Provider>
}

export const useWalletContext = () => React.useContext(WalletContext);
