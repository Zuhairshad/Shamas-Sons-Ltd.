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

const MOCK_PRODUCTS: ShopifyProduct[] = [
  {
    id: 'gid://shopify/Product/B002G0BULU',
    handle: 'shamas-metal-polish-175ml-b002g0bulu',
    title: 'Shamas & Sons Metal Polish, 175 ml',
    description: 'Liquid metal polish for brass, copper, chrome, and stainless steel. Restores brilliance and protects against tarnish.',
    descriptionHtml: '<p>Liquid metal polish for brass, copper, chrome, and stainless steel. Restores brilliance and protects against tarnish.</p>',
    productType: 'Liquid',
    vendor: 'Shamas & Sons',
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
      url: 'https://m.media-amazon.com/images/I/61Ah67TnasL._AC_UL960_FMwebp_QL65_.jpg',
      altText: 'Shamas & Sons Metal Polish, 175 ml',
      width: 480,
      height: 480
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://m.media-amazon.com/images/I/61Ah67TnasL._AC_UL960_FMwebp_QL65_.jpg',
            altText: 'Shamas & Sons Metal Polish, 175 ml',
            width: 480,
            height: 480
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/v-B002G0BULU',
            title: '175 ml',
            availableForSale: true,
            selectedOptions: [{ name: 'Size', value: '175 ml' }],
            price: { amount: '5.99', currencyCode: 'GBP' },
            compareAtPrice: { amount: '6.99', currencyCode: 'GBP' },
            image: {
              url: 'https://m.media-amazon.com/images/I/61Ah67TnasL._AC_UL960_FMwebp_QL65_.jpg',
              altText: 'Shamas & Sons Metal Polish, 175 ml',
              width: 480,
              height: 480
            }
          }
        }
      ]
    },
    options: [{ id: 'opt-1', name: 'Size', values: ['175 ml'] }],
    seo: { title: 'Shamas & Sons Metal Polish, 175 ml', description: 'Buy Shamas & Sons Metal Polish 175ml online' }
  },
  {
    id: 'gid://shopify/Product/B00BE27CYK',
    handle: 'shamas-metal-polish-wadding-75g-b00be27cyk',
    title: 'Shamas & Sons Metal Polish Wadding, 75g',
    description: 'Pre-soaked cotton wadding for easy tarnish removal and shine restoration. No liquid spills, easy to use.',
    descriptionHtml: '<p>Pre-soaked cotton wadding for easy tarnish removal and shine restoration. No liquid spills, easy to use.</p>',
    productType: 'Wipe',
    vendor: 'Shamas & Sons',
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
      url: 'https://m.media-amazon.com/images/I/71hkhaLTBzL._AC_UL960_FMwebp_QL65_.jpg',
      altText: 'Shamas & Sons Metal Polish Wadding, 75g',
      width: 480,
      height: 480
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://m.media-amazon.com/images/I/71hkhaLTBzL._AC_UL960_FMwebp_QL65_.jpg',
            altText: 'Shamas & Sons Metal Polish Wadding, 75g',
            width: 480,
            height: 480
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/v-B00BE27CYK',
            title: '75g',
            availableForSale: true,
            selectedOptions: [{ name: 'Size', value: '75g' }],
            price: { amount: '4.99', currencyCode: 'GBP' },
            compareAtPrice: { amount: '5.99', currencyCode: 'GBP' },
            image: {
              url: 'https://m.media-amazon.com/images/I/71hkhaLTBzL._AC_UL960_FMwebp_QL65_.jpg',
              altText: 'Shamas & Sons Metal Polish Wadding, 75g',
              width: 480,
              height: 480
            }
          }
        }
      ]
    },
    options: [{ id: 'opt-2', name: 'Size', values: ['75g'] }],
    seo: { title: 'Shamas & Sons Metal Polish Wadding, 75g', description: 'Buy Shamas & Sons Metal Polish Wadding online' }
  },
  {
    id: 'gid://shopify/Product/B01EX17UHM',
    handle: 'shamas-metal-polish-175ml-pack-of-2-b01ex17uhm',
    title: 'Shamas & Sons Metal Polish 175ml (Pack of 2)',
    description: 'Value twin-pack of 175ml bottles. Restores brilliance and delivers long-lasting protection across all household metals.',
    descriptionHtml: '<p>Value twin-pack of 175ml bottles. Restores brilliance and delivers long-lasting protection across all household metals.</p>',
    productType: 'Liquid',
    vendor: 'Shamas & Sons',
    tags: ['liquid', 'multipack'],
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount: '9.99', currencyCode: 'GBP' },
      maxVariantPrice: { amount: '9.99', currencyCode: 'GBP' }
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: '11.98', currencyCode: 'GBP' },
      maxVariantPrice: { amount: '11.98', currencyCode: 'GBP' }
    },
    featuredImage: {
      url: 'https://m.media-amazon.com/images/I/81CfGXgkE-L._AC_UL960_FMwebp_QL65_.jpg',
      altText: 'Shamas & Sons Metal Polish 175ml (Pack of 2)',
      width: 480,
      height: 480
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://m.media-amazon.com/images/I/81CfGXgkE-L._AC_UL960_FMwebp_QL65_.jpg',
            altText: 'Shamas & Sons Metal Polish 175ml (Pack of 2)',
            width: 480,
            height: 480
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/v-B01EX17UHM',
            title: 'Pack of 2',
            availableForSale: true,
            selectedOptions: [{ name: 'Format', value: 'Pack of 2' }],
            price: { amount: '9.99', currencyCode: 'GBP' },
            compareAtPrice: { amount: '11.98', currencyCode: 'GBP' },
            image: {
              url: 'https://m.media-amazon.com/images/I/81CfGXgkE-L._AC_UL960_FMwebp_QL65_.jpg',
              altText: 'Shamas & Sons Metal Polish 175ml (Pack of 2)',
              width: 480,
              height: 480
            }
          }
        }
      ]
    },
    options: [{ id: 'opt-3', name: 'Format', values: ['Pack of 2'] }],
    seo: { title: 'Shamas & Sons Metal Polish 175ml (Pack of 2)', description: 'Buy Shamas & Sons Metal Polish Twin Pack online' }
  },
  {
    id: 'gid://shopify/Product/B0798LB9KW',
    handle: 'shamas-b150-metal-polish-150ml-b0798lb9kw',
    title: 'Shamas & Sons B150 Metal Polish, 150 mL',
    description: 'Classic metal polish liquid in a 150ml container. Removes stubborn tarnish, oxidation, and dirt effortlessly.',
    descriptionHtml: '<p>Classic metal polish liquid in a 150ml container. Removes stubborn tarnish, oxidation, and dirt effortlessly.</p>',
    productType: 'Liquid',
    vendor: 'Shamas & Sons',
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
      url: 'https://m.media-amazon.com/images/I/61Syipok7KL._AC_UL960_FMwebp_QL65_.jpg',
      altText: 'Shamas & Sons B150 Metal Polish, 150 mL',
      width: 480,
      height: 480
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://m.media-amazon.com/images/I/61Syipok7KL._AC_UL960_FMwebp_QL65_.jpg',
            altText: 'Shamas & Sons B150 Metal Polish, 150 mL',
            width: 480,
            height: 480
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/v-B0798LB9KW',
            title: '150 mL',
            availableForSale: true,
            selectedOptions: [{ name: 'Size', value: '150 mL' }],
            price: { amount: '5.49', currencyCode: 'GBP' },
            compareAtPrice: null,
            image: {
              url: 'https://m.media-amazon.com/images/I/61Syipok7KL._AC_UL960_FMwebp_QL65_.jpg',
              altText: 'Shamas & Sons B150 Metal Polish, 150 mL',
              width: 480,
              height: 480
            }
          }
        }
      ]
    },
    options: [{ id: 'opt-4', name: 'Size', values: ['150 mL'] }],
    seo: { title: 'Shamas & Sons B150 Metal Polish, 150 mL', description: 'Buy Shamas & Sons B150 Metal Polish online' }
  },
  {
    id: 'gid://shopify/Product/B0CSXLR79Q',
    handle: 'shamas-metal-polish-liquid-1l-pack-of-2-b0csxlr79q',
    title: 'Shamas & Sons Metal Polish Liquid, 1L (Pack of 2)',
    description: 'Professional-grade bulk pack for larger restoration projects. Ideal for commercial bars, hospitality, and workshops.',
    descriptionHtml: '<p>Professional-grade bulk pack for larger restoration projects. Ideal for commercial bars, hospitality, and workshops.</p>',
    productType: 'Liquid',
    vendor: 'Shamas & Sons',
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
      url: 'https://m.media-amazon.com/images/I/712oFUjZ0zL._AC_UL960_FMwebp_QL65_.jpg',
      altText: 'Shamas & Sons Metal Polish Liquid, 1L (Pack of 2)',
      width: 480,
      height: 480
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://m.media-amazon.com/images/I/712oFUjZ0zL._AC_UL960_FMwebp_QL65_.jpg',
            altText: 'Shamas & Sons Metal Polish Liquid, 1L (Pack of 2)',
            width: 480,
            height: 480
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/v-B0CSXLR79Q',
            title: '1L Pack of 2',
            availableForSale: true,
            selectedOptions: [{ name: 'Size', value: '1L Pack of 2' }],
            price: { amount: '28.99', currencyCode: 'GBP' },
            compareAtPrice: { amount: '34.99', currencyCode: 'GBP' },
            image: {
              url: 'https://m.media-amazon.com/images/I/712oFUjZ0zL._AC_UL960_FMwebp_QL65_.jpg',
              altText: 'Shamas & Sons Metal Polish Liquid, 1L (Pack of 2)',
              width: 480,
              height: 480
            }
          }
        }
      ]
    },
    options: [{ id: 'opt-5', name: 'Size', values: ['1L Pack of 2'] }],
    seo: { title: 'Shamas & Sons Metal Polish Liquid, 1L (Pack of 2)', description: 'Buy Shamas & Sons Bulk Liquid 1L Pack online' }
  },
  {
    id: 'gid://shopify/Product/B0082AA2G2',
    handle: 'shamas-metal-polish-liquid-175ml-pack-of-4-b0082aa2g2',
    title: 'Shamas & Sons Metal Polish Liquid 175ml, Pack of 4',
    description: 'Value multipack containing four 175ml bottles. Trusted British formula providing long-lasting shine.',
    descriptionHtml: '<p>Value multipack containing four 175ml bottles. Trusted British formula providing long-lasting shine.</p>',
    productType: 'Liquid',
    vendor: 'Shamas & Sons',
    tags: ['liquid', 'multipack', 'best-seller'],
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
      url: 'https://m.media-amazon.com/images/I/815fhQPtz9L._AC_UL960_FMwebp_QL65_.jpg',
      altText: 'Shamas & Sons Metal Polish Liquid 175ml, Pack of 4',
      width: 480,
      height: 480
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://m.media-amazon.com/images/I/815fhQPtz9L._AC_UL960_FMwebp_QL65_.jpg',
            altText: 'Shamas & Sons Metal Polish Liquid 175ml, Pack of 4',
            width: 480,
            height: 480
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/v-B0082AA2G2',
            title: 'Pack of 4',
            availableForSale: true,
            selectedOptions: [{ name: 'Format', value: 'Pack of 4' }],
            price: { amount: '19.99', currencyCode: 'GBP' },
            compareAtPrice: { amount: '23.96', currencyCode: 'GBP' },
            image: {
              url: 'https://m.media-amazon.com/images/I/815fhQPtz9L._AC_UL960_FMwebp_QL65_.jpg',
              altText: 'Shamas & Sons Metal Polish Liquid 175ml, Pack of 4',
              width: 480,
              height: 480
            }
          }
        }
      ]
    },
    options: [{ id: 'opt-6', name: 'Format', values: ['Pack of 4'] }],
    seo: { title: 'Shamas & Sons Metal Polish Liquid 175ml, Pack of 4', description: 'Buy Shamas & Sons 175ml Pack of 4 online' }
  },
  {
    id: 'gid://shopify/Product/B01MYENZTJ',
    handle: 'shamas-0592-w-wadding-75g-b01myenztj',
    title: 'Shamas & Sons 0592-W Wadding, 75g',
    description: 'Gel format wadding canister providing a gorgeous gloss with radiant shine and dazzling effect.',
    descriptionHtml: '<p>Gel format wadding canister providing a gorgeous gloss with radiant shine and dazzling effect.</p>',
    productType: 'Gel',
    vendor: 'Shamas & Sons',
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
      url: 'https://m.media-amazon.com/images/I/71Oedp3OsNL._AC_UL960_FMwebp_QL65_.jpg',
      altText: 'Shamas & Sons 0592-W Wadding, 75g',
      width: 480,
      height: 480
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://m.media-amazon.com/images/I/71Oedp3OsNL._AC_UL960_FMwebp_QL65_.jpg',
            altText: 'Shamas & Sons 0592-W Wadding, 75g',
            width: 480,
            height: 480
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/v-B01MYENZTJ',
            title: '75g Gel Canister',
            availableForSale: true,
            selectedOptions: [{ name: 'Size', value: '75g Gel Canister' }],
            price: { amount: '5.29', currencyCode: 'GBP' },
            compareAtPrice: null,
            image: {
              url: 'https://m.media-amazon.com/images/I/71Oedp3OsNL._AC_UL960_FMwebp_QL65_.jpg',
              altText: 'Shamas & Sons 0592-W Wadding, 75g',
              width: 480,
              height: 480
            }
          }
        }
      ]
    },
    options: [{ id: 'opt-7', name: 'Size', values: ['75g Gel Canister'] }],
    seo: { title: 'Shamas & Sons 0592-W Wadding, 75g', description: 'Buy Shamas & Sons 0592-W Gel Wadding online' }
  },
  {
    id: 'gid://shopify/Product/B004G8YNIM',
    handle: 'shamas-metal-polish-wadding-75g-granule-b004g8ynim',
    title: 'Shamas & Sons Metal Polish Wadding, 75g (Granule)',
    description: 'Special wadding formulation with micro-abrasive cleaning granules for extra tough tarnish removal.',
    descriptionHtml: '<p>Special wadding formulation with micro-abrasive cleaning granules for extra tough tarnish removal.</p>',
    productType: 'Granule',
    vendor: 'Shamas & Sons',
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
      url: 'https://m.media-amazon.com/images/I/71a0vxYvO0L._AC_UL960_FMwebp_QL65_.jpg',
      altText: 'Shamas & Sons Metal Polish Wadding, 75g (Granule)',
      width: 480,
      height: 480
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://m.media-amazon.com/images/I/71a0vxYvO0L._AC_UL960_FMwebp_QL65_.jpg',
            altText: 'Shamas & Sons Metal Polish Wadding, 75g (Granule)',
            width: 480,
            height: 480
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/v-B004G8YNIM',
            title: '75g Granule',
            availableForSale: true,
            selectedOptions: [{ name: 'Size', value: '75g Granule' }],
            price: { amount: '5.49', currencyCode: 'GBP' },
            compareAtPrice: null,
            image: {
              url: 'https://m.media-amazon.com/images/I/71a0vxYvO0L._AC_UL960_FMwebp_QL65_.jpg',
              altText: 'Shamas & Sons Metal Polish Wadding, 75g (Granule)',
              width: 480,
              height: 480
            }
          }
        }
      ]
    },
    options: [{ id: 'opt-8', name: 'Size', values: ['75g Granule'] }],
    seo: { title: 'Shamas & Sons Metal Polish Wadding, 75g (Granule)', description: 'Buy Shamas & Sons Wadding Granule online' }
  },
  {
    id: 'gid://shopify/Product/B0F94NH8V2',
    handle: 'shamas-liquid-1-litre-06135-b0f94nh8v2',
    title: 'Shamas & Sons Liquid 1 Litre 06135',
    description: 'High-volume 1-litre metal polish liquid for large surfaces, heritage fixtures, and professional restoration.',
    descriptionHtml: '<p>High-volume 1-litre metal polish liquid for large surfaces, heritage fixtures, and professional restoration.</p>',
    productType: 'Liquid',
    vendor: 'Shamas & Sons',
    tags: ['liquid', 'bulk', 'professional'],
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount: '15.99', currencyCode: 'GBP' },
      maxVariantPrice: { amount: '15.99', currencyCode: 'GBP' }
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: '15.99', currencyCode: 'GBP' },
      maxVariantPrice: { amount: '15.99', currencyCode: 'GBP' }
    },
    featuredImage: {
      url: 'https://m.media-amazon.com/images/I/21dsfMRmviL._AC_UL400_FMwebp_QL65_.jpg',
      altText: 'Shamas & Sons Liquid 1 Litre 06135',
      width: 400,
      height: 400
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://m.media-amazon.com/images/I/21dsfMRmviL._AC_UL400_FMwebp_QL65_.jpg',
            altText: 'Shamas & Sons Liquid 1 Litre 06135',
            width: 400,
            height: 400
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/v-B0F94NH8V2',
            title: '1 Litre',
            availableForSale: true,
            selectedOptions: [{ name: 'Size', value: '1 Litre' }],
            price: { amount: '15.99', currencyCode: 'GBP' },
            compareAtPrice: null,
            image: {
              url: 'https://m.media-amazon.com/images/I/21dsfMRmviL._AC_UL400_FMwebp_QL65_.jpg',
              altText: 'Shamas & Sons Liquid 1 Litre 06135',
              width: 400,
              height: 400
            }
          }
        }
      ]
    },
    options: [{ id: 'opt-9', name: 'Size', values: ['1 Litre'] }],
    seo: { title: 'Shamas & Sons Liquid 1 Litre 06135', description: 'Buy Shamas & Sons Liquid 1 Litre online' }
  },
  {
    id: 'gid://shopify/Product/B0CKXX6YCY',
    handle: 'shamas-metal-polish-175ml-pack-of-6-b0ckxx6ycy',
    title: 'Shamas & Sons Metal Polish, 175 ml (Pack of 6)',
    description: 'Bulk 6-pack of 175ml bottles. The ultimate supply for workshops, cleaners, and regular brass care.',
    descriptionHtml: '<p>Bulk 6-pack of 175ml bottles. The ultimate supply for workshops, cleaners, and regular brass care.</p>',
    productType: 'Liquid',
    vendor: 'Shamas & Sons',
    tags: ['liquid', 'multipack'],
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount: '27.99', currencyCode: 'GBP' },
      maxVariantPrice: { amount: '27.99', currencyCode: 'GBP' }
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: '35.94', currencyCode: 'GBP' },
      maxVariantPrice: { amount: '35.94', currencyCode: 'GBP' }
    },
    featuredImage: {
      url: 'https://m.media-amazon.com/images/I/810n3lfq1zL._AC_UL960_FMwebp_QL65_.jpg',
      altText: 'Shamas & Sons Metal Polish, 175 ml (Pack of 6)',
      width: 480,
      height: 480
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://m.media-amazon.com/images/I/810n3lfq1zL._AC_UL960_FMwebp_QL65_.jpg',
            altText: 'Shamas & Sons Metal Polish, 175 ml (Pack of 6)',
            width: 480,
            height: 480
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/v-B0CKXX6YCY',
            title: 'Pack of 6',
            availableForSale: true,
            selectedOptions: [{ name: 'Format', value: 'Pack of 6' }],
            price: { amount: '27.99', currencyCode: 'GBP' },
            compareAtPrice: { amount: '35.94', currencyCode: 'GBP' },
            image: {
              url: 'https://m.media-amazon.com/images/I/810n3lfq1zL._AC_UL960_FMwebp_QL65_.jpg',
              altText: 'Shamas & Sons Metal Polish, 175 ml (Pack of 6)',
              width: 480,
              height: 480
            }
          }
        }
      ]
    },
    options: [{ id: 'opt-10', name: 'Format', values: ['Pack of 6'] }],
    seo: { title: 'Shamas & Sons Metal Polish, 175 ml (Pack of 6)', description: 'Buy Shamas & Sons Metal Polish Pack of 6 online' }
  },
  {
    id: 'gid://shopify/Product/B0CKXVG728',
    handle: 'shamas-metal-polish-175ml-pack-of-3-b0ckxvg728',
    title: 'Shamas & Sons Metal Polish, 175 ml (Pack of 3)',
    description: 'Convenient 3-pack bundle of 175ml bottles. Great savings for multi-room home cleaning.',
    descriptionHtml: '<p>Convenient 3-pack bundle of 175ml bottles. Great savings for multi-room home cleaning.</p>',
    productType: 'Liquid',
    vendor: 'Shamas & Sons',
    tags: ['liquid', 'multipack'],
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount: '14.99', currencyCode: 'GBP' },
      maxVariantPrice: { amount: '14.99', currencyCode: 'GBP' }
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: '17.97', currencyCode: 'GBP' },
      maxVariantPrice: { amount: '17.97', currencyCode: 'GBP' }
    },
    featuredImage: {
      url: 'https://m.media-amazon.com/images/I/81tTDD9PnEL._AC_UL960_FMwebp_QL65_.jpg',
      altText: 'Shamas & Sons Metal Polish, 175 ml (Pack of 3)',
      width: 480,
      height: 480
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://m.media-amazon.com/images/I/81tTDD9PnEL._AC_UL960_FMwebp_QL65_.jpg',
            altText: 'Shamas & Sons Metal Polish, 175 ml (Pack of 3)',
            width: 480,
            height: 480
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/v-B0CKXVG728',
            title: 'Pack of 3',
            availableForSale: true,
            selectedOptions: [{ name: 'Format', value: 'Pack of 3' }],
            price: { amount: '14.99', currencyCode: 'GBP' },
            compareAtPrice: { amount: '17.97', currencyCode: 'GBP' },
            image: {
              url: 'https://m.media-amazon.com/images/I/81tTDD9PnEL._AC_UL960_FMwebp_QL65_.jpg',
              altText: 'Shamas & Sons Metal Polish, 175 ml (Pack of 3)',
              width: 480,
              height: 480
            }
          }
        }
      ]
    },
    options: [{ id: 'opt-11', name: 'Format', values: ['Pack of 3'] }],
    seo: { title: 'Shamas & Sons Metal Polish, 175 ml (Pack of 3)', description: 'Buy Shamas & Sons 175ml 3-Pack online' }
  },
  {
    id: 'gid://shopify/Product/B007BM7POO',
    handle: 'shamas-metal-polish-liquid-175ml-pack-of-8-b007bm7poo',
    title: 'Shamas & Sons Metal Polish Liquid 175ml Pack of 8',
    description: 'Wholesale 8-pack of 175ml bottles. Designed for property managers, cleaners, and restorers.',
    descriptionHtml: '<p>Wholesale 8-pack of 175ml bottles. Designed for property managers, cleaners, and restorers.</p>',
    productType: 'Liquid',
    vendor: 'Shamas & Sons',
    tags: ['liquid', 'multipack', 'bulk'],
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount: '36.99', currencyCode: 'GBP' },
      maxVariantPrice: { amount: '36.99', currencyCode: 'GBP' }
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: '47.92', currencyCode: 'GBP' },
      maxVariantPrice: { amount: '47.92', currencyCode: 'GBP' }
    },
    featuredImage: {
      url: 'https://m.media-amazon.com/images/I/81+Nd-3WPbL._AC_UL960_FMwebp_QL65_.jpg',
      altText: 'Shamas & Sons Metal Polish Liquid 175ml Pack of 8',
      width: 480,
      height: 480
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://m.media-amazon.com/images/I/81+Nd-3WPbL._AC_UL960_FMwebp_QL65_.jpg',
            altText: 'Shamas & Sons Metal Polish Liquid 175ml Pack of 8',
            width: 480,
            height: 480
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/v-B007BM7POO',
            title: 'Pack of 8',
            availableForSale: true,
            selectedOptions: [{ name: 'Format', value: 'Pack of 8' }],
            price: { amount: '36.99', currencyCode: 'GBP' },
            compareAtPrice: { amount: '47.92', currencyCode: 'GBP' },
            image: {
              url: 'https://m.media-amazon.com/images/I/81+Nd-3WPbL._AC_UL960_FMwebp_QL65_.jpg',
              altText: 'Shamas & Sons Metal Polish Liquid 175ml Pack of 8',
              width: 480,
              height: 480
            }
          }
        }
      ]
    },
    options: [{ id: 'opt-12', name: 'Format', values: ['Pack of 8'] }],
    seo: { title: 'Shamas & Sons Metal Polish Liquid 175ml Pack of 8', description: 'Buy Shamas & Sons 175ml 8-Pack online' }
  },
  {
    id: 'gid://shopify/Product/B0D1KVC63X',
    handle: 'shamas-metal-polish-wadding-12x75g-b0d1kvc63x',
    title: 'Shamas & Sons Metal Polish Wadding 12 x 75g',
    description: 'Bulk case of 12 x 75g tins. Pre-soaked cotton wadding for mess-free tarnish removal on copper, brass, chrome, and steel.',
    descriptionHtml: '<p>Bulk case of 12 x 75g tins. Pre-soaked cotton wadding for mess-free tarnish removal on copper, brass, chrome, and steel.</p>',
    productType: 'Wipe',
    vendor: 'Shamas & Sons',
    tags: ['wadding', 'wipe', 'bulk'],
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount: '49.99', currencyCode: 'GBP' },
      maxVariantPrice: { amount: '49.99', currencyCode: 'GBP' }
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: '59.88', currencyCode: 'GBP' },
      maxVariantPrice: { amount: '59.88', currencyCode: 'GBP' }
    },
    featuredImage: {
      url: 'https://m.media-amazon.com/images/I/81bODTX2BKL._AC_UL960_FMwebp_QL65_.jpg',
      altText: 'Shamas & Sons Metal Polish Wadding 12 x 75g',
      width: 480,
      height: 480
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://m.media-amazon.com/images/I/81bODTX2BKL._AC_UL960_FMwebp_QL65_.jpg',
            altText: 'Shamas & Sons Metal Polish Wadding 12 x 75g',
            width: 480,
            height: 480
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/v-B0D1KVC63X',
            title: '12 x 75g Box',
            availableForSale: true,
            selectedOptions: [{ name: 'Size', value: '12 x 75g Box' }],
            price: { amount: '49.99', currencyCode: 'GBP' },
            compareAtPrice: { amount: '59.88', currencyCode: 'GBP' },
            image: {
              url: 'https://m.media-amazon.com/images/I/81bODTX2BKL._AC_UL960_FMwebp_QL65_.jpg',
              altText: 'Shamas & Sons Metal Polish Wadding 12 x 75g',
              width: 480,
              height: 480
            }
          }
        }
      ]
    },
    options: [{ id: 'opt-13', name: 'Size', values: ['12 x 75g Box'] }],
    seo: { title: 'Shamas & Sons Metal Polish Wadding 12 x 75g', description: 'Buy Shamas & Sons Wadding 12-Pack Bulk Case online' }
  },
  {
    id: 'gid://shopify/Product/B00BONJE5Y',
    handle: 'shamas-metal-polish-gorgeous-gloss-17ml-box-of-4-b00bonje5y',
    title: 'Shamas & Sons Metal Polish - Gorgeous Gloss 17ml (Box of 4)',
    description: 'Pocket-sized metal polish offering gorgeous gloss with radiant shine and dazzling effect.',
    descriptionHtml: '<p>Pocket-sized metal polish offering gorgeous gloss with radiant shine and dazzling effect.</p>',
    productType: 'Polish',
    vendor: 'Shamas & Sons',
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
      url: 'https://m.media-amazon.com/images/I/815fhQPtz9L._AC_UL960_FMwebp_QL65_.jpg',
      altText: 'Shamas & Sons Metal Polish - Gorgeous Gloss 17ml (Box of 4)',
      width: 480,
      height: 480
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://m.media-amazon.com/images/I/815fhQPtz9L._AC_UL960_FMwebp_QL65_.jpg',
            altText: 'Shamas & Sons Metal Polish - Gorgeous Gloss 17ml (Box of 4)',
            width: 480,
            height: 480
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/v-B00BONJE5Y',
            title: 'Box of 4',
            availableForSale: true,
            selectedOptions: [{ name: 'Size', value: 'Box of 4' }],
            price: { amount: '9.99', currencyCode: 'GBP' },
            compareAtPrice: null,
            image: {
              url: 'https://m.media-amazon.com/images/I/815fhQPtz9L._AC_UL960_FMwebp_QL65_.jpg',
              altText: 'Shamas & Sons Metal Polish - Gorgeous Gloss 17ml (Box of 4)',
              width: 480,
              height: 480
            }
          }
        }
      ]
    },
    options: [{ id: 'opt-14', name: 'Size', values: ['Box of 4'] }],
    seo: { title: 'Shamas & Sons Metal Polish - Gorgeous Gloss 17ml (Box of 4)', description: 'Buy Shamas & Sons Gorgeous Gloss Box of 4 online' }
  },
  {
    id: 'gid://shopify/Product/B0DB219PB9',
    handle: 'shamas-metal-polish-liquid-1l-pack-of-3-b0db219pb9',
    title: 'Shamas & Sons Metal Polish Liquid, 1L (Pack of 3)',
    description: 'Bulk 3-pack of 1L bottles. Ideal for heavy metal cleaning, industrial upkeep, and commercial environments.',
    descriptionHtml: '<p>Bulk 3-pack of 1L bottles. Ideal for heavy metal cleaning, industrial upkeep, and commercial environments.</p>',
    productType: 'Liquid',
    vendor: 'Shamas & Sons',
    tags: ['liquid', 'bulk', 'multipack'],
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount: '39.99', currencyCode: 'GBP' },
      maxVariantPrice: { amount: '39.99', currencyCode: 'GBP' }
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: '47.99', currencyCode: 'GBP' },
      maxVariantPrice: { amount: '47.99', currencyCode: 'GBP' }
    },
    featuredImage: {
      url: 'https://m.media-amazon.com/images/I/81MwbVMEh4L._AC_UL960_FMwebp_QL65_.jpg',
      altText: 'Shamas & Sons Metal Polish Liquid, 1L (Pack of 3)',
      width: 480,
      height: 480
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://m.media-amazon.com/images/I/81MwbVMEh4L._AC_UL960_FMwebp_QL65_.jpg',
            altText: 'Shamas & Sons Metal Polish Liquid, 1L (Pack of 3)',
            width: 480,
            height: 480
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/v-B0DB219PB9',
            title: '1L Pack of 3',
            availableForSale: true,
            selectedOptions: [{ name: 'Size', value: '1L Pack of 3' }],
            price: { amount: '39.99', currencyCode: 'GBP' },
            compareAtPrice: { amount: '47.99', currencyCode: 'GBP' },
            image: {
              url: 'https://m.media-amazon.com/images/I/81MwbVMEh4L._AC_UL960_FMwebp_QL65_.jpg',
              altText: 'Shamas & Sons Metal Polish Liquid, 1L (Pack of 3)',
              width: 480,
              height: 480
            }
          }
        }
      ]
    },
    options: [{ id: 'opt-15', name: 'Size', values: ['1L Pack of 3'] }],
    seo: { title: 'Shamas & Sons Metal Polish Liquid, 1L (Pack of 3)', description: 'Buy Shamas & Sons 1L Pack of 3 online' }
  },
  {
    id: 'gid://shopify/Product/B07MMFXSM6',
    handle: 'shamas-metal-polish-liquid-175ml-multi-metal-restorer-b07mmfxsm6',
    title: 'Shamas & Sons Metal Polish Liquid 175ml (Multi-Metal Restorer)',
    description: 'Restores shine on brass, copper, stainless steel, chrome & pewter. Removes tarnish, oxidation & dirt effortlessly.',
    descriptionHtml: '<p>Restores shine on brass, copper, stainless steel, chrome & pewter. Removes tarnish, oxidation & dirt effortlessly.</p>',
    productType: 'Liquid',
    vendor: 'Shamas & Sons',
    tags: ['liquid', 'polish', 'restorer'],
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount: '6.49', currencyCode: 'GBP' },
      maxVariantPrice: { amount: '6.49', currencyCode: 'GBP' }
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: '6.49', currencyCode: 'GBP' },
      maxVariantPrice: { amount: '6.49', currencyCode: 'GBP' }
    },
    featuredImage: {
      url: 'https://m.media-amazon.com/images/I/61Syipok7KL._AC_UL960_FMwebp_QL65_.jpg',
      altText: 'Shamas & Sons Metal Polish Liquid 175ml (Multi-Metal Restorer)',
      width: 480,
      height: 480
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://m.media-amazon.com/images/I/61Syipok7KL._AC_UL960_FMwebp_QL65_.jpg',
            altText: 'Shamas & Sons Metal Polish Liquid 175ml (Multi-Metal Restorer)',
            width: 480,
            height: 480
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/v-B07MMFXSM6',
            title: '175 ml',
            availableForSale: true,
            selectedOptions: [{ name: 'Size', value: '175 ml' }],
            price: { amount: '6.49', currencyCode: 'GBP' },
            compareAtPrice: null,
            image: {
              url: 'https://m.media-amazon.com/images/I/61Syipok7KL._AC_UL960_FMwebp_QL65_.jpg',
              altText: 'Shamas & Sons Metal Polish Liquid 175ml (Multi-Metal Restorer)',
              width: 480,
              height: 480
            }
          }
        }
      ]
    },
    options: [{ id: 'opt-16', name: 'Size', values: ['175 ml'] }],
    seo: { title: 'Shamas & Sons Metal Polish Liquid 175ml (Multi-Metal Restorer)', description: 'Buy Shamas & Sons Metal Polish Restorer 175ml online' }
  },
  {
    id: 'gid://shopify/Product/B0044RRNIM',
    handle: 'shamas-gadgetcare-50ml-b0044rrnim',
    title: 'Shamas & Sons GadgetCare 50 ml',
    description: 'Specialized precision cleaner for electronics, smooth metals, screens, and fine handheld gadgets.',
    descriptionHtml: '<p>Specialized precision cleaner for electronics, smooth metals, screens, and fine handheld gadgets.</p>',
    productType: 'Liquid',
    vendor: 'Shamas & Sons',
    tags: ['liquid', 'gadgetcare', 'precision'],
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount: '8.99', currencyCode: 'GBP' },
      maxVariantPrice: { amount: '8.99', currencyCode: 'GBP' }
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: '8.99', currencyCode: 'GBP' },
      maxVariantPrice: { amount: '8.99', currencyCode: 'GBP' }
    },
    featuredImage: {
      url: 'https://m.media-amazon.com/images/I/61KNUNXpJEL._AC_UL960_FMwebp_QL65_.jpg',
      altText: 'Shamas & Sons GadgetCare 50 ml',
      width: 480,
      height: 480
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://m.media-amazon.com/images/I/61KNUNXpJEL._AC_UL960_FMwebp_QL65_.jpg',
            altText: 'Shamas & Sons GadgetCare 50 ml',
            width: 480,
            height: 480
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/v-B0044RRNIM',
            title: '50 ml',
            availableForSale: true,
            selectedOptions: [{ name: 'Size', value: '50 ml' }],
            price: { amount: '8.99', currencyCode: 'GBP' },
            compareAtPrice: null,
            image: {
              url: 'https://m.media-amazon.com/images/I/61KNUNXpJEL._AC_UL960_FMwebp_QL65_.jpg',
              altText: 'Shamas & Sons GadgetCare 50 ml',
              width: 480,
              height: 480
            }
          }
        }
      ]
    },
    options: [{ id: 'opt-17', name: 'Size', values: ['50 ml'] }],
    seo: { title: 'Shamas & Sons GadgetCare 50 ml', description: 'Buy Shamas & Sons GadgetCare 50ml online' }
  },
  {
    id: 'gid://shopify/Product/B07R16DKNH',
    handle: 'shamas-metal-polisher-wadding-2x175ml-b07r16dknh',
    title: 'Shamas & Sons Metal Polisher Wadding 2 x 175ml',
    description: 'Twin canister metal polish wadding pack for brass, copper, stainless steel & chrome.',
    descriptionHtml: '<p>Twin canister metal polish wadding pack for brass, copper, stainless steel & chrome.</p>',
    productType: 'Wipe',
    vendor: 'Shamas & Sons',
    tags: ['wadding', 'wipe', 'multipack'],
    availableForSale: true,
    priceRange: {
      minVariantPrice: { amount: '11.99', currencyCode: 'GBP' },
      maxVariantPrice: { amount: '11.99', currencyCode: 'GBP' }
    },
    compareAtPriceRange: {
      minVariantPrice: { amount: '11.99', currencyCode: 'GBP' },
      maxVariantPrice: { amount: '11.99', currencyCode: 'GBP' }
    },
    featuredImage: {
      url: 'https://m.media-amazon.com/images/I/81lb1m1V67L._AC_UL960_FMwebp_QL65_.jpg',
      altText: 'Shamas & Sons Metal Polisher Wadding 2 x 175ml',
      width: 480,
      height: 480
    },
    images: {
      edges: [
        {
          node: {
            url: 'https://m.media-amazon.com/images/I/81lb1m1V67L._AC_UL960_FMwebp_QL65_.jpg',
            altText: 'Shamas & Sons Metal Polisher Wadding 2 x 175ml',
            width: 480,
            height: 480
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'gid://shopify/ProductVariant/v-B07R16DKNH',
            title: '2 x 175ml',
            availableForSale: true,
            selectedOptions: [{ name: 'Size', value: '2 x 175ml' }],
            price: { amount: '11.99', currencyCode: 'GBP' },
            compareAtPrice: null,
            image: {
              url: 'https://m.media-amazon.com/images/I/81lb1m1V67L._AC_UL960_FMwebp_QL65_.jpg',
              altText: 'Shamas & Sons Metal Polisher Wadding 2 x 175ml',
              width: 480,
              height: 480
            }
          }
        }
      ]
    },
    options: [{ id: 'opt-18', name: 'Size', values: ['2 x 175ml'] }],
    seo: { title: 'Shamas & Sons Metal Polisher Wadding 2 x 175ml', description: 'Buy Shamas & Sons Metal Polisher Wadding 2 x 175ml online' }
  }
]

const MOCK_COLLECTIONS: ShopifyCollection[] = [
  {
    id: 'gid://shopify/Collection/1',
    handle: 'all-products',
    title: 'All Products',
    description: 'Explore our complete line of Shamas & Sons metal care products.',
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
