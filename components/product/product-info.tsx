'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, Minus, Plus, ShoppingBag, Truck, Shield, Star, ExternalLink, Zap } from 'lucide-react'
import type { ShopifyProduct, ShopifyProductVariant } from '@/lib/shopify/types'
import {
  formatPrice,
  getProductVariants,
  getDefaultVariant,
  variantHasDiscount,
  getVariantDiscountPercentage,
  getAmazonUrl,
  getAmazonProductData,
} from '@/lib/shopify/utils'
import { useCart } from '@/components/cart/cart-provider'
import { Button } from '@/components/ui/button'

interface ProductInfoProps {
  product: ShopifyProduct
}

export function ProductInfo({ product }: ProductInfoProps) {
  const router = useRouter()
  const { addToCart, isLoading } = useCart()
  const variants = getProductVariants(product)
  const defaultVariant = getDefaultVariant(product)
  const amazonData = getAmazonProductData(product)
  const amazonUrl = getAmazonUrl(product)

  const [selectedVariant, setSelectedVariant] = useState<ShopifyProductVariant | null>(
    defaultVariant
  )
  const [quantity, setQuantity] = useState(1)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {}
    defaultVariant?.selectedOptions.forEach((opt) => {
      initial[opt.name] = opt.value
    })
    return initial
  })

  const handleOptionChange = (optionName: string, value: string) => {
    const newOptions = { ...selectedOptions, [optionName]: value }
    setSelectedOptions(newOptions)

    // Find the variant that matches all selected options
    const matchingVariant = variants.find((variant) =>
      variant.selectedOptions.every(
        (opt) => newOptions[opt.name] === opt.value
      )
    )
    setSelectedVariant(matchingVariant || null)
  }

  const handleAddToCart = async () => {
    if (!selectedVariant) return
    await addToCart(selectedVariant.id, quantity)
  }

  const handleBuyNow = async () => {
    if (!selectedVariant) return
    await addToCart(selectedVariant.id, quantity)
    router.push('/checkout')
  }

  const showDiscount = selectedVariant && variantHasDiscount(selectedVariant)
  const discountPercentage = selectedVariant ? getVariantDiscountPercentage(selectedVariant) : 0

  const hasMultipleVariants = variants.length > 1 || (variants[0]?.title !== 'Default Title')

  return (
    <div className="lg:sticky lg:top-24 space-y-6">
      {/* Product Type & Amazon Social Proof */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        {product.productType && (
          <p className="text-primary font-semibold tracking-widest uppercase text-xs">
            {product.productType}
          </p>
        )}

        {amazonData && (
          <a
            href={amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary/80 hover:bg-[#FF9900]/10 border border-border hover:border-[#FF9900]/40 text-xs text-muted-foreground hover:text-[#FF9900] transition-colors"
            title="View customer reviews on Amazon UK"
          >
            <div className="flex items-center text-[#FF9900]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(amazonData.rating)
                      ? 'fill-[#FF9900] text-[#FF9900]'
                      : 'text-muted-foreground/40'
                  }`}
                />
              ))}
            </div>
            <span className="font-semibold text-foreground">{amazonData.rating.toFixed(1)}</span>
            <span>({amazonData.ratingCount.toLocaleString()} Amazon reviews)</span>
          </a>
        )}
      </div>

      {/* Title */}
      <h1 className="font-heading text-4xl lg:text-5xl tracking-wider text-foreground leading-none">
        {product.title.toUpperCase()}
      </h1>

      {/* Price */}
      <div className="flex items-center gap-3">
        {selectedVariant && (
          <>
            <p className="text-3xl font-bold text-primary">
              {formatPrice(selectedVariant.price)}
            </p>
            {showDiscount && selectedVariant.compareAtPrice && (
              <>
                <p className="text-xl text-muted-foreground line-through">
                  {formatPrice(selectedVariant.compareAtPrice)}
                </p>
                <span className="bg-primary text-primary-foreground text-xs font-semibold px-2.5 py-1 rounded">
                  SAVE {discountPercentage}%
                </span>
              </>
            )}
          </>
        )}
      </div>

      {/* Amazon Monthly Demand Badge */}
      {amazonData?.boughtInPastMonth && (
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
          <Zap className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>Popular item: <strong>{amazonData.boughtInPastMonth}</strong> on Amazon UK</span>
        </div>
      )}

      {/* Short Description */}
      {product.description && (
        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
          {product.description}
        </p>
      )}

      {/* Options */}
      {hasMultipleVariants && (
        <div className="space-y-4">
          {product.options.map((option) => (
            <div key={option.id}>
              <label className="block text-xs uppercase tracking-wider font-semibold text-foreground mb-2">
                {option.name}
              </label>
              <div className="flex flex-wrap gap-2">
                {option.values.map((value) => {
                  const isSelected = selectedOptions[option.name] === value
                  return (
                    <button
                      key={value}
                      onClick={() => handleOptionChange(option.name, value)}
                      className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all ${
                        isSelected
                          ? 'border-primary bg-primary text-primary-foreground shadow-md'
                          : 'border-border bg-card/50 hover:border-foreground/40 text-foreground'
                      }`}
                    >
                      {value}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quantity */}
      <div>
        <label className="block text-xs uppercase tracking-wider font-semibold text-foreground mb-2">
          Quantity
        </label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="p-2 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg transition-colors border border-border"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-12 text-center font-bold text-base">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="p-2 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg transition-colors border border-border"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Primary & Amazon CTAs */}
      <div className="space-y-3 pt-2">
        {selectedVariant?.availableForSale ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                onClick={handleAddToCart}
                disabled={isLoading || !selectedVariant}
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-heading text-lg tracking-wider"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                ADD TO BAG
              </Button>
              <Button
                onClick={handleBuyNow}
                disabled={isLoading || !selectedVariant}
                size="lg"
                variant="outline"
                className="w-full border-border hover:border-foreground/60 font-heading text-lg tracking-wider"
              >
                BUY NOW
              </Button>
            </div>

            {/* Prominent Amazon Direct Button */}
            <a
              href={amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full py-3.5 px-4 rounded-lg bg-[#FF9900] hover:bg-[#ffaa22] text-[#0A0A0A] font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all duration-200"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M14.9 14.8c-.2-.4-.8-.6-1.5-.6-.7 0-1.8.3-2.7.9-.9.5-1.5 1.2-1.5 2 0 1.1.9 1.7 2.1 1.7 1 0 2-.4 2.8-1.2.5-.5.8-1.2.8-1.9v-.9zm2.4 4.5c-.1.2-.4.4-.7.4-.3 0-.7-.2-.9-.4-1.2 1-2.6 1.5-4.2 1.5-2.6 0-4.4-1.6-4.4-3.8 0-1.8 1.1-3.2 2.8-4 1.3-.6 3-.8 4.7-.7v-.5c0-.9-.2-1.5-.7-1.9-.6-.5-1.5-.7-2.6-.7-1.2 0-2.3.3-3.2.9-.3.2-.6.1-.8-.1l-.8-1.2c-.2-.3-.1-.6.2-.8 1.3-.9 2.9-1.3 4.8-1.3 1.9 0 3.3.4 4.3 1.3 1 .9 1.5 2.3 1.5 4.1v5.1c0 .7.1 1.3.3 1.8.1.3 0 .6-.2.8l-1.1.9zm5.3 1.6c-.3.3-.9.4-1.3.2-3.1-1.7-6.9-2.6-10.7-2.6-4 0-7.8.9-11.2 2.7-.4.2-1 .1-1.3-.2-.3-.3-.2-.9.2-1.2 3.6-2 7.7-3 12.3-3 4 0 8 1 11.3 2.8.4.3.5.9.2 1.3z" />
              </svg>
              <span>BUY ON AMAZON UK</span>
              <ExternalLink className="w-4 h-4 opacity-80" />
            </a>
          </>
        ) : (
          <Button
            disabled
            size="lg"
            className="w-full font-heading text-lg tracking-wider"
          >
            SOLD OUT
          </Button>
        )}
      </div>

      {/* Trust Badges */}
      <div className="pt-6 space-y-3 border-t border-border">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Truck className="w-5 h-5 text-primary" />
          <span>Free UK shipping on orders over £20 (Fast Prime Delivery on Amazon)</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Shield className="w-5 h-5 text-primary" />
          <span>100% Authentic British Heritage Formula Guaranteed</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Check className="w-5 h-5 text-primary" />
          <span>30-Day Money-Back Guarantee & Hassle-Free Returns</span>
        </div>
      </div>

      {/* Tags */}
      {product.tags.length > 0 && (
        <div className="pt-6 border-t border-border">
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">Category Tags</p>
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-secondary/80 border border-border text-xs rounded-full text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

