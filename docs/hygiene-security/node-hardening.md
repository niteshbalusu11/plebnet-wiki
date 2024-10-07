# Node Hardening

Your Lightning node stores your private keys and it's generally a good idea to keep it as secure as possible. This is quite a big topic and the following list of suggested actions are by no means exhaustive.

## Table of Contents
1. [Local Hardening](#local-hardening)
   1. [General common sense](#general-common-sense)
   2. [Hardware-based SSH keys](#hardware-based-ssh-keys)
   3. [Hard drive-based SSH keys](#hard-drive-based-ssh-keys)
   4. [SSH proxy for the web interface](#ssh-proxy-for-the-web-interface)
   5. [Reduce local attack surface](#reduce-local-attack-surface)
2. [Network hardening](#network-hardening)

## Local Hardening

### General common sense

In most cases, your Lightning node will be running on some sort of Linux distribution and SSH is most likely the way you access that node. Make sure that your user password is strong and unique.

- DO NOT SHARE SCREENSHOTS WITH QR CODES OR YOUR TOR ADDRESS.
- DO NOT SHARE YOUR WALLET ACCESS QR CODES.
- DO NOT SHARE ANYTHING WHICH CAN ALLOW ACCESS TO YOUR NODE (QR CODE/TOR ADDRESS)

### Hardware-based SSH keys

Logging in with a password or having your SSH keys on your hard drive is not secure. Both can easily be stolen if your computer is compromised. It is significantly more secure to log in with only an SSH key that even you have never been able to read the private key for. The hardware devices can also be configured to require physical touch for authentication, which is a massive security improvement.

1. Generate a hardware-based SSH key.

   Check if your computer has a secure element. If it does, you may be able to use that. For Mac, you can use: https://github.com/maxgoedjen/secretive

   The Ledger hardware wallet has a secure element and can generate SSH keys within it: https://blog.ledger.com/ssh/

   The Trezor hardware wallet also supports SSH keys, but does not have a secure element so might be considered slightly less secure: https://wiki.trezor.io/SSH

   You can buy a Yubikey or OnlyKey and generate SSH keys on that. It's also very good for two factor authentication codes: https://developers.yubico.com/SSH/ and https://onlykey.io/

2. Once the hardware-based SSH keys are generated, you'll need to add the public key as the first line in ~/.ssh/authorized_keys on your node. ie:

   ```bash
   echo "PUBLIC KEY GOES HERE" >> ~/.ssh/authorized_keys
   ```

3. You can optionally disable password log in over SSH by editing `/etc/ssh/sshd_config` and setting `PasswordAuthentication no` and restart the ssh service with:

   ```bash
   service sshd restart
   ```

If you decide to turn off password authentication, first ensure that you have multiple hardware-based keys stored in multiple different locations as backups in case you lose access to the main hardware-based key that you use. With password authentication turned off, if you lose access to all of your keys, you will not be able to SSH into your node ever again.

Note that some SSH programs require you to specify the pubic key file in order to use keys to log in. Those programs might not work with hardware-based keys. In that case, it's recommended to just use the standard terminal that comes pre-installed on your operating system (the Terminal app in Mac) and then use SSH via the command:

```bash
ssh umbrel@umbrel.local
```

### Hard drive-based SSH keys

If setting up hardware-based SSH keys is too complex, you can try setting up SSH keys stored on your hard drive. It will still be more secure than using password authentication. To do so, first generate your SSH keys on your host (not the lightning node itself).

```bash
ssh-keygen -t ed25519 -C "$(whoami)@$(uname -n)-$(date -I)"
```

Next, copy the public key to the Lightning node system.

```bash
ssh-copy-id user@<ip of lightning node host>
```

Then check that you can access your node over SSH using those keys. When authenticating over SSH the system should use your keys and not prompt you for the user password.

Once that's done, disable password login over SSH entirely by editing `/etc/ssh/sshd_config` and setting `PasswordAuthentication no` and restart the ssh service using:

```bash
service sshd restart
```

### SSH proxy for the web interface

Being able to log in to Umbrel, Thunderhub, RTL, etc. with just a password on the local network is not secure, especially since those websites don't use HTTPS on the local network. Using only a password is not secure. Require hardware-based SSH key log in to access those interfaces until Umbrel adds two factor authentication to the interface.

I'd recommend not using the Tor URLs for accessing the interfaces for Umbrel or apps. Most of the apps use a default password that's publicly known. If the tor URL is stolen, they will have access to your funds. Even if you change the password, just password-based authentication is not secure as even the password can be stolen using a simple key logger.

1. On your computer (not on the node), create a SOCKS5 proxy using SSH:

   ```bash
   ssh -D 8123 -f -C -q -N umbrel@umbrel.local
   ```

2. Set up your browser or computer to use the proxy. In Firefox, you can search the settings for the word "proxy" and then choose "manual proxy configuration". Enter "localhost" for the SOCKS5 Host and 8123 as the port. For example, you can use Brave for normal browsing and then Firefox for node related things so that only those things are proxied through the node.

3. Configure your network firewall or the firewall on your Umbrel (using iptables) to block the outbound ports for Umbrel, RTL, Thunderhub, etc.

Even if you're not able to set up the firewall, using the SSH tunnel is still more secure since normally those websites don't use HTTPS when accessed locally.

### Reduce local attack surface

Umbrel allows you to install a bunch of different apps, some not being Bitcoin or Lighting related at all such as Nextcloud. By doing so, especially if you're exposing the application publically, you increase the attack surface of your node system. If someone were to exploit a vulnerability in a exposed service or application, the attacker would potentially be able to retrieve your keys stored on the system and steal your funds. In other words, a Lighting node should be dedicated to that task and not be used for a plethora of other things.

## Network hardening

Most, if not all of us, are running our nodes on our home network, along side a large number of other devices, including smartphones, computers and IoT devices. You might want to consider isolating your node from the rest of the clients on the network and control access through firewall rules.

If your network equipment supports VLAN you have a great tool to tighten up your network security. You could create a separate VLAN for your lighting node and only allow it to communicate out on the required ports. If you do the same with your various other network client types you end up with a nicely segmented network where you can easily control who can access what and how.
