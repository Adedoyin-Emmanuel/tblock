/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface GreetingsRegistryInterface extends utils.Interface {
  functions: {
    "messages(address)": FunctionFragment;
    "postUpgrade(string)": FunctionFragment;
    "setMessage(string)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "messages" | "postUpgrade" | "setMessage"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "messages",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "postUpgrade",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setMessage",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(functionFragment: "messages", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "postUpgrade",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setMessage", data: BytesLike): Result;

  events: {
    "MessageChanged(address,string)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "MessageChanged"): EventFragment;
}

export interface MessageChangedEventObject {
  user: string;
  message: string;
}
export type MessageChangedEvent = TypedEvent<
  [string, string],
  MessageChangedEventObject
>;

export type MessageChangedEventFilter = TypedEventFilter<MessageChangedEvent>;

export interface GreetingsRegistry extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: GreetingsRegistryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    messages(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    postUpgrade(
      prefix: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setMessage(
      message: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  messages(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  postUpgrade(
    prefix: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setMessage(
    message: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    messages(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    postUpgrade(
      prefix: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setMessage(
      message: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "MessageChanged(address,string)"(
      user?: PromiseOrValue<string> | null,
      message?: null
    ): MessageChangedEventFilter;
    MessageChanged(
      user?: PromiseOrValue<string> | null,
      message?: null
    ): MessageChangedEventFilter;
  };

  estimateGas: {
    messages(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    postUpgrade(
      prefix: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setMessage(
      message: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    messages(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    postUpgrade(
      prefix: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setMessage(
      message: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}