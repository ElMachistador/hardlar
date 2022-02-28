import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';

import { constants, ethers } from 'ethers';

import { ContractInfosService } from '../contract-infos.service';

import { Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  balanceOf = new FormControl();

  idsArray: number[] = [];

  obsId?: Observable<number[]>;


  constructor(
    private contractInfo: ContractInfosService,
  ) { }

  async ngOnInit() {
    await this.getAllMinted();
    const filter = this.contractInfo.contract.filters.Transfer(constants.AddressZero);
    this.contractInfo.contract.on(filter, (from, to, id) => {
      const ids = [];
      ids.push(id);
      this.idsArray = Array.from(new Set(ids));
    })
    this.obsId = of(this.idsArray);
  }

  ngOnDestroy() {
    this.idsArray = [];
    this.contractInfo.contract.removeAllListeners();
  }

  async getBalance() {
    const address = this.balanceOf.value;
    const reading = await this.contractInfo.contract.balanceOf(address);
  }

  async getAllMinted() {
    const event = this.contractInfo.contract.filters.Transfer("0x".padEnd(42, '0'));
    const query = await this.contractInfo.contract.queryFilter(event);
    this.idsArray = query.map(event => parseInt(event.args!.tokenId._hex, 16));
  }


} 
