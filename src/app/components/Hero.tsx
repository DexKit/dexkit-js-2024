import Image from 'next/image'

export default function Hero() {
  return (
    <div className="min-h-screen flex items-center">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Create your own<br />
            branded <span className="text-orange-400">DApps.</span>
          </h1>
          <p className="text-xl mb-6">
            With DexKit&apos;s no-code/low-code tools.
          </p>
          <button className="btn-primary">
            Create my DApp now!
          </button>
        </div>
        <div className="md:w-1/2">
          <Image
            src="/imgs/web3.webp"
            alt="DexKit Web3 Illustration"
            width={400}
            height={400}
            className="w-auto h-auto"
          />
        </div>
      </div>
    </div>
  )
}