// withdrawEventListener.js

import { ethers } from "ethers";
import lockdropABI from './contracts/LockDrop.json';
import Swal from 'sweetalert2';

export const checkEventsWithdraw = async () => {

    return new Promise((resolve, reject) => {

        const contractAddress = process.env.REACT_APP_LOCKDROP_ADDRESS;
        const provider = new ethers.BrowserProvider(window.ethereum);
        let contract = new ethers.Contract(contractAddress, lockdropABI, provider);

        const handleNewWithdraw = (user, amount, timestamp) => {
            // console.log("New withdraw event was emitted!");

            const message = `New withdraw event was emitted! User: ${user}, Amount: ${amount}, Timestamp: ${timestamp}`;

            Swal.fire({
                title: 'Event Detected!',
                text: message,
                icon: 'success',
                confirmButtonText: 'OK'
            });

            contract.off("NewWithdraw", handleNewWithdraw);
            resolve();
        };

        contract.on("NewWithdraw", handleNewWithdraw);

    }).catch((error) => {
        console.error("Error during promise execution:", error);
        return Promise.reject(error);
    });
};
