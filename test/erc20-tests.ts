import { Contract, ContractFactory } from "ethers";
import { deploy } from "./erc721-tests";
import { MarketplaceERC20, RingsOfPower, KornToken } from "typechain";
const { ethers } = require("hardhat");
const { expect } = require("chai");



describe.skip("RingsOfPower", function () {
  let token: RingsOfPower;
  let marketplace: MarketplaceERC20;
  let otherToken: KornToken;
  let signer1: any;
  let signer2: any;
  let signer3: any;
  let ownerAdd;
  let add1: any;
  let add2: any;
  let add3: any;
  beforeEach(async function () {
    const contracts = await Promise.all([
      deploy<RingsOfPower>('RingsOfPower'),
      deploy<MarketplaceERC20>('MarketplaceERC20'),
      deploy<KornToken>("KornToken")
    ]);
    token = contracts[0];
    marketplace = contracts[1];
    otherToken = contracts[2];
    const [owner, sign1, sign2, sign3] = await ethers.getSigners();
    signer1 = sign1;
    signer2 = sign2;
    signer3 = sign3;
    [ownerAdd, add1, add2, add3] = await Promise.all([
      owner.getAddress(),
      sign1.getAddress(),
      sign2.getAddress(),
      sign3.getAddress()
    ]);
    await Promise.all([
      token.mint(add1, 100).then(tx => tx.wait()),
      token.mint(add2, 100).then(tx => tx.wait()),
      token.mint(add3, 100).then(tx => tx.wait())
    ]);
  });

  it("User should be able to put a n amount of token for sell at a given price", async function () {

    const token1 = token.connect(signer1);

    const approve = await token1.approve(marketplace.address, 50);
    await approve.wait();

    const market1 = marketplace.connect(signer1);

    const tx = await market1.addOffer(token.address, 20, ethers.utils.parseEther('40'));
    await tx.wait();

    const item = await marketplace.toSell(1, token.address);

    expect(item.price).to.equal(ethers.utils.parseEther('40'));

  });

  it("A random given user should be able to accept an offer listed on the marketplace", async function () {

    //Previous operations to list an offer to the marketplace
    const token1 = token.connect(signer1);
    const approve = await token1.approve(marketplace.address, 50);
    await approve.wait();
    const market1 = marketplace.connect(signer1);
    const tx = await market1.addOffer(token.address, 20, ethers.utils.parseEther('40'));
    await tx.wait();
    //

    const market2 = marketplace.connect(signer2);

    const tx2 = await market2.acceptOffer(1, token.address, { value: ethers.utils.parseEther('40') });
    await tx2.wait();

    expect(await token.balanceOf(add2)).to.equal(120);

  });

  it("After offer has been accepted par user X, the amount he paid should be sent to original owner", async function () {
    //Previous operations to list an offer to the marketplace and get original balance of add1 balance
    const token1 = token.connect(signer1);
    const approve = await token1.approve(marketplace.address, 50);
    await approve.wait();
    const market1 = marketplace.connect(signer1);
    const tx = await market1.addOffer(token.address, 20, ethers.utils.parseEther('40'));
    await tx.wait();

    const originalBalance = await signer1.getBalance();
    const originalFormated = ethers.utils.formatEther(`${originalBalance}`);

    const market2 = marketplace.connect(signer2);
    const tx2 = await market2.acceptOffer(1, token.address, { value: ethers.utils.parseEther('40') });
    await tx2.wait();
    //

    const currentBalance = await signer1.getBalance();
    const currentFormated = ethers.utils.formatEther(`${currentBalance}`);

    expect(currentFormated - originalFormated).to.equal(40);

    it("Should allow users from another ERC20 contract to perform the same tasks", async function () {

      const mint = await otherToken.mint(add1, 100);
      await mint.wait();

      const otherToken1 = otherToken.connect(signer1);

      const approve = await otherToken1.approve(marketplace.address, 50);
      await approve.wait();

      const market1 = marketplace.connect(signer1);

      const tx = await market1.addOffer(otherToken.address, 10, ethers.utils.parseEther('20'));
      await tx.wait();

      const item = await marketplace.toSell(1, otherToken.address);

      expect(item.price).to.equal(ethers.utils.formatEther('20'));

    });

  });

});