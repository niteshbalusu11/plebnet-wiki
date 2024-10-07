# Fees And Profitability

Learn about routing fees and node profitability.

## Table of Contents

1. [Intro](#intro)
2. [Components of Profitability](#components-of-profitability)
3. [Setting Routing Fees](#setting-routing-fees)
4. [Keeping an Eye](#keeping-an-eye)
5. [Your Node Routing KPI](#your-node-routing-kpi)
   1. [Two KPIs to Watch](#two-kpis-to-watch)
   2. [Automation of Routing KPI](#automation-of-routing-kpi)
      1. [Installation Instructions Node KPI Script](#installation-instructions-node-kpi-script)
   3. [Node Fee Policies](#node-fee-policies)
      1. [#ZeroBaseFee](#zerobasefee)
      2. [Static Fee Rate](#static-fee-rate)
      3. [Static Base Fee](#static-base-fee)
      4. [Liquidity Driven Fee Adjustment](#liquidity-driven-fee-adjustment)
      5. [Installing Charge-Lnd](#installing-charge-lnd)
      6. [Using Charge-Lnd to set Maximum HTLCs](#using-charge-lnd-to-set-maximum-htlcs)

## Intro

WARNING: Running a routing node is not for generating a primary source of income. The lightning technology is still developing at a very fast pace. The strategy which may generate some income would stop working very soon and something else will take their place. Do not commit more than you what you can have fun with when you enter the rabbit hole of a routing node.

Having said that, most people enter the rabbit hole of a routing node to have fun but also generate some income, however small. The excitement to watch the first route pass through your node with 1 Sat fees is an amazing moment for many.

To understand node profitability you must understand the various components of the economics of routing node.

## Components of Profitability

### Costs

You will incur the following costs during your routing node journey.

1. Capital Expense: One time expenses incurred for setting up your node.
   - Cost of node hardware and peripherals.
   - Cost of UPS and other peripherals.

You should aim to recover the cost of capital expenditures over the useful life of the expense. i.e. if the node is going to last you 3 years before you decide to upgrade, you must aim to recover 1/3 of the cost every year. In accounting terms this is called depreciation.

2. Cost Of Goods Sold
   - Channel Rebalancing Fee Paid if any.
   - Operating Expenses
   - Channel Open and Close Fees paid on-chain

3. Other Expenses (minor but could be significant for some)
   - Electricity Cost
   - Network Bandwidth Cost

Against these costs, you will earn routing fees as Income. If you offer other services via your node, you might have additional income.

You should measure the profitability of your node as below:

- Gross Margin = Fee Earned - Cost of Good Sold (Fee Paid)
- Operating Margin = Gross Margin - Operating Expenses (Channel Open/Close fees and other costs)
- Net Cash Flow = Cumulative Operating Margin - CAPEX

Your aim should be to be positive on all these metrics. Of course, it takes time for a node to be fully profitable.

## Setting Routing Fees

Before you set your routing fees, you should have a good understanding of your costs.

Your routing fees is set up on each channel as:

1. Base Fees in mSat (1000 mSat = 1 Sat)
2. Fee Rate in ppm (1 ppm = 1 Sat per 1_000_000 Sat routed)

You earn routing fees *only on flows going out of your channel*. In other words you earn fees for sending your Local Balance to Remote Balance of a channel. Your fees on the incoming channel are not relevant for the purpose for fee earned.

Fee Earned = Base Fee/1_000 + Routed Amount * Fee Rate / 1_000_000

Assume you had a Base Fee of 10_000 mSat and Fee Rate of 200 ppm. Now assume a payment of 750_000 Sats is forwarded via your node on this channel. The fee you will earn for this transaction would be:

```
10_000/1_000 + 200 * 750_000/1_000_000 = 10 + 150 = 160 Sats
```

## Keeping an Eye

At a very high level Node P&L = Net Sats = Earned - Paid - Chain-fees - PaidToBuyLiquidity - LoopOutCustodialFees

- Earned = Sats earned in a period; use `bos chart-fees-earned —days 7`
- Paid = Sats paid for rebalancing, etc.; use `bos chart-fees-paid —days 7`
- Chain-fees = amount paid for on-chain fees close/open; use `bos chart-chain-fees —days 7`
- PaidToBuyLiquidity = example if you paid LNBIG 15k Sats to open an Inbound channel to you
- LoopOutCustodialFees = any Strike or Wallet Loop-out/Loop-in cost or Fees for transfer of funds to Node on-chain wallet

If the Net Sats numbers every week is improving and moving towards positive (making profits), you are doing good. If going another direction, not so good and analyze why it is negative.

Once you have the measurement system in place for your node, you can then begin to benchmark how much +ve or -ve your peers are at, if someone is willing to share.

You can also run the #s for days 30 or 60 or 90.

## Your Node Routing KPI

If you do not measure you do not improve. Most new node runners worry that their node is not doing anything but if asked why they think that, they have no quality data. The first step in improving your node profitability is to first understand what is the performance and how it is taking shape week by week.

A week (7 days) is not a long time in node running. If you have to make changes in fee policy, routing policy, selecting new nodes to open channel with, and to make any other decisions regarding your node, give yourself a weeks time to think about and analyze. Lightning is a long term play and there is no need to be a grasshopper jumping from one idea to other, only to spend sats in the process. Adopt a policy and give it at least a week if not more to see the results.

You can use the weekend to deep dive your node performance and discuss with your mentors or in the group your reflections.

The following KPIs are suggested for measuring routing node performance over a rolling 7 day period (1 week):

1. Local Balance
2. Sats Routed in the period
3. % Routed (Sats Routed/Local Balance)*100
4. NetFeePPM (Fee Earned - Fee Paid - OnChain Fees)/Local Balance * 1 000 000
5. Fee Earned
6. Fee Paid
7. On Chain Fees

### Two KPIs to Watch

The two most important KPIs (Key Performance Indicators) to watch are the `% Routed` and `NetFeePPM`. You can also use these KPIs to compare your node to your peers and other node runners. You can also display these KPIs along with the beautiful node art every Friday [#NodeArtFriday](https://twitter.com/search?q=%23NodeArtFriday&src=typed_query) for the world to see or in the plebnet group.

#### % Routed

This KPI tells you how much of your local balance you routed in the last 7 days. This tells you how much of your capital your node is turning over. The higher the number, the better is the routing performance of your node at least in the number of transactions.

#### NetFeePPM

While the first KPI is about the transactions, the second one is the main KPI about profitability. The higher the NetFeePPM, the more profitable your node is. If you are transacting 200% of your Local Balance each week but only earning 0 sats (or worse negative) then there is something to look into.

A profitable node should route a good volume of Local Balance while earning higher NetFeePPM.

Raising fees can reduce the % Routed while dropping fees could increase the % Routed.

Your NetFeePPM has a sweet spot of % Routed which maximizes the NetFeePPM and as a node operator, you need to find that and stick with that by adjusting the fee policy week over week. Once you find it, let it run for a long time until you have to tinker it again.

Suggestions:
- If %Routed is < 25% - review your channel balances to ensure sufficient liquidity for routing. Lower Fees.
- If %Routed is > 75% - review your routing pairs with most routing and try to raise fees. You may have the potential to earn more. Review again next week.
- Between 25% - 75% % Routed, you can work on improving the routing by providing active liquidity management or small changes to fee policies.

### Automation of Routing KPI

This KPI idea was discussed in Plebnet and a fellow pleb has written a simple script to capture this. You can find it [here](https://github.com/Deekee62/bos_accounting).

Please note that this script provides KPIs from your routing node perspective and is not a replacement of accounting accurate profitability analysis.
If your node sends out a lot of payments that are not routing rebalance related, your fee paid could be an incorrect reflection in your KPIs.
In addition, if you do a lot of LOOP out or custodial loop out (WoS/Strike/Wallet) then the fees paid on the end of the wallet for on-chain will also not be reflected in the KPIs produced by this script.

#### Installation Instructions Node KPI Script

1. Make sure you installing these scripts on your node (in ssh). `ssh umbrel@umbrel.local`.

2. Get the repository in your home directory (where you can run bos)
   ```
   cd ~; git clone https://github.com/Deekee62/bos_accounting
   ```
   If you already have installation to upgrade just do
   ```
   cd ~/bos_accounting; git pull https://github.com/Deekee62/bos_accounting
   ```

3. Test the script `~/bos_accounting/bos_accounting.sh`. It should run for sometime and give you single line output of various numbers. If you get an error, you may have to adjust some settings in the script or your installation. Reach out for help in the group with the error you are getting. The output column headers are the following:

```
=======================================================================================================================================

                              Local                             Weekly Fees earned compared to local channel balance
                            Channel      Weekly
                            Balance   Forwarded   percent    earned     paid      net      earned         paid    chain fee         net
      Date        Time         sats        sats                                              sats         sats         sats        sats


=======================================================================================================================================
```

4. If you are happy with the results, you can place the script in cron to run every night automatically and you can check the results at your convenience.

   ```
   cp ~/bos_accounting/bos_accounting.log ~/
   ```
   and then add to crontab via
   ```
   crontab -e
   ```
   and add the following lines.
   ```
   55 23 * * * ~/bos_accounting/bos_accounting.sh >>~/bos_accounting.log 2>&1
   ```
   `ctrl -x y enter` to save and exit
   check via `crontab -l` and you can see your entry.

Raspiblitz users, please run the script with the same user who can run bos. You may have to adopt the script to replace the line `BOS=`which bos`` by `BOS=path of bos on your installation` if you get issues in running via cron.

This will run the script every night and you can see the results every day by `cat ~/bos_accounting.log`

Once you are measuring the node performance and comfortable with it, you can move on to managing your fee policies. Described in the following sections.

### Node Fee Policies

Before jumping into fee policies, let us review some of the popular approaches in brief:

#### #ZeroBaseFee

Proponents for #ZeroBase fee claim that the network pathfinding algorithm can be improved if the base fee is removed from the pathfinding calculation. Today the pathfinding problem is an NP-Hard problem but without a base fee, it becomes a linear function. (citation needed)

If you wish to follow 0 base fee, you can set up your base fee = 0 for selected or all channels. This is also used to indicate your node supporting zero base fee.

Some nodes go a step further and drop their fee rate also to 0 ppm and that becomes #ZeroFeeRouting.

Some nodes go for 0 base fee and low fee rate which becomes #LowFeeRouting and promotes micro payments through their nodes.

Please note in the case of #ZeroFeeRouting or #LowFeeRouting you are not going to earn very little or if at all any routing fees and if your node does not rebalance itself, you will incur rebalancing fees.

#### Static Fee Rate

Another popular approach is to keep a static fee rate (say 200 ppm) for all channels along with base-fee = 0 or 1 Sat (1000 mSat).
The advantage of this approach is that it allows you to maintain your node once a day or even a week and make one change that affects all channels. It reduces node management drastically if you are manually managing fees.
You need to make sure that the average cost of rebalance is lower than the fee rate or else you will lose sats. See the section about node KPIs and keep that in mind and avoid aggressive and obsessive rebalancing. If network see two way traffic you can still route well with static fee and you will not generate much gossip traffic for the network too.

#### Static Base Fee

Variation of static fee rate is to use static base fee (or eat all you can buffet). Here you setup a static base fee (say 199 Sats 199000 mSat) and a fee-rate of 0 ppm. Any routes passing via your node will pay a fixed fee 199 sat. Naturally this favors larger transactions over smaller transactions (for example 199 fee for 2 000 000 sats is reasonable but for 1 000 sats is very expensive).
This fee policy can work for you and you can find the sweet spot for your node which balances the number of transaction, transaction size, and effective fee earned. It will also be a simple process that each forward will earn you same fee.

#### Liquidity Driven Fee Adjustment

Finally, a popular approach is to adjust your fees with your liquidity.

When high on local, let it flow
When low on local, go slow

The idea is that when you have liquidity at your local side, you charge low (but reasonable to make profit) fees. As liquidity moves away earning you fees, you start raising your fees. As a further extension, you can also set your fees high to stop routing through a channel where there is no liquidity. This is [#9999BaseFee](https://twitter.com/search?q=%239999BaseFee&src=typed_query). If your channel has run out of liquidity on your end, the network does not realize this and continues to send you traffic if your fees are low. This causes "Temporary Channel Failure" on the network and not only creates delays but also affects your node reputation. By presenting a low fee channel with zero or close to zero liquidity you are affecting the network path finding. If you cannot provide the liquidity (via rebalance or other means), it is sensible to step out of the path finding paths which can be done by raising your fees.

There are automation tools which can be used to implement automatic fee management for the node. The tool works for most strategies. Find the details below.

#### Installing Charge-Lnd

Detailed instructions are provided [here](https://github.com/accumulator/charge-lnd/blob/master/INSTALL.md) including options to install in docker. The following are simple instructions which should work for everyone specially umbrel on pi.

1. `cd ~`
2. `git clone https://github.com/accumulator/charge-lnd` if you want to use max-htlc=-1 feature, use `git clone https://github.com/bhaagbosedk/charge-l
