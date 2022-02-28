import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, FormArray } from '@angular/forms';

import { HalpService } from 'src/app/halp.service';

interface Offer {
  id: number,
  amount: number
}

@Component({
  selector: 'app-admin1155',
  templateUrl: './admin1155.component.html',
  styleUrls: ['./admin1155.component.scss']
})
export class Admin1155Component implements OnInit {

  simpleMint = new FormGroup({
    address: new FormControl(),
    id: new FormControl(),
    amount: new FormControl()
  });

  batchMint = new FormGroup({
    address: new FormControl(),
    offers: new FormArray([]),
  });

  constructor(
    private halp: HalpService,
  ) { }

  get offers() {
    return this.batchMint.get('offers') as FormArray;
  }

  ngOnInit(): void {
  }


  async mintSingle() {
    if (this.simpleMint.invalid) return;
    const { address, id, amount } = this.simpleMint.value;
    const tx = await this.halp.token.mint(address, id, amount, '0x00');
    await tx.wait();
  }

  addOffer() {
    const control = new FormGroup({
      id: new FormControl(),
      amount: new FormControl()
    });
    this.offers.push(control);
  }

  async mintBatch() {
    if (this.batchMint.invalid) return;
    const { address, offers } = this.batchMint.value;
    const ids = offers.map((offer: Offer) => offer.id);
    const amounts = offers.map((offer: Offer) => offer.amount);

    const tx = await this.halp.token.mintBatch(address, ids, amounts, "0x00");
    await tx.wait();

  }

}
