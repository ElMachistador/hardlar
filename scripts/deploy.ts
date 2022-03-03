// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Halp = await ethers.getContractFactory("Halp");
  const halps = await Halp.deploy();

  await halps.deployed();

  console.log("Halp deployed to:", halps.address);

  const Marketplace1155 = await ethers.getContractFactory("Marketplace1155");
  const marketplace = await Marketplace1155.deploy();

  await marketplace.deployed();

  console.log("Marketplace1155 deployed to:", marketplace.address);

  const URIToken = await ethers.getContractFactory('URIToken');
  const uriToken = await URIToken.deploy();

  await uriToken.deployed();

  console.log("UriToken deployed to:", uriToken.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
