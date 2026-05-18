---
title: 'Deploy de Token Allowance Drop no DexAppBuilder: guia de pré-venda e claim ERC-20'
date: '18 de maio de 2026'
excerpt: >-
  Passo a passo para fazer deploy do DropAllowanceERC20 na DexKit, aprovar seus
  tokens ERC-20, configurar condições de claim e publicar uma página de pré-venda
  ou claim com a sua marca no DexAppBuilder—sem Solidity.
category: Blog
slug: deploy-token-allowance-drop-with-dexappbuilder
imageUrl: /blog-images/deploy-token-allowance-drop-dexappbuilder.png
---

**Resposta rápida:** Um **token allowance drop** permite que as pessoas façam claim de um ERC-20 que você já possui. A venda passa pelo contrato `DropAllowanceERC20` da DexKit; a carteira **token owner** aprova o contrato e os usuários fazem claim numa página que você monta no [DexAppBuilder](https://dexappbuilder.dexkit.com/). Faça deploy no [DexContracts](https://dexappbuilder.dexkit.com/forms/contracts/create), defina as regras de claim, adicione uma seção **DexGenerator** ao app e publique.

Você já tem o token. Talvez esteja parado na tesouraria depois do lançamento, ou você está organizando uma pré-venda antes da listagem. O que falta é uma página de claim com regras de verdade—fases de preço, limite por carteira, allowlist—e não um script improvisado com três planilhas.

É para isso que serve o **Token Allowance Drop**. Este guia cobre o deploy na DexKit e a integração num app [DexAppBuilder](https://dexappbuilder.dexkit.com/) para a comunidade ter um único link de claim.

## O que é um token allowance drop?

Um **token allowance drop** (nome do contrato: `DropAllowanceERC20`) é um smart contract que vende ou distribui tokens **ERC-20 que já existem**, saindo de uma carteira que você controla.

Num [token drop](https://docs.dexkit.com/defi-products/dexgenerator/thirdweb-contracts/token-drop) comum, o contrato costuma **cunhar** tokens no claim. Aqui nada novo é criado na hora do claim. O contrato puxa tokens do endereço **token owner** com o fluxo padrão ERC-20 `approve` + `transferFrom`—o mesmo esquema de allowance que você usa para deixar uma DEX gastar seus tokens.

**Na prática você precisa de:**

- Um ERC-20 já ativo na rede (faça deploy pelo DexContracts → **Token** se ainda não tiver).
- Uma carteira **token owner** com o supply que você vai oferecer.
- Uma **aprovação** nessa carteira para o contrato do drop mover os tokens quando o claim acontecer.

A DexKit oferece isso como **Token Allowance Drop** dentro do DexContracts. Referência completa: [documentação DropAllowanceERC20](https://docs.dexkit.com/defi-products/dexcontracts/dexkit-contracts/dropallowanceerc20).

## Token allowance drop vs token drop: qual escolher?

| | Token Drop (`DropERC20`) | Token Allowance Drop (`DropAllowanceERC20`) |
|---|---|---|
| De onde vêm os tokens | Cunhados pelo drop no claim | Carteira do token owner |
| Você precisa antes | Só o contrato do drop | ERC-20 + token owner com saldo |
| Antes de alguém fazer claim | Definir supply / lazy mint no drop | Token owner deve **aprovar** o drop |
| Combina com | Lançamento de token novo | Pré-venda, recompensas, venda de tokens da tesouraria |

Se o token já existe e o supply está na multisig ou na carteira do deploy, use **Token Allowance Drop**. Se você vai cunhar no claim partindo do zero, use **Token Drop**.

## Para quem é essa configuração?

Token allowance drops aparecem muito quando o time quer:

- Uma **página de pré-venda** para um ERC-20 já deployado  
- **Recompensas à comunidade** pagas da tesouraria sem centenas de transferências manuais  
- **Claims em fases** (allowlist → público) com limites on-chain  
- Uma **URL de claim com a sua marca** no domínio DexAppBuilder  

Não precisa escrever Solidity. Precisa de gas, de um token owner definido e de cinco minutos numa testnet antes de ir para a mainnet.

## Antes do deploy: checklist

- Conta no [DexAppBuilder](https://dexappbuilder.dexkit.com/) e carteira conectada  
- **Endereço do contrato ERC-20** na rede que você vai usar  
- Carteira **token owner** com tokens suficientes para a venda  
- Moeda nativa para deploy + transações de approve (ETH, MATIC, etc.)  
- Rede habilitada no app em **Settings → Networks** (Polygon, Base, Arbitrum, BNB Chain, Ethereum, Optimism, Avalanche e outras suportadas pelo DexContracts)

## Como fazer deploy do DropAllowanceERC20 (Token Allowance Drop)

### Abrir o DexContracts

Entre em [dexappbuilder.dexkit.com](https://dexappbuilder.dexkit.com/), abra o admin do seu app (ou clique em **Create App**) e vá em **DexContracts → Deploy contract**. Atalho: [dexappbuilder.dexkit.com/forms/contracts/create](https://dexappbuilder.dexkit.com/forms/contracts/create).

### Escolher Token Allowance Drop

No catálogo, procure **DropAllowanceERC20**—no interface aparece como **Token Allowance Drop**. Abra para ver o formulário de deploy.

### Preencher o formulário (o que cada campo significa)

**Name, symbol, description, image** — O que exploradores e a página de claim mostram. Vale acertar de primeira; depois é chato mudar.

**Token address** — O ERC-20 que você distribui. Cole o endereço do contrato do seu lançamento. Rede errada = claim quebrado.

**Token owner** — A carteira que realmente tem os tokens. Esse endereço precisa enviar o `approve` depois. Muitos times usam tesouraria ou a mesma carteira que fez deploy do token; não precisa ser a carteira conectada agora, mas só esse endereço pode dar allowance.

**Sale recipient** — Para onde vão os pagamentos de claims pagos (ETH ou a moeda que você cobrar). Em geral a carteira do projeto.

O admin costuma ser a carteira conectada. As taxas dos contratos DexKit já vêm no formulário—só mexe em platform fee se souber que precisa.

### Confirmar o deploy

Escolha a rede, confira o gas e assine na carteira. Depois da confirmação, ache o contrato em **DexContracts → My contracts** e copie o **endereço** e a **chain**. Você vai colar os dois nas configurações de layout do DexAppBuilder.

## Aprovar tokens e configurar claim conditions

Abra o contrato em **My contracts**. Você verá **Token**, **Claim Conditions**, **Metadata** e **Admin**.

### Dar allowance ao drop (não pule)

Claims falham em silêncio—or revertem—se essa etapa faltar.

1. Abra a aba **Token**.  
2. Conecte a carteira que bate com o **token owner** do deploy.  
3. Clique em **Approve** e informe um valor **≥ total de tokens que você pretende mover** em todas as fases.  
4. Assine a transação.

A interface mostra o allowance atual depois de configurado. Se pedir para trocar de carteira, você está na conta errada; conecte o token owner.

### Configurar claim conditions

Em **Claim Conditions** ficam as regras da venda: fase pública, allowlist, claim grátis, preço por token, horário de início/fim, máximo por carteira, snapshots.

Rode um claim completo na Sepolia (ou na sua testnet) antes da mainnet. Já vimos time com copy perfeita na UI e data de fim de fase errada—a testnet pega isso barato.

As abas Metadata e Admin servem para atualizar contract URI e papéis, se precisar depois.

## Montar um app DexAppBuilder em volta do token drop

Só o deploy não dá um link de pré-venda que a comunidade confia. O app dá.

### Criar a base do app

No [DexAppBuilder](https://dexappbuilder.dexkit.com/), **Create App** (ou abra um projeto existente). Nome, e-mail, carteira. Em **Settings**, logo, domínio, tema e ative a rede onde você fez deploy do drop.

Primeira vez no builder? O nosso [guia de app on-chain](https://dexkit.com/pt/blog/criacao-de-aplicativo-on-chain-facilitada-com-dexappbuilder) detalha Settings e Layout.

### Adicionar a página de claim (seção DexGenerator)

1. **Layout → Pages**  
2. Nova página—Claim, Presale, o nome que combinar com a marca  
3. Adicionar seção → **DexGenerator** (é o gancho do DexContracts)  
4. Escolha o deploy **DropAllowanceERC20**; filtre por rede se tiver vários  

O DexAppBuilder mapeia para uma seção **token-drop**—a mesma UI de token drop normal, mas lendo o saldo do token owner via allowance.

Ajuste textos, cores e botões nas configurações da seção. Use **Preview** com carteira na rede certa antes de divulgar o link.

### Publicar

Salve o layout, publique no subdomínio DexKit ou domínio próprio e faça um claim de verdade: conecte a carteira, claim do valor mínimo, confira se os tokens chegaram na carteira do comprador.

Compartilhe a URL. Pronto.

## Checklist completo de lançamento (copiar/colar)

- ERC-20 ativo na rede alvo  
- `DropAllowanceERC20` deployado com token e token owner corretos  
- Token owner com allowance suficiente  
- Claim conditions testadas na testnet e configuradas na mainnet  
- App DexAppBuilder no ar com DexGenerator → token-drop apontando para o contrato  
- Um claim ponta a ponta validado na URL de produção  

## Perguntas frequentes

### O que é DropAllowanceERC20?

`DropAllowanceERC20` é o smart contract da DexKit para token allowance drops. Distribui um ERC-20 existente a partir de um token owner designado, usando approvals ERC-20 em vez de cunhar no claim.

### Qual a diferença entre token allowance drop e token drop normal?

Um **Token Drop** (`DropERC20`) em geral cunha tokens quando o usuário faz claim. O **Token Allowance Drop** transfere tokens que o owner já tem, depois que o owner aprova o contrato do drop como spender.

### Preciso aprovar tokens antes dos usuários fazerem claim?

Sim. A carteira token owner deve dar `approve` ao contrato do drop por pelo menos o valor total da venda. Sem approve, os claims revertem.

### Dá para rodar uma pré-venda no DexAppBuilder sem código?

Dá. Faça deploy do **Token Allowance Drop** no DexContracts, configure as claim conditions, adicione uma seção **DexGenerator** token-drop no DexAppBuilder e publique o app.

### Quais blockchains suportam Token Allowance Drop?

O DexContracts suporta as redes disponíveis no DexAppBuilder—em geral Ethereum, Polygon, BNB Chain, Base, Arbitrum, Optimism e Avalanche. Escolha a rede na tela de deploy e habilite a mesma chain em **Settings → Networks** do app.

### Por que minha transação de claim falhou?

Na maioria das vezes: allowance insuficiente, saldo baixo no token owner, rede errada na carteira ou fase de claim inativa (janela de tempo, allowlist ou limite por carteira). Confira primeiro o allowance na aba **Token**—é o erro mais comum.

### Token owner e admin podem ser carteiras diferentes?

Podem. O admin gerencia o drop; só o **token owner** aprova tokens. Muitos times usam multisig como token owner e hot wallet como admin.

## Mais da DexKit

- [DropAllowanceERC20 — documentação técnica](https://docs.dexkit.com/defi-products/dexcontracts/dexkit-contracts/dropallowanceerc20)  
- [Deploy de contratos (DexContracts)](https://dexappbuilder.dexkit.com/forms/contracts/create)  
- [Criar apps on-chain com DexAppBuilder](https://dexkit.com/pt/blog/criacao-de-aplicativo-on-chain-facilitada-com-dexappbuilder)  
- [Embutir token drops em qualquer site (Web3 Widgets)](https://dexkit.com/pt/blog/widgets-web3-dexkit)  
- [DexContracts e crypto staking](https://dexkit.com/pt/blog/cripto-staking-desmistificado-explorando-beneficios-e-riscos)  

## Começar agora

[Deploy Token Allowance Drop](https://dexappbuilder.dexkit.com/forms/contracts/create) · [Abrir DexAppBuilder](https://dexappbuilder.dexkit.com/)

Travou em algum passo? [Fale conosco](https://www.dexkit.com/contact-us/) ou pergunte no [Discord](https://discord.com/invite/GJCRu4CYFH)—alguém do time costuma responder em até um dia.
