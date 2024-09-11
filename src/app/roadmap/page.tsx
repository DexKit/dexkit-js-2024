const timelineItems = [
  {
    date: 'Q2-2024',
    title: 'Q2 Roadmap',
    items: [
      { text: 'DexAppBuilder diverse integrations:', status: 'pending' },
      { text: 'DApp quickstart templates', status: 'completed' },
      { text: 'UI/UX improvements', status: 'completed' },
    ],
  },
  {
    date: 'Q1-2024',
    title: 'Q1 Roadmap',
    items: [
      { text: 'DexAppBuilder diverse integrations:', status: 'completed' },
      { text: 'Gamification Leaderboards', status: 'completed' },
      { text: 'Darkblock integration', status: 'completed' },
      { text: 'DApp event tracking', status: 'completed' },
      { text: 'Gated content feature', status: 'completed' },
      { text: 'Blast and Pulsechain integrations', status: 'completed' },
    ],
  },
  {
    date: 'Q3-2023',
    title: 'Q3 Roadmap',
    items: [
      { text: 'DexExchangePro release', status: 'completed' },
      { text: 'WebSummit Lisbon assistance', status: 'completed' },
      { text: 'Thirdweb Smart Contract implementations', status: 'completed' },
    ],
  },
  {
    date: 'Q2-2023',
    title: 'Q2 Roadmap',
    items: [
      { text: 'Open-sourcing DexAppBuilder monorepo for component design', status: 'completed' },
      { text: 'Deploy on Base', status: 'completed' },
    ],
  },
  {
    date: 'Q1-2023',
    title: 'Q1 Roadmap',
    items: [
      { text: 'DexAppBuilder development (low-code/no-code tool)', status: 'completed' },
    ],
  },
  {
    date: 'Q3-2022',
    title: 'Q3 Roadmap',
    items: [
      { text: 'White label NFT marketplace improvements', status: 'completed' },
      { text: 'New SuperApp release', status: 'completed' },
      { text: 'Predictions HUB development', status: 'pending' },
    ],
  },
  {
    date: 'Q2-2022',
    title: 'Q2 Roadmap',
    items: [
      { text: 'Uniswap v3 staking', status: 'completed' },
      { text: 'Multichain integration', status: 'completed' },
      { text: 'White label KitDex exchange', status: 'completed' },
      { text: 'White label NFT marketplace', status: 'completed' },
    ],
  },
  {
    date: 'Q1-2022',
    title: 'Q1 Roadmap',
    items: [
      { text: 'Farming & White label solutions', status: 'completed' },
      { text: 'Coin League major app update', status: 'completed' },
    ],
  },
  {
    date: 'Q3-2021',
    title: 'Q3 Roadmap',
    items: [
      { text: 'NFT Marketplace App release', status: 'completed' },
      { text: 'DeFi Dashboard Beta release', status: 'completed' },
      { text: 'WordPress Plugin and Wizard for deployable apps', status: 'completed' },
      { text: 'Blockchain Academy', status: 'completed' },
      { text: 'Dashboard Gamification with Kittygotchi NFT pets', status: 'completed' },
      { text: 'NFT Wizard', status: 'completed' },
      { text: 'Coin League game launch', status: 'completed' },
    ],
  },
  {
    date: 'Q2-2021',
    title: 'Q2 Roadmap',
    items: [
      { text: 'Full Launch of KitDex app', status: 'completed' },
      { text: 'BSC integration for the Swap Aggregator', status: 'completed' },
      { text: 'KIT token bridge to BSC', status: 'completed' },
    ],
  },
  {
    date: 'Q1-2021',
    title: 'Q1 Roadmap',
    items: [
      { text: 'KitDex app Beta release', status: 'completed' },
      { text: 'NFT Marketplace Demo release', status: 'completed' },
      { text: 'DeFi Dashboard Demo release', status: 'completed' },
    ],
  },
  {
    date: 'Q3-2020',
    title: 'Q3 Roadmap',
    items: [
      { text: 'KIT token sale and launch', status: 'completed' },
      { text: 'DSWAP Aggregator deployment', status: 'completed' },
      { text: 'DexKit Website and Social Media', status: 'completed' },
    ],
  },
];

export default function RoadmapPage() {
  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-center mb-8 sm:mb-16">DexKit&apos;s Roadmap</h1>
        
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
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">{item.title}</h3>
                    <ul className={`list-none ${index % 2 === 0 ? 'sm:pl-0' : 'pl-0 sm:pl-4'}`}>
                      {item.items.map((subItem, subIndex) => (
                        <li key={subIndex} className="mb-2 flex items-center text-sm sm:text-base">
                          {subItem.status === 'completed' && <span className="text-green-500 mr-2">✅</span>}
                          {subItem.status === 'pending' && <span className="text-yellow-500 mr-2">⏳</span>}
                          {subItem.text}
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