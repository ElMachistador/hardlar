import { Component, OnInit } from '@angular/core';

import { ContractInfosService } from '../contract-infos.service';

import { ActivatedRoute } from '@angular/router';

import { FormGroup, FormControl } from '@angular/forms';

import { ethers } from 'ethers';
import { ERC721 } from '../erc721';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit {

  addressTo = new FormControl();

  price = new FormControl();

  address?: string;

  owner: boolean = false;

  ownedBy?: string;

  tokenId?: number;

  constructor(
    private contractInfo: ContractInfosService,
    private route: ActivatedRoute,
    private ERC721: ERC721
  ) { }

  async ngOnInit() {
    this.address = await this.contractInfo.signer.getAddress();
    const snap = this.route.snapshot.paramMap;
    this.tokenId = Number(snap.get('id'));
    this.ownedBy = await this.contractInfo.contract.ownerOf(this.tokenId);
    if (this.address == this.ownedBy) {
      this.owner = true;
    }
  }

  async transferToken() {
    const addressTo = this.addressTo.value;
    const tx = await this.contractInfo.contract.transferFrom(this.address, addressTo, this.tokenId);
    await tx.wait();
  }

  async putOnMarket() {
    const price = this.price.value;
    const parsed = ethers.utils.parseEther(String(price));
    const tx = await this.contractInfo.contract.toMarket(this.tokenId, parsed);
    await tx.wait();
  }

}
