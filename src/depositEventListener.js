// depositEventListener.js

import { ethers } from "ethers";
import lockdropABI from './contracts/LockDrop.json';

export const checkEventsDeposit = async () => {

    return new Promise((resolve, reject) => {

        const contractAddress = process.env.REACT_APP_LOCKDROP_ADDRESS;
        const provider = new ethers.BrowserProvider(window.ethereum);
        let contract = new ethers.Contract(contractAddress, lockdropABI, provider);

        const handleNewDeposit = (user, amount, timestamp) => {
            console.log("New deposit event was emitted!");
            contract.off("NewDeposit", handleNewDeposit); // Remove the event listener
            resolve();
        };

        contract.on("NewDeposit", handleNewDeposit);      // <-- this is the functionality

    }).catch((error) => {
        console.error("Error during promise execution:", error);
        return Promise.reject(error);
    });
};
