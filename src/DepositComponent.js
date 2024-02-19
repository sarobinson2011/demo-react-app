import { useState } from 'react';
import { ethers } from 'ethers';
import lockdropABI from './contracts/LockDrop.json';  // Import your lockdropABI

const DepositComponent = () => {
    const [depositAmount, setDepositAmount] = useState("");
    const contractAddress = process.env.REACT_APP_LOCKDROP_ADDRESS;


    // this - as per ChatGPT - does not work ....  working code is below, commented out!
    // we're trying to handle input edge cases    
    const depositHandler = async () => {
        try {
            // Validate the input
            if (!depositAmount || isNaN(parseFloat(depositAmount))) {
                // Handle the case where the input is empty or not a valid number
                console.error("Invalid deposit amount. Please enter a valid number.");
                return;
            }

            // Proceed with the deposit if the input is valid
            const amountToDeposit = ethers.parseEther(depositAmount);

            // ... (remaining code)
        } catch (error) {
            // Handle other errors
            console.error("Deposit failed:", error);
        }
    };



    // const depositHandler = async () => {
    //     try {
    //         // 1. Connect to the provider (MetaMask)
    //         const provider = new ethers.BrowserProvider(window.ethereum);
    //         const signer = await provider.getSigner();
    //         const abi = lockdropABI;

    //         console.log('contract address:', contractAddress);
    //         console.log('abi:', lockdropABI);
    //         console.log('signer:', signer);

    //         // 2. Load the contract instance
    //         const contractInstance = new ethers.Contract(contractAddress, lockdropABI, signer);

    //         console.log('contract instance:', contractInstance);

    //         // 3. Get the user's input amount
    //         const amountToDeposit = ethers.parseEther(depositAmount);

    //         // 4. Call the deposit function on the contract
    //         const transaction = await contractInstance.deposit({ value: amountToDeposit });
    //         await transaction.wait(); // Wait for transaction confirmation

    //         // 5. Handle success
    //         console.log("Deposit successful!");
    //         console.log("Transaction Receipt:", await transaction.wait());

    //     } catch (error) {
    //         // 6. Handle error
    //         console.error("Deposit failed:", error);
    //     }
    // };

    return (
        <div>
            <label htmlFor="depositAmount">Enter Deposit Amount: </label>
            <input
                type="text"
                id="depositAmount"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
            />
            <br />
            <button onClick={depositHandler} className='cta-button deposit-button'>
                Deposit
            </button>
        </div>
    );
};

export default DepositComponent;
