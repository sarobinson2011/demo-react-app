// App.js

import { useEffect, useState } from 'react';
import './App.css';
import DepositComponent from './depositComponent';
import WithdrawComponent from './withdrawComponent';
import './depositEventListener';
import './withdrawEventListener';

function App() {
  // const contractAddress = process.env.REACT_APP_LOCKDROP_ADDRESS;

  const [currentAccount, setCurrentAccount] = useState(null);

  const checkWalletIsConnected = () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have Metamask installed");
      return;
    } else {
      console.log("Wallet exists... ready to go!");
    }
  }

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    console.log('Contract address:', process.env.REACT_APP_LOCKDROP_ADDRESS);

    if (!ethereum) {
      alert("Please install Metamask");
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log("Success, account found! Address: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err)
    }
  }

  const connectWalletButton = () => {
    return (
      <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
        Connect Wallet
      </button>
    )
  }

  useEffect(() => {
    checkWalletIsConnected();
  }, [])

  return (
    <div className='main-app'>
      <h1>Web3 front-end sandbox</h1>
      <div style={{ marginBottom: '10px' }}>
        {connectWalletButton()}
      </div>
      <div style={{ marginBottom: '10px' }}>
        <DepositComponent /> {/* Use the DepositComponent */}
      </div>
      <div style={{ marginBottom: '10px' }}>
        <WithdrawComponent /> {/* Use the withdrawComponent */}
      </div>
    </div>
  );

}

export default App;

