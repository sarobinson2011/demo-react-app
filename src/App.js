import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import lockdropABI from './contracts/LockDrop.json';
import { ethers } from 'ethers';


function App() {

  const contractAddress = process.env.REACT_APP_LOCKDROP_ADDRESS;

  const [currentAccount, setCurrentAccount] = useState(null);

  const checkWalletIsConnected = () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have Metamask installed");
      return;
    }
    else {
      console.log("Wallet exists... ready to go!")
    }
  }

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    console.log('Contract address:', process.env.LOCKDROP_CONTRACT_ADDRESS);    // HERE <---

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

  const depositHandler = async () => {

    try {

      // 1. Connect to the provider (MetaMask)
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const abi = lockdropABI;

      console.log('contract address:', contractAddress);
      console.log('abi:', lockdropABI);
      console.log('signer:', signer);

      // 2. Load the contract instance
      const contractInstance = new ethers.Contract(contractAddress, lockdropABI, signer);

      console.log('contract instance:', contractInstance);

      // 3. Get the user's input amount (if applicable)
      const amountToDeposit = ethers.parseEther("0.01");
      // const amountToDeposit =    -->  or, get the amount from a form / input field

      // 4. Call the deposit function on the contract
      const transaction = await contractInstance.deposit({ value: amountToDeposit });
      await transaction.wait(); // Wait for transaction confirmation

      // 5. Handle success
      console.log("Deposit successful!");

    } catch (error) {
      // 6. Handle error
      console.error("Deposit failed:", error);
    }
  };

  const depositButton = () => {
    return (
      <button onClick={depositHandler} className='cta-button deposit-button'>
        Deposit
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
        {depositButton()}
      </div>
    </div>
  )
}
export default App;
