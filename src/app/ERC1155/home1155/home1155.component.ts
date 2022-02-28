import { Component, OnInit } from '@angular/core';
import { BigNumber, constants } from 'ethers';
import { Event } from 'ethers';

import { HalpService } from 'src/app/halp.service';

interface Token {
  id: number,
  amount: number
}

function queryIdAmount(query: Event[]): Token[] {
  return query.map(event => {
    const ids: BigNumber[] = event.args![3]
    const amounts: BigNumber[] = event.args![4]
    return ids.map((id, i) => ({
      id: id.toNumber(),
      amount: amounts[i].toNumber(),
    }));
  }).flat();
}

@Component({
  selector: 'app-home1155',
  templateUrl: './home1155.component.html',
  styleUrls: ['./home1155.component.scss']
})
export class Home1155Component implements OnInit {

  tokenArr: Token[] = [];

  constructor(
    private contract: HalpService,
  ) { }

  async ngOnInit() {
    const [single, batch] = await Promise.all([
      this.getSingleMinted(),
      this.getBatchMinted()
    ]);
    this.tokenArr = single.concat(batch);
  }

  private async getSingleMinted() {
    const filter = this.contract.token.filters.TransferSingle(null, constants.AddressZero);
    const query = await this.contract.token.queryFilter(filter);
    return query.map(elem => {
      const id = parseInt(elem.args![3]._hex, 16);
      const amount = parseInt(elem.args![4]._hex, 16);
      return { id, amount };
    });
  }

  private async getBatchMinted() {
    const filter = this.contract.token.filters.TransferBatch(null, constants.AddressZero);
    const query = await this.contract.token.queryFilter(filter);
    return queryIdAmount(query);
  }



}