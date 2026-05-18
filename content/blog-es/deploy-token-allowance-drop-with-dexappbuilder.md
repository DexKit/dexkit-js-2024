---
title: 'Deploy de Token Allowance Drop en DexAppBuilder: guía de preventa y claim ERC-20'
date: '18 de mayo de 2026'
excerpt: >-
  Guía paso a paso para desplegar DropAllowanceERC20 en DexKit, aprobar tus
  tokens ERC-20, configurar condiciones de claim y lanzar una página de preventa
  o claim con tu marca en DexAppBuilder—sin Solidity.
category: Blog
slug: deploy-token-allowance-drop-with-dexappbuilder
imageUrl: /blog-images/deploy-token-allowance-drop-dexappbuilder.png
---

**Respuesta rápida:** Un **token allowance drop** permite que la gente haga claim de un ERC-20 que ya tienes. La venta pasa por el contrato `DropAllowanceERC20` de DexKit; la wallet **token owner** aprueba el contrato y los usuarios reclaman en una página que montas con [DexAppBuilder](https://dexappbuilder.dexkit.com/). Despliega en [DexContracts](https://dexappbuilder.dexkit.com/forms/contracts/create), define las reglas de claim, añade una sección **DexGenerator** a tu app y publica.

Ya tienes el token. Quizá está en la tesorería tras el lanzamiento, o estás preparando una preventa antes del listing. Lo que falta es una página de claim con reglas de verdad—fases de precio, tope por wallet, allowlist—y no un script casero con tres hojas de cálculo.

Para eso sirve **Token Allowance Drop**. Esta guía cubre el deploy en DexKit y cómo enlazarlo a una app de [DexAppBuilder](https://dexappbuilder.dexkit.com/) para que tu comunidad tenga un solo enlace de claim.

## ¿Qué es un token allowance drop?

Un **token allowance drop** (nombre del contrato: `DropAllowanceERC20`) es un smart contract que vende o reparte tokens **ERC-20 que ya existen**, desde una wallet que controlas.

En un [token drop](https://docs.dexkit.com/defi-products/dexgenerator/thirdweb-contracts/token-drop) normal, el contrato suele **acuñar** tokens al hacer claim. Aquí no se crea nada nuevo en el momento del claim. El contrato saca tokens de la dirección **token owner** con el flujo estándar ERC-20 `approve` + `transferFrom`—el mismo patrón de allowance que usas para dejar que un DEX gaste tus tokens.

**En la práctica necesitas:**

- Un ERC-20 ya activo en tu red (despliégalo con DexContracts → **Token** si aún no lo tienes).
- Una wallet **token owner** con el supply que vas a ofrecer.
- Una **aprobación** en esa wallet para que el contrato del drop mueva esos tokens cuando haya claims.

DexKit lo ofrece como **Token Allowance Drop** dentro de DexContracts. Referencia completa: [documentación DropAllowanceERC20](https://docs.dexkit.com/defi-products/dexcontracts/dexkit-contracts/dropallowanceerc20).

## Token allowance drop vs token drop: ¿cuál te conviene?

| | Token Drop (`DropERC20`) | Token Allowance Drop (`DropAllowanceERC20`) |
|---|---|---|
| De dónde salen los tokens | Acuñados por el drop al reclamar | Wallet del token owner |
| Necesitas antes | Solo el contrato del drop | ERC-20 + token owner con saldo |
| Antes de que alguien reclame | Definir supply / lazy mint en el drop | El token owner debe **aprobar** el drop |
| Encaja con | Lanzamiento de token nuevo | Preventa, recompensas, venta desde tesorería |

Si el token ya existe y el supply está en tu multisig o en la wallet del deploy, elige **Token Allowance Drop**. Si vas a acuñar en el claim desde cero, usa **Token Drop**.

## ¿Para quién es esta configuración?

Los token allowance drops aparecen mucho cuando el equipo quiere:

- Una **página de preventa** para un ERC-20 ya desplegado  
- **Recompensas a la comunidad** pagadas desde tesorería sin cientos de transferencias manuales  
- **Claims por fases** (allowlist → público) con límites on-chain  
- Una **URL de claim con tu marca** en tu dominio DexAppBuilder  

No hace falta escribir Solidity. Sí hace falta gas, un token owner claro y cinco minutos en testnet antes de tocar mainnet.

## Antes del deploy: checklist

- Cuenta en [DexAppBuilder](https://dexappbuilder.dexkit.com/) y wallet conectada  
- **Dirección del contrato ERC-20** en la red que vas a usar  
- Wallet **token owner** con tokens suficientes para la venta  
- Moneda nativa para deploy + transacciones de approve (ETH, MATIC, etc.)  
- Red activada en la app en **Settings → Networks** (Polygon, Base, Arbitrum, BNB Chain, Ethereum, Optimism, Avalanche y otras soportadas por DexContracts)

## Cómo desplegar DropAllowanceERC20 (Token Allowance Drop)

### Abrir DexContracts

Entra en [dexappbuilder.dexkit.com](https://dexappbuilder.dexkit.com/), abre el admin de tu app (o pulsa **Create App**) y ve a **DexContracts → Deploy contract**. Atajo: [dexappbuilder.dexkit.com/forms/contracts/create](https://dexappbuilder.dexkit.com/forms/contracts/create).

### Elegir Token Allowance Drop

En el catálogo busca **DropAllowanceERC20**—en la interfaz aparece como **Token Allowance Drop**. Ábrelo para ver el formulario de deploy.

### Rellenar el formulario (qué significa cada campo)

**Name, symbol, description, image** — Lo que muestran exploradores y tu página de claim. Mejor acertarlo al principio; luego cuesta cambiar.

**Token address** — El ERC-20 que distribuyes. Pega la dirección del contrato de tu lanzamiento. Red equivocada = claims rotos.

**Token owner** — La wallet que realmente tiene los tokens. Esa dirección debe enviar el `approve` después. Muchos equipos usan tesorería o la misma wallet que desplegó el token; no tiene que ser la wallet conectada ahora, pero solo esa dirección puede dar allowance.

**Sale recipient** — A dónde van los pagos de claims de pago (ETH o la moneda que cobres). Suele ser la wallet del proyecto.

El admin por defecto es tu wallet conectada. Las comisiones de contratos DexKit ya vienen en el formulario—solo toca platform fee si sabes que debes.

### Confirmar el deploy

Elige la red, revisa el gas y firma en tu wallet. Cuando confirme, localiza el contrato en **DexContracts → My contracts** y copia la **dirección** y la **chain**. Las pegarás en la configuración de layout de DexAppBuilder.

## Aprobar tokens y configurar claim conditions

Abre el contrato desde **My contracts**. Verás **Token**, **Claim Conditions**, **Metadata** y **Admin**.

### Dar allowance al drop (no lo saltes)

Los claims fallan en silencio—o revierten—si falta este paso.

1. Abre la pestaña **Token**.  
2. Conecta la wallet que coincida con el **token owner** del deploy.  
3. Pulsa **Approve** e introduce un importe **≥ total de tokens que planeas mover** en todas las fases.  
4. Firma la transacción.

La interfaz muestra el allowance actual cuando esté configurado. Si pide cambiar de wallet, estás en la cuenta equivocada; conecta el token owner.

### Configurar claim conditions

En **Claim Conditions** están las reglas de la venta: fase pública, allowlist, claim gratis, precio por token, horas de inicio/fin, máximo por wallet, snapshots.

Haz un claim completo en Sepolia (o tu testnet) antes de mainnet. Hemos visto equipos con copy perfecta en la UI y la fecha de fin de fase mal—la testnet lo detecta barato.

Las pestañas Metadata y Admin sirven para actualizar contract URI y roles si lo necesitas más adelante.

## Crear una app DexAppBuilder alrededor de tu token drop

El deploy solo no te da un enlace de preventa en el que la comunidad confíe. La app sí.

### Crear la base de la app

Desde [DexAppBuilder](https://dexappbuilder.dexkit.com/), **Create App** (o abre un proyecto existente). Nombre, email, wallet. En **Settings**, logo, dominio, tema y activa la red donde desplegaste el drop.

¿Primera vez en el builder? Nuestra [guía de apps on-chain](https://dexkit.com/es/blog/creacion-de-aplicaciones-en-cadena-simple-con-dexappbuilder) explica Settings y Layout con más detalle.

### Añadir la página de claim (sección DexGenerator)

1. **Layout → Pages**  
2. Página nueva—Claim, Preventa, el nombre que encaje con tu marca  
3. Añadir sección → **DexGenerator** (es el enlace con DexContracts)  
4. Elige tu deploy **DropAllowanceERC20**; filtra por red si tienes varios  

DexAppBuilder lo mapea a una sección **token-drop**—la misma UI de token drop estándar, pero lee el saldo del token owner vía allowance.

Ajusta textos, colores y etiquetas de botones en la configuración de la sección. Usa **Preview** con una wallet en la red correcta antes de anunciar el enlace.

### Publicar

Guarda el layout, publica en tu subdominio DexKit o dominio propio y haz un claim real: conecta wallet, reclama el mínimo, confirma que los tokens llegaron a la wallet del comprador.

Comparte la URL. Listo.

## Checklist completo de lanzamiento (copiar/pegar)

- ERC-20 activo en la red objetivo  
- `DropAllowanceERC20` desplegado con token y token owner correctos  
- Token owner con allowance suficiente  
- Claim conditions probadas en testnet y configuradas en mainnet  
- App DexAppBuilder en vivo con DexGenerator → token-drop apuntando al contrato  
- Un claim de punta a punta verificado en la URL de producción  

## Preguntas frecuentes

### ¿Qué es DropAllowanceERC20?

`DropAllowanceERC20` es el smart contract de DexKit para token allowance drops. Distribuye un ERC-20 existente desde un token owner designado usando approvals ERC-20 en lugar de acuñar en el claim.

### ¿En qué se diferencia un token allowance drop de un token drop normal?

Un **Token Drop** (`DropERC20`) suele acuñar tokens cuando el usuario reclama. **Token Allowance Drop** transfiere tokens que el owner ya tiene, después de que el owner apruebe el contrato del drop como spender.

### ¿Tengo que aprobar tokens antes de que los usuarios reclamen?

Sí. La wallet token owner debe hacer `approve` al contrato del drop por al menos el importe total de la venta. Sin approve, los claims revierten.

### ¿Puedo hacer una preventa con DexAppBuilder sin código?

Sí. Despliega **Token Allowance Drop** en DexContracts, configura las claim conditions, añade una sección **DexGenerator** token-drop en DexAppBuilder y publica tu app.

### ¿Qué blockchains soportan Token Allowance Drop?

DexContracts soporta las redes disponibles en DexAppBuilder—habitualmente Ethereum, Polygon, BNB Chain, Base, Arbitrum, Optimism y Avalanche. Elige la red en la pantalla de deploy y activa la misma chain en **Settings → Networks** de la app.

### ¿Por qué falló mi transacción de claim?

Lo habitual: allowance insuficiente, saldo bajo en el token owner, red equivocada en la wallet o fase de claim inactiva (ventana de tiempo, allowlist o tope por wallet). Revisa primero el allowance en la pestaña **Token**—es el fallo más común.

### ¿Pueden ser wallets distintas el token owner y el admin?

Sí. El admin gestiona el drop; solo el **token owner** puede aprobar tokens. Muchos equipos usan multisig como token owner y hot wallet como admin.

## Más de DexKit

- [DropAllowanceERC20 — documentación técnica](https://docs.dexkit.com/defi-products/dexcontracts/dexkit-contracts/dropallowanceerc20)  
- [Desplegar contratos (DexContracts)](https://dexappbuilder.dexkit.com/forms/contracts/create)  
- [Crear apps on-chain con DexAppBuilder](https://dexkit.com/es/blog/creacion-de-aplicaciones-en-cadena-simple-con-dexappbuilder)  
- [Integrar token drops en cualquier web (Web3 Widgets)](https://dexkit.com/es/blog/widgets-web3-dexkit)  
- [DexContracts y crypto staking](https://dexkit.com/es/blog/staking-cripto-desmitificado-explorando-beneficios-y-riesgos)  

## Empezar

[Deploy Token Allowance Drop](https://dexappbuilder.dexkit.com/forms/contracts/create) · [Abrir DexAppBuilder](https://dexappbuilder.dexkit.com/)

¿Atascado en algún paso? [Contáctanos](https://www.dexkit.com/contact-us/) o pregunta en [Discord](https://discord.com/invite/GJCRu4CYFH)—alguien del equipo suele responder en menos de un día.
