import { deploy } from "./erc721-tests";
import { Halp } from "typechain";
import { Marketplace1155 } from "typechain/Marketplace1155";
const { ethers } = require("hardhat");
const { expect } = require("chai");

function parse(number: number) {
  const aled = ethers.utils.parseEther(`${number}`);
  return Number(aled);
};

async function getInfo(marketplace: Marketplace1155, token: any, id: number, owner: string) {
  const [amount, price] = await Promise.all([
    marketplace.toSell(token.address, id, owner).then(result => result.amount),
    marketplace.toSell(token.address, id, owner).then(result => result.price),
  ]);
  return `${amount},${price}`;
}

describe("1155", () => {
  let token: Halp;
  let marketplace: Marketplace1155;
  let owner: any;
  let signer1: any;
  let signer2: any;
  let signer3: any;
  let signer4: any;
  let add1: any;
  let add2: any;
  let add3: any;
  let add4: any;
  beforeEach(async function () {
    const contracts = await Promise.all([
      deploy<Halp>("Halp"),
      deploy<Marketplace1155>("Marketplace1155")
    ]);
    token = contracts[0];
    marketplace = contracts[1];
    [owner, signer1, signer2, signer3, signer4] = await ethers.getSigners();
    [add1, add2, add3, add4] = await Promise.all([
      signer1.getAddress(),
      signer2.getAddress(),
      signer3.getAddress(),
      signer4.getAddress()
    ])

    await Promise.all([
      token.mintBatch(add1, [1, 2, 3], [100, 200, 300], "0x00"),
      token.mintBatch(add2, [1, 2, 3], [100, 200, 300], "0x00"),
      token.mintBatch(add3, [1, 2, 3], [100, 200, 300], "0x00")
    ]);

  });

  it("Should allow a seller to make an offer, and a buyer to accept it", async function () {

    const token1 = token.connect(signer1);
    const approval = await token1.setApprovalForAll(marketplace.address, true);
    await approval.wait();

    const market1 = marketplace.connect(signer1);

    const tx = await market1.addOffer(token.address, 1, 50, 10);
    await tx.wait();

    expect(await getInfo(marketplace, token, 1, add1)).to.equal("50,500");

    const cnl = await market1.cancelOffer(token.address, 1);
    await cnl.wait();

    expect(await getInfo(marketplace, token, 1, add1)).to.equal("0,0");
  });


  it("Should allow a user to make a batchOffer", async function () {

    const token1 = token.connect(signer1);

    const approval = await token1.setApprovalForAll(marketplace.address, true);
    await approval.wait();

    const market1 = marketplace.connect(signer1);

    const tx = await market1.addGroupOffer(token.address, [1, 2, 3], [50, 100, 150], [10, 20, 30]);
    await tx.wait();


    expect(await getInfo(marketplace, token, 1, add1)).to.equal('50,500');
    expect(await getInfo(marketplace, token, 2, add1)).to.equal('100,2000');
    expect(await getInfo(marketplace, token, 3, add1)).to.equal('150,4500');

  });

  it("A user should be able to accept a batch offer from the same seller", async function () {

    //previous tx to create an offre on the marketplace
    const token1 = token.connect(signer1);
    const approval = await token1.setApprovalForAll(marketplace.address, true);
    await approval.wait();
    const market1 = marketplace.connect(signer1);
    const tx = await market1.addGroupOffer(token.address, [1, 2, 3], [50, 100, 150], [10, 20, 30]);
    await tx.wait();
    //

    const market4 = marketplace.connect(signer4);

    const tx2 = await market4.acceptBatchOffer(token.address, [1, 2, 3], add1, [50, 100, 150], "0x00", { value: 7000 });
    await tx2.wait();

    const bigBatchBalance = await token.balanceOfBatch([add4, add4, add4], [1, 2, 3]);

    const batchBalance = bigBatchBalance.map(value => value.toNumber());

    expect(batchBalance).to.deep.equal([50, 100, 150]);

  });

  it("Should allow a user to cancel an offer", async function () {

    const market1 = marketplace.connect(signer1);

    const tx = await market1.addOffer(token.address, 1, 50, 10);
    await tx.wait();

    expect(await getInfo(marketplace, token, 1, add1)).to.equal('50,500')

    const cnl = await market1.cancelOffer(token.address, 1);
    await cnl.wait();

    expect(await getInfo(marketplace, token, 1, add1)).to.equal('0,0')

  });

  it("Should allow a token owner to cancel a batchOffer", async function () {
    //previous tx to create an offre on the marketplace
    const token1 = token.connect(signer1);
    const approval = await token1.setApprovalForAll(marketplace.address, true);
    await approval.wait();
    const market1 = marketplace.connect(signer1);
    const tx = await market1.addGroupOffer(token.address, [1, 2, 3], [50, 100, 150], [10, 20, 30]);
    await tx.wait();
    //

    const [id1, id2, id3] = await Promise.all([
      getInfo(marketplace, token, 1, add1),
      getInfo(marketplace, token, 2, add1),
      getInfo(marketplace, token, 3, add1),
    ]);

    expect([id1, id2, id3]).to.deep.equal(['50,500', '100,2000', '150,4500']);

    const cnl = await market1.cancelBatchOffer(token.address, [1, 2, 3]);
    await cnl.wait();

    const [nid1, nid2, nid3] = await Promise.all([
      getInfo(marketplace, token, 1, add1),
      getInfo(marketplace, token, 2, add1),
      getInfo(marketplace, token, 3, add1),
    ]);

    expect([nid1, nid2, nid3]).to.deep.equal(['0,0', '0,0', '0,0']);

  });


  it("A buyer should be able to buy an specified amount and the mapping should update accordingly", async function () {

    //previous tx to create an offre on the marketplace
    const token1 = token.connect(signer1);
    const approval = await token1.setApprovalForAll(marketplace.address, true);
    await approval.wait();
    const market1 = marketplace.connect(signer1);
    const tx = await market1.addOffer(token.address, 1, 100, 10);
    await tx.wait();
    //

    const market2 = marketplace.connect(signer2);

    const tx2 = await market2.acceptOffer(token.address, 1, add1, 99, "0x00", { value: 990 });
    await tx2.wait();

    expect(await getInfo(marketplace, token, 1, add1)).to.equal("1,10")

  });

  it("If the amount of token to sell reach 0, the offer should be deleted from the mapping", async function () {
    //previous tx to create an offre on the marketplace
    const token1 = token.connect(signer1);
    const approval = await token1.setApprovalForAll(marketplace.address, true);
    await approval.wait();
    const market1 = marketplace.connect(signer1);
    const tx = await market1.addOffer(token.address, 1, 100, 10);
    await tx.wait();
    const market2 = marketplace.connect(signer2);
    const tx2 = await market2.acceptOffer(token.address, 1, add1, 99, "0x00", { value: 990 });
    await tx2.wait();
    //

    const market3 = marketplace.connect(signer3);
    const tx3 = await market3.acceptOffer(token.address, 1, add1, 1, "0x00", { value: 10 });
    await tx3.wait();

    const checkListing = await marketplace.toSell(token.address, 1, add1);

    expect(await getInfo(marketplace, token, 1, add1)).to.equal("0,0");

  });

  it("The buyer should be able to buy a specified amount of each token in batch, the mapping should update accordingly and should be deleted if the amount reach 0", async function () {

    const token1 = token.connect(signer1);
    const approval = await token1.setApprovalForAll(marketplace.address, true);
    await approval.wait();

    const market1 = marketplace.connect(signer1);
    const tx = await market1.addGroupOffer(token.address, [1, 2, 3], [100, 200, 300], [10, 20, 30]);
    await tx.wait();

    const market2 = marketplace.connect(signer2);
    const tx2 = await market2.acceptBatchOffer(token.address, [1, 2, 3], add1, [50, 100, 150], "0x00", { value: 7000 });
    tx2.wait();


    const market3 = marketplace.connect(signer3);
    const tx3 = await market3.acceptBatchOffer(token.address, [1, 2, 3], add1, [50, 100, 150], "0x00", { value: 7000 });
    await tx3.wait();

    expect(await getInfo(marketplace, token, 1, add1)).to.equal("0,0");
    expect(await getInfo(marketplace, token, 2, add1)).to.equal("0,0");
    expect(await getInfo(marketplace, token, 3, add1)).to.equal("0,0");

  });

});