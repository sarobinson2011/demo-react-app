import React, { useState } from 'react';
import { ethers } from 'ethers';
import './DepositComponent.css';
import lockdropABI from './contracts/LockDrop.json'; // Import your lockdropABI

const DepositComponent = () => {
    const [depositAmount, setDepositAmount] = useState("");
    const contractAddress = process.env.REACT_APP_LOCKDROP_ADDRESS; // Replace with your actual contract address

    const depositHandler = async () => {
        try {
            // Validate the input
            if (!depositAmount || isNaN(parseFloat(depositAmount)) || parseFloat(depositAmount) <= 0) {
                // Handle the case where the input is empty, not a valid number, or negative/zero
                console.error("Invalid deposit amount. Please enter a valid positive number.");
                return;
            }

            // 1. Connect to the provider (MetaMask)
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            // 2. Load the contract instance
            const contractInstance = new ethers.Contract(contractAddress, lockdropABI, signer);

            // 3. Get the user's input amount
            const amountToDeposit = ethers.parseEther(depositAmount);

            console.log('Deposit pending...');

            // 4. Call the deposit function on the contract
            const transaction = await contractInstance.deposit({ value: amountToDeposit });
            await transaction.wait(); // Wait for transaction confirmation

            // 5. Handle success
            console.log("Deposit successful!");
            console.log("Transaction Receipt:", await transaction.wait());

        } catch (error) {
            // 6. Handle other errors
            console.error("Deposit failed:", error);
        }
    };

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



