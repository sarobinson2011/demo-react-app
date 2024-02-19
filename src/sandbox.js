const DepositComponent = () => {
    const [depositAmount, setDepositAmount] = useState(""); // declare State Variable - 'depositAmount'

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

            // 3. Get the user's input amount
            const amountToDeposit = ethers.parseEther(depositAmount);

            // 4. Call the deposit function on the contract
            const transaction = await contractInstance.deposit({ value: amountToDeposit });
            await transaction.wait(); // Wait for transaction confirmation

            // 5. Handle success
            console.log("Deposit successful!");
            console.log("Transaction Receipt:", await transaction.wait());

        } catch (error) {
            // 6. Handle error
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
            />
            <br />
            <button onClick={depositHandler} className='cta-button deposit-button'>
                Deposit
            </button>
        </div>
    );
};

export default DepositComponent;
