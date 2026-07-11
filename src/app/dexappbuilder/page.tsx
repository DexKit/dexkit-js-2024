import ProductLandingPage from '@/app/components/ProductLandingPage';
import { DEXAPPBUILDER_CONFIG } from '@/app/utils/product-pages';

export default function DexAppBuilder() {
  return <ProductLandingPage config={DEXAPPBUILDER_CONFIG} />;
}
