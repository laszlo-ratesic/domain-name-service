// Welcome to the playground!
// This is where we mess around with our contract

// Note: hre.ethers = Hardhat Runtime Environment
const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  // Pass in our domain name, in this case: ganggang will init our tld
  const domainContract = await domainContractFactory.deploy("ganggang");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  // Passing two variables - domain name & value AKA $$m00lah$$
  let txn = await domainContract.register("kitty", {value: hre.ethers.utils.parseEther('0.1')});
  await txn.wait();

  const addy = await domainContract.getAddress("kitty");
  console.log("Owner of domain kitty:", addy);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
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
