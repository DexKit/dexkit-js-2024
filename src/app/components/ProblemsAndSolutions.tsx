import Image from 'next/image'

export default function ProblemsAndSolutions() {
    const problems = [
      {
        title: "Lack of accessibility",
        description: "One of the major problems in the DeFi space is the lack of accessibility for users who may not have technical expertise.",
        icon: "/imgs/accesibility.svg"
      },
      {
        title: "No/low-code tools and solutions",
        description: "DexKit provides no-code/low-code tools and solutions that make it easy for anyone to create custom decentralized / onchain applications (DApps).",
        icon: "/imgs/nocode.svg"
      },
      {
        title: "Difficulty establishing a brand",
        description: "In the DeFi space, establishing a unique brand identity is important but can be challenging for inexperienced people.",
        icon: "/imgs/brand.svg"
      },
      {
        title: "DApps made easy",
        description: "DexKit enables entrepreneurs to easily create their own branded onchain applications helping them establish their brand identity in the Web3 space.",
        icon: "/imgs/easy.svg"
      },
      {
        title: "Limited ownership",
        description: "Web2 app builders are limited to sell their DApp designs only on limited places / platforms.",
        icon: "/imgs/limited.svg"
      },
      {
        title: "NFTs provides real ownership",
        description: "With DexKit's solutions, DApp builders can own and sell their creations as NFTs, giving them a wider audience and more flexibility in selling their work.",
        icon: "/imgs/ownership.svg"
      }
    ];
  
    return (
      <section className="py-16 bg-white w-full">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-black">What problems exist in the ecosystem and how do we help to solve them?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {problems.map((problem, index) => (
              <div key={index} className="flex items-start">
                <div className="mr-6 flex-shrink-0">
                  <Image 
                    src={problem.icon} 
                    alt={problem.title} 
                    width={80} 
                    height={80}
                    className={`${index % 2 === 0 ? "text-purple-600" : "text-orange-400"} w-20 h-20`}
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2 text-black">{problem.title}</h3>
                  <p className="text-gray-700 text-xl">{problem.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }