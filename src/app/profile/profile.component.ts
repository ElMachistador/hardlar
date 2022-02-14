import { Component, OnInit } from '@angular/core';

import { ethers } from 'ethers';

import { ContractInfosService } from '../contract-infos.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  address?: string;

  ids?: (number | null)[];

  constructor(
    private contractInfo: ContractInfosService
  ) { }

  async ngOnInit() {
    this.address = await this.contractInfo.signer.getAddress();

    const eventFilter = this.contractInfo.contract.filters.Transfer(null, this.address);
    const event = await this.contractInfo.contract.queryFilter(eventFilter);

    const promise = event.map(async (event) => {
      const id = event.args!.tokenId;
      const parsed = parseInt(`${id}`);
      const final = await this.ownership(parsed);
      return final;
    });
    const duplicates = await Promise.all(promise);
    const toFilter = Array.from(new Set(duplicates));
    this.ids = toFilter.filter(value => value != null);
  }

  async ownership(id: number) {
    const owner = await this.contractInfo.contract.ownerOf(id);
    if (owner == this.address) return id;
    return null;
  }


}
