// depositComponent.js

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './depositComponent.css';
import lockdropABI from './contracts/LockDrop.json';
import { checkEventsDeposit } from './depositEventListener';


const DepositComponent = () => {
    const [depositAmount, setDepositAmount] = useState("");
    const contractAddress = process.env.REACT_APP_LOCKDROP_ADDRESS; // Replace with your actual contract address

    const depositHandler = async () => {
        try {
            if (!depositAmount || isNaN(parseFloat(depositAmount)) || parseFloat(depositAmount) <= 0) {
                console.error("Invalid deposit amount. Please enter a valid positive number.");
                return;
            }
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contractInstance = new ethers.Contract(contractAddress, lockdropABI, signer);
            const amountToDeposit = ethers.parseEther(depositAmount);
            console.log('Deposit pending...');
            const transaction = await contractInstance.deposit({ value: amountToDeposit });
            await transaction.wait(); // Wait for transaction confirmation
            console.log("Deposit successful!");
            // console.log("Transaction Receipt:", await transaction.wait());
        } catch (error) {
            console.error("Deposit failed:", error);
        }
    };

    useEffect(() => {
        checkEventsDeposit();
    }, []);

    return (
        <div>
            <label htmlFor="depositAmount">Enter Deposit Amount: </label>
            <input
                type="text"
                id="depositAmount"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="custom-input"
            />
            <br />
            <button onClick={depositHandler} className='cta-button deposit-button'>
                Deposit
            </button>
        </div>
    );
};

export default DepositComponent;



