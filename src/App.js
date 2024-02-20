import { useEffect, useState } from 'react';
import './App.css';
import lockdropABI from './contracts/LockDrop.json';
import { ethers } from 'ethers';
import DepositComponent from './DepositComponent';

function App() {
  const contractAddress = process.env.REACT_APP_LOCKDROP_ADDRESS;

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

  const withdrawHandler = async () => {
    try {
      console.log('Processing withdraw...');
      // withdraw handler code
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, lockdropABI, signer);
      const transaction = await contractInstance.withdraw();
      await transaction.wait(); // Wait for transaction confirmation
      console.log("Withdraw successful!");
    } catch (error) {
      console.log('Withdraw error!', error);
    }
  }

  const withdrawButton = () => {
    return (
      <button onClick={withdrawHandler} className='cta-button withdraw-button'>
        Withdraw
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
        {withdrawButton()}
      </div>
    </div>
  );

}

export default App;

