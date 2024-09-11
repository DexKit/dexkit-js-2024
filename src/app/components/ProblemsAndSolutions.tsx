export default function ProblemsAndSolutions() {
    const problems = [
      {
        title: "Lack of accessibility",
        description: "One of the major problems in the DeFi space is the lack of accessibility for users who may not have technical expertise.",
        icon: "🔒"
      },
      {
        title: "No/low-code tools and solutions",
        description: "DexKit provides no-code/low-code tools and solutions that make it easy for anyone to create custom decentralized / onchain applications (DApps).",
        icon: "🛠️"
      },
      {
        title: "Difficulty establishing a brand",
        description: "In the DeFi space, establishing a unique brand identity is important but can be challenging for inexperienced people.",
        icon: "🏷️"
      },
      {
        title: "Limited ownership",
        description: "Web2 app builders are limited to sell their DApp designs only on limited places / platforms.",
        icon: "🔗"
      }
    ];
  
    return (
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-black">What problems exist in the ecosystem and how do we help to solve them?</h2>
          <div className="grid grid-cols-2 gap-8">
            {problems.map((problem, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-lg">
                <div className="text-4xl mb-4">{problem.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-black">{problem.title}</h3>
                <p className="text-gray-700">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }