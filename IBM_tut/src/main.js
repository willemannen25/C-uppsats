"use strict";
exports.__esModule = true;
var my_asset_contract_1 = require("./my-asset-contract");
var ctx;
var message = "tjenare";
console.log(message);
var test = new my_asset_contract_1.MyAssetContract();
test.ReadKeyWord(ctx, "hej");
