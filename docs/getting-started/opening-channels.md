# Opening Channels and Adding Liquidity in PLEBNET

## Add Liquidity

Generate a Lightning wallet and add some funds so that you can open channels. Keep in mind that PLEBNET prefers girthy channels, so fund your node accordingly.

## Reserve For Anchor Channels

Lnd keeps a UTXO on your node as a reserve for commitment fees. The reserve amount is 10K sats multiplied by the number of channels you have, up to a maximum of 100K Sats.

If you have only one UTXO on your node on-chain wallet, you can get into issues that you are unable to spend that UTXO for opening channels. It is therefore suggested that you keep at least one 100K UTXO on your on-chain wallet.

To do that:

1. In umbrel dashboard - bitcoin wallet - select deposit. It will generate a new address. Copy that.
2. In umbrel dashboard - bitcoin wallet - select withdraw. Paste the address generated in step 1 above here and choose the amount 100000 Sats.
3. Select low fee 1 Sat/Vb and send. It will create a UTXO of 100K Sats on your node which will be used for Anchor Channels once there is at least 1 on-chain confirmation of this transaction.

## Find Nodes in PLEBNET Telegram Group

You may want to check out [Lightning Routing: The First 30 Days](https://youtu.be/qnj-ix45tVw?feature=shared) to get some ideas.

Otherwise, you'll need to find some other nodes in PLEBNET to open channels with.

- Go to [Mempool.space](https://mempool.space/lightning) to see the current visual graph of nodes.
- You can contact plebs from the graph or list and see if they'd like to open a channel.
- You can also just ask in the PLEBNET channel if anyone is interested in opening a channel with you.

## Other Channel Sources

For two-way routing, required to both send and receive sats, you need a good balance of inbound and outbound liquidity. Most new node runners end up with a lot of outbound liquidity because they are the ones opening channels. Here is how you can get some inbound liquidity:

### Keep It Girthy

It's best to have fewer big channels with more sats than it is to have many smaller ones. The recommended minimum channel size is 2 million sats, which will cost you 1 million sats per channel if you are trying to have an even balance of inbound and outbound liquidity.

### Balanced Channels

The idea is to have balanced channels. This means that there is an equal amount of sats between each node on the channel.

For example, if Node A opens a channel with Node B for 2m sats, it will start entirely on their end. Node A will want to find a way to have 1m sats on each side of the channel.

There are several different ways to accomplish this:

#### "Girthy (formerly known as Ghetto) Submarine Swap" (aka: 'trust-required' dual-funded channel)

ONLY DO THIS WITH ESTABLISHED AND TRUSTED PLEBNET NODES! IT IS POSSIBLE TO LOSE SATS DOING THIS.

1. Node A opens a channel with X sats.
2. Node B sends a Lightning invoice for half of the amount X sats that was opened on the channel.
3. The Node A operator sends the address of their preferred on-chain Bitcoin wallet to the operator of Node B.
4. The Node B operator sends half of the amount X sats of the opened channel to the Bitcoin wallet of the operator of Node A from step 3.
5. Node A pays the Lightning invoice.

In some other versions, the swap is executed as below:

1. You agree with NODE B you trust to open a 2X channel and at the time of open you push X towards them (i.e you gift them X on LN).
2. In return NODE B pay X back to you at your on-chain address. (This is based on trust. Usually, people are honorable because they don't want to spoil their reputation for a few dollars but you never know).
3. End result: you have a 2X channel with X local X remote. And you have X on-chain to open another channel.

#### MEG (aka: 'trustless' dual-funded channel) - Mutually Exchanged Girth

With the support for internal funding added, adding balanced channel is now a piece of cake. All you need is a willing peer.

Alex Bosworth's CLI tool, Balance of Satoshis utilizes keysend to add this functionality to LND (which does not natively support it, yet).

Please ensure that your boss 10.10.2 or higher and node.js/npm software is up to date before attempting this.

Pre-req: Make sure NODE 1 and NODE 2 have keysend enabled (this is the default for Umbrel) and at least 1 channel already established to integrate you into the lightning network (you need a path out for key send to new peering node for the whole process to work).

NODE 1 (Alice):
1. Run: `bos open-balanced-channel`
2. Enter remote node public key
3. Enter full channel size
4. Enter fee rate
5. Select Y if you want to fund from internal (node wallet) or else use an external wallet to provide the signed transaction for the exact details provided. Copy the signed_transaction if you followed external funding.

NODE 2 (Bob):
1. Run: `bos open-balanced-channel` (it should see the request from node1 at this point)
2. Agree with funding rate (y/n)
3. Press Y for internal funding (node wallet) or else use an external wallet to provide the signed transaction for the exact details provided. Copy the signed_transaction if you followed external funding.
4. Hit enter and this should work.

Check via: `lncli pendingchannels`

## Opening Channels: Who to Connect With?

The first question which a pleb has after (or even before) the node is synced is "**who should I open channel with?**"

I would say - **with a mentor who is willing to spend time with you, teach you the ropes, mentor and guide you to be a better node runner**.

Of course in the age of Google, the internet, and instant gratification, this thought can be frowned upon but there is no replacement for a mentor in your journey as a node runner.
