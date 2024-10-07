# Balancing Nodes

## Intro

Most new NodeRunners struggle with the concept of balancing the node and channel and in the process, they end up being too fixated on rebalancing and targeting that magic 50:50 balance on each and every channel at tremendous cost and frustration. If your inbound-outbound it is mathematically impossible to achieve 50:50 split on every channel so stop wasting time and sats on obsessive rebalancing.

Let us look at the concept of balance from a holistic level.

## What is a balanced node

A perfectly balanced node is one where:

1. Sum of Local liquidity is equal to the sum of Remote liquidity
2. Sum of Local liquidity on every channel is equal to sum of Remote liquidity on that channel.

It does not exist.

You can also consider a perfectly balanced node as a mirage. It is not possible. If a node is doing its jobs, there will be movements of Sats on channels.

## Why balancing is required

The way LND protocol is designed, the channel capacity (girth) is available publicly. You can check it on graph, public explorers (like https://amboss.space/), and even on blockchain. The channel id is composed of Block_Transaction_Output. For example, channel id 690334x2723x1 indicates that this channel was opened in block 690334 transaction number 2723 in that block and output 1 (remember first output is x0) in that transaction.

However, the local and remote balance of the channel is not available publicly and to the network. It can be probed and guessed but it is not published as part of network gossip (to avoid transmitting too many gossip messages and overwhelming the network).

Imagine a network where B->A->M (your node) ->Z->Y

When node B wants to send some sats to node Y, it can create a route, which could pass via your node M, but if you are not a direct peer of B, Node B would never know how much is on your local balance to send outward towards Y.

Node B would have Local/Remote information about channel B->A, but not about Local/Remote balance of A->M, M->Z, Z->Y. Node B would only know the capacity of the channels but not the Local/Remote balance.

Node B is the initiator node, it will use its logic to guess and most senders assume the channel has 50% of the capacity available as local.

If the lowest capacity channel in this path is A->M for 1_000_000 Sats, B would assume it can send at least 500_000 Sats + Fees. It will create and HTLC for that amount and pass it on to A, who will pass it on to M keeping the fees for A->M, who will pass it on to Z keeping the fees for M->Z, who will pass it on to Y, keeping the fees for Z->Y. However, if M->Z only has 200_000 sats on local, this HTLC will fail at that point (which you see as failure: TemporaryChannelFailure at 689892x1307x0 from nofrixion_tokyo if you run bos rebalance).

If there is no other route, the payment will fail and B can only send 200_000 sats on this route.

To prevent such failed HTLC, which also punish your node (M) in the eyes of B (sender) because you caused them the inconvenience of trying a route where there were not enough sats on your local side, it is advised to keep your channels balanced.

## Cetaris Paribus, your local and inbound liquidity is constant*

This could be a difficult concept to understand but unless you are sending payments (or receiving invoices), and you are not opening new channels and plebs are not opening channels into you, your total node capacity, your Local, and your Remote will remain the same. No amount of routing will change this balance (except the small amount of fees you will earn for routing).

Imagine your node (M)

- Channel 1 with A 1_000_000 girth, 300_000 Remote, 700_000 Local. Imagine your fee on this channel is 2_000 Sats (base fee)
- Channel 2 with Z 2_000_000 girth, 1_200_000 Remote, 800_000 Local. Imagine your fee on this channel is 1_000 Sats (base fee)

Your node would show a total of 1_500_000 Remote and 1_500_000 Local. Pretty good balance even though individual channels are not balanced.

If A sends to Z a transaction of 200_000 for which you earn a fee of 1_000 (lucky you). Note, the fee on Channel M->Z is applied for the transaction not the fee for channel A->M.

The channels will look like this:

- Channel 1 with A 1_000_000 girth, (300_000 - 200_000 - 1_000 (fees)) = 99_000 Remote, (700_000 + 200_000 + 1_000 (fees)) = 901_000 Local.
- Channel 2 with Z 2_000_000 girth, (1_200_000 + 200_000) = 1_400_000 Remote, (800_000 - 200_000) = 600_000 Local.

Note, that the fee was calculated for channel M->Z but it is collected on channel A->M.
And your node will now show a total of 1_499_000 Remote and 1_501_000 Local.
Your channels have gone out of balance but your Local is still the same + fees earned (1_000)

## What are your options now

### Do Nothing

Doing nothing is usually a valid and zero-cost option. If you do nothing, you are hoping for traffic to flow from Z->A in future which will auto-balance your channels and you will also earn fees in the process. This should usually be the first option any node runner should think of instead of rushing into rebalancing routines.

### Circular Rebalancing

If doing nothing is not helping and you are not seeing two-way traffic, and at the same time you see a lot of traffic going to Z (which is failing at your node and eventually using other routes) and you want to be part of the action to earn fees for that traffic you can do what is known as circular rebalance. Which is essentially paying yourself which goes OUT of the channel with local balance and comes back in from the channel with remote provided there exist a path. Doing this cost the routing fees and you must evaluate carefully what you pay for rebalance v/s what you earn on routing.

If your routing fees for M->Z are very low and the rebalance fees is very high, you will make a loss over time.

Plebs sometimes ask if Circular Rebalancing is bad. Well there is no good or bad - circular rebalancing is a "tool" and costs to use the tool. It can be used to fix a channel or it can be used to create a DIY disaster.

### Loop out

This is the most expensive route. You payout to a custodial lightning wallet (or LOOP service) and take the coin on-chain.

## How to achieve balance with fees

If you visualise the node as a tap between connected water tanks, your fees determine how much the tap is open.

Low Fee will encourage movement from Local to Remote. You decide what fee you are comfortable with based on your profitability expectations. If you have a lot of local balance on a channel, consider lowering the fees to the level you are comfortable with and it should encourage routing out to remote. Remember, you can bring the horse to water but you cannot make it drink. In the same way just because you have a lot of liquidity on local and set fees to super-low does not mean the sats will move to remote. It depends a lot also on your peer, and how that peer is connected. If the peer has set all their channels on super-high fees, then nothing will move from your node to them, because nothing will move from their node to further out into the network. The only time your channel will be used is if someone is sending a payment specifically to your peer. Many wallets and merchants fall in this category. Think of it as being connected to a village with 8 lane highway but only a few dirt roads leaving the village further out. Who would use that highway? In essence, think before you open a channel with a peer and see how well connected they are and if they are running their node with the same love and care you put into your node.

Setting a high fee, when you do not have local liquidity, gives a signal to the network that you are moving to the hard shoulder on a motorway when you are running out of fuel instead of blocking a lane. This will reduce failed HTLC events on your node because a sender tries cheaper routes first before trying expensive routes.

Remember you only earn fees on your local -> moving to -> remote.
And when your sats are on Remote, you are at the mercy of your peer and their fees to allow routing back to you.

Plebs make the noob mistake of setting very low fees when their sats are local, then complain when the sats move to remote and do not come back without expensive rebalancing. Think of it this way. You roll a heavy rock up the hill (at a high rebalancing rate) and then provided a smooth path down so the rock keeps tumbling down again to your local. Your fees should be higher than your cost of rebalancing (or your flow should be two way flow so there is natural rebalancing). See the section on running a profitable node FeesAndProfitability.

## Some Practical Ways To Get Your Sats on Local again

1. Do nothing, let it flow naturally. Set fees to encourage.
2. Do circular rebalance, it will cost. Set future fees accordingly.
3. Create a route that will encourage the network to push liquidity through your node. For example a reasonably priced LOOP channel (which is in demand) can push most remote sats to your node (and go out to remote on LOOP).
4. Ask a friendly node to pay your node via your peer you want to pull sats from using bos send --in. It will cost but you can get your sats on local and set fee accordingly in future. You can pay your friend on-chain OR return the favour in future.
