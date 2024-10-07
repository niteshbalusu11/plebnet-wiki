# Maintaining Node Hygiene

- Learn some tips about node hygiene.

## Table of Contents
1. [Keep Your Node Online](#keep-your-node-online)
2. [Setting cron jobs](#setting-cron-jobs)
3. [Set a Static IP Address](#set-a-static-ip-address)
4. [Make Friends With Lightning Watch Bot](#make-friends-with-lightning-watch-bot)

### Keep Your Node Online

When you're running a lightning node, it's important to keep consistent uptime. This is good for you, your peers, and the overall community. Making sure your node stays online improves your reliability, as well as the reliability of nodes that connect to you. If your node reboots or goes offline repeatedly, your reputation will be negatively impacted, and other peers will choose to route around you. If your node is offline for an extended period of time, you also run the risk of having your open channels force-closed, which can result in losing sats as the channel balance settles on-chain.

### Setting cron jobs

Certain functions can be automated by cron to run regularly.
To add jobs in cron, do `crontab -e` and then make the changes. If you are asked for editor, select /bin/nano. To save `ctrl -x y enter`
To check cron jobs do `crontab -l`

To enable reconnecting disconnected peers, you can run this every 3-6 hours. The following entry will run it every 4 hours.

```
0 */4 * * * /usr/bin/timeout -s 2 300 /usr/bin/bos reconnect >/tmp/cron1.log 2>&1; date >> /tmp/cron1.log
```

RaspiBlitz users may have to use this instead. Please double-check that path to bos is correct `which bos`. Install to cron using bos user (one which is used to run bos).

```
0 */4 * * * /usr/bin/timeout -s 2 300 /home/bos/.npm-global/bin/bos reconnect >/tmp/cron1.log 2>&1; date >> /tmp/cron1.log
```

### Set a Static IP Address

One of the most important aspects to keeping your node online is setting a static IP address. Normally, your router assigns IP addresses dynamically to every device on the network. When the router refreshes its IP tables from time to time, some or all of the devices connected to it are reassigned new addresses. Generally, your devices will not alert you when this happens. Some models of wireless printers will display a message on the screen when the IP address changes, but by default, your laptop, smartphone, or node will not inform you when this happens.

The solution for this is to change your router's settings to lock the IP address used by your node. Depending on the type of router you use, this might be referred to as a **manually-assigned IP**, a **reserved IP**, or you may need to simply turn off **automatic IP** assignment. You might have to look in the advanced settings section to find this feature. Once you've set the IP address, you shouldn't have to reboot your node, but if you do, it should retain the same IP address when it comes back up.

![Example of the Reserved IP settings screen on the Google Home app.](@site/static/img/1000px-Reserved_ip.jpeg)

### Make Friends With Lightning Watch Bot

One simple way to be notified in the event your node becomes unavailable is to register it with @lightningwatchbot, a Telegram bot that will keep an eye on your node's up/down status. Start a conversation with the bot, and it will walk you through the steps to connect your node. As a free service, it will send you alerts on a one hour delay. For a faster response time, you can open a channel of any size with the bot (a great way to practice opening channels) and send it a small payment to receive notifications for your desired duration.

![Lightning Watch Bot](@site/static/img/1000px-Lightning_watchbot.png)

Currently, Lightning Watch Bot charges the following fees:

- 1 hour for 5 sats
- 1 day for 90 sats
- 1 week for 600 sats
- 1 month for 2400 sats
- 6 months for 14400 sats
- 1 year for 27600 sats
