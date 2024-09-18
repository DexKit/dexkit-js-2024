---
title: Descubra o poder das carteiras de contratos inteligentes ERC-4337
date: 17 de agosto de 2023
excerpt: >-
  O padrão ERC-4337 representa um padrão Ethereum aprimorado que busca
  introduzir recursos de contratos inteligentes em carteiras dentro do
  ecossistema Ethereum.
category: Blog
slug: descubra-o-poder-das-carteiras-erc-4337
imageUrl: /blog-images/Copy-of-20230817_ERC-4337-blog-LinkedIn-Facebook.png
---
Conheça as carteiras de contratos inteligentes ERC-4337, carteiras web3 projetadas especificamente para gerenciar contas de contratos inteligentes. Essas carteiras avançadas, construídas com base no padrão ERC-4337, fornecem aos usuários uma experiência familiar semelhante às carteiras tradicionais de contas de propriedade externa (EOA), ao mesmo tempo que introduzem funcionalidades adicionais, adaptabilidade e maiores vantagens de segurança.

DexKit, uma startup inovadora de blockchain, está explorando ativamente maneiras de integrar seus produtos com essas carteiras avançadas de contratos inteligentes ERC-4337. Esta iniciativa estratégica promete melhorar a experiência do utilizador e a segurança das transações, reforçando ainda mais o apelo destas carteiras inovadoras.

### Por que considerar carteiras de contratos inteligentes? 💡

As carteiras de contratos inteligentes melhoram a sua funcionalidade através da utilização de contratos inteligentes programáveis, distinguindo-as das carteiras EOA normais. Embora as carteiras EOA sejam necessárias para iniciar transações com carteiras de contratos inteligentes, a integração dos serviços de infraestrutura de abstração de contas, incluindo Bundlers, Paymasters, o contrato EntryPoint e SDKs de carteira, foi projetada para simplificar e agilizar esse processo. Essa melhoria beneficia tanto os desenvolvedores de carteiras quanto os usuários finais, tornando as interações com carteiras de contratos inteligentes mais fáceis e fáceis de usar.

Destacados abaixo estão vários dos recursos potenciais que as carteiras de contratos inteligentes trazem:

* **Autenticação de fator duplo

    ![✔️](https://s.w.org/images/core/emoji/14.0.0/svg/2714.svg)

    **

As carteiras de contratos inteligentes podem incorporar autenticação de fator duplo, que exige dois componentes distintos para verificar a identidade de um usuário. Esses componentes podem incluir algo que o usuário conhece (como uma senha), algo que o usuário possui (como um telefone) ou um aspecto biológico (como uma impressão digital). Esse recurso, predominante na web2, aumenta a segurança e obstrui o acesso não autorizado.

* **Recuperação social

    ![🤝](https://s.w.org/images/core/emoji/14.0.0/svg/1f91d.svg)

    **

A recuperação social permite que a chave pública de uma carteira de contrato inteligente seja alterada caso a chave privada original seja perdida. Este processo envolve uma transação multisig com amigos ou familiares de confiança atuando como tutores. Conseqüentemente, não há necessidade de o proprietário da carteira reter frases-semente.

* **Estratégias flexíveis de gás**

    **![⛽](https://s.w.org/images/core/emoji/14.0.0/svg/26fd.svg)**

Carteiras de contratos inteligentes podem estabelecer políticas versáteis de gás usando APIs que aderem à especificação Paymaster do ERC-4337. Isso permite que os desenvolvedores patrocinem transações em nome dos usuários (permitindo transações sem gás) e permite que os usuários paguem taxas de gás em qualquer token ERC-20 (por exemplo, USDC).

* ** Esquemas de assinatura personalizados

    ![🖋️](https://s.w.org/images/core/emoji/14.0.0/svg/1f58b.svg)

    **

Carteiras de contratos inteligentes podem ser programadas para adotar diversos esquemas de assinatura, substituindo assim o ECDSA padrão utilizado no Ethereum. Isso poderia envolver multisig, recuperação social ou até mesmo alternativas resistentes à computação quântica, como Crystals-Kyber.

* ** Funcionalidade multichamada

    ![🔄](https://s.w.org/images/core/emoji/14.0.0/svg/1f504.svg)

    **

A funcionalidade multicall permite que uma carteira de contrato inteligente execute múltiplas ações em uma única transação atômica. Isto melhora significativamente o modelo atual de carteira, onde cada transação necessita de confirmação individual, resultando em tempos de processamento prolongados e numa experiência de utilizador insatisfatória.

* **Limites de gastos para diferentes signatários

    ![💳](https://s.w.org/images/core/emoji/14.0.0/svg/1f4b3.svg)

    **

As carteiras de contratos inteligentes podem ser configuradas para reconhecer vários signatários válidos, o que por sua vez permite o estabelecimento de limites de gastos distintos para cada signatário. Por exemplo, um usuário pode incluir seu laptop e a carteira de hardware Ledger como assinantes, permitindo transações de até 0,05 ETH por meio de seu laptop, enquanto as transações que excedem esse limite exigem o uso da carteira de hardware.

* **Lista de permissões e lista de bloqueios de endereços

    ![📃](https://s.w.org/images/core/emoji/14.0.0/svg/1f4c3.svg)

    **

As carteiras de contratos inteligentes permitem que os usuários concedam ou neguem acesso a endereços de carteira específicos, contribuindo para maior segurança e controle do usuário.

* **Suporte para carteira multi-sig

    ![💼](https://s.w.org/images/core/emoji/14.0.0/svg/1f4bc.svg)

    **

O suporte para funcionalidade de múltiplas assinaturas em carteiras de contratos inteligentes é particularmente valioso para organizações, onde múltiplas aprovações são frequentemente essenciais antes que uma transação possa ser executada. Esta camada adicional de segurança frustra os esforços de um indivíduo solitário que procura apropriar-se indevidamente de fundos ou realizar transações não autorizadas.

### Desvantagens das carteiras de contratos inteligentes 😔

As carteiras de contratos inteligentes apresentam inúmeras vantagens, mas também apresentam sua parcela de desvantagens. Isso inclui custos mais elevados de gás, possíveis desafios relacionados ao código e a atual falta de suporte na maioria das plataformas web3.

Uma desvantagem significativa são os elevados custos do gás associados às carteiras de contratos inteligentes. Essas carteiras são regidas por código, o que significa que a execução do código exige pagamento pelos recursos computacionais utilizados. Como resultado, as transações realizadas com carteiras de contratos inteligentes tendem a ser mais caras do que aquelas realizadas com carteiras tradicionais de contas de propriedade externa (EOA). Essa disparidade de custos torna-se especialmente pronunciada quando são incorporados recursos complexos que exigem execução complexa de código de contrato inteligente.

Outra questão a considerar são os potenciais desafios relacionados ao código inerentes às carteiras de contratos inteligentes. Dado que as carteiras de contratos inteligentes dependem de código, são suscetíveis a muitos dos mesmos problemas que envolvem auditoria, vulnerabilidades de segurança e bugs, semelhantes aos produtos de software convencionais. Como as carteiras de contratos inteligentes são relativamente novas, os usuários que adotam carteiras que aderem ao padrão ERC-4337 devem ter cautela. Eles devem avaliar cuidadosamente a equipe responsável pelo desenvolvimento da carteira, examinar minuciosamente o design e a segurança geral do código para mitigar riscos potenciais.

Além disso, as carteiras de contratos inteligentes enfrentam atualmente suporte limitado no ecossistema web3. Embora essas carteiras ofereçam recursos e benefícios avançados, elas ainda estão nos estágios iniciais de desenvolvimento. Esta falta de maturidade reflecte-se no limitado suporte de plataforma que recebem. Para obter ampla adoção, as carteiras de contratos inteligentes precisam do endosso e da integração de protocolos DeFi bem estabelecidos e de outras plataformas web3 influentes.

### Considerações finais

Inovadoras e voltadas para o futuro, as carteiras de contratos inteligentes construídas com base no padrão ERC-4337 representam um salto em direção a maior segurança, versatilidade e controle no domínio do gerenciamento de ativos digitais. À medida que avançamos neste cenário promissor, colaborações emocionantes estão no horizonte.

A DexKit está ativamente envolvida com essas carteiras avançadas de contratos inteligentes, alinhando-se com sua visão de experiências centradas no usuário e maior segurança nas transações. Ao estabelecer parcerias como essas, o DexKit busca aprimorar e elevar as interações dos usuários dentro do domínio blockchain. Uma personificação de sua dedicação à inovação, o DexAppBuilder – o principal produto do DexKit – serve como uma prova de sua abordagem visionária.
