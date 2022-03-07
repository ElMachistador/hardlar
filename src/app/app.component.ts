import { Component } from '@angular/core';
import { create } from "ipfs-http-client";

import { TokenuriService } from './tokenuri.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hardlar';

  superMode = false

  ipfs = create({ port: 5002 })

  constructor(
    private uri: TokenuriService,
  ){}

  ngOnInit() {
    this.add();
  }


  switcheroo() {
    this.superMode = !this.superMode;
  }


  async add() {

    // const metada = fetch().then(res => res.json());
    // const res = await this.ipfs.add();

  }

}
