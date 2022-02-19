const main = async () => {
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy("ganggang");
    await domainContract.deployed();

    console.log("Contract deployed to:", domainContract.address);

    let txn = await domainContract.register('kitty', {value: hre.ethers.utils.parseEther('1')});
    await txn.wait();
    console.log("Minted domain kitty.ganggang");

    txn = await domainContract.setRecord("kitty", "Kitty said, 'gang gang!'");
    await txn.wait();
    console.log('Set record for kitty.ganggang');

    const address = await domainContract.getAddress("kitty");
    console.log("Owner of domain kitty:", address);

    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();