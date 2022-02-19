const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("ganggang");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  let txn = await domainContract.register("dada", {
    value: hre.ethers.utils.parseEther("1"),
  });
  await txn.wait();
  console.log("Minted domain dada.ganggang");

  txn = await domainContract.setRecord("dada", "Dada said gang gang!");
  await txn.wait();
  console.log("Set record for dada.ganggang");

  const address = await domainContract.getAddress("dada");
  console.log("Owner of domain dada:", address);

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
