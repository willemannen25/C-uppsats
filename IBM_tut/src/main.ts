import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';
import { MyAsset } from './my-asset';
import { MyAssetContract } from './my-asset-contract';

let ctx: Context;
let message: string = "tjenare";
console.log(message);
let test = new MyAssetContract();
test.ReadKeyWord(ctx,"hej");