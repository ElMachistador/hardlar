/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface Marketplace721Interface extends ethers.utils.Interface {
  functions: {
    "buyFromMarket(address,uint256)": FunctionFragment;
    "price(address,uint256)": FunctionFragment;
    "toMarket(address,uint256,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "buyFromMarket",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "price",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "toMarket",
    values: [string, BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "buyFromMarket",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "price", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "toMarket", data: BytesLike): Result;

  events: {
    "OnSale(address,uint256,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OnSale"): EventFragment;
}

export type OnSaleEvent = TypedEvent<
  [string, BigNumber, BigNumber] & {
    _contractAddress: string;
    _tokenId: BigNumber;
    _priceAsked: BigNumber;
  }
>;

export class Marketplace721 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: Marketplace721Interface;

  functions: {
    buyFromMarket(
      _tokenAddress: string,
      _tokenId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    price(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    toMarket(
      _tokenAddress: string,
      _tokenId: BigNumberish,
      _priceAsked: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  buyFromMarket(
    _tokenAddress: string,
    _tokenId: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  price(
    arg0: string,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  toMarket(
    _tokenAddress: string,
    _tokenId: BigNumberish,
    _priceAsked: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    buyFromMarket(
      _tokenAddress: string,
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    price(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    toMarket(
      _tokenAddress: string,
      _tokenId: BigNumberish,
      _priceAsked: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "OnSale(address,uint256,uint256)"(
      _contractAddress?: string | null,
      _tokenId?: BigNumberish | null,
      _priceAsked?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { _contractAddress: string; _tokenId: BigNumber; _priceAsked: BigNumber }
    >;

    OnSale(
      _contractAddress?: string | null,
      _tokenId?: BigNumberish | null,
      _priceAsked?: null
    ): TypedEventFilter<
      [string, BigNumber, BigNumber],
      { _contractAddress: string; _tokenId: BigNumber; _priceAsked: BigNumber }
    >;
  };

  estimateGas: {
    buyFromMarket(
      _tokenAddress: string,
      _tokenId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    price(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    toMarket(
      _tokenAddress: string,
      _tokenId: BigNumberish,
      _priceAsked: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    buyFromMarket(
      _tokenAddress: string,
      _tokenId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    price(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    toMarket(
      _tokenAddress: string,
      _tokenId: BigNumberish,
      _priceAsked: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
