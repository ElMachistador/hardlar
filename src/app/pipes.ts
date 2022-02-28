import { Pipe } from "@angular/core";
import { BigNumber, ethers } from "ethers";


@Pipe({ name: 'getEther' })
export class GetEtherPipe {
  transform(value: BigNumber | number) {
    return `${ethers.utils.formatEther(value)}${ethers.constants.EtherSymbol}`
  }
}