---
title: "Discover the power of ERC-4337 smart contract wallets"
date: "August 17, 2023"
excerpt: "<p>The ERC-4337 standard (Ethereum Request For Comment 4337) represents an enhanced Ethereum standard that seeks to introduce smart contract capabilities into wallets within the Ethereum ecosystem. This entails the potential for wallet customization to suit diverse needs, applications, or individual users, all within the framework of the ERC-4337 standard. DexKit will provide compatibility with this standard.</p> "
category: "Blog"
slug: "discover-the-power-of-erc-4337-wallets"
imageUrl: "/blog-images/Copy-of-20230817_ERC-4337-blog-LinkedIn-Facebook.png"
---

Meet the ERC-4337 smart contract wallets, web3 wallets designed specifically to manage smart contract accounts. These advanced wallets, built upon the ERC-4337 standard, provide users with a familiar experience similar to traditional Externally-Owned Account (EOA) wallets, while also introducing additional functionalities, adaptability, and heightened security advantages.

DexKit, an innovative blockchain startup, is actively exploring ways to integrate their products with these advanced ERC-4337 smart contract wallets. This strategic initiative promises to enhance both user experience and transaction security, further reinforcing the appeal of these innovative wallets.

#### Why consider smart contract wallets? 💡

Smart contract wallets enhance their functionality through the use of programmable smart contracts, distinguishing them from regular EOA wallets. Although EOA wallets are required to initiate transactions with smart contract wallets, the integration of Account Abstraction infrastructure services, including Bundlers, Paymasters, the EntryPoint contract, and Wallet SDKs, is designed to simplify and streamline this process. This enhancement benefits both wallet developers and end users by making interactions with smart contract wallets smoother and more user-friendly. 

Highlighted below are several of the potential capabilities that smart contract wallets bring:

*   **Dual-factor authentication
    
    ![✔️](https://s.w.org/images/core/emoji/14.0.0/svg/2714.svg)
    
    **

Smart contract wallets can incorporate dual-factor authentication, which demands two distinct components to verify a user’s identity. These components could include something the user knows (like a password), something the user possesses (such as a phone), or a biological aspect (like a fingerprint). This feature, prevalent in web2, heightens security and obstructs unauthorized access.

*   **Social recovery
    
    ![🤝](https://s.w.org/images/core/emoji/14.0.0/svg/1f91d.svg)
    
    **

Social recovery allows the public key of a smart contract wallet to be altered if the original private key is lost. This process involves a multisig transaction with trusted friends or family members acting as guardians. Consequently, there is no need for the wallet owner to retain seed phrases.

*   **Flexible gas strategies**
    
    **![⛽](https://s.w.org/images/core/emoji/14.0.0/svg/26fd.svg)**
    

Smart contract wallets can establish versatile gas policies using APIs that adhere to the ERC-4337’s Paymaster specification. This permits developers to sponsor transactions on users’ behalf (enabling gasless transactions) and enables users to settle gas fees in any ERC-20 tokens (e.g., USDC).

*   **Personalized signature schemes
    
    ![🖋️](https://s.w.org/images/core/emoji/14.0.0/svg/1f58b.svg)
    
    **

Smart contract wallets can be programmed to adopt diverse signature schemes, thereby replacing the standard ECDSA utilized in Ethereum. This could involve multisig, social recovery, or even alternatives resistant to quantum computing, like Crystals-Kyber.

*   **Multicall functionality
    
    ![🔄](https://s.w.org/images/core/emoji/14.0.0/svg/1f504.svg)
    
    **

Multicall functionality empowers a smart contract wallet to execute multiple actions within a single atomic transaction. This significantly enhances the current wallet model where each transaction necessitates individual confirmation, resulting in extended processing times and an unsatisfactory user experience.

*   **Spending limits for different signers
    
    ![💳](https://s.w.org/images/core/emoji/14.0.0/svg/1f4b3.svg)
    
    **

Smart contract wallets can be configured to recognize multiple valid signers, which in turn enables the establishment of distinct spending limits for each signer. For instance, a user might include both their laptop and Ledger hardware wallet as signers, allowing transactions up to 0.05 ETH via their laptop, while transactions exceeding this limit necessitate the use of the hardware wallet.

*   **Address allowlisting and denylisting
    
    ![📃](https://s.w.org/images/core/emoji/14.0.0/svg/1f4c3.svg)
    
    **

Smart contract wallets empower users to either grant or deny access to specific wallet addresses, contributing to enhanced security and user control.

*   **Multi-sig wallet support
    
    ![💼](https://s.w.org/images/core/emoji/14.0.0/svg/1f4bc.svg)
    
    **

The support for multi-signature functionality within smart contract wallets is particularly valuable for organizations, where multiple approvals are often essential before a transaction can be executed. This added layer of security thwarts the efforts of a lone individual seeking to misappropriate funds or conduct unauthorized transactions.

#### Drawbacks of smart contract wallets 😔

Smart contract wallets come with numerous advantages, but they also come with their share of drawbacks. These include higher gas costs, potential  challenges related to code, and a current lack of support across the majority of web3 platforms.

One significant drawback is the elevated gas costs associated with smart contract wallets. These wallets are governed by code, which means that executing the code requires payment for the computational resources used. As a result, transactions conducted using smart contract wallets tend to be more expensive than those carried out with traditional Externally-Owned Account (EOA) wallets. This cost disparity becomes especially pronounced when complex features that require intricate smart contract code execution are incorporated.

Another issue to consider is the potential code-related challenges inherent in smart contract wallets. Given that smart contract wallets rely on code, they are susceptible to many of the same issues involving auditing, security vulnerabilities, and bugs, similar to conventional software products. Because smart contract wallets are relatively new, users who adopt wallets adhering to the ERC-4337 standard should exercise caution. They should carefully evaluate the team responsible for the wallet’s development, scrutinize the design, and the overall code security to mitigate potential risks.

Furthermore, smart contract wallets currently face limited support within the web3 ecosystem. While these wallets offer advanced features and benefits, they are still in their early stages of development. This lack of maturity is reflected in the limited platform support they receive. To achieve widespread adoption, smart contract wallets need endorsement and integration from  well-established DeFi protocols and other influential web3 platforms.

#### Final thoughts

Innovative and forward-looking, smart contract wallets built upon the ERC-4337 standard represent a leap towards enhanced security, versatility, and control in the realm of digital asset management. As we journey into this promising landscape, exciting collaborations are on the horizon. 

DexKit is actively engaging with these advanced smart contract wallets, aligning with their vision for user-centric experiences and heightened transaction security. In forging partnerships like these, DexKit seeks to enhance and elevate user interactions within the blockchain realm. An embodiment of their dedication to innovation, DexAppBuilder – the flagship product of DexKit – serves as a testament to their visionary approach.