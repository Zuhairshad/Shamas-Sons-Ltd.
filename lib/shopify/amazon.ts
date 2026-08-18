export interface AmazonProductData {
  asin: string
  title: string
  url: string
  rating: number
  ratingCount: number
  boughtInPastMonth?: string
  badge?: string
}

export const AMAZON_STORE_URL = 'https://www.amazon.co.uk/s?k=Brasso+Metal+Polish'

export const AMAZON_PRODUCTS_DATA: Record<string, AmazonProductData> = {
  B002G0BULU: {
    asin: 'B002G0BULU',
    title: 'Brasso Metal Polish, 175 ml',
    url: 'https://www.amazon.co.uk/Brasso-Metal-Polish-175-ml/dp/B002G0BULU',
    rating: 4.6,
    ratingCount: 1654,
    boughtInPastMonth: '1K+ bought in past month',
  },
  B00BE27CYK: {
    asin: 'B00BE27CYK',
    title: 'Brasso Metal Polish Wadding, 75g',
    url: 'https://www.amazon.co.uk/Brasso-Metal-Polish-Wadding-Pack/dp/B00BE27CYK',
    rating: 4.6,
    ratingCount: 4784,
    boughtInPastMonth: '2K+ bought in past month',
  },
  B01EX17UHM: {
    asin: 'B01EX17UHM',
    title: 'Brasso Metal Polish 175ml (Pack of 2)',
    url: 'https://www.amazon.co.uk/Pack-Brasso-Metal-Polish-175ml/dp/B01EX17UHM',
    rating: 4.2,
    ratingCount: 241,
    boughtInPastMonth: '300+ bought in past month',
  },
  B0798LB9KW: {
    asin: 'B0798LB9KW',
    title: 'Brasso B150 Metal Polish, 150 mL',
    url: 'https://www.amazon.co.uk/Brasso-B150-Metal-Polish-150/dp/B0798LB9KW',
    rating: 4.3,
    ratingCount: 67,
    boughtInPastMonth: '50+ bought in past month',
  },
  B0CSXLR79Q: {
    asin: 'B0CSXLR79Q',
    title: 'Brasso Metal Polish Liquid, 1L (Pack of 2)',
    url: 'https://www.amazon.co.uk/Brasso-Metal-Polish-Liquid-Pack/dp/B0CSXLR79Q',
    rating: 4.7,
    ratingCount: 1812,
  },
  B0082AA2G2: {
    asin: 'B0082AA2G2',
    title: 'Brasso Metal Polish Liquid 175ml, Pack of 4',
    url: 'https://www.amazon.co.uk/Brasso-Metal-Polish-Liquid-175ml/dp/B0082AA2G2',
    rating: 4.7,
    ratingCount: 116,
    badge: "Amazon's Choice",
  },
  B01MYENZTJ: {
    asin: 'B01MYENZTJ',
    title: 'Brasso 0592-W Wadding, 75g',
    url: 'https://www.amazon.co.uk/Brasso-Wadding-75-g-by/dp/B01MYENZTJ',
    rating: 4.7,
    ratingCount: 76,
  },
  B004G8YNIM: {
    asin: 'B004G8YNIM',
    title: 'Brasso Metal Polish Wadding, 75g',
    url: 'https://www.amazon.co.uk/Brasso-Metal-Polish-Wadding-75/dp/B004G8YNIM',
    rating: 4.6,
    ratingCount: 2785,
  },
  B0F94NH8V2: {
    asin: 'B0F94NH8V2',
    title: 'Brasso Liquid 1 Litre 06135',
    url: 'https://www.amazon.co.uk/Brasso-LIQUID-1-LITRE-06135/dp/B0F94NH8V2',
    rating: 5.0,
    ratingCount: 3,
  },
  B0CKXX6YCY: {
    asin: 'B0CKXX6YCY',
    title: 'Brasso Metal Polish, 175 ml (Pack of 6)',
    url: 'https://www.amazon.co.uk/Brasso-Metal-Polish-175-Pack/dp/B0CKXX6YCY',
    rating: 4.6,
    ratingCount: 18,
  },
  B0CKXVG728: {
    asin: 'B0CKXVG728',
    title: 'Brasso Metal Polish, 175 ml (Pack of 3)',
    url: 'https://www.amazon.co.uk/Brasso-Metal-Polish-175-Pack/dp/B0CKXVG728',
    rating: 4.8,
    ratingCount: 36,
  },
  B007BM7POO: {
    asin: 'B007BM7POO',
    title: 'Brasso Metal Polish Liquid 175ml Pack of 8',
    url: 'https://www.amazon.co.uk/Brasso-Metal-Polish-Liquid-175ml/dp/B007BM7POO',
    rating: 5.0,
    ratingCount: 2,
  },
  B0D1KVC63X: {
    asin: 'B0D1KVC63X',
    title: 'Brasso Metal Polish Wadding 12 x 75g',
    url: 'https://www.amazon.co.uk/Brasso-Metal-Polish-Wadding-75g/dp/B0D1KVC63X',
    rating: 4.5,
    ratingCount: 7,
  },
  B00BONJE5Y: {
    asin: 'B00BONJE5Y',
    title: 'Brasso Metal Polish 175ml (Box of 4)',
    url: 'https://www.amazon.co.uk/Brasso-175ml-Metal-Polish-BOX/dp/B00BONJE5Y',
    rating: 4.7,
    ratingCount: 5,
  },
  B0DB219PB9: {
    asin: 'B0DB219PB9',
    title: 'Brasso Metal Polish Liquid, 1L | Pack of 3',
    url: 'https://www.amazon.co.uk/Brasso-Metal-Polish-Liquid-Pack/dp/B0DB219PB9',
    rating: 5.0,
    ratingCount: 2,
  },
  B07MMFXSM6: {
    asin: 'B07MMFXSM6',
    title: 'Brasso Metal Polish Liquid 175ml',
    url: 'https://www.amazon.co.uk/Brasso-175ml/dp/B07MMFXSM6',
    rating: 5.0,
    ratingCount: 4,
  },
  B0044RRNIM: {
    asin: 'B0044RRNIM',
    title: 'Brasso GadgetCare 50 ml',
    url: 'https://www.amazon.co.uk/Brasso-93458-GadgetCare-50-ml/dp/B0044RRNIM',
    rating: 4.2,
    ratingCount: 53,
  },
  B07R16DKNH: {
    asin: 'B07R16DKNH',
    title: 'Brasso Metal Polisher Wadding 2 x 175ml',
    url: 'https://www.amazon.co.uk/Brasso-Metal-Polisher-175ml/dp/B07R16DKNH',
    rating: 4.3,
    ratingCount: 4,
  },
}

/**
 * Extracts ASIN from a product ID, handle, or string.
 */
export function extractAsin(input?: string): string | null {
  if (!input) return null
  const asinRegex = /\b(B[0-9A-Z]{9})\b/i
  const match = input.match(asinRegex)
  return match ? match[1].toUpperCase() : null
}

/**
 * Retrieves Amazon product information for a given product or handle.
 */
export function getAmazonProductData(product?: {
  id?: string
  handle?: string
  title?: string
}): AmazonProductData | null {
  if (!product) return null

  // 1. Try ASIN from ID (gid://shopify/Product/B002G0BULU)
  const asinFromId = extractAsin(product.id)
  if (asinFromId && AMAZON_PRODUCTS_DATA[asinFromId]) {
    return AMAZON_PRODUCTS_DATA[asinFromId]
  }

  // 2. Try ASIN from handle (shamas-metal-polish-175ml-b002g0bulu)
  const asinFromHandle = extractAsin(product.handle)
  if (asinFromHandle && AMAZON_PRODUCTS_DATA[asinFromHandle]) {
    return AMAZON_PRODUCTS_DATA[asinFromHandle]
  }

  // 3. Try ASIN from title
  const asinFromTitle = extractAsin(product.title)
  if (asinFromTitle && AMAZON_PRODUCTS_DATA[asinFromTitle]) {
    return AMAZON_PRODUCTS_DATA[asinFromTitle]
  }

  // Fallback if ASIN was parsed but not in hardcoded map
  const asin = asinFromId || asinFromHandle || asinFromTitle
  if (asin) {
    return {
      asin,
      title: product.title || 'Brasso Metal Polish',
      url: `https://www.amazon.co.uk/dp/${asin}`,
      rating: 4.6,
      ratingCount: 150,
    }
  }

  return null
}

/**
 * Gets the direct Amazon UK listing URL for a product.
 */
export function getAmazonUrl(product?: {
  id?: string
  handle?: string
  title?: string
}): string {
  const data = getAmazonProductData(product)
  if (data?.url) return data.url

  if (product?.title) {
    return `https://www.amazon.co.uk/s?k=${encodeURIComponent(
      product.title.replace(/Shamas & Sons/gi, 'Brasso')
    )}`
  }

  return AMAZON_STORE_URL
}
