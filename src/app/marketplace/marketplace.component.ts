import { Component, OnInit } from '@angular/core';
import { BigNumber, ethers } from 'ethers';

import { ContractInfosService } from '../contract-infos.service';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss']
})
export class MarketplaceComponent implements OnInit {

  listing: any[] = [];

  constructor(
    private contractInfo: ContractInfosService
  ) { }

  ngOnInit() {
  }

  async getListing() {
    const filter = this.contractInfo.contract.filters.Transfer(null, this.contractInfo.contractAddress);
    const event = await this.contractInfo.contract.queryFilter(filter);
    const promises = event.map(async (elem) => {
      const tokenId = elem.args!.tokenId;
      const priceBig = await this.contractInfo.contract.price(tokenId);
      const price = ethers.utils.formatEther(`${priceBig}`);
      return { tokenId: tokenId, price: Number(price) };
    });
    const allTokens = await Promise.all(promises);
    this.listing = allTokens.filter(token => {
      const price = token.price;
      return price !== 0;
    });
  }

  async buyToken(id: number, price: number) {
    const tx = await this.contractInfo.contract.buyFromMarket(id, { value: ethers.utils.parseEther(`${price}`) });
    await tx.wait();
  }

}
