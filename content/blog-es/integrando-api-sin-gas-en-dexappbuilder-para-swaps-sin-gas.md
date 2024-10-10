---
title: Integración de API sin gas en DexAppBuilder para intercambios sin gas
date: 23 de mayo de 2024
excerpt: >-
  En DexKit, nuestra misión es hacer que Web3 sea accesible. Una de las muchas
  formas en que lo hacemos es simplificando el comercio descentralizado para
  todos.
category: Blog
slug: integrando-api-sin-gas-en-dexappbuilder-para-swaps-sin-gas
imageUrl: /blog-images/Gasless-blog.png
---
En DexKit, **nuestra misión es hacer que Web3 sea accesible**. Una de las muchas formas en que lo hacemos es simplificando el comercio descentralizado para todos. Hoy, estamos encantados de anunciar la **integración de Gasless API en nuestra plataforma DexAppBuilder** para agregadores de intercambio DEX de marca blanca. Esta característica innovadora está diseñada para eliminar las tarifas de gas en los intercambios de tokens. Beneficia a una amplia gama de usuarios de la comunidad DexKit. Desde comerciantes y desarrolladores hasta artistas de NFT, entusiastas de las criptomonedas y creadores de DApps, esta integración marca un paso importante hacia la democratización de DeFi. Amplía las oportunidades dentro del ecosistema descentralizado.

### ¿Qué es la API sin gas?

La [API sin comisiones por gas](https://0x.org/post/0x-101-intro-to-gasless-api) simplifica el comercio de tokens ERC-20 al eliminar la necesidad de mantener tokens nativos para las tarifas del gas. Proporcionada por [0x](https://0x.org/), esta API permite a los usuarios acceder a liquidez, precios y cotizaciones sin esfuerzo. Al aceptar una cotización, los usuarios firman un mensaje EIP-712. Esto permite a la API gestionar aprobaciones y enviar transacciones en su nombre, cubriendo las tarifas del gas.

### Características clave de la API sin gas

A continuación se detallan las características clave de Gasless API. Hacen de esta API la opción correcta para transacciones financieras descentralizadas (DeFi) rentables y fáciles de usar en múltiples redes blockchain.

* **Transacciones sin gas:** Ejecute intercambios de tokens sin pagar tarifas de gas. Utilice una parte del token de entrada para las tarifas de transacción.
* **Aprobaciones sin gas:** Utilice mensajes EIP-712 para asignaciones de tokens ERC-20 sin gas. Esto elimina los gastos iniciales de gasolina.
* **Protección contra bots MEV:** La API sin gas incorpora protección contra bots MEV. Esto reduce las fallas comerciales y evita la interferencia del robot sándwich.
* **Soporte multired:** Se puede acceder a los swaps sin gas en las redes Ethereum, Polygon, Optimism y Arbitrum.

### Cómo funciona la API sin gas

Con la API Gasless, los usuarios experimentan operaciones fluidas y rentables. Así es como funciona:

* **Cotización y aprobación:** Los usuarios primero reciben una cotización para la transacción. Si aceptan los términos, firman un mensaje EIP-712 para aprobar la transacción.
* **Envío de transacciones:** La API Gasless luego envía la transacción en nombre del usuario, cubriendo todas las tarifas de gas.
* **Confirmación y finalización:** Los usuarios reciben una confirmación una vez que la transacción se procesa exitosamente, completando la transacción sin preocuparse por la tarifa del gas.

### Cómo activar swaps sin gas

Activar swaps sin gas es sencillo y no requiere ningún conocimiento avanzado. Simplemente navegue hasta la configuración del componente de intercambio. Puedes encontrarlo en cualquiera de sus páginas que tengan la sección Swap. Esta sección puede ser un componente predefinido o estar integrada en secciones personalizadas. Haga clic en el botón Editar (resaltado en verde en la imagen a continuación) para acceder a la configuración del componente de intercambio.

![Sección de página](/blog-images/swappages.png)

Acceda a la configuración del componente de intercambio con un simple clic en el botón Editar verde resaltado.

Una vez dentro de la configuración del componente de intercambio, marque la casilla denominada **'Intercambios sin gas'** y guarde los cambios en su DApp (como se muestra en la imagen a continuación).

![Combinación de intercambio](/blog-images/swapcompo1.png)

Seleccione la opción "Swaps sin gas" dentro de la configuración del componente de swap para habilitar transacciones sin gas.

### Hacia DeFi sin gas con DexAppBuilder

Las tarifas del gas han sido durante mucho tiempo una barrera en el espacio DeFi, complicando las transacciones y desalentando a los nuevos usuarios. Al integrar la API Gasless, DexAppBuilder no solo mejora la experiencia de sus usuarios sino que también promueve una adopción más amplia de DeFi al reducir las barreras de entrada.

Al utilizar DexAppBuilder, todos los creadores de DApps y criptoemprendedores podrán utilizar la función Gasless API. Pueden promocionarlo dentro de su DApp, haciéndolo más atractivo para su audiencia.

**Comience a construir su DApp sin gas hoy usando DexAppBuilder**. Experimente el futuro del comercio fluido con la función [Swap Quick Builder](https://dexappbuilder.dexkit.com/admin/quick-builder/swap) de nuestra plataforma para una fácil creación de DApp.

🔗Obtenga más información sobre esta función en [documentos oficiales de 0x](https://0x.org/docs/tx-relay-api/guides/understanding-tx-relay-api).
