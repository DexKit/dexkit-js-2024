---
title: Integrando API Gasless ao DexAppBuilder para Gasless Swaps
date: 23 de maio de 2024
excerpt: >-
  Na DexKit, nossa missão é tornar o Web3 acessível. Uma das muitas maneiras de
  fazer isso é simplificando a negociação descentralizada para todos.
category: Blog
slug: integrando-gasless-api-into-dexappbuilder-for-gasless-swaps
imageUrl: /blog-images/Gasless-blog.png
---
Na DexKit, **nossa missão é tornar o Web3 acessível**. Uma das muitas maneiras de fazer isso é simplificando a negociação descentralizada para todos. Hoje, temos o prazer de anunciar a **integração da API Gasless em nossa plataforma DexAppBuilder** para agregadores de swap DEX de marca branca. Este recurso inovador foi projetado para eliminar taxas de gás em trocas de tokens. Beneficia uma ampla gama de usuários em toda a comunidade DexKit. De comerciantes e desenvolvedores a artistas de NFT, entusiastas de criptomoedas e criadores de DApp, esta integração marca um passo significativo na democratização do DeFi. Expande as oportunidades dentro do ecossistema descentralizado.

### O que é a API Gasless?

A [API Gasless](https://0x.org/post/0x-101-intro-to-gasless-api) simplifica a negociação de tokens ERC-20, eliminando a necessidade de manter tokens nativos para taxas de gás. Fornecida por [0x](https://0x.org/), esta API permite que os usuários acessem liquidez, preços e cotações sem esforço. Ao concordar com um orçamento, os usuários assinam uma mensagem EIP-712. Isso permite que a API lide com aprovações e envie transações em seu nome, cobrindo as taxas do gás.

### Principais recursos da API sem gás

Abaixo estão os principais recursos da API Gasless. Eles tornam esta API a escolha certa para transações financeiras descentralizadas (DeFi) econômicas e fáceis de usar em várias redes blockchain.

* **Transações sem gás:** Execute trocas de tokens sem pagar taxas de gás. Utilize uma parte do token de entrada para taxas de transação.
* **Aprovações sem gás:** Utilize mensagens EIP-712 para permissões de token ERC-20 sem gás. Isso elimina despesas iniciais com gás.
* **Proteção de bot MEV:** API Gasless incorpora proteção de bot MEV. Isso reduz as falhas comerciais e evita a interferência dos bots sanduíche.
* **Suporte multi-rede:** Os swaps sem gás são acessíveis nas redes Ethereum, Polygon, Optimism e Arbitrum.

### Como funciona a API Gasless

Com a API Gasless, os usuários experimentam negociações tranquilas e econômicas. Veja como funciona:

* **Cotação e aprovação:** Os usuários primeiro recebem uma cotação para a transação. Se concordarem com os termos, assinam uma mensagem EIP-712 para aprovar a transação.
* **Envio de transação:** A API Gasless então envia a transação em nome do usuário, cobrindo todas as taxas de gás.
* **Confirmação e conclusão:** Os usuários recebem uma confirmação assim que a transação é processada com sucesso, concluindo a negociação sem qualquer preocupação com taxas de gás.

### Como ativar swaps sem gás

A ativação de swaps sem gás é simples e não requer nenhum conhecimento avançado. Basta navegar até a configuração do componente swap. Você pode encontrá-lo em qualquer uma de suas páginas na seção Troca. Esta seção pode ser um componente predefinido ou incorporada em seções personalizadas. Clique no botão Editar (destacado em verde na imagem abaixo) para acessar a configuração do componente swap.

![Seção da página](/blog-images/swappages.png)

Acesse a configuração do componente swap com um simples clique no botão Editar verde destacado.

Uma vez dentro da configuração do componente de troca, marque a caixa **'Gasless swaps'** e salve as alterações em seu DApp (conforme mostrado na imagem abaixo).

![Combo de troca](/blog-images/swapcompo1.png)

Selecione a opção “Swaps sem gás” na configuração do componente de swap para permitir transações sem gás.

### Rumo ao DeFi sem gás com DexAppBuilder

As taxas do gás têm sido uma barreira no espaço DeFi, complicando as transações e desencorajando novos usuários. Ao integrar a API Gasless, o DexAppBuilder não apenas melhora a experiência dos usuários, mas também promove uma adoção mais ampla do DeFi, reduzindo as barreiras de entrada.

Ao usar o DexAppBuilder, todos os construtores de DApp e criptopreneurs poderão utilizar o recurso Gasless API. Eles podem promovê-lo em seu DApp, tornando-o mais atraente para seu público.

**Comece a construir seu DApp sem gás hoje mesmo usando DexAppBuilder**. Experimente o futuro da negociação contínua com o recurso [Swap Quick Builder](https://dexappbuilder.dexkit.com/admin/quick-builder/swap) da nossa plataforma para fácil criação de DApp.

🔗Saiba mais sobre esse recurso em [0x documentos oficiais](https://0x.org/docs/tx-relay-api/guides/understanding-tx-relay-api).
