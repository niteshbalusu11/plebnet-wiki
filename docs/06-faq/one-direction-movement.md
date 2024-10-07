# Help! My sats are only moving in one direction

### Intro

A common noob question is why their sats are only moving in one direction on a big node channel (say ACINQ or BFX or even LOOP)

Let us imagine the routing nodes as pipework of flow of water from the source (consumer) to target (merchant) as the primary purpose. Each node maintains its own reservoir with the connected peer which is its local liquidity and controls the tap via the fees.

- Higher the fees, greater the resistance to water flow, and slower it would move.
- Lower the fees, lower the resistance to the water flow, and faster it would move to the other side.

In this model, channel rebalancing can be visualised as the act of replenishing your local reservoir with a particular peer. If your reservoir runs empty, you won't have anything to send to the peer.

The flow would generally be from Consumer -> Merchant however in an interconnected world someone who is a merchant (receiving payment for a product) can be a consumer the next day (paying its supplier). The other flows are liquidity balancing flows where the nodes replenish their reservoirs to service the flow again.

### Classic Mistake

Most newcomers make the classic mistake of setting up a channel with default low fees (Base Fee = 1 Sat, Fee Rate of 1 ppm). See to [understand fees](Special:MyLanguage/FeesAndProfitability)

Imagine setting up your reservoir, with the tap wide open. What do you think is likely to happen? Your tank would be emptied immediately, more so with a service like Exchange or Wallet which are popular destinations for consumers. You just contributed to the community by allowing a cheap payment to someone in the world.

**Is this good use of your capital and effort?**

Maybe not. It will certainly lead you to wonder why your sats move from your node to BFX but never came back.

Well, the answer is that BFX is a popular destination where Consumers send Sats. You provided a low fee path to it, so your path was used as long as you had local liquidity.

BFX send sats in the opposite direction when people receive Sats in their lightning wallet. However think, for this path you need to be

1. Connected to the receiver of BFX via a good path
2. Have low fees on this path
3. Have liquidity to offer on this path.

BFX is likely to be connected to most wallet providers directly from their node, you can validate their channels on any popular explorers like [Amboss](https://amboss.space/). It is not likely to come to your node to send out sats in the other direction unless it has exhausted the liquidity on its own channels.

### So why Sats are moving into remote never coming back

1. You provided a cheap path to a popular destination so traffic routed via you.
2. You do not have an equivalent cheaper path in the opposite direction.

What can you do to slow down?

Set your fees reasonably. The first thing change your default lnd configuration to set up high fees when you create a channel. See [Fees & Liquidity](/category/fees-and-liquidity) for details.

Then gradually lower the fees, maybe 10% a day until you start seeing traffic routing via your node. Establish a good fees level that generates a reasonable amount of traffic and at the same time allows you to recoup your costs of rebalancing and setting up the channel.

And investigate where the traffic is coming from, try to open low fee paths in the opposite direction and maybe you can encourage flow back out creating 2-way traffic.

### Don't blame the peer

In various chat rooms, it is a frequent discussion that XYZ is a liquidity drain! Your peer can **never** suck liquidity out of your node. It is you, your fee policies, and even your decision to open a channel into the peer which caused your liquidity to move to the peer. You are the one who is in charge of policies on your node.

Set appropriate fees and you can master the dance of Sats in your node.
