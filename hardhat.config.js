require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.10",
  networks: {
    mumbai: {
      url: 'https://polygon-mumbai.g.alchemy.com/v2/xg3NtClOh4uGoQ_3pJzuc7AOtS1hSyq5',
      accounts: ['1c05ad0a37b58cb2b6a3b855e1dc99f786a55c501f54839cb394704ef83f9c4b']
    }
  }
};
