import Link from 'next/link'

export default function Product() {
  return (
    <section className="py-16 bg-gray-100">
      <h2 className="text-3xl font-bold mb-8 text-center">Product</h2>
      <div className="text-center">
        <h3 className="text-2xl font-semibold mb-4">DexAppBuilder</h3>
        <p className="mb-8">Empower your DApp creation and launch your Web3 business with guaranteed ownership.</p>
        <Link href="/dexappbuilder" className="text-blue-500 hover:underline">Learn more</Link>
      </div>
    </section>
  )
}