/* Here is the original App.js code */


// import { useEffect } from 'react';
// import { useState } from 'react';
// import './App.css';
// import contract from './contracts/LockDrop.json';
// import { ethers } from 'ethers';

// function App() {

//   const [currentAccount, setCurrentAccount] = useState(null);

//   const checkWalletIsConnected = () => {
//     const { ethereum } = window;

//     if (!ethereum) {
//       console.log("Make sure you have Metamask installed");
//       return;
//     }
//     else {
//       console.log("Wallet exists... ready to go!")
//     }
//   }

//   const connectWalletHandler = async () => {
//     const { ethereum } = window;

//     if (!ethereum) {
//       alert("Please install Metamask");
//     }

//     try {
//       const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
//       console.log("Success, account found! Address: ", accounts[0]);
//       setCurrentAccount(accounts[0]);
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   const connectWalletButton = () => {
//     return (
//       <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
//         Connect Wallet
//       </button>
//     )
//   }

//   const depositHandler = async () => {
//     // stuff
//   }

//   const depositButton = () => {
//     return (
//       <button onClick={depositHandler} className='cta-button deposit-button'>
//         Deposit
//       </button>
//     )
//   }

//   const withdrawHandler = async () => {
//     /// 
//     // stuff
//     // 
//   }

//   const withdrawButton = () => {
//     return (
//       <button onClick={withdrawHandler} className='cta-button withdraw-button'>
//         Withdraw
//       </button>
//     )
//   }

//   useEffect(() => {
//     checkWalletIsConnected();
//   }, [])

//   return (
//     <div className='main-app'>
//       <h1>Web3 front-end sandbox</h1>
//       <div style={{ marginBottom: '10px' }}>
//         {connectWalletButton()}
//       </div>
//       <div style={{ marginBottom: '10px' }}>
//         {depositButton()}
//       </div>
//       <div style={{ marginBottom: '10px' }}>
//         {withdrawButton()}
//       </div>
//     </div>
//   )
// }

// export default App;











