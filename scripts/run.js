// Welcome to the playground!
// This is where we mess around with our contract

// Note: hre.ethers = Hardhat Runtime Environment
const main = async () => {
  const [owner, superCoder] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  // Pass in our domain name, in this case: ganggang will init our tld
  const domainContract = await domainContractFactory.deploy("ganggang");
  await domainContract.deployed();

  console.log("Contract owner:", owner.address);

  // BIG Payment! $
  let txn = await domainContract.register("a16z", {value: hre.ethers.utils.parseEther('1234')});
  await txn.wait();

  // How much money is in here?
  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));

  // Quick grab the funds!
  try {
    txn = await domainContract.connect(superCoder).withdraw();
    await txn.wait();
  }
  catch(error){
    console.log("Could not rob contract");
  }

  // Let's look in wallet to compare
  let ownerBalance = await hre.ethers.provider.getBalance(owner.address);
  console.log("Balance of owner before withdrawal:", hre.ethers.utils.formatEther(ownerBalance));

  // Oops, looks like the owner is saving their money!
  txn = await domainContract.connect(owner).withdraw();
  await txn.wait();

  // Fetch balance of contract and owner
  const contractBalance = await hre.ethers.provider.getBalance(domainContract.address);
  ownerBalance = await hre.ethers.provider.getBalance(owner.address);

  console.log("Contract balance after withdrawal:", hre.ethers.utils.formatEther(contractBalance));
  console.log("Balance of owner after withdrawal:", hre.ethers.utils.formatEther(ownerBalance));
};

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
