---
title: "Integrating Gasless API into DexAppBuilder for Gasless Swaps"
date: "May 23, 2024"
excerpt: "<p>At DexKit, our mission is to make Web3 accessible. One of the many ways we do this is by simplifying decentralized trading for everyone. Today,&hellip;</p> "
category: "Blog"
slug: "integrating-gasless-api-into-dexappbuilder-for-gasless-swaps"
imageUrl: "/blog-images/Gasless-blog.png"
---

At DexKit, **our mission is to make Web3 accessible**. One of the many ways we do this is by simplifying decentralized trading for everyone. Today, we’re thrilled to announce the **integration of the Gasless API into our DexAppBuilder platform** for white label DEX swap aggregators. This groundbreaking feature is designed to eliminate gas fees in token swaps. It benefits a wide array of users across the DexKit community. From traders and developers to NFT artists, cryptocurrency enthusiasts, and DApp creators, this integration marks a significant step towards democratizing DeFi. It expands opportunities within the decentralized ecosystem.

#### What is the Gasless API?

The [Gasless API](https://0x.org/post/0x-101-intro-to-gasless-api) simplifies ERC-20 token trading by eliminating the need to hold native tokens for gas fees. Provided by [0x](https://0x.org/), this API allows users to access liquidity, prices, and quotes effortlessly. Upon agreeing to a quote, users sign an EIP-712 message. This enables the API to handle approvals and submit transactions on their behalf, covering the gas fees.

#### Gasless API Key Features

Below are the key features of the Gasless API. They make this API the right choice for cost-effective and user-friendly decentralized finance (DeFi) transactions across multiple blockchain networks.

*   **Gasless transactions:** Execute token swaps without paying gas fees. Utilize a portion of the input token for transaction fees.
*   **Gasless approvals:** Utilize EIP-712 messages for gasless ERC-20 token allowances. This eliminates upfront gas expenses.
*   **MEV bot protection:** Gasless API incorporates MEV bot protection. This reduces trade failures and prevents sandwich bot interference.
*   **Multi-network support:** Gasless swaps are accessible across Ethereum, Polygon, Optimism, and Arbitrum networks.

#### How the Gasless API works

With the Gasless API, users experience smooth and cost-effective trading. Here’s how it works:

*   **Quote and approval:** Users first receive a quote for the transaction. If they agree to the terms, they sign an EIP-712 message to approve the transaction.
*   **Transaction submission:** The Gasless API then submits the transaction on behalf of the user, covering all gas fees.
*   **Confirmation and completion:** Users receive a confirmation once the transaction is successfully processed, completing the trade without any gas fee worries.

#### How to Activate Gasless Swaps

Activating gasless swaps is straightforward and doesn’t require any advanced knowledge. Simply navigate to the swap component configuration. You can find it on any of its pages featuring the Swap section. This section may either be a predefined component or embedded within custom sections. Click on the Edit button (highlighted in green in the image below) to access the swap component configuration. 

![Page section](https://dexkit.com/wp-content/uploads/swappages.png)

Access the swap component configuration with a simple click on the highlighted green Edit button.

Once inside the swap component configuration, check the box labeled **‘Gasless swaps’** and save the changes to your DApp (as shown in the image below).

![](https://dexkit.com/wp-content/uploads/swapcompo1.png)

Select the “Gasless swaps” option within the swap component configuration to enable gas-free transactions.

#### Toward Gasless DeFi with DexAppBuilder

Gas fees have long been a barrier in the DeFi space, complicating transactions and discouraging new users. By integrating the Gasless API, DexAppBuilder not only enhances its users’ experience but also promotes broader DeFi adoption by reducing entry barriers.

By using DexAppBuilder, all DApp builders and cryptopreneurs will be able to utilize the Gasless API feature. They can promote it within their DApp, making it more appealing to their audience.

**Start building your gasless DApp today using DexAppBuilder**. Experience the future of seamless trading with our platform’s [Swap Quick Builder](https://dexappbuilder.dexkit.com/admin/quick-builder/swap) feature for easy DApp creation.

🔗Learn more about this feature at [0x official docs](https://0x.org/docs/tx-relay-api/guides/understanding-tx-relay-api).