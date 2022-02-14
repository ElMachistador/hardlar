import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";

import { ContractInfosService } from "./contract-infos.service";


@Injectable({ providedIn: 'root' })
export class IsConnectedAdminGuard implements CanActivate {

  constructor(
    private contractInfo: ContractInfosService,
  ) { }

  async canActivate() {
    try {
      const address = await this.contractInfo.signer.getAddress();
      const owner = await this.contractInfo.contract.owner();
      return address == owner ? true : false;
    } catch (error) {
      return false;
    }
  }
}