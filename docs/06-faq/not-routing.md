# Help! I do not see any routing through my node

I don't see any routing activity! 🙁

## Intro

WARNING: Running a routing node is not for generating a primary source of income. The lightning technology is still developing at a very fast pace. The strategy which may generate some income would stop working very soon and something else will take their place. Do not commit more than what you can have fun with when you enter the rabbit hole of a routing node.

Now that you understand Fees and Balancing, the next issue comes to every noob is : Why there is no one routing through my node?

To understand routing you must understand how routing works.

## What is routing

Routing allows flow of Sats between nodes that are not directly connected.

If every node in the world is directly connected to every other node in the world, there will be no need for routing

Since it is capital constrained to establish a channel with everyone you interact with on Lightning Network there exist the need for routing. Imagine if you want to pay for coffee occasionally you would not establish a channel with the coffee shop. However your node will connect to someone who is connected to someone who is connected to the coffee shop. Your payment for coffee would follow a path from your node to the coffee shop and in between nodes, the routing nodes, will collect some fee for providing this service.

This leads to the main points

1. Routing Nodes are service providers. They get a fee for providing the service. It does not necessarily mean that their services are required.

If you are selling ice cream on the north pole, chances are you will not have a mega queue in front of your store.

## So how do I improve routing through my node

- Understand the flow

See who are you connected to. Are you connected to a Merchant or a Consumer? If yes, how is their volume and who else is connected to them. If there are cheaper connections to that merchant, chances are the flows will go via them. If you are charging excessive fees to outgoing channels on your node, chances are your consumers are using someone else to send their payments.

If you are connected to mainly other routers, check what sort of fees are they charging? If you are surrounded by all expensive nodes, chances are no one will route through you because you even if you charge less, the eventual cost is high for the sender.

Investigate your peers, set your fees appropriately, and if you see a path which is expensive, you can try to establish and provider a cheaper alternative to that destination and routes will start using your node.

- Manage your Fees

See here [FeesAndProfitability](Special:MyLanguage/FeesAndProfitability)

- Keep your rebalance in control

See here [Balancing_Nodes](Special:MyLanguage/Balancing_Nodes)
If you are in the path of two way traffic, you are in a good position and you do not need to do much for rebalancing.

If not you are required to replenish our local balance to service the flow. You must do that on a cash positive basis i.e. your cost of replenishing the local balance should be less than the fees you earn. Otherwise, it will soon become a loss-making situation.
