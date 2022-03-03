import { Component, OnInit } from '@angular/core';

import { TokenuriService } from 'src/app/tokenuri.service';

import { FormControl } from '@angular/forms';


function transformToUrl(uri: string, id: string) {
  const regex = /{(.*?)}/;
  return uri.replace(regex, id);
}


@Component({
  selector: 'app-uri',
  templateUrl: './uri.component.html',
  styleUrls: ['./uri.component.scss']
})
export class UriComponent implements OnInit {

  tokenId = new FormControl();

  constructor(
    private uri: TokenuriService,
  ) { }

  ngOnInit() {
  }

  async getUri() {
    const id = this.tokenId.value;
    const uri = await this.uri.uriToken.uri(id);
    const url = transformToUrl(uri, id);

    const metadata = await fetch(url).then(res => res.json()).then(json => console.log(json))
  }

}
