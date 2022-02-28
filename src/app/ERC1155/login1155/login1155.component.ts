import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login1155',
  templateUrl: './login1155.component.html',
  styleUrls: ['./login1155.component.scss']
})
export class Login1155Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  connectMeta() {
    (window as any).ethereum.send('eth_requestAccounts');
  }

}
