// withdrawComponent.js

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './withdrawComponent.css';
import lockdropABI from './contracts/LockDrop.json';
import { checkEventsWithdraw } from './withdrawEventListener';


const WithdrawComponent = () => {
    const [depositAmount, setWithdrawAmount] = useState("");
    const contractAddress = process.env.REACT_APP_LOCKDROP_ADDRESS;

    const withdrawHandler = async () => {
        try {
            console.log('Processing withdraw...');
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contractInstance = new ethers.Contract(contractAddress, lockdropABI, signer);
            const transaction = await contractInstance.withdraw();
            await transaction.wait();
            console.log("Withdraw successful!");
        } catch (error) {
            console.log('Withdraw error!', error);
        }
    }

    useEffect(() => {
        checkEventsWithdraw();
    }, []);

    return (
        <div>
            <button onClick={withdrawHandler} className='cta-button withdraw-button'>
                Withdraw
            </button>
        </div>
    );
};

export default WithdrawComponent;



