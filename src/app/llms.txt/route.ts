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

- [DexAppBuilder](https://dexappbuilder.dexkit.com/): Revolutionary no-code/low-code crypto app builder that empowers users to create, customize, and launch branded crypto apps without complex coding
- [DexSwap](https://dexkit.com/dexswap): Advanced DEX aggregator with smart routing system, outperforming popular platforms by showing best real-time prices from over thirty protocols
- [DexNFTMarket](https://dexkit.com/dexnftmarket): Customizable NFT marketplace solution for creating branded NFT trading platforms
- [DexNFTStore](https://dexkit.com/dexnftstore): Complete NFT store solution with minting, trading, and management capabilities
- [DexWallet](https://dexkit.com/dexwallet): Secure crypto wallet solution with advanced security features and multi-network support
- [DexExchangePro](https://dexkit.com/dexexchangepro): Professional-grade cryptocurrency exchange platform
- [DexContracts](https://dexkit.com/dexcontracts): Smart contract development and deployment tools

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

- [DexAppBuilder](https://dexappbuilder.dexkit.com/): Constructor revolucionario de aplicaciones crypto no-code/low-code que permite a los usuarios crear, personalizar y lanzar aplicaciones crypto con marca propia sin codificación compleja
- [DexSwap](https://dexkit.com/es/dexswap): Agregador DEX avanzado con sistema de enrutamiento inteligente, superando a plataformas populares mostrando los mejores precios en tiempo real de más de treinta protocolos
- [DexNFTMarket](https://dexkit.com/es/dexnftmarket): Solución de marketplace NFT personalizable para crear plataformas de trading NFT con marca propia
- [DexNFTStore](https://dexkit.com/es/dexnftstore): Solución completa de tienda NFT con capacidades de acuñación, trading y gestión
- [DexWallet](https://dexkit.com/es/dexwallet): Solución de wallet crypto segura con características de seguridad avanzadas y soporte multi-red
- [DexExchangePro](https://dexkit.com/es/dexexchangepro): Plataforma de intercambio de criptomonedas de nivel profesional
- [DexContracts](https://dexkit.com/es/dexcontracts): Herramientas de desarrollo y despliegue de contratos inteligentes

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

- [DexAppBuilder](https://dexappbuilder.dexkit.com/): Construtor revolucionário de aplicativos crypto no-code/low-code que capacita usuários a criar, personalizar e lançar aplicativos crypto com marca própria sem codificação complexa
- [DexSwap](https://dexkit.com/pt/dexswap): Agregador DEX avançado com sistema de roteamento inteligente, superando plataformas populares mostrando os melhores preços em tempo real de mais de trinta protocolos
- [DexNFTMarket](https://dexkit.com/pt/dexnftmarket): Solução de marketplace NFT personalizável para criar plataformas de trading NFT com marca própria
- [DexNFTStore](https://dexkit.com/pt/dexnftstore): Solução completa de loja NFT com capacidades de cunhagem, trading e gestão
- [DexWallet](https://dexkit.com/pt/dexwallet): Solução de wallet crypto segura com características de segurança avançadas e suporte multi-rede
- [DexExchangePro](https://dexkit.com/pt/dexexchangepro): Plataforma de intercâmbio de criptomoedas de nível profissional
- [DexContracts](https://dexkit.com/pt/dexcontracts): Ferramentas de desenvolvimento e deploy de contratos inteligentes

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
