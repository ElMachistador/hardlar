import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

import { Marketplace1155Service } from 'src/app/marketplace1155.service';
import { HalpService } from 'src/app/halp.service';
import { BigNumber, ethers, Event } from 'ethers';

interface ForSell {
  contract: string,
  id: string,
  owner: string
}

interface Token {
  id: number,
  amount: number
}

interface Offer {
  contract: string,
  id: number,
  owner: string,
  amount: BigNumber,
  price: BigNumber
}

interface Batches {
  [key: string]: string,

}

@Component({
  selector: 'app-marketplace1155',
  templateUrl: './marketplace1155.component.html',
  styleUrls: ['./marketplace1155.component.scss']
})
export class Marketplace1155Component implements OnInit {


  singleOffer = new FormGroup({
    id: new FormControl(),
    amount: new FormControl(),
    price: new FormControl()
  });

  batchOffer = new FormArray([]);

  myTokens: (Token | null)[] = [];

  listedTokens: Offer[] = [];

  selectedToken = new FormControl();



  constructor(
    private market: Marketplace1155Service,
    private halp: HalpService
  ) { }

  ngOnInit() {
  }


  approveMarket() {
    const address = this.market.contractAddress;
    const approve = this.halp.token.setApprovalForAll(address, true);
  }


  async getBalance() {
    const userAddress = await this.halp.signer.getAddress();
    const filterSingleIn = this.halp.token.filters.TransferSingle(null, null, userAddress);
    const filterBatch = this.halp.token.filters.TransferBatch(null, null, userAddress);
    const querySingle = await this.halp.token.queryFilter(filterSingleIn);
    const queryBatch = await this.halp.token.queryFilter(filterBatch);
    const arrSingle = querySingle.map(async (event) => {
      const ids = event.args![3].toNumber();
      const isOwned = await this.isOwner(userAddress, ids);
      if (!isOwned) return null;
      return ({
        id: event.args![3].toNumber(),
        amount: event.args![4].toNumber()
      });
    });
    const resolve: (Token | null)[] = await Promise.all(arrSingle);
    const arrBatch = queryBatch.map(async (event) => {
      const ids: number[] = event.args![3].map((big: BigNumber) => big.toNumber());
      const amounts: number[] = event.args![4].map((big: BigNumber) => big.toNumber());
      const final = ids.map(async (id: number, i: number) => {
        const stillOwned = await this.isOwner(userAddress, id);
        if (!stillOwned) return null;
        return {
          id: id,
          amount: amounts[i]
        }
      })
      const resolve = await Promise.all(final);
      return resolve;
    });
    const resolveBatch = await Promise.all(arrBatch);
    const batchFlat: (Token | null)[] = resolveBatch.flat()
    this.myTokens = resolve.concat(batchFlat).filter(token => token != null);
  }

  async isOwner(userAddress: string, id: Number) {
    const amountOwned = await this.halp.token.balanceOf(userAddress, id);
    return amountOwned.toNumber() != 0 ? true : false;
  }


  async addOffer() {
    const contract = this.halp.contractAddress;
    const { id, amount, price } = this.singleOffer.value;
    const tx = await this.market.marketplace.addOffer(contract, id, amount, ethers.utils.parseEther(price));
    await tx.wait();
  }

  addBatch() {
    const control = new FormGroup({
      id: new FormControl(),
      amount: new FormControl(),
      price: new FormControl()
    });
    this.batchOffer.push(control);
  }

  async addBatchOffer() {
    const contractAddress = this.halp.contractAddress;
    const offer = this.batchOffer.value;
    const ids: number[] = offer.map((offer: Offer) => offer.id);
    const amounts: number[] = offer.map((offer: Offer) => offer.amount);
    const price: number = offer.map((offer: Offer) => offer.price);
    const tx = await this.market.marketplace.addBatchOffer(contractAddress, ids, amounts, ethers.utils.parseEther(`${price}`));
    await tx.wait();

  }

  async test() {

  }



  async getListing() {
    const contract = this.halp.contractAddress;

    const filter = this.market.marketplace.filters.OnSale(contract);

    const events = await this.market.marketplace.queryFilter(filter);

    //François Techniques, gg
    // const record: Record<string, ()=> Promise<unknown>> = {};
    // for (const event of events) {
    //   const { tokenContract, tokenId, owner } = event.args!;
    //   record[`${tokenContract}:${tokenId}:${owner}`] = () => this.forSell({ contract: tokenContract, id: tokenId, owner });
    // }
    // const getAll = Object.values(record).map(forSell => forSell());
    // const result = await Promise.all(getAll);


    const onSale = events.map(event => {
      const { tokenContract, tokenId, owner } = event.args!;
      return `${tokenContract}:${tokenId}:${owner}`;
    });

    const undiplicated = Array.from(new Set(onSale));

    const listedToken = undiplicated.map(async (elem) => {
      const [contract, id, owner] = elem.split(':');
      return this.forSell({ contract, id, owner });
    });

    this.listedTokens = await Promise.all(listedToken)
      .then(tokens => tokens.filter(token => token.amount != 0));

  }

  async forSell({ contract, id, owner }: ForSell) {
    return this.market.marketplace.toSell(contract, id, owner)
      .then((listing: Offer) => ({
        id,
        contract,
        owner,
        amount: listing.amount.toNumber(),
        price: listing.price
      }));
  }



  async acceptOffer() {
    const offers = this.selectedToken.value as Offer[];
    const sender = await this.market.signer.getAddress();
    // 1. Construct batches
    const batches: Record<string, string[]> = {};
    for (const offer of offers) {
      const { id, contract, owner, price } = offer;
      const key = `${contract}:${owner}`;
      if (!batches[key]) batches[key] = [];
      const value = `${id}:${price}`
      batches[key].push(value);
    }

    // 2. Execute txs
    for (const [key, values] of Object.entries(batches)) {
      const [contract, owner] = key.split(':');
      if (values.length === 1) {
        const [id, price] = values[0].split(':');
        await this.market.marketplace.acceptOffer(contract, id, owner, sender, '0x00', { value: price });
      } else {
        let totalPrice = 0;
        let ids = [];
        for (let value of values) {
          const [id, price] = value.split(':');
          totalPrice += Number(price);
          ids.push(id)
        }
        await this.market.marketplace.acceptBatchOffer(contract, ids, owner, sender, '0x00', { value: totalPrice });
      }
    }
  }


}
