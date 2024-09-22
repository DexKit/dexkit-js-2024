'use client'

import { useIntl } from 'react-intl';

const timelineItems = [
  {
    date: 'Q2-2024',
    title: 'Q2 Roadmap',
    titleKey: 'roadmap.Q2_2024.title',
    items: [
      { text: 'DexAppBuilder diverse integrations:', textKey: 'roadmap.Q2_2024.item1', status: 'pending' },
      { text: 'DApp quickstart templates', textKey: 'roadmap.Q2_2024.item2', status: 'completed' },
      { text: 'UI/UX improvements', textKey: 'roadmap.Q2_2024.item3', status: 'completed' },
    ],
  },
  {
    date: 'Q1-2024',
    title: 'Q1 Roadmap',
    titleKey: 'roadmap.Q1_2024.title',
    items: [
      { text: 'DexAppBuilder diverse integrations:', textKey: 'roadmap.Q1_2024.item1', status: 'completed' },
      { text: 'Gamification Leaderboards', textKey: 'roadmap.Q1_2024.item2', status: 'completed' },
      { text: 'Darkblock integration', textKey: 'roadmap.Q1_2024.item3', status: 'completed' },
      { text: 'DApp event tracking', textKey: 'roadmap.Q1_2024.item4', status: 'completed' },
      { text: 'Gated content feature', textKey: 'roadmap.Q1_2024.item5', status: 'completed' },
      { text: 'Blast and Pulsechain integrations', textKey: 'roadmap.Q1_2024.item6', status: 'completed' },
    ],
  },
  {
    date: 'Q3-2023',
    title: 'Q3 Roadmap',
    titleKey: 'roadmap.Q3_2023.title',
    items: [
      { text: 'DexExchangePro release', textKey: 'roadmap.Q3_2023.item1', status: 'completed' },
      { text: 'WebSummit Lisbon assistance', textKey: 'roadmap.Q3_2023.item2', status: 'completed' },
      { text: 'Thirdweb Smart Contract implementations', textKey: 'roadmap.Q3_2023.item3', status: 'completed' },
    ],
  },
  {
    date: 'Q2-2023',
    title: 'Q2 Roadmap',
    titleKey: 'roadmap.Q2_2023.title',
    items: [
      { text: 'Open-sourcing DexAppBuilder monorepo for component design', textKey: 'roadmap.Q2_2023.item1', status: 'completed' },
      { text: 'Deploy on Base', textKey: 'roadmap.Q2_2023.item2', status: 'completed' },
    ],
  },
  {
    date: 'Q1-2023',
    title: 'Q1 Roadmap',
    titleKey: 'roadmap.Q1_2023.title',
    items: [
      { text: 'DexAppBuilder development (low-code/no-code tool)', textKey: 'roadmap.Q1_2023.item1', status: 'completed' },
    ],
  },
  {
    date: 'Q3-2022',
    title: 'Q3 Roadmap',
    titleKey: 'roadmap.Q3_2022.title',
    items: [
      { text: 'White label NFT marketplace improvements', textKey: 'roadmap.Q3_2022.item1', status: 'completed' },
      { text: 'New SuperApp release', textKey: 'roadmap.Q3_2022.item2', status: 'completed' },
      { text: 'Predictions HUB development', textKey: 'roadmap.Q3_2022.item3', status: 'pending' },
    ],
  },
  {
    date: 'Q2-2022',
    title: 'Q2 Roadmap',
    titleKey: 'roadmap.Q2_2022.title',
    items: [
      { text: 'Uniswap v3 staking', textKey: 'roadmap.Q2_2022.item1', status: 'completed' },
      { text: 'Multichain integration', textKey: 'roadmap.Q2_2022.item2', status: 'completed' },
      { text: 'White label KitDex exchange', textKey: 'roadmap.Q2_2022.item3', status: 'completed' },
      { text: 'White label NFT marketplace', textKey: 'roadmap.Q2_2022.item4', status: 'completed' },
    ],
  },
  {
    date: 'Q1-2022',
    title: 'Q1 Roadmap',
    titleKey: 'roadmap.Q1_2022.title',
    items: [
      { text: 'Farming & White label solutions', textKey: 'roadmap.Q1_2022.item1', status: 'completed' },
      { text: 'Coin League major app update', textKey: 'roadmap.Q1_2022.item2', status: 'completed' },
    ],
  },
  {
    date: 'Q3-2021',
    title: 'Q3 Roadmap',
    titleKey: 'roadmap.Q3_2021.title',
    items: [
      { text: 'NFT Marketplace App release', textKey: 'roadmap.Q3_2021.item1', status: 'completed' },
      { text: 'DeFi Dashboard Beta release', textKey: 'roadmap.Q3_2021.item2', status: 'completed' },
      { text: 'WordPress Plugin and Wizard for deployable apps', textKey: 'roadmap.Q3_2021.item3', status: 'completed' },
      { text: 'Blockchain Academy', textKey: 'roadmap.Q3_2021.item4', status: 'completed' },
      { text: 'Dashboard Gamification with Kittygotchi NFT pets', textKey: 'roadmap.Q3_2021.item5', status: 'completed' },
      { text: 'NFT Wizard', textKey: 'roadmap.Q3_2021.item6', status: 'completed' },
      { text: 'Coin League game launch', textKey: 'roadmap.Q3_2021.item7', status: 'completed' },
    ],
  },
  {
    date: 'Q2-2021',
    title: 'Q2 Roadmap',
    titleKey: 'roadmap.Q2_2021.title',
    items: [
      { text: 'Full Launch of KitDex app', textKey: 'roadmap.Q2_2021.item1', status: 'completed' },
      { text: 'BSC integration for the Swap Aggregator', textKey: 'roadmap.Q2_2021.item2', status: 'completed' },
      { text: 'KIT token bridge to BSC', textKey: 'roadmap.Q2_2021.item3', status: 'completed' },
    ],
  },
  {
    date: 'Q1-2021',
    title: 'Q1 Roadmap',
    titleKey: 'roadmap.Q1_2021.title',
    items: [
      { text: 'KitDex app Beta release', textKey: 'roadmap.Q1_2021.item1', status: 'completed' },
      { text: 'NFT Marketplace Demo release', textKey: 'roadmap.Q1_2021.item2', status: 'completed' },
      { text: 'DeFi Dashboard Demo release', textKey: 'roadmap.Q1_2021.item3', status: 'completed' },
    ],
  },
  {
    date: 'Q3-2020',
    title: 'Q3 Roadmap',
    titleKey: 'roadmap.Q3_2020.title',
    items: [
      { text: 'KIT token sale and launch', textKey: 'roadmap.Q3_2020.item1', status: 'completed' },
      { text: 'DSWAP Aggregator deployment', textKey: 'roadmap.Q3_2020.item2', status: 'completed' },
      { text: 'DexKit Website and Social Media', textKey: 'roadmap.Q3_2020.item3', status: 'completed' },
    ],
  },
];

export default function RoadmapPage() {
  const intl = useIntl();

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-center mb-8 sm:mb-16">
          {intl.formatMessage({ id: 'roadmap.title', defaultMessage: 'Roadmap' })}
        </h1>
        
        <div className="relative">
          {/* Línea vertical */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-1 bg-orange-500 transform sm:-translate-x-1/2"></div>
          
          {timelineItems.map((item, index) => (
            <div key={index} className="mb-8 sm:mb-16">
              {/* Contenido */}
              <div className={`flex flex-col sm:flex-row items-start ${index % 2 === 0 ? 'sm:flex-row-reverse' : ''}`}>
                <div className="w-full sm:w-5/12 px-4 mb-4 sm:mb-0">
                  <div className={`bg-white bg-opacity-10 rounded-lg p-4 sm:p-6 ${index % 2 === 0 ? 'sm:text-right' : 'text-left'}`}>
                    <div className="bg-orange-500 text-white font-bold py-1 px-3 sm:py-2 sm:px-4 rounded-full inline-block mb-2 sm:mb-4 text-sm sm:text-base">
                      {item.date}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">
                      {intl.formatMessage({ id: item.titleKey || `roadmap.${item.date}.title`, defaultMessage: item.title })}
                    </h3>
                    <ul className={`list-none ${index % 2 === 0 ? 'sm:pl-0' : 'pl-0 sm:pl-4'}`}>
                      {item.items.map((subItem, subIndex) => (
                        <li key={subIndex} className="mb-2 flex items-center text-sm sm:text-base">
                          {subItem.status === 'completed' && <span className="text-green-500 mr-2">✅</span>}
                          {subItem.status === 'pending' && <span className="text-yellow-500 mr-2">⏳</span>}
                          {intl.formatMessage({ 
                            id: subItem.textKey || `roadmap.${item.date}.item${subIndex + 1}`,
                            defaultMessage: subItem.text
                          })}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="hidden sm:flex sm:w-2/12 justify-center">
                  <div className="w-4 h-4 bg-orange-500 rounded-full mt-2"></div>
                </div>
                <div className="hidden sm:block sm:w-5/12 px-4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}