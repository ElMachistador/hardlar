import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";

import { ethers } from 'ethers';
import { of, from, Observable, Subscription } from "rxjs";
import { map, tap } from 'rxjs/operators'


@Injectable({ providedIn: 'root' })
export class IsConnectedGuard implements CanActivate {

  async canActivate() {
    try {
      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      return !!address;
    } catch (error) {
      return false;
    }
  }

}