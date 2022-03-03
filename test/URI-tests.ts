import { URIToken } from "typechain";
import { deploy } from "./erc721-tests";
const fetch = require("node-fetch");
const { ethers } = require("hardhat");
const { expect } = require("chai");

function transformToUrl(uri: string, id: number) {
  const regex = /{(.*?)}/;
  return uri.replace(regex, `${id}`);
}

describe("URI token tests", () => {
  let token: URIToken;
  beforeEach(async function () {
    token = await deploy<URIToken>("URIToken");
  });

  it("Should do stuff", async function () {

    const GOLD = 0;

    const uri = await token.uri(GOLD);
    const url = transformToUrl(uri, GOLD);


    console.log(url)
    const metadata = await fetch();

  });

});