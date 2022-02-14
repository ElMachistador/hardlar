import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';

import { ContractInfosService } from '../contract-infos.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  form = new FormGroup({
    address: new FormControl(),
    tokenId: new FormControl()
  });

  constructor(
    private contractInfo: ContractInfosService,
  ) { }

  ngOnInit(): void {
  }

  async mint() {
    if (this.form.value) {
      const { address, tokenId } = this.form.value;
      const tx = await this.contractInfo.contract.safeMint(address, tokenId);
      await tx.wait();
    }
  }


}
