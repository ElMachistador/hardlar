import { Component, OnInit } from '@angular/core';

import { TokenuriService } from 'src/app/tokenuri.service';

import { FormControl, FormGroup } from '@angular/forms';

import { create } from "ipfs-http-client";

import { Observable, of } from "rxjs";


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

  ipfsPath = new FormControl();

  ipfs = create({ port: 5002 });

  idUri = new FormControl();

  metaDataUri?: Observable<any>;

  metaData?: any;



  form = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    id: new FormControl()
  })

  file?: File | null;

  constructor(
    private uri: TokenuriService,
  ) { }

  ngOnInit() {
  }

  // async getUri() {
  //   const id = this.tokenId.value;
  //   const uri = await this.uri.uriToken.uri(id);
  //   const url = transformToUrl(uri, id);
  //   const metadata = await fetch(url).then(res => res.json()).then(json => console.log(json))
  // }


  // async add() {
  //   const id = this.tokenId.value;
  //   const uri = await this.uri.uriToken.uri(id);
  //   const url = transformToUrl(uri, id);
  //   const metadata = await fetch(url).then(res => res.json());

  //   const { cid: metadataCid } = await this.ipfs.add({ content: JSON.stringify(metadata) });

  // }

  async getJson() {
    const path = this.ipfsPath.value;
    this.metaData = await this.cat(path);
  }

  async cat(path: string) {
    const decoder = new TextDecoder();
    let text = '';
    for await (const chunk of this.ipfs.cat(path)) {
      text += decoder.decode(chunk);
    }
    return text;
  }

  upload(event: Event) {
    this.file = (event.target as HTMLInputElement).files?.item(0);
  }

  async createBundle() {
    if (this.file && this.form.valid) {
      //Upload file and get path
      const { path: pathAsset } = await this.ipfs.add({ content: this.file });
      //create metadata with path and form
      const { name, description, id } = this.form.value;
      const metaData = { name, description, image: pathAsset };
      //upload metadata and get path 
      const { path } = await this.ipfs.add({ content: JSON.stringify(metaData) });
      //mint token with path as URI for tokenId
      const tx = await this.uri.uriToken.mint("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", id, 1, `${path}`, "0x00");
      tx.wait();
    }
  }

  async getTokenUri() {
    const id = this.idUri.value;
    const resolve = await this.uri.uriToken.uri(id);
    this.metaDataUri = resolve;
  }



}
