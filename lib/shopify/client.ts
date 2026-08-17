import {
  getShopQuery,
  getProductsQuery,
  getProductByHandleQuery,
  getCollectionsQuery,
  getCollectionByHandleQuery,
  searchProductsQuery,
  createCartMutation,
  getCartQuery,
  addToCartMutation,
  updateCartMutation,
  removeFromCartMutation,
  getFeaturedProductsQuery,
  getPageQuery,
} from './queries'
import type {
  ShopifyProduct,
  ShopifyCollection,
  ShopifyCart,
  ShopifyShop,
  ShopifyPage,
} from './types'

const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN
const storefrontToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN
const apiVersion = '2025-01'

// Mock Data Database for Local Development & Testing with Unique Variant Images
const MOCK_PRODUCTS_BASE: ShopifyProduct[] = [
  {
    id: 'gid://shopify/Product/1',
    handle: 'brasso-metal-polish-175ml',
    title: 'Brasso Metal Polish, 175 ml',
    description: 'Liquid metal polish for brass, copper, chrome, and stainless steel. Restores brilliance and protects against tarnish.',
    descriptionHtml: '<p>Liquid metal polish for brass, copper, chrome, and stainless steel. Restores brilliance and protects against tarnish.</p>',
    productType: 'Liquid',
    vendor: 'Brasso',
    tags: ['liquid', 'polish', 'best-seller'],
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount: '5.99', currencyCode: 'GBP' },
      maxVariantPrice: { amount: '5.99', currencyCode: 'GBP' }
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: '6.99', currencyCode: 'GBP' },
      maxVariantPrice: { amount: '6.99', currencyCode: 'GBP' }
    },
    featuredImage: {
      url: '/images/products/brasso-175ml-single.png',
      altText: 'Brasso Metal Polish, 175 ml',
      width: 318,
      height: 785
    },
    images: {
      edges: [
        {
          node: {
            url: '/images/products/brasso-175ml-single.png',
            altText: 'Brasso Metal Polish, 175 ml',
            width: 318,
            height: 785
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/101',
            title: 'Default Title',
            availableForSale: true,
            selectedOptions: [{ name: 'Title', value: 'Default Title' }],
            price: { amount: '5.99', currencyCode: 'GBP' },
            compareAtPrice: { amount: '6.99', currencyCode: 'GBP' },
            image: {
              url: '/images/products/brasso-175ml-single.png',
              altText: 'Brasso Metal Polish, 175 ml',
              width: 318,
              height: 785
            }
          }
        }
      ]
    },
    options: [{ id: 'opt-1', name: 'Title', values: ['Default Title'] }],
    seo: { title: 'Brasso Metal Polish, 175 ml', description: 'Buy Brasso Metal Polish online' }
  },
  {
    id: 'gid://shopify/Product/2',
    handle: 'brasso-metal-polish-wadding-75g',
    title: 'Brasso Metal Polish Wadding, 75g',
    description: 'Pre-soaked cotton wadding for easy tarnish removal and shine restoration. No liquid spills, easy to use.',
    descriptionHtml: '<p>Pre-soaked cotton wadding for easy tarnish removal and shine restoration. No liquid spills, easy to use.</p>',
    productType: 'Wipe',
    vendor: 'Brasso',
    tags: ['wadding', 'wipe', 'best-seller'],
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount: '4.99', currencyCode: 'GBP' },
      maxVariantPrice: { amount: '4.99', currencyCode: 'GBP' }
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: '5.99', currencyCode: 'GBP' },
      maxVariantPrice: { amount: '5.99', currencyCode: 'GBP' }
    },
    featuredImage: {
      url: '/images/products/brasso-wadding-75g.webp',
      altText: 'Brasso Metal Polish Wadding, 75g',
      width: 349,
      height: 480
    },
    images: {
      edges: [
        {
          node: {
            url: '/images/products/brasso-wadding-75g.webp',
            altText: 'Brasso Metal Polish Wadding, 75g',
            width: 349,
            height: 480
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/201',
            title: 'Default Title',
            availableForSale: true,
            selectedOptions: [{ name: 'Title', value: 'Default Title' }],
            price: { amount: '4.99', currencyCode: 'GBP' },
            compareAtPrice: { amount: '5.99', currencyCode: 'GBP' },
            image: {
              url: '/images/products/brasso-wadding-75g.webp',
              altText: 'Brasso Metal Polish Wadding, 75g',
              width: 349,
              height: 480
            }
          }
        }
      ]
    },
    options: [{ id: 'opt-2', name: 'Title', values: ['Default Title'] }],
    seo: { title: 'Brasso Metal Polish Wadding, 75g', description: 'Buy Brasso Metal Polish Wadding online' }
  },
  {
    id: 'gid://shopify/Product/3',
    handle: 'brasso-metal-polish-175ml-pack-of-4',
    title: 'Brasso Metal Polish 175ml (Pack of 4)',
    description: 'Value pack of four 175ml bottles. Restore gloss with gorgeous radiant shine and dazzling effect.',
    descriptionHtml: '<p>Value pack of four 175ml bottles. Restore gloss with gorgeous radiant shine and dazzling effect.</p>',
    productType: 'Liquid',
    vendor: 'Brasso',
    tags: ['liquid', 'multipack'],
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount: '19.99', currencyCode: 'GBP' },
      maxVariantPrice: { amount: '19.99', currencyCode: 'GBP' }
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: '23.96', currencyCode: 'GBP' },
      maxVariantPrice: { amount: '23.96', currencyCode: 'GBP' }
    },
    featuredImage: {
      url: '/images/products/brasso-175ml-pack-of-4.webp',
      altText: 'Brasso Metal Polish 175ml (Pack of 4)',
      width: 473,
      height: 480
    },
    images: {
      edges: [
        {
          node: {
            url: '/images/products/brasso-175ml-pack-of-4.webp',
            altText: 'Brasso Metal Polish 175ml (Pack of 4)',
            width: 473,
            height: 480
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/301',
            title: 'Default Title',
            availableForSale: true,
            selectedOptions: [{ name: 'Title', value: 'Default Title' }],
            price: { amount: '19.99', currencyCode: 'GBP' },
            compareAtPrice: { amount: '23.96', currencyCode: 'GBP' },
            image: {
              url: '/images/products/brasso-175ml-pack-of-4.webp',
              altText: 'Brasso Metal Polish 175ml (Pack of 4)',
              width: 473,
              height: 480
            }
          }
        }
      ]
    },
    options: [{ id: 'opt-3', name: 'Title', values: ['Default Title'] }],
    seo: { title: 'Brasso Metal Polish 175ml (Pack of 4)', description: 'Buy Brasso multipack online' }
  },
  {
    id: 'gid://shopify/Product/4',
    handle: 'brasso-b150-metal-polish-150ml',
    title: 'Brasso B150 Metal Polish, 150 mL',
    description: 'Classic metal polish liquid in a 150ml container. Removes tarnish, oxidation, and dirt.',
    descriptionHtml: '<p>Classic metal polish liquid in a 150ml container. Removes tarnish, oxidation, and dirt.</p>',
    productType: 'Liquid',
    vendor: 'Brasso',
    tags: ['liquid', 'polish'],
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount: '5.49', currencyCode: 'GBP' },
      maxVariantPrice: { amount: '5.49', currencyCode: 'GBP' }
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: '5.49', currencyCode: 'GBP' },
      maxVariantPrice: { amount: '5.49', currencyCode: 'GBP' }
    },
    featuredImage: {
      url: '/images/products/brasso-liquid-yellow-235ml.png',
      altText: 'Brasso B150 Metal Polish, 150 mL',
      width: 320,
      height: 779
    },
    images: {
      edges: [
        {
          node: {
            url: '/images/products/brasso-liquid-yellow-235ml.png',
            altText: 'Brasso B150 Metal Polish, 150 mL',
            width: 320,
            height: 779
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/401',
            title: 'Default Title',
            availableForSale: true,
            selectedOptions: [{ name: 'Title', value: 'Default Title' }],
            price: { amount: '5.49', currencyCode: 'GBP' },
            compareAtPrice: null,
            image: {
              url: '/images/products/brasso-liquid-yellow-235ml.png',
              altText: 'Brasso B150 Metal Polish, 150 mL',
              width: 320,
              height: 779
            }
          }
        }
      ]
    },
    options: [{ id: 'opt-4', name: 'Title', values: ['Default Title'] }],
    seo: { title: 'Brasso B150 Metal Polish, 150 mL', description: 'Buy Brasso B150 online' }
  },
  {
    id: 'gid://shopify/Product/5',
    handle: 'brasso-metal-polish-liquid-1l-pack-of-2',
    title: 'Brasso Metal Polish Liquid, 1L (Pack of 2)',
    description: 'Professional-grade bulk pack for larger cleaning projects. Perfect for hospitality and maintenance teams.',
    descriptionHtml: '<p>Professional-grade bulk pack for larger cleaning projects. Perfect for hospitality and maintenance teams.</p>',
    productType: 'Liquid',
    vendor: 'Brasso',
    tags: ['liquid', 'bulk', 'professional'],
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount: '28.99', currencyCode: 'GBP' },
      maxVariantPrice: { amount: '28.99', currencyCode: 'GBP' }
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: '34.99', currencyCode: 'GBP' },
      maxVariantPrice: { amount: '34.99', currencyCode: 'GBP' }
    },
    featuredImage: {
      url: '/images/products/brasso-1l-pack-of-2.webp',
      altText: 'Brasso Metal Polish Liquid, 1L (Pack of 2)',
      width: 335,
      height: 480
    },
    images: {
      edges: [
        {
          node: {
            url: '/images/products/brasso-1l-pack-of-2.webp',
            altText: 'Brasso Metal Polish Liquid, 1L (Pack of 2)',
            width: 335,
            height: 480
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/501',
            title: 'Default Title',
            availableForSale: true,
            selectedOptions: [{ name: 'Title', value: 'Default Title' }],
            price: { amount: '28.99', currencyCode: 'GBP' },
            compareAtPrice: { amount: '34.99', currencyCode: 'GBP' },
            image: {
              url: '/images/products/brasso-1l-pack-of-2.webp',
              altText: 'Brasso Metal Polish Liquid, 1L (Pack of 2)',
              width: 335,
              height: 480
            }
          }
        }
      ]
    },
    options: [{ id: 'opt-5', name: 'Title', values: ['Default Title'] }],
    seo: { title: 'Brasso Metal Polish Liquid, 1L (Pack of 2)', description: 'Buy Brasso bulk liquid online' }
  },
  {
    id: 'gid://shopify/Product/6',
    handle: 'brasso-metal-polish-liquid-175ml-pack-of-6',
    title: 'Brasso Metal Polish Liquid 175ml, Pack of 6',
    description: 'Multipack containing six 175ml bottles. Long-lasting shine for brass, copper, and chrome.',
    descriptionHtml: '<p>Multipack containing six 175ml bottles. Long-lasting shine for brass, copper, and chrome.</p>',
    productType: 'Liquid',
    vendor: 'Brasso',
    tags: ['liquid', 'multipack'],
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount: '27.99', currencyCode: 'GBP' },
      maxVariantPrice: { amount: '27.99', currencyCode: 'GBP' }
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: '32.99', currencyCode: 'GBP' },
      maxVariantPrice: { amount: '32.99', currencyCode: 'GBP' }
    },
    featuredImage: {
      url: '/images/products/brasso-175ml-pack-of-6.webp',
      altText: 'Brasso Metal Polish Liquid 175ml, Pack of 6',
      width: 480,
      height: 417
    },
    images: {
      edges: [
        {
          node: {
            url: '/images/products/brasso-175ml-pack-of-6.webp',
            altText: 'Brasso Metal Polish Liquid 175ml, Pack of 6',
            width: 480,
            height: 417
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/601',
            title: 'Default Title',
            availableForSale: true,
            selectedOptions: [{ name: 'Title', value: 'Default Title' }],
            price: { amount: '27.99', currencyCode: 'GBP' },
            compareAtPrice: { amount: '32.99', currencyCode: 'GBP' },
            image: {
              url: '/images/products/brasso-175ml-pack-of-6.webp',
              altText: 'Brasso Metal Polish Liquid 175ml, Pack of 6',
              width: 480,
              height: 417
            }
          }
        }
      ]
    },
    options: [{ id: 'opt-6', name: 'Title', values: ['Default Title'] }],
    seo: { title: 'Brasso Metal Polish Liquid 175ml, Pack of 6', description: 'Buy Brasso pack of 6 online' }
  },
  {
    id: 'gid://shopify/Product/7',
    handle: 'brasso-0592-w-wadding-75g',
    title: 'Brasso 0592-W Wadding, 75g',
    description: 'Gel format wadding canister providing a gorgeous gloss with radiant shine and dazzling effect.',
    descriptionHtml: '<p>Gel format wadding canister providing a gorgeous gloss with radiant shine and dazzling effect.</p>',
    productType: 'Gel',
    vendor: 'Brasso',
    tags: ['wadding', 'gel'],
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount: '5.29', currencyCode: 'GBP' },
      maxVariantPrice: { amount: '5.29', currencyCode: 'GBP' }
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: '5.29', currencyCode: 'GBP' },
      maxVariantPrice: { amount: '5.29', currencyCode: 'GBP' }
    },
    featuredImage: {
      url: '/images/products/brasso-wadding-single.webp',
      altText: 'Brasso 0592-W Wadding, 75g',
      width: 381,
      height: 480
    },
    images: {
      edges: [
        {
          node: {
            url: '/images/products/brasso-wadding-single.webp',
            altText: 'Brasso 0592-W Wadding, 75g',
            width: 381,
            height: 480
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/701',
            title: 'Default Title',
            availableForSale: true,
            selectedOptions: [{ name: 'Title', value: 'Default Title' }],
            price: { amount: '5.29', currencyCode: 'GBP' },
            compareAtPrice: null,
            image: {
              url: '/images/products/brasso-wadding-single.webp',
              altText: 'Brasso 0592-W Wadding, 75g',
              width: 381,
              height: 480
            }
          }
        }
      ]
    },
    options: [{ id: 'opt-7', name: 'Title', values: ['Default Title'] }],
    seo: { title: 'Brasso 0592-W Wadding, 75g', description: 'Buy Brasso 0592-W online' }
  },
  {
    id: 'gid://shopify/Product/8',
    handle: 'brasso-metal-polish-wadding-75g-granule',
    title: 'Brasso Metal Polish Wadding, 75g (Granule)',
    description: 'Special wadding formulation with cleaning granules for extra tough tarnish removal.',
    descriptionHtml: '<p>Special wadding formulation with cleaning granules for extra tough tarnish removal.</p>',
    productType: 'Granule',
    vendor: 'Brasso',
    tags: ['wadding', 'granule'],
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount: '5.49', currencyCode: 'GBP' },
      maxVariantPrice: { amount: '5.49', currencyCode: 'GBP' }
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: '5.49', currencyCode: 'GBP' },
      maxVariantPrice: { amount: '5.49', currencyCode: 'GBP' }
    },
    featuredImage: {
      url: '/images/products/brasso-wadding-6pack.webp',
      altText: 'Brasso Metal Polish Wadding, 75g (Granule)',
      width: 480,
      height: 379
    },
    images: {
      edges: [
        {
          node: {
            url: '/images/products/brasso-wadding-6pack.webp',
            altText: 'Brasso Metal Polish Wadding, 75g (Granule)',
            width: 480,
            height: 379
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/801',
            title: 'Default Title',
            availableForSale: true,
            selectedOptions: [{ name: 'Title', value: 'Default Title' }],
            price: { amount: '5.49', currencyCode: 'GBP' },
            compareAtPrice: null,
            image: {
              url: '/images/products/brasso-wadding-6pack.webp',
              altText: 'Brasso Metal Polish Wadding, 75g (Granule)',
              width: 480,
              height: 379
            }
          }
        }
      ]
    },
    options: [{ id: 'opt-8', name: 'Title', values: ['Default Title'] }],
    seo: { title: 'Brasso Metal Polish Wadding, 75g (Granule)', description: 'Buy Brasso Wadding Granule online' }
  },
  {
    id: 'gid://shopify/Product/9',
    handle: 'brasso-metal-polish-liquid-1l-pack-of-3',
    title: 'Brasso Metal Polish Liquid, 1L (Pack of 3)',
    description: 'Value pack of three 1L bottles. Removes tarnish, oxidation, and dirt.',
    descriptionHtml: '<p>Value pack of three 1L bottles. Removes tarnish, oxidation, and dirt.</p>',
    productType: 'Liquid',
    vendor: 'Brasso',
    tags: ['liquid', 'multipack'],
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount: '39.99', currencyCode: 'GBP' },
      maxVariantPrice: { amount: '39.99', currencyCode: 'GBP' }
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: '39.99', currencyCode: 'GBP' },
      maxVariantPrice: { amount: '39.99', currencyCode: 'GBP' }
    },
    featuredImage: {
      url: '/images/products/brasso-1l-pack-of-3.webp',
      altText: 'Brasso Metal Polish Liquid, 1L (Pack of 3)',
      width: 480,
      height: 441
    },
    images: {
      edges: [
        {
          node: {
            url: '/images/products/brasso-1l-pack-of-3.webp',
            altText: 'Brasso Metal Polish Liquid, 1L (Pack of 3)',
            width: 480,
            height: 441
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/901',
            title: 'Default Title',
            availableForSale: true,
            selectedOptions: [{ name: 'Title', value: 'Default Title' }],
            price: { amount: '39.99', currencyCode: 'GBP' },
            compareAtPrice: null,
            image: {
              url: '/images/products/brasso-1l-pack-of-3.webp',
              altText: 'Brasso Metal Polish Liquid, 1L (Pack of 3)',
              width: 480,
              height: 441
            }
          }
        }
      ]
    },
    options: [{ id: 'opt-9', name: 'Title', values: ['Default Title'] }],
    seo: { title: 'Brasso Metal Polish Liquid, 1L (Pack of 3)', description: 'Buy Brasso Pack of 3 online' }
  },
  {
    id: 'gid://shopify/Product/10',
    handle: 'brasso-metal-polish-gorgeous-gloss-17ml',
    title: 'Brasso Metal Polish - Gorgeous Gloss, 17ml (Box of 4)',
    description: 'Pocket-sized metal polish offering gorgeous gloss with radiant shine and dazzling effect.',
    descriptionHtml: '<p>Pocket-sized metal polish offering gorgeous gloss with radiant shine and dazzling effect.</p>',
    productType: 'Polish',
    vendor: 'Brasso',
    tags: ['polish', 'mini'],
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount: '9.99', currencyCode: 'GBP' },
      maxVariantPrice: { amount: '9.99', currencyCode: 'GBP' }
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: '9.99', currencyCode: 'GBP' },
      maxVariantPrice: { amount: '9.99', currencyCode: 'GBP' }
    },
    featuredImage: {
      url: '/images/products/brasso-175ml-single.png',
      altText: 'Brasso Metal Polish - Gorgeous Gloss, 17ml (Box of 4)',
      width: 318,
      height: 785
    },
    images: {
      edges: [
        {
          node: {
            url: '/images/products/brasso-175ml-single.png',
            altText: 'Brasso Metal Polish - Gorgeous Gloss, 17ml (Box of 4)',
            width: 318,
            height: 785
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/1001',
            title: 'Default Title',
            availableForSale: true,
            selectedOptions: [{ name: 'Title', value: 'Default Title' }],
            price: { amount: '9.99', currencyCode: 'GBP' },
            compareAtPrice: null,
            image: {
              url: '/images/products/brasso-175ml-single.png',
              altText: 'Brasso Metal Polish - Gorgeous Gloss, 17ml (Box of 4)',
              width: 318,
              height: 785
            }
          }
        }
      ]
    },
    options: [{ id: 'opt-10', name: 'Title', values: ['Default Title'] }],
    seo: { title: 'Brasso Metal Polish - Gorgeous Gloss, 17ml (Box of 4)', description: 'Buy Brasso Gorgeous Gloss online' }
  }
]

// Duplicate the base catalog a few times so the storefront has a fuller product grid to browse.
function duplicateProducts(base: ShopifyProduct[], copies: number): ShopifyProduct[] {
  return Array.from({ length: copies }, (_, copyIndex) =>
    base.map((product) => ({
      ...product,
      id: `${product.id}-copy${copyIndex + 1}`,
      handle: `${product.handle}-${copyIndex + 2}`,
      variants: {
        edges: product.variants.edges.map((edge) => ({
          node: {
            ...edge.node,
            id: `${edge.node.id}-copy${copyIndex + 1}`,
          },
        })),
      },
    }))
  ).flat()
}

const MOCK_PRODUCTS: ShopifyProduct[] = [
  ...MOCK_PRODUCTS_BASE,
  ...duplicateProducts(MOCK_PRODUCTS_BASE, 2),
]

const MOCK_COLLECTIONS: ShopifyCollection[] = [
  {
    id: 'gid://shopify/Collection/1',
    handle: 'all-products',
    title: 'All Products',
    description: 'Explore our complete line of Brasso metal care products.',
    image: {
      url: '/images/products/brasso-175ml-single.png',
      altText: 'All Products',
      width: 318,
      height: 785
    },
    products: {
      edges: MOCK_PRODUCTS.map(p => ({ node: p }))
    }
  }
]

const MOCK_SHOP: ShopifyShop = {
  name: 'SHAMAS & SONS',
  description: 'The original shine maker. Restoring brilliant shine to metal surfaces.',
  primaryDomain: { url: 'localhost:3000' },
  brand: {
    logo: {
      image: {
        url: '/logo.png',
        altText: 'SHAMAS & SONS',
        width: 40,
        height: 40
      }
    },
    slogan: 'Bring Back The Brilliance.'
  }
}

async function shopifyFetch<T>({
  query,
  variables = {},
  cache = 'force-cache',
  tags,
}: {
  query: string
  variables?: Record<string, unknown>
  cache?: RequestCache
  tags?: string[]
}): Promise<T> {
  if (!domain || !storefrontToken) {
    throw new Error(
      'Shopify domain and storefront token must be set in environment variables'
    )
  }

  const url = `https://${domain}/api/${apiVersion}/graphql.json`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontToken,
    },
    body: JSON.stringify({ query, variables }),
    cache,
    ...(tags && { next: { tags } }),
  })

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status}`)
  }

  const json = await response.json()

  if (json.errors) {
    throw new Error(json.errors[0]?.message || 'Unknown Shopify error')
  }

  return json.data
}

export async function getShop(): Promise<ShopifyShop> {
  try {
    const data = await shopifyFetch<{ shop: ShopifyShop }>({
      query: getShopQuery,
      tags: ['shop'],
    })
    return data.shop
  } catch {
    return MOCK_SHOP
  }
}

export async function getProducts(options?: {
  first?: number
  sortKey?: string
  reverse?: boolean
  query?: string
}): Promise<ShopifyProduct[]> {
  try {
    const data = await shopifyFetch<{
      products: { edges: { node: ShopifyProduct }[] }
    }>({
      query: getProductsQuery,
      variables: {
        first: options?.first ?? 20,
        sortKey: options?.sortKey ?? 'BEST_SELLING',
        reverse: options?.reverse ?? false,
        query: options?.query,
      },
      tags: ['products'],
    })
    return data.products.edges.map((edge) => edge.node)
  } catch {
    let result = [...MOCK_PRODUCTS]

    // Query & Product Type Filtering
    if (options?.query) {
      const q = options.query.trim().toLowerCase()
      if (q.startsWith('product_type:')) {
        const typeValue = q.replace('product_type:', '').trim().toLowerCase()
        result = result.filter((p) => {
          const pType = p.productType?.toLowerCase() || ''
          const pTags = p.tags?.map((t) => t.toLowerCase()) || []
          return pType.includes(typeValue) || pTags.includes(typeValue) || pTags.some(t => t.includes(typeValue))
        })
      } else if (q.startsWith('tag:')) {
        const tagValue = q.replace('tag:', '').trim().toLowerCase()
        result = result.filter((p) =>
          p.tags?.some((t) => t.toLowerCase() === tagValue)
        )
      } else {
        result = result.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.productType?.toLowerCase().includes(q) ||
            p.tags?.some((t) => t.toLowerCase().includes(q))
        )
      }
    }

    // Sorting
    if (options?.sortKey) {
      const { sortKey, reverse } = options
      result.sort((a, b) => {
        let cmp = 0
        if (sortKey === 'PRICE') {
          const priceA = parseFloat(a.priceRange.minVariantPrice.amount) || 0
          const priceB = parseFloat(b.priceRange.minVariantPrice.amount) || 0
          cmp = priceA - priceB
        } else if (sortKey === 'TITLE') {
          cmp = a.title.localeCompare(b.title)
        } else if (sortKey === 'CREATED_AT') {
          cmp = a.id.localeCompare(b.id)
        } else {
          // BEST_SELLING
          const aIsBest = a.tags?.includes('best-seller') ? 1 : 0
          const bIsBest = b.tags?.includes('best-seller') ? 1 : 0
          cmp = bIsBest - aIsBest
        }
        return reverse ? -cmp : cmp
      })
    }

    return result.slice(0, options?.first ?? 20)
  }
}

export async function getProductByHandle(
  handle: string
): Promise<ShopifyProduct | null> {
  try {
    const data = await shopifyFetch<{ product: ShopifyProduct | null }>({
      query: getProductByHandleQuery,
      variables: { handle },
      tags: ['products', `product-${handle}`],
    })
    return data.product
  } catch {
    return MOCK_PRODUCTS.find((p) => p.handle === handle) || null
  }
}

export async function getCollections(): Promise<ShopifyCollection[]> {
  try {
    const data = await shopifyFetch<{
      collections: { edges: { node: ShopifyCollection }[] }
    }>({
      query: getCollectionsQuery,
      tags: ['collections'],
    })
    return data.collections.edges.map((edge) => edge.node)
  } catch {
    return MOCK_COLLECTIONS
  }
}

export async function getCollectionByHandle(
  handle: string,
  first = 20
): Promise<ShopifyCollection | null> {
  try {
    const data = await shopifyFetch<{ collection: ShopifyCollection | null }>({
      query: getCollectionByHandleQuery,
      variables: { handle, first },
      tags: ['collections', `collection-${handle}`],
    })
    return data.collection
  } catch {
    return MOCK_COLLECTIONS.find((c) => c.handle === handle) || null
  }
}

export async function searchProducts(
  query: string,
  first = 20
): Promise<ShopifyProduct[]> {
  try {
    const data = await shopifyFetch<{
      search: { edges: { node: ShopifyProduct }[] }
    }>({
      query: searchProductsQuery,
      variables: { query, first },
      cache: 'no-store',
    })
    return data.search.edges.map((edge) => edge.node)
  } catch {
    const q = query.toLowerCase()
    return MOCK_PRODUCTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    ).slice(0, first)
  }
}

// Minimal Cart Mock State for Local Testing
let localCart: ShopifyCart = {
  id: 'mock-cart-id',
  checkoutUrl: '#',
  totalQuantity: 0,
  cost: {
    totalAmount: { amount: '0', currencyCode: 'GBP' },
    subtotalAmount: { amount: '0', currencyCode: 'GBP' },
    totalTaxAmount: null,
  },
  lines: { edges: [] },
}

export async function createCart(): Promise<ShopifyCart> {
  try {
    const data = await shopifyFetch<{ cartCreate: { cart: ShopifyCart } }>({
      query: createCartMutation,
      cache: 'no-store',
    })
    return data.cartCreate.cart
  } catch {
    return localCart
  }
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  try {
    const data = await shopifyFetch<{ cart: ShopifyCart | null }>({
      query: getCartQuery,
      variables: { cartId },
      cache: 'no-store',
    })
    return data.cart
  } catch {
    return localCart
  }
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<ShopifyCart> {
  try {
    const data = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCart } }>({
      query: addToCartMutation,
      variables: { cartId, lines },
      cache: 'no-store',
    })
    return data.cartLinesAdd.cart
  } catch {
    lines.forEach((line) => {
      const product = MOCK_PRODUCTS.find((p) =>
        p.variants.edges.some((v) => v.node.id === line.merchandiseId)
      )
      const variant = product?.variants.edges.find(
        (v) => v.node.id === line.merchandiseId
      )?.node

      if (variant && product) {
        const existingLineIdx = localCart.lines.edges.findIndex(
          (edge) => edge.node.merchandise.id === line.merchandiseId
        )

        if (existingLineIdx > -1) {
          localCart.lines.edges[existingLineIdx].node.quantity += line.quantity
        } else {
          localCart.lines.edges.push({
            node: {
              id: `line-${Date.now()}-${Math.random()}`,
              quantity: line.quantity,
              merchandise: {
                id: variant.id,
                title: variant.title,
                selectedOptions: variant.selectedOptions,
                product: {
                  id: product.id,
                  handle: product.handle,
                  title: product.title,
                  featuredImage: product.featuredImage,
                },
                price: variant.price,
                compareAtPrice: variant.compareAtPrice,
              },
            },
          })
        }
      }
    })

    recalculateLocalCart()
    return localCart
  }
}

export async function updateCart(
  cartId: string,
  lines: { id: string; quantity: number }[]
): Promise<ShopifyCart> {
  try {
    const data = await shopifyFetch<{ cartLinesUpdate: { cart: ShopifyCart } }>({
      query: updateCartMutation,
      variables: { cartId, lines },
      cache: 'no-store',
    })
    return data.cartLinesUpdate.cart
  } catch {
    lines.forEach((line) => {
      const idx = localCart.lines.edges.findIndex((edge) => edge.node.id === line.id)
      if (idx > -1) {
        if (line.quantity <= 0) {
          localCart.lines.edges.splice(idx, 1)
        } else {
          localCart.lines.edges[idx].node.quantity = line.quantity
        }
      }
    })
    recalculateLocalCart()
    return localCart
  }
}

export async function removeFromCart(
  cartId: string,
  lineIds: string[]
): Promise<ShopifyCart> {
  try {
    const data = await shopifyFetch<{ cartLinesRemove: { cart: ShopifyCart } }>({
      query: removeFromCartMutation,
      variables: { cartId, lineIds },
      cache: 'no-store',
    })
    return data.cartLinesRemove.cart
  } catch {
    localCart.lines.edges = localCart.lines.edges.filter(
      (edge) => !lineIds.includes(edge.node.id)
    )
    recalculateLocalCart()
    return localCart
  }
}

export async function getFeaturedProducts(
  first = 8
): Promise<ShopifyProduct[]> {
  try {
    const data = await shopifyFetch<{
      products: { edges: { node: ShopifyProduct }[] }
    }>({
      query: getFeaturedProductsQuery,
      variables: { first },
      tags: ['products', 'featured'],
    })
    return data.products.edges.map((edge) => edge.node)
  } catch {
    return MOCK_PRODUCTS.slice(0, first)
  }
}

export async function getPage(handle: string): Promise<ShopifyPage | null> {
  try {
    const data = await shopifyFetch<{ page: ShopifyPage | null }>({
      query: getPageQuery,
      variables: { handle },
      tags: ['pages', `page-${handle}`],
    })
    return data.page
  } catch {
    return null
  }
}

function recalculateLocalCart() {
  let totalQuantity = 0
  let subtotal = 0

  localCart.lines.edges.forEach((edge) => {
    totalQuantity += edge.node.quantity
    subtotal += parseFloat(edge.node.merchandise.price.amount) * edge.node.quantity
  })

  localCart.totalQuantity = totalQuantity
  localCart.cost = {
    totalAmount: { amount: subtotal.toFixed(2), currencyCode: 'GBP' },
    subtotalAmount: { amount: subtotal.toFixed(2), currencyCode: 'GBP' },
    totalTaxAmount: null,
  }
}
