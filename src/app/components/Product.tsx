import Image from 'next/image'
import Link from 'next/link'

export default function Product() {
  return (
    <section className="py-12 bg-white w-full">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-6 text-center text-black">Product</h2>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2 md:text-right">
            <h3 className="text-5xl font-semibold mb-3 text-black">DexAppBuilder</h3>
            <p className="mb-4 text-black text-xl">
              Empower your DApp creation and launch your Web3 business with guaranteed ownership.
            </p>
            <Link 
              href="/dexappbuilder" 
              className="bg-orange-400 text-black py-2 px-4 rounded-lg hover:bg-orange-500 transition-colors duration-300 text-sm font-semibold"
            >
              Learn more
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-start">
            <Image
              src="/imgs/platform.webp"
              alt="DexAppBuilder Platform"
              width={450}
              height={450}
              className="w-auto h-auto max-w-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}