# Getting Started with PLEBNET

In order to join PLEBNET, you need a [Lightning Network](https://en.wikipedia.org/wiki/Lightning_Network) node (more on that later) and [Telegram](https://telegram.org/) to chat and connect with us!

If you are totally new to the lightning network, and would like to get an overview of how it works before diving in, then read the [bitcoiner.guide/lightning](https://bitcoiner.guide/lightning) guide.

## Node

There are several newbie options for getting a Lightning node set up and running. Some of them are software only, some hardware + software.

* [RaspiBlitz](https://github.com/raspiblitz/raspiblitz) is a great option that runs on Raspberry Pi v4+
* [Umbrel](https://umbrel.com/) is a newbie-friendly package that runs on Raspberry Pi v4+
* [BTC SESSIONS](https://youtu.be/Fa9AvF4jk1o?feature=shared) has a good video walkthrough for getting started with Raspberry Pi and Umbrel
* **Security note for Umbrel:** *Your Umbrel node is only as secure as your network (WiFi/LAN).* Be sure to read the Security Disclosure from the Umbrel team. Your funds can be at risk if someone can steal your SSD so protect your node the same way you protect any other valuable at your home. If you are comfortable with command line, you can change the wallet password from command line and then remember to use that password each time you restart lnd or during upgrades (or else your node will not start without correct password for the wallet). Do not keep the wallet password same as the dashboard password or else umbrel will change it back to hardcoded password on next unlock. By default the wallet is unlocked automatically during startup using hardcoded passwords.
* [Start9](https://start9.com/) is an all-in-one option that includes the necessary hardware
* [RaspiBolt](https://raspibolt.org/) has some good information on how to set up the necessary services manually

For additional information about node hardware see the Node Hardware page.

## Telegram

PLEBNET discussion and coordination happens on the Telegram chat platform.
Download the [Telegram](https://telegram.org/) app and join the [PLEBNET](https://t.me/plebnet/) group.
The companion Telegram channel PLEBNET Library contains high quality materials collected from chat group traffic.

## Nodes with 2 channels or more

Also join the private NODERUNNERS Telegram group. Contact Walton [@AEHW1](https://t.me/AEHW1) to get added.
