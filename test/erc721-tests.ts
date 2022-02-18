import { Contract, ContractFactory } from "ethers";
import { Quotes, RandomToken  } from "../typechain";
import { Marketplace721 } from "typechain/Marketplace721";
const { expect } = require("chai");
const { ethers } = require("hardhat");

export function deploy<T extends Contract>(name: string, ...params: any[]) {
  return ethers.getContractFactory(name)
    .then((factory: ContractFactory) => factory.deploy(...params))
    .then((instance: T) => instance.deployed() as Promise<T>);
}

describe.skip("Quotes", function () {
  let quote: Quotes;
  let marketplace: Marketplace721;
  let random: RandomToken;
  let ownerAdd: any;
  let signer1: any;
  let signer2: any;
  let signer3: any;
  let add1: any;
  let add2: any;
  let add3: any;
  beforeEach(async function () {
    const contracts = await Promise.all([
      deploy<Quotes>('Quotes'),
      deploy<Marketplace721>('Marketplace'),
      deploy<RandomToken>('RandomToken')
    ]);
    quote = contracts[0];
    marketplace = contracts[1];
    random = contracts[2];
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
    const tx = await quote.safeMint(add1, 1);
    await tx.wait();
  });

  it("Should mint a token to sign1 address", async function () {

    const ownerOf1 = await quote.ownerOf(1);

    expect(ownerOf1).to.equal(add1);
  });

  it("Should put a token for sell on the marketplace", async function () {

    const quote1 = quote.connect(signer1);
    const market1 = marketplace.connect(signer1);

    const [tx1, tx2] = await Promise.all([
      quote1.approve(marketplace.address, 1),
      market1.toMarket(quote.address, 1, ethers.utils.parseEther('10'))
    ]);

    await Promise.all([tx1.wait(), tx2.wait()]);

    expect(await marketplace.price(quote.address, 1)).to.equal(ethers.utils.parseEther('10'));


  });

  it("Should allow signer2 to buy a token and price value should be transfered to original owner", async function () {

    const quote1 = quote.connect(signer1);
    const market1 = marketplace.connect(signer1);

    const [tx1, tx2] = await Promise.all([
      quote1.approve(marketplace.address, 1),
      market1.toMarket(quote.address, 1, ethers.utils.parseEther('10'))
    ]);

    await Promise.all([tx1.wait(), tx2.wait()]);

    const originalBalance = ethers.utils.formatEther(await signer1.getBalance());

    const market2 = marketplace.connect(signer2);

    const tx3 = await market2.buyFromMarket(quote.address, 1, { value: ethers.utils.parseEther('10') });
    await tx3.wait();

    const newOwnerOf1 = await quote.ownerOf(1);

    const currentBalance = ethers.utils.formatEther(await signer1.getBalance());

    const sign1BalanceDiff = currentBalance - originalBalance;

    expect(newOwnerOf1).to.equal(add2);
    expect(sign1BalanceDiff).to.equal(10);
  });

  it("Should be able to use the marketplace with another ERC721 compatible contract", async function () {

    const tx = await random.safeMint(add1, 9);

    await tx.wait();

    const rando1 = random.connect(signer1);

    const approval = await rando1.approve(marketplace.address, 9);

    await approval.wait();

    const market1 = marketplace.connect(signer1);

    const tx2 = await market1.toMarket(random.address, 9, ethers.utils.parseEther('20'));

    await tx2.wait();

    expect(await marketplace.price(random.address, 9)).to.equal(ethers.utils.parseEther('20'));

  });

  it("Should allow signer2 to buy the token off the marketplace", async function () {

    const tx = await random.safeMint(add1, 9);

    await tx.wait();

    const rando1 = random.connect(signer1);

    const approval = await rando1.approve(marketplace.address, 9);

    await approval.wait();

    const market1 = marketplace.connect(signer1);

    const tx2 = await market1.toMarket(random.address, 9, ethers.utils.parseEther('20'));

    await tx2.wait();

    //

    const market2 = marketplace.connect(signer2);

    const tx3 = await market2.buyFromMarket(random.address, 9, { value: ethers.utils.parseEther('20') });

    await tx3.wait();

    expect(await random.ownerOf(9)).to.equal(add2);

  });

  it("Should be able to store token from different contracts with the same ID", async function () {

    await Promise.all([
      quote.safeMint(add1, 2).then(tx => tx.wait()),
      random.safeMint(add3, 2).then(tx => tx.wait())
    ]);

    const quote1 = quote.connect(signer1);
    const random3 = random.connect(signer3);

    await Promise.all([
      quote1.approve(marketplace.address, 2).then(tx => tx.wait()),
      random3.approve(marketplace.address, 2).then(tx => tx.wait())
    ]);

    const market1 = marketplace.connect(signer1);
    const market3 = marketplace.connect(signer3);

    await Promise.all([
      market1.toMarket(quote.address, 2, ethers.utils.parseEther('10')).then(tx => tx.wait()),
      market3.toMarket(random.address, 2, ethers.utils.parseEther('20')).then(tx => tx.wait())
    ]);

    expect(await marketplace.price(quote.address, 2)).to.equal(ethers.utils.parseEther('10'));
    expect(await marketplace.price(random.address, 2)).to.equal(ethers.utils.parseEther('20'));

  });

});