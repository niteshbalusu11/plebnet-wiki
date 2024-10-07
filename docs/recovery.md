# Backup/Recovery

Running an LN Node involves a certain level of risk and there is a possibility to lose funds. However, by following some simple steps, you could drastically reduce the possibility of losing funds.

## Table of Contents

1. [Channel backup](#channel-backup)
   1. [Static Channel Backups (SCB)](#static-channel-backups-scb)
   2. [How to obtain an SCB?](#how-to-obtain-an-scb)
2. [Recovery](#recovery)
   1. [You still have access to your node](#you-still-have-access-to-your-node)
   2. [You don't have access to your node](#you-dont-have-access-to-your-node)
   3. [ALL HOPE IS LOST (No SCB)](#all-hope-is-lost-no-scb)
   4. [Exception scenarios](#exception-scenarios)
      1. [Node goes down during an in-flight HTLC](#node-goes-down-during-an-in-flight-htlc)
      2. [You initiated a force closure, funds are still stuck in time-lock](#you-initiated-a-force-closure-funds-are-still-stuck-in-time-lock)
      3. [Node goes down while opening channel transaction is pending but not confirmed in mempool](#node-goes-down-while-opening-channel-transaction-is-pending-but-not-confirmed-in-mempool)

## Channel backup

### Static Channel Backups (SCB)

LND can store a backup file of your channels using a method called Static Channel Backups (SCB).
Instead of trying to maintain the latest channel state, the static channel backup package will attempt to notify remote peers to force close the channel. This will prevent users from accidentally broadcasting an old state and allow them to close out and receive their local balance. Note that when you use an SCB you will receive your funds fairly quickly as the time lock for force closures will only apply to the peers initiating the force closure and not the other peer.

An SCB file is updated when a channel is opened or closed. Channel information is added to the SCB when it's opened and is removed from the SCB when it's closed.

**IMPORTANT NOTE**: SCBs will not restore your node back to normal, they are only a way to recover all the funds in your on-chain wallet and the funds on the local side of your channels (off-chain).

### How to obtain an SCB?

There are several ways to obtain an SCB.

- Using the BoS Telegram bot (recommended): [Umbrel - Installing BoS](https://plebnet.wiki/wiki/Special:MyLanguage/Umbrel_-_Installing_BoS)
- Umbrel users: Can contact Umbrel for receiving your SCB if your node goes down.
- Non-Umbrel users: Using ThunderHub, there is an option to download the latest backup from the tools option.
- Using lncli: `lncli exportchanbackup`

BoS Telegram is a recommended way because it automatically sends you an SCB file every time a channel is opened/closed. The other methods are manual processes and there is a risk of not maintaining the latest backup.

## Recovery

Shit happens! If your node ever goes down and you can't bring it back up again:

### You still have access to your node

You will need your 24-word cipher seed and the SCB. Follow [these instructions](https://github.com/lightningnetwork/lnd/blob/master/docs/recovery.md#recovering-using-scbs) (Use `lncli restorechanbackup`).

### You don't have access to your node

In this scenario, for example, if your node has been destroyed in a nuclear attack, you will need to start a new node to recover funds.

You will need your 24-word cipher seed and the SCB. You can set up a new node in Neutrino mode to save time. Neutrino is a lightweight client that allows you to run an LN node without Bitcoin Core.
You can create a new Neutrino node by following [these instructions by Alex Bosworth](https://github.com/alexbosworth/ln-service). These instructions are for creating a node on AWS EC2, however, you can create one on your laptop/desktop or on a Raspberry Pi.

After you start a new node on Neutrino, you can follow [the same recovery instructions](https://github.com/lightningnetwork/lnd/blob/master/docs/recovery.md#recovering-using-scbs). (Use `lncli create -multi_file=channel.backup`)

Note: Replace channel.backup with the name of your backup file.

### ALL HOPE IS LOST (No SCB)

If you don't have an SCB and all you have is your 24-word cipher seed, there is a possibility to recover your funds (no promises).

First, contact all your peers and ask them to force close on you manually.

After the force closure is confirmed, follow [these instructions](https://github.com/guggero/chantools/blob/master/doc/chantools_genimportscript.md).

### Exception scenarios

#### Node goes down during an in-flight HTLC

If there was a payment that was in-flight that was being routed through your node or payment you were making and your node goes down and does not come back up, sorry, there is no way to recover funds that are stuck in the HTLC as of now but you can recover all the other on-chain and off-chain funds. This is probably a very extreme scenario.

#### You initiated a force closure, funds are still stuck in time-lock

If you initiate a force closure, the funds are locked for a certain number of blocks. If the node goes down during the time-lock period of a force closure initiated by you, unfortunately, LND has a bug today which removes the channel details from the latest SCB before the time-lock expires. The way to recover these funds would be to use an older SCB that you might have before the channel details were removed and use it start the recovery as shown in the previous steps and you will receive your funds back to your on-chain wallet after the time-lock expires. BOS Telegram bot can be a real savior in this scenario because the chat history with the bot will have older SCBs that you can use to recover funds. Lightning Labs say they will be fixing this in 0.14.0-beta.

If you don't have an older SCB, unfortunately, there is no other way as of today to recover those funds, this also is an extreme scenario.

#### Node goes down while opening channel transaction is pending but not confirmed in mempool

Story from a fellow pleb - a special case.

I initiated a new channel opening on the lightning network with a known node of 1mil sats capacity
- My Bitcoin wallet had UTXO of 4mil sats which was used for this open
  - 1 mil for the channel
  - 3 mil UTXO (Unspent Transaction Output)
- The channel opening transaction was broadcast to the bitcoin network and was sitting unconfirmed. I did not have the SCB of this point of pending channel open which caused me issues later on.
- Whilst the channel opening transaction was sitting unconfirmed:
  - I accidentally deleted folders on my Umbrel node that I definitely shouldn't have. Forcing me to initiate recovery.
  - I turned off my node, reflashed my SD card, and restarted/reinstalled my entire node with my 24 words
  - I executed the restorechanbackup command from my most recent channel backup (cd ~/umbrel && ./bin/lncli restorechanbackup --multi_file /data/.lnd/channel.backup)
  - I failed to take a channel.backup at any point during all of this (so had no backup of the pending channel).
  - I failed to backup anything from my node before restarting/reinstalling it
- After a day or so, all my channels force closed, however the 4mil sats from the channel opening transaction were "lost" and I couldn't see the channel on my end
- I contacted the Umbrel backup team, and tried 2 backups which could have possibly contained the pending channel, and I executed that restore but still couldn't see the pending channel (https://gist.github.com/louneskmt/e4093a62aa1ae8788ef5d92c119f22a8)
- I contacted the node I setup the pending channel to, and they were able to successfully force close the channel, but this did not change anything on my end, I still couldn't see the channel or UTXO
- I tried to restart my umbrel node with reset-wallet-transactions=true - unfortunately this didn't find the UTXO or channel
- I was then introduced to something called chantools (https://github.com/guggero/chantools) - MAKE SURE YOU INSTALL THE NEWEST VERSION by changing the example text from v0.7.1 in both locations!!!!!!!! (Umbrel on a raspberry pi4 requires ARM64 version.)
- The author indicated that:
  - Since the other node force closed, the "missing" channel funds could now be swept by me as I have the seed.
  - Unfortunately lnd doesn't (yet) pick up on such funds automatically.
  - And because my umbrel channel backups didn't contain the new pending channel yet, I would need to do it manually.
  - Fortunately for such cases the author built the "chantools sweepremoteclosed" command. (https://github.com/guggero/chantools/blob/master/doc/chantools_sweepremoteclosed.md)
- I ran the "chantools sweepremoteclosed" command whilst SSH'd into my umbrel node:
  - Making sure to adjust the fee rate to something sensible (4 was fine for me at the time)
  - Making sure to specify my own bitcoin address for the sats to be swept to (I used my umbrel node bitcoin address)
  - It will prompt you in the CMD windows for your 24 node words (I had nothing to lose and the tool indicates your words don't leave your device)
- This command was successful in recovering my 1mil sats channel capacity
- To recover my 3mil UTXO, the chantools author indicated the "chantools genimportscript" command will work (https://github.com/guggero/chantools/blob/master/doc/chantools_genimportscript.md)
- Other advice indicated that using electrum desktop wallet would be easiest to import the private keys the command can generate
- I therefore executed the command with "-- format electrum" (chantools genimportscript --format electrum \ --recoverywindow 5000 \ --lndpaths)
- This provided a file on my umbrel node
- I copied this to my desktop by running a CMD command on my local desktop computer such as (scp umbrel@umbrel.local:/home/umbrel/results/genimportscript-2022-04-05-11-00-50.txt C:\Users\redacted\Desktop\genimportscript-2022-04-05-11-00-50.txt)
- I then installed electrum desktop wallet, and copied the private keys from the file when I booted up electrum for the first time (I had to select the option to create a wallet from private keys)
- In about 1 minute, it had a balance of my UTXO transaction (thought I understand this could take longer)
