---
title: Descubra el poder de las carteras de contratos inteligentes ERC-4337
date: 17 de agosto de 2023
excerpt: >-
  El estándar ERC-4337 representa un estándar Ethereum mejorado que busca
  introducir capacidades de contrato inteligente en billeteras dentro del
  ecosistema Ethereum.
category: Blog
slug: descubra-el-poder-de-las-billeteras-erc-4337
imageUrl: /blog-images/Copy-of-20230817_ERC-4337-blog-LinkedIn-Facebook.png
---
Conozca las billeteras de contratos inteligentes ERC-4337, billeteras web3 diseñadas específicamente para administrar cuentas de contratos inteligentes. Estas billeteras avanzadas, basadas en el estándar ERC-4337, brindan a los usuarios una experiencia familiar similar a las billeteras tradicionales de cuentas de propiedad externa (EOA), al tiempo que introducen funcionalidades adicionales, adaptabilidad y mayores ventajas de seguridad.

DexKit, una innovadora startup de blockchain, está explorando activamente formas de integrar sus productos con estas avanzadas carteras de contratos inteligentes ERC-4337. Esta iniciativa estratégica promete mejorar tanto la experiencia del usuario como la seguridad de las transacciones, reforzando aún más el atractivo de estas billeteras innovadoras.

### ¿Por qué considerar carteras de contratos inteligentes? 💡

Las billeteras de contratos inteligentes mejoran su funcionalidad mediante el uso de contratos inteligentes programables, lo que las distingue de las billeteras EOA normales. Aunque se requieren billeteras EOA para iniciar transacciones con billeteras de contratos inteligentes, la integración de los servicios de infraestructura de Abstracción de Cuentas, incluidos Bundlers, Paymasters, el contrato EntryPoint y los SDK de Wallet, está diseñada para simplificar y agilizar este proceso. Esta mejora beneficia tanto a los desarrolladores de billeteras como a los usuarios finales al hacer que las interacciones con las billeteras de contratos inteligentes sean más fluidas y fáciles de usar.

A continuación se destacan varias de las capacidades potenciales que aportan las billeteras de contratos inteligentes:

* **Autenticación de doble factor**

Las carteras de contratos inteligentes pueden incorporar autenticación de doble factor, que exige dos componentes distintos para verificar la identidad de un usuario. Estos componentes podrían incluir algo que el usuario conoce (como una contraseña), algo que posee (como un teléfono) o un aspecto biológico (como una huella digital). Esta característica, frecuente en web2, aumenta la seguridad y obstruye el acceso no autorizado.

* **Recuperación social**

La recuperación social permite modificar la clave pública de una billetera de contrato inteligente si se pierde la clave privada original. Este proceso implica una transacción multifirma con amigos o familiares de confianza que actúan como tutores. En consecuencia, no es necesario que el propietario de la billetera conserve las frases iniciales.

* **Estrategias de gas flexibles**

Las billeteras de contratos inteligentes pueden establecer políticas de gas versátiles utilizando API que cumplen con la especificación Paymaster del ERC-4337. Esto permite a los desarrolladores patrocinar transacciones en nombre de los usuarios (lo que permite transacciones sin gas) y permite a los usuarios liquidar las tarifas del gas en cualquier token ERC-20 (por ejemplo, USDC).

* **Esquemas de firma personalizados**

Las billeteras de contratos inteligentes se pueden programar para adoptar diversos esquemas de firma, reemplazando así el estándar ECDSA utilizado en Ethereum. Esto podría implicar multifirma, recuperación social o incluso alternativas resistentes a la computación cuántica, como Crystals-Kyber.

* **Funcionalidad de llamadas múltiples**

La funcionalidad multicall permite que una billetera de contrato inteligente ejecute múltiples acciones dentro de una sola transacción atómica. Esto mejora significativamente el modelo de billetera actual, donde cada transacción requiere una confirmación individual, lo que resulta en tiempos de procesamiento prolongados y una experiencia de usuario insatisfactoria.

* **Límites de gasto para diferentes firmantes**

Las billeteras de contratos inteligentes se pueden configurar para reconocer múltiples firmantes válidos, lo que a su vez permite establecer límites de gasto distintos para cada firmante. Por ejemplo, un usuario puede incluir tanto su computadora portátil como su billetera de hardware Ledger como firmantes, lo que permite transacciones de hasta 0,05 ETH a través de su computadora portátil, mientras que las transacciones que exceden este límite requieren el uso de la billetera de hardware.

* **Lista de direcciones permitidas y denegadas**

Las billeteras de contrato inteligentes permiten a los usuarios otorgar o denegar el acceso a direcciones de billetera específicas, lo que contribuye a mejorar la seguridad y el control del usuario.

* **Soporte de billetera multifirma**

El soporte para la funcionalidad de firmas múltiples dentro de billeteras de contratos inteligentes es particularmente valioso para las organizaciones, donde a menudo son esenciales múltiples aprobaciones antes de que se pueda ejecutar una transacción. Esta capa adicional de seguridad frustra los esfuerzos de un individuo solitario que busca malversar fondos o realizar transacciones no autorizadas.

### Inconvenientes de las carteras de contratos inteligentes 😔

Las billeteras de contratos inteligentes tienen numerosas ventajas, pero también tienen sus inconvenientes. Estos incluyen mayores costos de gasolina, posibles desafíos relacionados con el código y la actual falta de soporte en la mayoría de las plataformas web3.

Un inconveniente importante son los elevados costos del gas asociados con las billeteras de contratos inteligentes. Estas billeteras se rigen por código, lo que significa que la ejecución del código requiere el pago de los recursos computacionales utilizados. Como resultado, las transacciones realizadas utilizando carteras de contratos inteligentes tienden a ser más caras que las realizadas con carteras tradicionales de cuentas de propiedad externa (EOA). Esta disparidad de costos se vuelve especialmente pronunciada cuando se incorporan características complejas que requieren una compleja ejecución de código de contrato inteligente.

Otra cuestión a considerar son los posibles desafíos relacionados con el código inherentes a las billeteras de contratos inteligentes. Dado que las billeteras de contratos inteligentes dependen del código, son susceptibles a muchos de los mismos problemas relacionados con auditorías, vulnerabilidades de seguridad y errores, similares a los productos de software convencionales. Debido a que las billeteras de contratos inteligentes son relativamente nuevas, los usuarios que adopten billeteras que cumplan con el estándar ERC-4337 deben tener cuidado. Deben evaluar cuidadosamente el equipo responsable del desarrollo de la billetera, examinar el diseño y la seguridad general del código para mitigar los riesgos potenciales.

Además, las carteras de contratos inteligentes actualmente enfrentan un soporte limitado dentro del ecosistema web3. Si bien estas billeteras ofrecen funciones y beneficios avanzados, aún se encuentran en sus primeras etapas de desarrollo. Esta falta de madurez se refleja en el limitado soporte de plataforma que reciben. Para lograr una adopción generalizada, las carteras de contratos inteligentes necesitan el respaldo y la integración de protocolos DeFi bien establecidos y otras plataformas web3 influyentes.

### Pensamientos finales

Las carteras de contratos inteligentes, innovadoras y con visión de futuro, basadas en el estándar ERC-4337 representan un salto hacia una mayor seguridad, versatilidad y control en el ámbito de la gestión de activos digitales. A medida que nos adentramos en este panorama prometedor, se vislumbran colaboraciones interesantes en el horizonte.

DexKit participa activamente en estas carteras de contratos inteligentes avanzadas, alineándose con su visión de experiencias centradas en el usuario y mayor seguridad de las transacciones. Al forjar asociaciones como estas, DexKit busca mejorar y elevar las interacciones de los usuarios dentro del ámbito blockchain. Una encarnación de su dedicación a la innovación, DexAppBuilder, el producto estrella de DexKit, sirve como testimonio de su enfoque visionario.
