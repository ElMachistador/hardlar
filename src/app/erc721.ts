import { Injectable } from '@angular/core';
import { ethers, Contract, BigNumber } from 'ethers';
import { ABI } from './ERC721ABI';

@Injectable({providedIn: 'root'})
export class ERC721 extends Contract {

  constructor(){
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const signer = provider.getSigner();
    super("0xf9b7976559e5A3E7B1ABA65d1457eE9AB113225c", ABI, signer);
  }

  getBalance(address: string): Promise<BigNumber>{
    return this.functions['getBalance'](address);
  }

}