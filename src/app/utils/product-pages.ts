export type ProductSlug =
  | 'dexappbuilder'
  | 'dexswap'
  | 'dexwallet'
  | 'dexexchangepro'
  | 'dexnftstore'
  | 'dexnftmarket'
  | 'dexcontracts';

export type ProductExtraSection = {
  id: string;
  titleId: string;
  itemIds: string[];
};

export type ProductPageConfig = {
  slug: ProductSlug;
  featureCount: number;
  stepCount: number;
  faqCount: number;
  showNetworks: boolean;
  ctaUrl: string;
  ctaMessageId?: string;
  docsUrl: string;
  tutorials: { titleId: string; url: string }[];
  extraSections?: ProductExtraSection[];
};

export const DEXSWAP_CONFIG: ProductPageConfig = {
  slug: 'dexswap',
  featureCount: 6,
  stepCount: 3,
  faqCount: 5,
  showNetworks: true,
  ctaUrl: 'https://dexappbuilder.dexkit.com/admin/quick-builder/swap',
  docsUrl: 'https://docs.dexkit.com/defi-products/dexswap/overview',
  tutorials: [
    { titleId: 'dexswap.tutorials.firstSwap', url: 'https://docs.dexkit.com/defi-products/dexswap/creating-my-first-swap' },
    { titleId: 'dexswap.tutorials.managingTool', url: 'https://docs.dexkit.com/defi-products/dexswap/managing-this-tool' },
    { titleId: 'dexswap.tutorials.deployingDApp', url: 'https://youtube.com/watch?v=uMivD0Rikg8' },
  ],
};

export const DEXWALLET_CONFIG: ProductPageConfig = {
  slug: 'dexwallet',
  featureCount: 6,
  stepCount: 3,
  faqCount: 5,
  showNetworks: true,
  ctaUrl: 'https://dexappbuilder.dexkit.com/admin/quick-builder/wallet',
  docsUrl: 'https://docs.dexkit.com/defi-products/dexwallet/overview',
  tutorials: [
    { titleId: 'dexwallet.tutorials.firstWallet', url: 'https://docs.dexkit.com/defi-products/dexwallet/creating-my-first-wallet' },
    { titleId: 'dexwallet.tutorials.managingTool', url: 'https://docs.dexkit.com/defi-products/dexwallet/managing-this-tool' },
  ],
};

export const DEXEXCHANGEPRO_CONFIG: ProductPageConfig = {
  slug: 'dexexchangepro',
  featureCount: 6,
  stepCount: 3,
  faqCount: 5,
  showNetworks: true,
  ctaUrl: 'https://dexappbuilder.dexkit.com/admin/quick-builder/exchange',
  ctaMessageId: 'dexexchangepro.openSolution',
  docsUrl: 'https://docs.dexkit.com/defi-products/dexexchangepro/overview',
  tutorials: [
    { titleId: 'dexexchangepro.tutorials.firstExchange', url: 'https://docs.dexkit.com/defi-products/dexexchangepro/creating-my-first-exchange' },
    { titleId: 'dexexchangepro.tutorials.managingTool', url: 'https://docs.dexkit.com/defi-products/dexexchangepro/managing-this-tool' },
  ],
};

export const DEXNFTSTORE_CONFIG: ProductPageConfig = {
  slug: 'dexnftstore',
  featureCount: 6,
  stepCount: 3,
  faqCount: 5,
  showNetworks: false,
  ctaUrl: 'https://dexappbuilder.dexkit.com/admin/quick-builder/nft-store',
  docsUrl: 'https://docs.dexkit.com/defi-products/dexnftstore/overview',
  tutorials: [
    { titleId: 'dexnftstore.tutorials.firstStore', url: 'https://docs.dexkit.com/defi-products/dexnftstore/creating-my-first-store' },
    { titleId: 'dexnftstore.tutorials.managingTool', url: 'https://docs.dexkit.com/defi-products/dexnftstore/managing-this-tool' },
  ],
};

export const DEXNFTMARKET_CONFIG: ProductPageConfig = {
  slug: 'dexnftmarket',
  featureCount: 6,
  stepCount: 3,
  faqCount: 5,
  showNetworks: true,
  ctaUrl: 'https://dexappbuilder.dexkit.com/admin/create',
  docsUrl: 'https://docs.dexkit.com/defi-products/dexnftmarket/overview',
  tutorials: [
    { titleId: 'dexnftmarket.tutorials.firstMarketplace', url: 'https://docs.dexkit.com/defi-products/dexnftmarket/creating-my-first-nft-marketplace' },
    { titleId: 'dexnftmarket.tutorials.managingListings', url: 'https://docs.dexkit.com/defi-products/dexnftmarket/managing-listings' },
  ],
};

export const DEXCONTRACTS_CONFIG: ProductPageConfig = {
  slug: 'dexcontracts',
  featureCount: 6,
  stepCount: 3,
  faqCount: 5,
  showNetworks: false,
  ctaUrl: 'https://dexappbuilder.dexkit.com/contract-wizard',
  ctaMessageId: 'dexcontracts.openSolution',
  docsUrl: 'https://docs.dexkit.com/defi-products/dexcontracts/overview',
  tutorials: [
    { titleId: 'dexcontracts.tutorials.firstCollection', url: 'https://docs.dexkit.com/defi-products/dexcontracts/creating-my-first-collection' },
    { titleId: 'dexcontracts.tutorials.thirdwebContracts', url: 'https://youtube.com/playlist?list=PLue98kEkVwiuKad1hQs11rWiGUkyl0nq5' },
  ],
  extraSections: [
    {
      id: 'requirements',
      titleId: 'dexcontracts.sections.requirements',
      itemIds: [
        'dexcontracts.requirements.metamask',
        'dexcontracts.requirements.gasFees',
        'dexcontracts.requirements.artPieces',
        'dexcontracts.requirements.aiGenerated',
        'dexcontracts.requirements.aiCompletion',
      ],
    },
    {
      id: 'limitations',
      titleId: 'dexcontracts.sections.limitations',
      itemIds: [
        'dexcontracts.limitations.mintingLimit',
        'dexcontracts.limitations.imageSize',
      ],
    },
    {
      id: 'future-updates',
      titleId: 'dexcontracts.sections.futureUpdates',
      itemIds: [
        'dexcontracts.futureUpdates.moreNetworks',
        'dexcontracts.futureUpdates.increaseMinting',
        'dexcontracts.futureUpdates.communityRequests',
      ],
    },
  ],
};

export const DEXAPPBUILDER_CONFIG: ProductPageConfig = {
  slug: 'dexappbuilder',
  featureCount: 6,
  stepCount: 3,
  faqCount: 5,
  showNetworks: true,
  ctaUrl: 'https://dexappbuilder.dexkit.com',
  ctaMessageId: 'dexappbuilder.createDApp',
  docsUrl: 'https://docs.dexkit.com/defi-products/dexappbuilder/overview',
  tutorials: [
    { titleId: 'dexappbuilder.tutorials.firstDApp', url: 'https://docs.dexkit.com/defi-products/dexappbuilder/creating-my-first-app' },
    { titleId: 'dexappbuilder.tutorials.managingTool', url: 'https://docs.dexkit.com/defi-products/dexappbuilder/managing-this-tool' },
    { titleId: 'dexappbuilder.tutorials.customSections', url: 'https://docs.dexkit.com/defi-products/dexappbuilder/building-custom-sections' },
    { titleId: 'dexappbuilder.tutorials.sellingDesigns', url: 'https://docs.dexkit.com/defi-products/dexappbuilder/selling-my-designs' },
    { titleId: 'dexappbuilder.tutorials.youtubePlaylist', url: 'https://youtube.com/playlist?list=PLue98kEkVwitaUh2Xc5DF6Y_PoEUEkki8' },
  ],
};
