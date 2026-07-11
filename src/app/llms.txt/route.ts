import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const langParam = url.searchParams.get('lang');
  
  const acceptLanguage = request.headers.get('accept-language') || 'en';
  
  let language = 'en';
  
  if (langParam && ['en', 'es', 'pt'].includes(langParam)) {
    language = langParam;
  } else {
    const useBrowserLang = url.searchParams.get('use-browser-lang') === 'true';
    
    if (useBrowserLang) {
      const languages = acceptLanguage.split(',').map(lang => {
        const [code, qValue] = lang.trim().split(';q=');
        return {
          code: code.split('-')[0],
          quality: qValue ? parseFloat(qValue) : 1.0
        };
      }).sort((a, b) => b.quality - a.quality);
      
      for (const lang of languages) {
        if (lang.code === 'es') {
          language = 'es';
          break;
        } else if (lang.code === 'pt') {
          language = 'pt';
          break;
        }
      }
    }
  }

  const content = getContentByLanguage(language);

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

function getContentByLanguage(language: string): string {
  const contents = {
    en: `# DexKit

> DexKit is a pioneering blockchain software startup dedicated to democratizing Decentralized Finance (DeFi) for all. Our comprehensive suite of no-code/low-code tools and solutions empowers users to effortlessly craft their branded crypto apps in the dynamic Web3 environment, retaining absolute ownership and control over their innovations.

DexKit stands as a comprehensive platform that bridges the gap between complex blockchain technology and user-friendly applications. We envision a financial landscape transformed by DeFi's potential, building the foundation of this revolutionary technology.

## Core Products

- [DexAppBuilder](https://dexkit.com/dexappbuilder): No-code and low-code platform to create, customize, and launch branded Web3 DApps—swap, wallet, exchange, NFT store, marketplace, and smart contracts on major EVM networks
- [DexSwap](https://dexkit.com/dexswap): White-label DEX aggregator for branded in-app token swaps—0x liquidity routing, optimized gas, multi-chain support, and Quick Builder deployment via DexAppBuilder
- [DexNFTMarket](https://dexkit.com/dexnftmarket): White-label NFT marketplace for multi-seller listing and trading—branded platform, analytics, and multi-chain support via DexAppBuilder
- [DexNFTStore](https://dexkit.com/dexnftstore): No-code NFT storefront—upload collections, set pricing, manage orders, and sell on-chain with branded checkout via DexAppBuilder Quick Builder
- [DexWallet](https://dexkit.com/dexwallet): Embedded self-custodial Web3 wallet for DApps—manage tokens and NFTs across EVM chains, fiat on-ramp, and no-code launch via DexAppBuilder Quick Builder
- [DexExchangePro](https://dexkit.com/dexexchangepro): White-label decentralized exchange with charts, limit orders, non-custodial trading, and multi-chain support—deploy via DexAppBuilder
- [DexContracts](https://dexkit.com/dexcontracts): No-code smart contract toolkit—deploy Thirdweb/DexKit contracts, generate UI from ABI, and launch on-chain apps via DexAppBuilder
- [Yield by DexKit](https://yield.dexkit.com/): Free read-only Ethereum wallet yield calculator — estimates daily, monthly, and yearly passive income from staking, lending, and DeFi across Lido, Aave, Morpho, and more

## Key Features

- **No-Code/Low-Code Platform**: Build complex DeFi applications without extensive programming knowledge
- **White-Label Solutions**: Create fully branded crypto applications with custom logos and themes
- **Multi-Chain Support**: Deploy on 8+ major blockchain networks including Ethereum, Polygon, BSC, and more
- **Smart Contract Integration**: Seamlessly integrate custom smart contracts into applications
- **Revenue Generation**: Earn passive income through transaction fees and platform usage
- **Modular Architecture**: Mix and match different DeFi components as needed

## Supported Networks

- Ethereum
- BNB Smart Chain
- Polygon
- Avalanche
- Fantom
- Optimism
- Arbitrum
- Base

## Documentation

- [Documentation](https://docs.dexkit.com/): Comprehensive technical documentation
- [Quick Start Guide](https://docs.dexkit.com/defi-products/): Getting started with DexKit tools

## Community & Support

- [Blog](https://dexkit.com/blog): Latest updates, tutorials, and industry insights
- [GitHub](https://github.com/dexkit): Open source components and contributions
- [Discord](https://discord.com/invite/dexkit-official-943552525217435649): Community support and discussions
- [YouTube](https://www.youtube.com/c/dexkit): DexKit's YouTube channel

## Optional

- [Token Economics](https://dexkit.com/our-token/tokenomics): $KIT token information and utility
- [About](https://dexkit.com/about): About DexKit: Mission, Vision, and Values, Our Team, Brand Material`,

    es: `# DexKit

> DexKit es una startup pionera de software blockchain dedicada a democratizar las Finanzas Descentralizadas (DeFi) para todos. Nuestra suite completa de herramientas y soluciones no-code/low-code permite a los usuarios crear fácilmente sus propias aplicaciones crypto con marca propia en el dinámico entorno Web3, manteniendo la propiedad absoluta y el control sobre sus innovaciones.

DexKit se posiciona como una plataforma integral que cierra la brecha entre la compleja tecnología blockchain y las aplicaciones fáciles de usar. Visualizamos un panorama financiero transformado por el potencial de DeFi, construyendo los cimientos de esta tecnología revolucionaria.

## Productos Principales

- [DexAppBuilder](https://dexkit.com/es/dexappbuilder): Plataforma no-code y low-code para crear, personalizar y lanzar DApps Web3 con marca propia—swap, wallet, exchange, tienda NFT, marketplace y contratos en las principales redes EVM
- [DexSwap](https://dexkit.com/es/dexswap): Agregador DEX white-label para swaps con marca dentro de tu DApp—enrutamiento 0x, gas optimizado, soporte multired y despliegue con Quick Builder de DexAppBuilder
- [DexNFTMarket](https://dexkit.com/es/dexnftmarket): Marketplace NFT white-label para listado y trading multi-vendedor—plataforma con marca, analíticas y soporte multired vía DexAppBuilder
- [DexNFTStore](https://dexkit.com/es/dexnftstore): Tienda NFT sin código—sube colecciones, define precios, gestiona pedidos y vende on-chain con checkout con marca vía DexAppBuilder Quick Builder
- [DexWallet](https://dexkit.com/es/dexwallet): Wallet Web3 integrada de autocustodia para DApps—gestiona tokens y NFTs en redes EVM, rampa fiat y lanzamiento sin código con DexAppBuilder Quick Builder
- [DexExchangePro](https://dexkit.com/es/dexexchangepro): Exchange descentralizado white-label con gráficos, órdenes límite, trading no custodial y soporte multired—despliegue con DexAppBuilder
- [DexContracts](https://dexkit.com/es/dexcontracts): Toolkit de contratos inteligentes sin código—despliega contratos Thirdweb/DexKit, genera UI desde ABI y lanza apps on-chain con DexAppBuilder
- [Yield by DexKit](https://yield.dexkit.com/): Calculadora gratuita de rendimiento de carteras Ethereum de solo lectura — estima ingresos pasivos diarios, mensuales y anuales de staking, préstamos y DeFi en Lido, Aave, Morpho y más

## Características Clave

- **Plataforma No-Code/Low-Code**: Construye aplicaciones DeFi complejas sin conocimientos extensos de programación
- **Soluciones White-Label**: Crea aplicaciones crypto completamente personalizadas con logos y temas propios
- **Soporte Multi-Cadena**: Despliega en 8+ redes blockchain principales incluyendo Ethereum, Polygon, BSC y más
- **Integración de Contratos Inteligentes**: Integra contratos inteligentes personalizados de forma fluida
- **Generación de Ingresos**: Gana ingresos pasivos a través de comisiones de transacciones y uso de la plataforma
- **Arquitectura Modular**: Combina diferentes componentes DeFi según sea necesario

## Redes Soportadas

- Ethereum
- BNB Smart Chain
- Polygon
- Avalanche
- Fantom
- Optimism
- Arbitrum
- Base

## Documentación

- [Documentación](https://docs.dexkit.com/): Documentación técnica completa
- [Guía de Inicio Rápido](https://docs.dexkit.com/productos-defi-y-soluciones-es/): Comenzando con las herramientas DexKit

## Comunidad y Soporte

- [Blog](https://dexkit.com/es/blog): Últimas actualizaciones, tutoriales e insights de la industria
- [GitHub](https://github.com/dexkit): Componentes open source y contribuciones
- [Discord](https://discord.com/invite/dexkit-official-943552525217435649): Soporte comunitario y discusiones
- [YouTube](https://www.youtube.com/c/dexkit): Canal de YouTube de DexKit


## Opcional

- [Economía del Token](https://dexkit.com/es/our-token/tokenomics): Información y utilidad del token $KIT
- [Sobre DexKit](https://dexkit.com/about): Sobre DexKit: Misión, Visión y Valores, Nuestro Equipo, Material de Marca`,

    pt: `# DexKit

> DexKit é uma startup pioneira de software blockchain dedicada a democratizar as Finanças Descentralizadas (DeFi) para todos. Nossa suite completa de ferramentas e soluções no-code/low-code capacita usuários a criar facilmente seus próprios aplicativos crypto com marca própria no dinâmico ambiente Web3, mantendo propriedade absoluta e controle sobre suas inovações.

DexKit se posiciona como uma plataforma abrangente que preenche a lacuna entre a complexa tecnologia blockchain e aplicações amigáveis ao usuário. Visualizamos um panorama financeiro transformado pelo potencial da DeFi, construindo a base desta tecnologia revolucionária.

## Produtos Principais

- [DexAppBuilder](https://dexkit.com/pt/dexappbuilder): Plataforma no-code e low-code para criar, personalizar e lançar DApps Web3 com marca própria—swap, wallet, exchange, loja NFT, marketplace e contratos nas principais redes EVM
- [DexSwap](https://dexkit.com/pt/dexswap): Agregador DEX white-label para swaps com marca no seu DApp—roteamento 0x, gás otimizado, suporte multichain e deploy via Quick Builder do DexAppBuilder
- [DexNFTMarket](https://dexkit.com/pt/dexnftmarket): Marketplace NFT white-label para listagem e trading multi-vendedor—plataforma com marca, analytics e suporte multichain via DexAppBuilder
- [DexNFTStore](https://dexkit.com/pt/dexnftstore): Loja NFT no-code—envie coleções, defina preços, gerencie pedidos e venda on-chain com checkout com marca via DexAppBuilder Quick Builder
- [DexWallet](https://dexkit.com/pt/dexwallet): Carteira Web3 integrada de autocustódia para DApps—gerencie tokens e NFTs em redes EVM, rampa fiat e lançamento sem código com DexAppBuilder Quick Builder
- [DexExchangePro](https://dexkit.com/pt/dexexchangepro): Exchange descentralizada white-label com gráficos, ordens limitadas, trading não custodial e suporte multichain—deploy via DexAppBuilder
- [DexContracts](https://dexkit.com/pt/dexcontracts): Toolkit de contratos inteligentes no-code—implante contratos Thirdweb/DexKit, gere UI a partir de ABI e lance apps on-chain via DexAppBuilder
- [Yield by DexKit](https://yield.dexkit.com/): Calculadora gratuita de rendimento de carteiras Ethereum somente leitura — estima renda passiva diária, mensal e anual de staking, empréstimos e DeFi em Lido, Aave, Morpho e mais

## Características Principais

- **Plataforma No-Code/Low-Code**: Construa aplicações DeFi complexas sem conhecimento extenso de programação
- **Soluções White-Label**: Crie aplicações crypto completamente personalizadas com logos e temas próprios
- **Suporte Multi-Rede**: Implante em 8+ redes blockchain principais incluindo Ethereum, Polygon, BSC e mais
- **Integração de Contratos Inteligentes**: Integre contratos inteligentes personalizados de forma fluida
- **Geração de Receita**: Ganhe receita passiva através de taxas de transação e uso da plataforma
- **Arquitetura Modular**: Combine diferentes componentes DeFi conforme necessário

## Redes Suportadas

- Ethereum
- BNB Smart Chain
- Polygon
- Avalanche
- Fantom
- Optimism
- Arbitrum
- Base

## Documentação

- [Documentação](https://docs.dexkit.com/): Documentação técnica abrangente
- [Guia de Início Rápido](https://docs.dexkit.com/produtos-e-solucoes-defi-pt/): Começando com as ferramentas DexKit

## Comunidade e Suporte

- [Blog](https://dexkit.com/pt/blog): Últimas atualizações, tutoriais e insights da indústria
- [GitHub](https://github.com/dexkit): Componentes open source e contribuições
- [Discord](https://discord.com/invite/dexkit-official-943552525217435649): Suporte comunitário e discussões

## Opcional

- [Economia do Token](https://dexkit.com/pt/our-token/tokenomics): Informações e utilidade do token $KIT
- [Sobre DexKit](https://dexkit.com/about): Sobre DexKit: Missão, Visão e Valores, Nossa Equipe, Material da Marca`,
  };

  return contents[language as keyof typeof contents] || contents.en;
}
