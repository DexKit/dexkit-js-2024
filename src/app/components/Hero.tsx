import Image from 'next/image'

export default function Hero() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center">
        <div className="md:w-1/2 mb-8 md:mb-0 text-center md:text-right">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Create your own<br />
            branded <span className="text-orange-400">DApps.</span>
          </h1>
          <p className="text-lg md:text-xl mb-6 text-white">
            With DexKit&apos;s no-code/low-code tools.
          </p>
          <button className="bg-orange-400 text-black py-3 px-6 rounded-lg hover:bg-orange-500 transition-colors duration-300 text-lg">
            Create my DApp now!
          </button>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <Image
            src="/imgs/web3.webp"
            alt="DexKit Web3 Illustration"
            width={350}
            height={350}
            className="w-auto h-auto"
          />
        </div>
      </div>
    </div>
  )
}