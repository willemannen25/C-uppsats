/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';
import { MyAsset } from './my-asset';

@Info({title: 'MyAssetContract', description: 'My Smart Contract' })
export class MyAssetContract extends Contract {

    @Transaction(false)
    @Returns('boolean')
    public async myAssetExists(ctx: Context, myAssetId: string): Promise<boolean> {
        const buffer = await ctx.stub.getState(myAssetId);
        return (!!buffer && buffer.length > 0);
    }

    @Transaction()
    public async createMyAsset(ctx: Context, myAssetId: string, value: string): Promise<string> {
        var start = new Date().getTime();
        const exists = await this.myAssetExists(ctx, myAssetId);
        if (exists) {
            throw new Error(`The my asset ${myAssetId} already exists`);
        }
        const myAsset = new MyAsset();
        myAsset.value = value;
        const buffer = Buffer.from(JSON.stringify(myAsset));
        var end = new Date().getTime();
        await ctx.stub.putState(myAssetId, buffer);
        var time = end-start;
        return "This creation took: " + time.toString() + " ms";
    }

    @Transaction(false)
    @Returns('MyAsset')
    public async readMyAsset(ctx: Context, myAssetId: string): Promise<string> {
        var start = new Date().getTime();
        const exists = await this.myAssetExists(ctx, myAssetId);
        if (!exists) {
            throw new Error(`The my asset ${myAssetId} does not exist`);
        }
        const buffer = await ctx.stub.getState(myAssetId);
        const myAsset = JSON.parse(buffer.toString()) as MyAsset;
        var end = new Date().getTime();
        var time = end - start;
        return JSON.stringify(myAsset) + "This search took: " + time + " ms";
    }
    
    @Transaction()
    public async updateMyAsset(ctx: Context, myAssetId: string, newValue: string): Promise<string> {
        var start = new Date().getTime();
        const exists = await this.myAssetExists(ctx, myAssetId);
        if (!exists) {
            throw new Error(`The my asset ${myAssetId} does not exist`);
        }
        const myAsset = new MyAsset();
        myAsset.value = newValue;
        const buffer = Buffer.from(JSON.stringify(myAsset));
        await ctx.stub.putState(myAssetId, buffer);
        var end = new Date().getTime();
        var time = end-start;
        return "The update took "+time+" ms";
    }

    @Transaction()
    public async deleteMyAsset(ctx: Context, myAssetId: string): Promise<string> {
        var start = new Date().getTime();
        const exists = await this.myAssetExists(ctx, myAssetId);
        if (!exists) {
            throw new Error(`The my asset ${myAssetId} does not exist`);
        }
        await ctx.stub.deleteState(myAssetId);
        var end = new Date().getTime();
        var time = end-start;
        return "This deletion took: " + time +" ms";
    }

    @Transaction(false)
    public async readAll(ctx: Context): Promise<string> {
        var start = new Date().getTime();
        const startKey = '000';
        const endKey = '9999';
        const iterator = await ctx.stub.getStateByRange(startKey, endKey);
        const allResults = [];
        while (true) {
            const res = await iterator.next();
            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                var end = new Date().getTime();
                var time = end-start;
                return "This search took: " + time +"ms"
                //return JSON.stringify(allResults) + ", This search took: " + time + "ms";
            }
        }
    }

    @Transaction(false)
    public async ReadKeyWord(ctx: Context, keyWord: string): Promise<string> {
        var start = new Date().getTime();
        const startKey = '000';
        const endKey = '999';
        const iterator = await ctx.stub.getStateByRange(startKey, endKey);
        const allResults = [];
        while (true) {
            const res = await iterator.next();
            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                const temp = this.myAssetExists(ctx, Key);
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                if (temp) {
                    const buffer = await ctx.stub.getState(Key);
                    const myAsset = JSON.parse(buffer.toString()) as MyAsset; 
                    if (myAsset.value.includes(keyWord)) {
                        allResults.push({ Key, Record });
                    }
                }
                
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                var end = new Date().getTime();
                var time = end-start;
                return JSON.stringify(allResults) + " This search took: "+ time + " ms";
            }
        }
    }

    @Transaction(false)
    public async ReadTwoKeyWords(ctx: Context, keyWordOne: string,keyWordTwo:string): Promise<string> {
        var start = new Date().getTime();
        const startKey = '000';
        const endKey = '999';
        const iterator = await ctx.stub.getStateByRange(startKey, endKey);
        const allResults = [];
        while (true) {
            const res = await iterator.next();
            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                const temp = this.myAssetExists(ctx, Key);
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                if (temp) {
                    const buffer = await ctx.stub.getState(Key);
                    const myAsset = JSON.parse(buffer.toString()) as MyAsset; 
                    if (myAsset.value.includes(keyWordOne) && myAsset.value.includes(keyWordTwo)) {
                        allResults.push({ Key, Record });
                    }
                }
                
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                var end = new Date().getTime();
                var time = end-start;
                return JSON.stringify(allResults) + " This search took: "+ time + " ms";
            }
        }
    }

}
