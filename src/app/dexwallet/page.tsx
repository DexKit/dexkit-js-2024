import ProductLandingPage from '@/app/components/ProductLandingPage';
import { DEXWALLET_CONFIG } from '@/app/utils/product-pages';

export default function DexWallet() {
  return <ProductLandingPage config={DEXWALLET_CONFIG} />;
}
