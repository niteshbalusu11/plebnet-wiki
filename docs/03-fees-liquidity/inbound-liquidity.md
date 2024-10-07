# Getting Inbound Liquidity

- Understanding inbound liquidity and acquiring it.

## Intro

Your lightning network (LN) channels have sats (i.e. satoshi, 1×10^-8^ Bitcoins) on your local side or the remote side of the channel.

LN sats on local side of channel are referred to as "outbound liquidity" - these are sats you control and can send.
LN Sats on remote side of channel are referred to as "inbound liquidity" - these are sats your peer controls and via which you can receive to your side of channel.

Opening a typical simple channel has all the sats on local side of whoever opens at start.

In order to receive satoshi over lightning you need to have some satoshi on a remote side of some channel, otherwise called "inbound liquidity".

There are many ways to increase inbound liquidity which include:

- Having or paying for someone else to open a channel to you so the sats are on the remote to you side of channel
- Opening a balanced channel so sats are on both sides of channel
- Sending LN local sats to another self-custodial wallet you control (some of which can let you send sats back to your on-chain address)
- Sending LN local sats to a [submarine/atomic swap](https://docs.lightning.engineering/the-lightning-network/lightning-overview/understanding-submarine-swaps) provider where revealing a secret number results in them getting your LN sats and you getting on-chain sats in trust-minimized manner.
- Sending LN local sats to another wallet you do not control (e.g. exchange, hosted wallet) that lets you withdraw to on-chain address
- Someone can pay you by opening a new channel where some fraction of the sats from very start are already pushed onto your side of the channel

## Is needing inbound liquidity a risk for LN adoption?

Before the tools and methods to acquire inbound liquidity were readily available, it got a reputation for being challenging to acquire.

Now there are many tools to do this, which are continuously improving, and many of which can be and are often automated.

In fact, it can be said inbound liquidity is easier to get than outbound liquidity as inbound liquidity are the remote sats others provide. Outbound liquidity is limited to local sats you have. Every time a user purchases something by spending their local sats, they automatically acquire that amount of inbound liquidity.

## Resources for Getting Inbound Liquidity

- Make a payment to someone, buy something from a merchant, make a donation to a charity or project which accepts Lightning payment. All of these will move sats from your local to remote and you will naturally get a balanced channel.

This information can change and each method and service should be always be carefully reviewed before use.

### Getting a channel opened by someone else towards us

#### Services who sell inbound

- **Amboss Magma** - [https://amboss.space/magma](https://amboss.space/magma)
- **LNBIG** - [https://lnbig.com/](https://lnbig.com/)
- **Bitrefill** - [https://www.bitrefill.com/buy/lightning-channel/](https://www.bitrefill.com/buy/lightning-channel/)
- **Y'alls** - [https://yalls.org/about/](https://yalls.org/about/)
- **Umbrel Opening Channel Request** - [https://community.getumbrel.com/t/opening-channels-requests/66](https://community.getumbrel.com/t/opening-channels-requests/66) Umbrel Opening Channel Requests
- **Sats4Likes** - You can offer to pay someone to open a channel to you on services like - [https://kriptode.com/satsforlikes/index.html](https://kriptode.com/satsforlikes/index.html)

#### Organized peer to peer agreements (e.g. A opens to B, C opens to A)

- Ask in Plebnet Telegram group. There might be someone willing to open a Dual Funded or simple inbound to you.
- **LightningNetwork+** - [https://lightningnetwork.plus/](https://lightningnetwork.plus/)
- **Plebs2Salvador** - [https://t.me/plebs2salvador](https://t.me/plebs2salvador) for endless chains of 69. You get one channel and you open to your next one.
- Rings of Fire Telegram Group - [https://t.me/theRingsOfFire](https://t.me/theRingsOfFire)

#### Public lend/rent markets

- **Lightning Pool** (lnd) - [https://lightning.engineering/pool/](https://lightning.engineering/pool/) (in [https://getumbrel.com/](https://getumbrel.com/), [Lightning Terminal](https://github.com/lightninglabs/lightning-terminal), [Voltage Flow](https://voltage.cloud/flow), …)
- **Liquidity Ads** (c-lightning, [explainer](https://medium.com/blockstream/setting-up-liquidity-ads-in-c-lightning-54e4c59c091d)) - [https://lnrouter.app/liquidity-ads](https://lnrouter.app/liquidity-ads)
- **PeerSwap** (work in progress) - [https://www.peerswap.dev/](https://www.peerswap.dev/)

#### Open source Liquidity Service Provider servers

- **Dunder** - [https://github.com/hsjoberg/dunder-lsp](https://github.com/hsjoberg/dunder-lsp)
- **Blocktank** - [https://synonym.to/products/](https://synonym.to/products/)

### Opening a balanced channel with liquidity on both sides

- **Balance of Satoshis** - [https://github.com/alexbosworth/balanceofsatoshis](https://github.com/alexbosworth/balanceofsatoshis)

### Opening channel ourselves and then swapping funds in-channel to on-chain (e.g. 50%) w/o closing channel

#### Services to submarine/atomic swap LN funds to on-chain funds

- **Boltz** - [https://boltz.exchange/](https://boltz.exchange/) (in [https://thunderhub.io/](https://thunderhub.io/), [https://getumbrel.com/](https://getumbrel.com/))
- **Loop** (lnd) - [https://github.com/lightninglabs/loop](https://github.com/lightninglabs/loop) (in [Balance of Satoshis](https://github.com/alexbosworth/balanceofsatoshis), [Lightning Terminal](https://github.com/lightninglabs/lightning-terminal), [RTL](https://github.com/Ride-The-Lightning/RTL), [https://getumbrel.com/](https://getumbrel.com/))

#### Mobile wallets that allow receiving over LN and sending to on-chain addresses

- **Wallet of Satoshi** - [https://www.walletofsatoshi.com/](https://www.walletofsatoshi.com/)
- **Blixt** - [https://blixtwallet.github.io/](https://blixtwallet.github.io/)
- **Zeus** - [https://zeusln.com/](https://zeusln.com/)
- **Breez** - [https://breez.technology/](https://breez.technology/)
- **Phoenix** - [https://phoenix.acinq.co/](https://phoenix.acinq.co/)
- **Muun** - [https://muun.com/](https://muun.com/)

#### Trust requiring exchanges that allow receiving over LN and sending to on-chain addresses

- **CoinOs** - [https://coinos.io](https://coinos.io)
- **Nicehash** - www.nicehash.com
- **SouthXchange** - southxchange.com
- **Sideshift AI** - [https://sideshift.ai/](https://sideshift.ai/)
- **FixedFloat** (BTCLN) - [https://fixedfloat.com/](https://fixedfloat.com/)
- [Some more…](https://cointastical.medium.com/exchanges-with-support-for-bitcoin-lightning-network-payments-739829bcb7bc)

### Automated tools for managing node's inbound liquidity

- **clboss** (c-lightning) - [https://github.com/ZmnSCPxj/clboss](https://github.com/ZmnSCPxj/clboss)
