---
title: 'Deploy Token Allowance Drop on DexAppBuilder: ERC-20 Presale & Claim Guide'
date: 'May 18, 2026'
excerpt: >-
  Step-by-step guide to deploy DropAllowanceERC20 on DexKit, approve your ERC-20
  tokens, set claim conditions, and launch a branded token claim or presale page
  with DexAppBuilder—no Solidity required.
category: Blog
slug: deploy-token-allowance-drop-with-dexappbuilder
imageUrl: /blog-images/deploy-token-allowance-drop-dexappbuilder.png
---

**Quick answer:** A **token allowance drop** lets people claim an ERC-20 token you already own. The sale runs through DexKit’s `DropAllowanceERC20` contract; your **token owner** wallet approves the contract, then users claim on a page you build with [DexAppBuilder](https://dexappbuilder.dexkit.com/). Deploy the contract in [DexContracts](https://dexappbuilder.dexkit.com/forms/contracts/create), set claim rules, add a **DexGenerator** section to your app, and publish.

You already have the token. Maybe it’s sitting in a treasury wallet after launch, or you’re lining up a presale before listing. What you need now is a claim page with real rules—price phases, wallet caps, allowlists—not a hand-rolled script and three spreadsheets.

That’s what **Token Allowance Drop** is for. This guide walks through deployment on DexKit and wiring it into a [DexAppBuilder](https://dexappbuilder.dexkit.com/) app so your community has one link to claim.

## What is a token allowance drop?

A **token allowance drop** (contract name: `DropAllowanceERC20`) is a smart contract that sells or gives away **existing** ERC-20 tokens from a wallet you control.

On a normal [token drop](https://docs.dexkit.com/defi-products/dexgenerator/thirdweb-contracts/token-drop), the contract often **mints** tokens when someone claims. Here, nothing new is created at claim time. The contract pulls tokens from the **token owner** address using a standard ERC-20 `approve` + `transferFrom` flow—the same allowance pattern you’d use to let a DEX spend your tokens.

**In practice you need:**

- An ERC-20 already live on your chain (deploy via DexContracts **Token** if you don’t have one yet).
- A **token owner** wallet that holds the supply you’re offering.
- An **approval** on that wallet so the drop contract can move those tokens when claims go through.

DexKit ships this as **Token Allowance Drop** inside DexContracts. Full reference: [DropAllowanceERC20 documentation](https://docs.dexkit.com/defi-products/dexcontracts/dexkit-contracts/dropallowanceerc20).

## Token allowance drop vs token drop: which one do you need?

| | Token Drop (`DropERC20`) | Token Allowance Drop (`DropAllowanceERC20`) |
|---|---|---|
| Where tokens come from | Minted by the drop on claim | Token owner’s wallet |
| You need first | Just the drop contract | ERC-20 + funded token owner |
| Before anyone can claim | Set supply / lazy mint on drop | Token owner must **approve** the drop |
| Fits projects like | Brand-new token launch | Presale, rewards, selling treasury tokens |

If your token exists and the supply lives in your multisig or deployer wallet, pick **Token Allowance Drop**. If you’re minting at claim from zero, use **Token Drop** instead.

## Who is this setup for?

Token allowance drops show up a lot when teams want:

- A **presale page** for an ERC-20 that’s already deployed  
- **Community rewards** paid from a treasury without sending hundreds of manual transfers  
- **Phased claims** (allowlist → public) with on-chain limits  
- A **branded claim URL** on their own DexAppBuilder domain  

You don’t need to write Solidity. You do need gas, a clear token owner, and five minutes on a testnet before you touch mainnet.

## Before you deploy: checklist

- [DexAppBuilder](https://dexappbuilder.dexkit.com/) account and wallet connected  
- **ERC-20 contract address** on the network you’re using  
- **Token owner** wallet with enough tokens for the sale  
- Native coin for deploy + approve txs (ETH, MATIC, etc.)  
- Chain enabled in your app under **Settings → Networks** (Polygon, Base, Arbitrum, BNB Chain, Ethereum, Optimism, Avalanche, and others supported by DexContracts)

## How to deploy DropAllowanceERC20 (Token Allowance Drop)

### Open DexContracts

Sign in at [dexappbuilder.dexkit.com](https://dexappbuilder.dexkit.com/), open your app admin (or hit **Create App**), then go to **DexContracts → Deploy contract**. Shortcut: [dexappbuilder.dexkit.com/forms/contracts/create](https://dexappbuilder.dexkit.com/forms/contracts/create).

### Pick Token Allowance Drop

Scroll the catalog for **DropAllowanceERC20**—the UI label is **Token Allowance Drop**. Open it to see the deploy form.

### Fill the form (what each field means)

**Name, symbol, description, image** — What explorers and your claim page show. Worth getting right; you’ll rarely change it later.

**Token address** — The ERC-20 you’re distributing. Paste the contract address from your launch. Wrong network = broken claims.

**Token owner** — The wallet that actually holds the tokens. This address must send the `approve` transaction later. Many teams use a treasury or the same wallet that deployed the token; it doesn’t have to be the wallet connected right now, but only this address can grant allowance.

**Sale recipient** — Where paid claims send ETH (or whatever currency you charge). Usually your project wallet.

Admin defaults to your connected wallet. DexKit contract fees are already set in the form—you don’t need to touch platform fee fields unless you know you should.

### Confirm deploy

Select the network, check gas, sign in your wallet. When it confirms, find the contract under **DexContracts → My contracts** and copy the **address** and **chain**. You’ll paste both into DexAppBuilder layout settings.

## Approve tokens and set claim conditions

Open the contract from **My contracts**. You’ll see **Token**, **Claim Conditions**, **Metadata**, and **Admin**.

### Give the drop allowance (don’t skip this)

Claims fail silently—or revert—if this step is missing.

1. Open the **Token** tab.  
2. Connect the wallet that matches **token owner** from deploy.  
3. Hit **Approve** and enter an amount **≥ total tokens you plan to move** across every phase.  
4. Sign the transaction.

The UI shows current allowance once it’s set. If it tells you to switch wallets, you’re on the wrong account; connect the token owner.

### Set claim conditions

**Claim Conditions** is where the sale logic lives: public phase, allowlist, free claim, price per token, start/end times, max per wallet, snapshots.

Run one full claim on Sepolia (or your testnet) before mainnet. We’ve seen teams set perfect UI copy and forget a phase end date—testnet catches that cheaply.

Metadata and Admin tabs are there for contract URI updates and role changes if your setup needs them later.

## Build a DexAppBuilder app around your token drop

Deployment alone doesn’t give you a shareable presale link your community will trust. The app does.

### Create the app shell

From [DexAppBuilder](https://dexappbuilder.dexkit.com/), **Create App** (or open an existing project). Add name, email, wallet. Under **Settings**, set logo, domain, theme, and turn on the network where you deployed the drop.

New to the builder? Our [on-chain app walkthrough](https://dexkit.com/blog/creating-on-chain-application-made-easy-with-dexappbuilder) covers Settings and Layout in more detail.

### Add the claim page (DexGenerator section)

1. **Layout → Pages**  
2. New page—call it Claim, Presale, whatever matches your brand  
3. Add a section → **DexGenerator** (this is the DexContracts hook)  
4. Choose your **DropAllowanceERC20** deployment; filter by network if you have several  

DexAppBuilder maps it to a **token-drop** section—the same claim UI as a standard token drop, but it reads from your token owner’s balance via allowance.

Tweak copy, colors, and button labels in the section settings. **Preview** with a wallet on the right chain before you announce the link.

### Publish

Save layout, publish to your DexKit subdomain or custom domain, then run one real claim yourself: connect wallet, claim min amount, confirm tokens hit the buyer wallet.

Share that URL. Done.

## Full launch checklist (copy/paste)

- ERC-20 live on target chain  
- `DropAllowanceERC20` deployed with correct token + token owner  
- Token owner approved enough allowance  
- Claim conditions tested on testnet, then set on mainnet  
- DexAppBuilder app live with DexGenerator → token-drop pointing at contract address  
- One end-to-end claim verified on production URL  

## FAQ

### What is DropAllowanceERC20?

`DropAllowanceERC20` is DexKit’s smart contract for token allowance drops. It distributes an existing ERC-20 from a designated token owner using ERC-20 approvals instead of minting on claim.

### How is a token allowance drop different from a normal token drop?

A normal **Token Drop** (`DropERC20`) typically mints tokens when users claim. **Token Allowance Drop** transfers tokens the owner already holds, after the owner approves the drop contract as a spender.

### Do I need to approve tokens before users can claim?

Yes. The token owner wallet must `approve` the drop contract for at least the total sale amount. Without approval, claims revert.

### Can I run a presale with DexAppBuilder and no code?

Yes. Deploy **Token Allowance Drop** in DexContracts, configure claim conditions, then add a **DexGenerator** token-drop section in DexAppBuilder and publish your app.

### Which blockchains support Token Allowance Drop?

DexContracts supports the chains available in DexAppBuilder—commonly Ethereum, Polygon, BNB Chain, Base, Arbitrum, Optimism, and Avalanche. Pick the network in the deploy screen and enable the same chain in app **Settings → Networks**.

### Why did my claim transaction fail?

Usually: insufficient allowance, token owner balance too low, wrong network in the wallet, or claim phase not active (time window, allowlist, or per-wallet cap). Check the **Token** tab allowance first—it’s the most common miss.

### Can token owner and admin be different wallets?

Yes. Admin manages the drop settings; only the **token owner** can approve tokens. Teams often use a multisig as token owner and a hot wallet as admin.

## More from DexKit

- [DropAllowanceERC20 — technical docs](https://docs.dexkit.com/defi-products/dexcontracts/dexkit-contracts/dropallowanceerc20)  
- [Deploy contracts (DexContracts)](https://dexappbuilder.dexkit.com/forms/contracts/create)  
- [Creating on-chain apps with DexAppBuilder](https://dexkit.com/blog/creating-on-chain-application-made-easy-with-dexappbuilder)  
- [Embed token drops on any website (Web3 Widgets)](https://dexkit.com/blog/unlock-web3-on-any-website-web3-widgets)  
- [DexContracts and crypto staking](https://dexkit.com/blog/crypto-staking-demystified-exploring-benefits-and-risks)  

## Get started

[Deploy Token Allowance Drop](https://dexappbuilder.dexkit.com/forms/contracts/create) · [Open DexAppBuilder](https://dexappbuilder.dexkit.com/)

Stuck on a step? [Contact us](https://www.dexkit.com/contact-us/) or ask in [Discord](https://discord.com/invite/GJCRu4CYFH)—someone from the team usually answers there within a day.
