'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, Star, ExternalLink } from 'lucide-react'
import type { ShopifyProduct } from '@/lib/shopify/types'
import {
  formatPrice,
  hasDiscount,
  getDiscountPercentage,
  getDefaultVariant,
  getAmazonUrl,
  getAmazonProductData,
} from '@/lib/shopify/utils'
import { useCart } from '@/components/cart/cart-provider'
import { Button } from '@/components/ui/button'

interface ProductCardProps {
  product: ShopifyProduct
  priority?: boolean
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addToCart, isLoading } = useCart()
  const defaultVariant = getDefaultVariant(product)
  const showDiscount = hasDiscount(product)
  const discountPercentage = getDiscountPercentage(product)
  const amazonData = getAmazonProductData(product)
  const amazonUrl = getAmazonUrl(product)

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (defaultVariant) {
      await addToCart(defaultVariant.id)
    }
  }

  return (
    <div className="group relative flex flex-col h-full bg-card/40 border border-border/40 rounded-xl p-3 hover:border-primary/40 hover:bg-card/80 transition-all duration-300">
      {/* Image & Overlay Container */}
      <div className="relative aspect-[3/4] bg-secondary/80 rounded-lg overflow-hidden mb-3.5">
        <Link
          href={`/products/${product.handle}`}
          className="absolute inset-0 z-0 block"
          aria-label={product.title}
        >
          {product.featuredImage ? (
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.altText || product.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              priority={priority}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <ShoppingBag className="w-12 h-12" />
            </div>
          )}
        </Link>

        {/* Badges Container */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 pointer-events-none">
          {showDiscount && (
            <span className="bg-primary text-primary-foreground text-xs font-semibold px-2 py-0.5 rounded shadow-sm">
              -{discountPercentage}%
            </span>
          )}
          {amazonData?.badge && (
            <span className="bg-[#FF9900] text-black text-[10px] font-bold uppercase tracking-tight px-1.5 py-0.5 rounded shadow-sm">
              {amazonData.badge}
            </span>
          )}
        </div>

        {/* Amazon Direct Link Tag (Sibling, not nested) */}
        <a
          href={amazonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1 bg-black/80 hover:bg-[#FF9900] hover:text-black text-white/90 text-[11px] font-medium px-2 py-0.5 rounded-full backdrop-blur-md border border-white/10 transition-all duration-200"
          title="Buy this product on Amazon UK"
        >
          <span>Amazon</span>
          <ExternalLink className="w-2.5 h-2.5 opacity-75" />
        </a>

        {/* Out of Stock Badge */}
        {!product.availableForSale && (
          <div className="absolute bottom-3 right-3 z-10 bg-destructive text-destructive-foreground text-xs font-medium px-2 py-1 rounded">
            Sold Out
          </div>
        )}

        {/* Hover Actions */}
        <div className="absolute inset-x-2.5 bottom-2.5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex flex-col gap-1.5 z-10">
          {product.availableForSale && defaultVariant && (
            <Button
              onClick={handleQuickAdd}
              disabled={isLoading}
              size="sm"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-heading text-xs tracking-wider shadow-lg cursor-pointer"
            >
              ADD TO BAG
            </Button>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-1.5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span className="uppercase tracking-wider font-medium text-[11px]">
              {product.productType || 'Surface Care'}
            </span>
            {amazonData && (
              <span className="flex items-center gap-0.5 text-[#FF9900] text-xs font-semibold">
                <Star className="w-3 h-3 fill-[#FF9900] text-[#FF9900]" />
                <span>{amazonData.rating.toFixed(1)}</span>
                <span className="text-muted-foreground text-[10px]">({amazonData.ratingCount})</span>
              </span>
            )}
          </div>

          <Link href={`/products/${product.handle}`} className="block group/link">
            <h3 className="font-medium text-sm sm:text-base text-foreground group-hover/link:text-primary transition-colors line-clamp-2 leading-snug">
              {product.title}
            </h3>
          </Link>
        </div>

        <div className="flex items-center justify-between pt-1">
          <Link href={`/products/${product.handle}`} className="flex items-center gap-2">
            <p className="text-primary font-semibold text-base">
              {formatPrice(product.priceRange.minVariantPrice)}
            </p>
            {showDiscount && (
              <p className="text-xs text-muted-foreground line-through">
                {formatPrice(product.compareAtPriceRange.minVariantPrice)}
              </p>
            )}
          </Link>

          <a
            href={amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-medium text-muted-foreground hover:text-[#FF9900] flex items-center gap-1 transition-colors z-10"
          >
            <span>Amazon.co.uk</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>
    </div>
  )
}


