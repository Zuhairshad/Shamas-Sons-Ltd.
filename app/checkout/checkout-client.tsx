'use client'

import { useState, useId } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShieldCheck,
  Lock,
  Truck,
  CreditCard,
  CheckCircle2,
  ArrowLeft,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Tag,
  Clock,
  Printer,
  Check,
  AlertCircle,
  Plus,
  Minus,
} from 'lucide-react'
import { useCart } from '@/components/cart/cart-provider'
import { formatPrice, getAmazonUrl } from '@/lib/shopify/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import NumberFlow from '@number-flow/react'

type Step = 'information' | 'shipping' | 'payment' | 'confirmation'

interface ShippingOption {
  id: string
  name: string
  detail: string
  price: number
  estimatedDays: string
}

const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    id: 'standard',
    name: 'Standard Tracked Delivery',
    detail: 'Royal Mail 48 Tracked (2-3 business days)',
    price: 3.99,
    estimatedDays: '2-3 business days',
  },
  {
    id: 'express',
    name: 'Next Day Express Delivery',
    detail: 'DPD Next Working Day with 1-hour delivery window',
    price: 5.99,
    estimatedDays: 'Next working day',
  },
  {
    id: 'weekend',
    name: 'Guaranteed Saturday / Weekend',
    detail: 'Special weekend priority dispatch & tracking',
    price: 8.99,
    estimatedDays: 'Saturday delivery',
  },
]

export function CheckoutClient() {
  const { cart, cartLines, totalQuantity, updateQuantity, removeFromCart, clearCart } = useCart()

  // Form State
  const [step, setStep] = useState<Step>('information')
  const [email, setEmail] = useState('')
  const [newsletter, setNewsletter] = useState(true)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [address, setAddress] = useState('')
  const [apartment, setApartment] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('United Kingdom')

  // Shipping & Payment
  const [selectedShipping, setSelectedShipping] = useState<string>('standard')
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'amazon' | 'klarna' | 'cod'>('card')

  // Card Inputs
  const [cardNumber, setCardNumber] = useState('')
  const [cardHolder, setCardHolder] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvc, setCardCvc] = useState('')
  const [cardFocus, setCardFocus] = useState<string | null>(null)

  // Promo Code
  const [promoCode, setPromoCode] = useState('')
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percent: number } | null>(null)
  const [promoError, setPromoError] = useState('')

  // Processing & Confirmation
  const [isProcessing, setIsProcessing] = useState(false)
  const [completedOrder, setCompletedOrder] = useState<{
    orderNumber: string
    date: string
    subtotal: number
    shipping: number
    discount: number
    total: number
    items: typeof cartLines
    email: string
    address: string
  } | null>(null)

  const subtotal = cart?.cost.subtotalAmount
    ? parseFloat(cart.cost.subtotalAmount.amount)
    : 0

  const freeShippingThreshold = 20
  const isFreeShipping = subtotal >= freeShippingThreshold && selectedShipping === 'standard'
  const activeShippingObj = SHIPPING_OPTIONS.find((s) => s.id === selectedShipping) || SHIPPING_OPTIONS[0]
  const shippingCost = isFreeShipping ? 0 : activeShippingObj.price

  const discountAmount = appliedDiscount ? (subtotal * appliedDiscount.percent) / 100 : 0
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost)

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault()
    setPromoError('')
    const clean = promoCode.trim().toUpperCase()
    if (!clean) return

    if (clean === 'WELCOME10') {
      setAppliedDiscount({ code: 'WELCOME10', percent: 10 })
      setPromoCode('')
    } else if (clean === 'SHINE20' || clean === 'BRITISH20') {
      setAppliedDiscount({ code: clean, percent: 20 })
      setPromoCode('')
    } else if (clean === 'FREESHIP') {
      setAppliedDiscount({ code: 'FREESHIP', percent: 15 })
      setPromoCode('')
    } else {
      setPromoError('Invalid coupon code. Try WELCOME10 or SHINE20')
    }
  }

  const formatCardNumberInput = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(' ')
    } else {
      return value
    }
  }

  const formatExpiryInput = (value: string) => {
    const clean = value.replace(/[^0-9]/g, '')
    if (clean.length >= 2) {
      return clean.slice(0, 2) + '/' + clean.slice(2, 4)
    }
    return clean
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    // Simulate order placement
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const orderNum = 'SS-' + Math.floor(100000 + Math.random() * 900000)
    setCompletedOrder({
      orderNumber: orderNum,
      date: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      subtotal,
      shipping: shippingCost,
      discount: discountAmount,
      total: grandTotal,
      items: [...cartLines],
      email: email || 'customer@example.com',
      address: `${address || '123 Heritage Way'}, ${city || 'London'}, ${postalCode || 'EC1A 1BB'}, ${country}`,
    })

    clearCart()
    setIsProcessing(false)
    setStep('confirmation')
  }

  // If order is completed, show order receipt confirmation
  if (step === 'confirmation' && completedOrder) {
    return (
      <div className="min-h-screen py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Success Banner */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-card border border-border/80 rounded-2xl p-8 sm:p-12 shadow-2xl relative overflow-hidden text-center"
          >
            <div className="absolute -right-24 -top-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-24 -bottom-24 w-64 h-64 bg-[#FF9900]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mb-6 shadow-inner">
              <Check className="w-10 h-10 stroke-[2.5]" />
            </div>

            <p className="text-primary font-bold tracking-widest text-xs uppercase mb-2">Order Confirmed</p>
            <h1 className="font-heading text-4xl sm:text-5xl tracking-wider text-foreground mb-3">
              THANK YOU FOR YOUR ORDER!
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm sm:text-base mb-6">
              Your order <span className="font-mono font-bold text-foreground">{completedOrder.orderNumber}</span> has been placed successfully. A confirmation email has been dispatched to <strong className="text-foreground">{completedOrder.email}</strong>.
            </p>

            {/* Delivery Timeline Card */}
            <div className="bg-secondary/60 border border-border/60 rounded-xl p-5 mb-8 max-w-xl mx-auto flex items-center justify-between text-left">
              <div className="flex items-center gap-3.5">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Estimated Delivery</p>
                  <p className="text-base font-semibold text-foreground">
                    {new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'short',
                    })}
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/30">
                Tracked Express
              </span>
            </div>

            {/* Receipt Breakdown */}
            <div className="bg-background/80 rounded-xl border border-border/60 p-6 text-left mb-8 max-w-xl mx-auto space-y-4">
              <h2 className="font-heading text-xl tracking-wider text-foreground border-b border-border/60 pb-3">
                ORDER SUMMARY
              </h2>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                {completedOrder.items.map((line) => (
                  <div key={line.id} className="flex items-center justify-between gap-4 text-sm">
                    <div className="flex items-center gap-3 min-w-0">
                      {line.merchandise.product.featuredImage && (
                        <div className="relative w-12 h-12 rounded-lg bg-secondary overflow-hidden shrink-0">
                          <Image
                            src={line.merchandise.product.featuredImage.url}
                            alt={line.merchandise.product.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="font-medium text-foreground truncate">{line.merchandise.product.title}</p>
                        <p className="text-xs text-muted-foreground">Qty: {line.quantity}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-foreground shrink-0">
                      {formatPrice({
                        amount: String(parseFloat(line.merchandise.price.amount) * line.quantity),
                        currencyCode: line.merchandise.price.currencyCode,
                      })}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border/60 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatPrice({ amount: String(completedOrder.subtotal), currencyCode: 'GBP' })}</span>
                </div>
                {completedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount</span>
                    <span>-{formatPrice({ amount: String(completedOrder.discount), currencyCode: 'GBP' })}</span>
                  </div>
                )}
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping ({activeShippingObj.name})</span>
                  <span>{completedOrder.shipping === 0 ? 'FREE' : formatPrice({ amount: String(completedOrder.shipping), currencyCode: 'GBP' })}</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-foreground border-t border-border/60 pt-2">
                  <span>Total Paid</span>
                  <span className="text-primary">{formatPrice({ amount: String(completedOrder.total), currencyCode: 'GBP' })}</span>
                </div>
              </div>

              <div className="border-t border-border/60 pt-3 text-xs text-muted-foreground">
                <p className="font-semibold text-foreground mb-1">Delivering to:</p>
                <p>{completedOrder.address}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-heading text-lg tracking-wider"
              >
                <Link href="/products">
                  CONTINUE SHOPPING
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.print()}
                className="w-full sm:w-auto border-border hover:border-foreground text-foreground gap-2"
              >
                <Printer className="w-4 h-4" />
                PRINT RECEIPT
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  // Empty cart fallback
  if (cartLines.length === 0 && !isProcessing) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="p-6 rounded-full bg-secondary/80 text-muted-foreground mb-6">
          <ShoppingBag className="w-16 h-16" />
        </div>
        <h1 className="font-heading text-4xl tracking-wider text-foreground mb-3">
          YOUR BAG IS EMPTY
        </h1>
        <p className="text-muted-foreground max-w-md mb-8">
          Add some of our premium British polish formulas to your bag before proceeding to checkout.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading text-lg tracking-wider">
            <Link href="/products">
              EXPLORE PRODUCTS
            </Link>
          </Button>
          <a
            href="https://www.amazon.co.uk/s?k=Brasso+Metal+Polish"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#FF9900] hover:bg-[#ffaa22] text-[#0A0A0A] font-bold text-sm tracking-wide transition-colors"
          >
            <span>SHOP ON AMAZON UK</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 lg:py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Back & Progress */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-border/60">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>

          {/* Stepper Breadcrumb */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium">
            <span className={step === 'information' ? 'text-primary font-bold' : 'text-muted-foreground'}>
              1. Information
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40" />
            <span className={step === 'shipping' ? 'text-primary font-bold' : 'text-muted-foreground'}>
              2. Shipping
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40" />
            <span className={step === 'payment' ? 'text-primary font-bold' : 'text-muted-foreground'}>
              3. Payment
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>256-Bit SSL Encrypted</span>
          </div>
        </div>

        {/* Main Grid: Form + Order Summary Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Checkout Stages (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Express Checkout Options */}
            <div className="bg-card/70 border border-border/80 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                  Express Checkout
                </p>
                <span className="text-[11px] text-muted-foreground">Instant 1-Click Pay</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod('amazon')
                    setStep('payment')
                  }}
                  className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-[#FF9900] hover:bg-[#ffaa22] text-[#0A0A0A] font-bold text-xs tracking-wide transition-all shadow-sm"
                >
                  <span className="text-[13px]">Amazon</span>
                  <span className="font-normal text-[11px] opacity-80">Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod('paypal')
                    setStep('payment')
                  }}
                  className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-[#0070BA] hover:bg-[#005ea6] text-white font-bold text-xs tracking-wide transition-all shadow-sm"
                >
                  <span>PayPal</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod('card')
                    setStep('payment')
                  }}
                  className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-white hover:bg-neutral-200 text-black font-semibold text-xs tracking-wide transition-all shadow-sm"
                >
                  <span>Apple Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod('card')
                    setStep('payment')
                  }}
                  className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-border text-white font-medium text-xs tracking-wide transition-all shadow-sm"
                >
                  <span>G Pay</span>
                </button>
              </div>

              <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-border/60"></div>
                <span className="flex-shrink mx-4 text-xs uppercase tracking-widest text-muted-foreground">Or Enter Details</span>
                <div className="flex-grow border-t border-border/60"></div>
              </div>
            </div>

            {/* STEP 1: Contact Information */}
            <section className={`bg-card border rounded-2xl p-6 transition-all ${step === 'information' ? 'border-primary/50 shadow-md ring-1 ring-primary/20' : 'border-border/60'}`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading text-2xl tracking-wider text-foreground flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-sans font-bold">1</span>
                  CONTACT INFORMATION
                </h2>
                {step !== 'information' && (
                  <button
                    onClick={() => setStep('information')}
                    className="text-xs text-primary hover:underline font-semibold"
                  >
                    Edit
                  </button>
                )}
              </div>

              {step === 'information' ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. james.smith@example.co.uk"
                      className="mt-1.5 bg-secondary/70 border-border"
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2 pt-1">
                    <input
                      type="checkbox"
                      id="newsletter"
                      checked={newsletter}
                      onChange={(e) => setNewsletter(e.target.checked)}
                      className="rounded border-border bg-secondary text-primary focus:ring-primary h-4 w-4"
                    />
                    <label htmlFor="newsletter" className="text-xs text-muted-foreground">
                      Email me with exclusive metal care tips, heritage offers, and new release alerts
                    </label>
                  </div>

                  <div className="pt-4 border-t border-border/60">
                    <h3 className="font-heading text-xl tracking-wider text-foreground mb-4">
                      SHIPPING ADDRESS
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">First Name *</Label>
                        <Input
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="James"
                          className="mt-1 bg-secondary/70 border-border"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Smith"
                          className="mt-1 bg-secondary/70 border-border"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <Label htmlFor="address" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Street Address *</Label>
                      <Input
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="House / Flat number and street name"
                        className="mt-1 bg-secondary/70 border-border"
                      />
                    </div>

                    <div className="mt-4">
                      <Label htmlFor="apartment" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Apartment, suite, unit (optional)</Label>
                      <Input
                        id="apartment"
                        value={apartment}
                        onChange={(e) => setApartment(e.target.value)}
                        placeholder="Apartment 4B"
                        className="mt-1 bg-secondary/70 border-border"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                      <div>
                        <Label htmlFor="city" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">City / Town *</Label>
                        <Input
                          id="city"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="London"
                          className="mt-1 bg-secondary/70 border-border"
                        />
                      </div>
                      <div>
                        <Label htmlFor="postalCode" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Postal Code *</Label>
                        <Input
                          id="postalCode"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          placeholder="SW1A 1AA"
                          className="mt-1 bg-secondary/70 border-border uppercase"
                        />
                      </div>
                      <div>
                        <Label htmlFor="country" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Country</Label>
                        <select
                          id="country"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="mt-1 w-full rounded-md border border-border bg-secondary/70 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Ireland">Ireland</option>
                          <option value="United States">United States</option>
                          <option value="Germany">Germany</option>
                          <option value="France">France</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Label htmlFor="phone" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Phone for Delivery Updates (optional)</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+44 7123 456789"
                        className="mt-1 bg-secondary/70 border-border"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <Button
                      onClick={() => setStep('shipping')}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading text-base tracking-wider px-8"
                      size="lg"
                    >
                      CONTINUE TO SHIPPING
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-muted-foreground space-y-1">
                  <p><strong className="text-foreground">{firstName || 'Customer'} {lastName}</strong> ({email || 'No email provided'})</p>
                  <p>{address || '123 Heritage Way'}, {city || 'London'} {postalCode || 'EC1A 1BB'}, {country}</p>
                </div>
              )}
            </section>

            {/* STEP 2: Shipping Method */}
            <section className={`bg-card border rounded-2xl p-6 transition-all ${step === 'shipping' ? 'border-primary/50 shadow-md ring-1 ring-primary/20' : 'border-border/60'}`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading text-2xl tracking-wider text-foreground flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-sans font-bold">2</span>
                  SHIPPING METHOD
                </h2>
                {step === 'payment' && (
                  <button
                    onClick={() => setStep('shipping')}
                    className="text-xs text-primary hover:underline font-semibold"
                  >
                    Edit
                  </button>
                )}
              </div>

              {step === 'shipping' ? (
                <div className="space-y-4">
                  {subtotal >= freeShippingThreshold && (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-semibold flex items-center gap-2">
                      <Sparkles className="w-4 h-4 shrink-0" />
                      <span>Congratulations! You qualify for Free Standard UK Delivery on this order.</span>
                    </div>
                  )}

                  <div className="space-y-3">
                    {SHIPPING_OPTIONS.map((option) => {
                      const isSelected = selectedShipping === option.id
                      const isFree = subtotal >= freeShippingThreshold && option.id === 'standard'
                      return (
                        <label
                          key={option.id}
                          onClick={() => setSelectedShipping(option.id)}
                          className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                            isSelected
                              ? 'border-primary bg-primary/5 shadow-sm ring-1 ring-primary/30'
                              : 'border-border/60 bg-secondary/40 hover:border-border'
                          }`}
                        >
                          <div className="flex items-center gap-3.5">
                            <input
                              type="radio"
                              name="shipping"
                              checked={isSelected}
                              onChange={() => setSelectedShipping(option.id)}
                              className="text-primary focus:ring-primary h-4 w-4 bg-secondary border-border"
                            />
                            <div>
                              <p className="font-semibold text-sm text-foreground">{option.name}</p>
                              <p className="text-xs text-muted-foreground">{option.detail}</p>
                            </div>
                          </div>
                          <span className="font-bold text-sm text-foreground">
                            {isFree ? (
                              <span className="text-emerald-400">FREE</span>
                            ) : (
                              formatPrice({ amount: String(option.price), currencyCode: 'GBP' })
                            )}
                          </span>
                        </label>
                      )
                    })}
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      onClick={() => setStep('information')}
                      className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Return to information
                    </button>
                    <Button
                      onClick={() => setStep('payment')}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading text-base tracking-wider px-8"
                      size="lg"
                    >
                      CONTINUE TO PAYMENT
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              ) : step === 'payment' ? (
                <div className="text-sm text-muted-foreground flex justify-between">
                  <span>{activeShippingObj.name} ({activeShippingObj.estimatedDays})</span>
                  <span className="font-semibold text-foreground">
                    {isFreeShipping ? 'FREE' : formatPrice({ amount: String(activeShippingObj.price), currencyCode: 'GBP' })}
                  </span>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">Select address in step 1 to configure shipping.</p>
              )}
            </section>

            {/* STEP 3: Payment Method */}
            <section className={`bg-card border rounded-2xl p-6 transition-all ${step === 'payment' ? 'border-primary/50 shadow-md ring-1 ring-primary/20' : 'border-border/60'}`}>
              <h2 className="font-heading text-2xl tracking-wider text-foreground flex items-center gap-2 mb-4">
                <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-sans font-bold">3</span>
                PAYMENT
              </h2>

              {step === 'payment' ? (
                <div className="space-y-6">
                  {/* Payment Method Selector Tabs */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-xs font-semibold ${
                        paymentMethod === 'card'
                          ? 'border-primary bg-primary/10 text-primary ring-1 ring-primary/40'
                          : 'border-border/60 bg-secondary/50 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <CreditCard className="w-5 h-5" />
                      <span>Credit Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('amazon')}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-xs font-semibold ${
                        paymentMethod === 'amazon'
                          ? 'border-[#FF9900] bg-[#FF9900]/10 text-[#FF9900] ring-1 ring-[#FF9900]/40'
                          : 'border-border/60 bg-secondary/50 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M14.9 14.8c-.2-.4-.8-.6-1.5-.6-.7 0-1.8.3-2.7.9-.9.5-1.5 1.2-1.5 2 0 1.1.9 1.7 2.1 1.7 1 0 2-.4 2.8-1.2.5-.5.8-1.2.8-1.9v-.9zm2.4 4.5c-.1.2-.4.4-.7.4-.3 0-.7-.2-.9-.4-1.2 1-2.6 1.5-4.2 1.5-2.6 0-4.4-1.6-4.4-3.8 0-1.8 1.1-3.2 2.8-4 1.3-.6 3-.8 4.7-.7v-.5c0-.9-.2-1.5-.7-1.9-.6-.5-1.5-.7-2.6-.7-1.2 0-2.3.3-3.2.9-.3.2-.6.1-.8-.1l-.8-1.2c-.2-.3-.1-.6.2-.8 1.3-.9 2.9-1.3 4.8-1.3 1.9 0 3.3.4 4.3 1.3 1 .9 1.5 2.3 1.5 4.1v5.1c0 .7.1 1.3.3 1.8.1.3 0 .6-.2.8l-1.1.9zm5.3 1.6c-.3.3-.9.4-1.3.2-3.1-1.7-6.9-2.6-10.7-2.6-4 0-7.8.9-11.2 2.7-.4.2-1 .1-1.3-.2-.3-.3-.2-.9.2-1.2 3.6-2 7.7-3 12.3-3 4 0 8 1 11.3 2.8.4.3.5.9.2 1.3z" />
                      </svg>
                      <span>Amazon Pay</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('paypal')}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-xs font-semibold ${
                        paymentMethod === 'paypal'
                          ? 'border-[#0070BA] bg-[#0070BA]/10 text-[#0070BA] ring-1 ring-[#0070BA]/40'
                          : 'border-border/60 bg-secondary/50 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <span className="font-serif italic font-black text-base">P</span>
                      <span>PayPal</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('klarna')}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-xs font-semibold ${
                        paymentMethod === 'klarna'
                          ? 'border-pink-500 bg-pink-500/10 text-pink-400 ring-1 ring-pink-500/40'
                          : 'border-border/60 bg-secondary/50 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <span className="font-bold tracking-tighter">Klarna.</span>
                      <span>Pay in 3</span>
                    </button>
                  </div>

                  {/* Payment Sub-Forms */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      {/* Holographic Card Preview */}
                      <div className="relative w-full max-w-sm mx-auto h-44 rounded-2xl p-5 bg-gradient-to-tr from-neutral-950 via-neutral-900 to-red-950/40 border border-border shadow-xl flex flex-col justify-between overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl pointer-events-none" />
                        <div className="flex justify-between items-center z-10">
                          <span className="font-heading tracking-widest text-lg text-primary">SHAMAS &amp; SONS</span>
                          <div className="flex gap-1.5">
                            <div className="w-6 h-6 rounded-full bg-red-500/80 opacity-80"></div>
                            <div className="w-6 h-6 rounded-full bg-yellow-500/80 -ml-3 opacity-80"></div>
                          </div>
                        </div>

                        <div className="z-10">
                          <p className="font-mono text-base tracking-widest text-foreground">
                            {cardNumber || '•••• •••• •••• ••••'}
                          </p>
                        </div>

                        <div className="flex justify-between items-end z-10 text-xs text-muted-foreground font-mono">
                          <div>
                            <p className="text-[9px] uppercase tracking-wider text-muted-foreground/60">Card Holder</p>
                            <p className="text-foreground uppercase font-sans font-medium">{cardHolder || firstName || 'VALUED CUSTOMER'}</p>
                          </div>
                          <div>
                            <p className="text-[9px] uppercase tracking-wider text-muted-foreground/60">Expires</p>
                            <p className="text-foreground">{cardExpiry || 'MM/YY'}</p>
                          </div>
                        </div>
                      </div>

                      {/* Card Inputs */}
                      <div className="space-y-4 pt-2">
                        <div>
                          <Label htmlFor="cardNumber" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                            Card Number *
                          </Label>
                          <Input
                            id="cardNumber"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(formatCardNumberInput(e.target.value))}
                            placeholder="4532 •••• •••• 8921"
                            maxLength={19}
                            className="mt-1 bg-secondary/70 border-border font-mono"
                          />
                        </div>

                        <div>
                          <Label htmlFor="cardHolder" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                            Name on Card *
                          </Label>
                          <Input
                            id="cardHolder"
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value)}
                            placeholder="JAMES SMITH"
                            className="mt-1 bg-secondary/70 border-border uppercase"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="cardExpiry" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                              Expiry Date *
                            </Label>
                            <Input
                              id="cardExpiry"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(formatExpiryInput(e.target.value))}
                              placeholder="MM/YY"
                              maxLength={5}
                              className="mt-1 bg-secondary/70 border-border font-mono"
                            />
                          </div>
                          <div>
                            <Label htmlFor="cardCvc" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                              Security Code (CVC) *
                            </Label>
                            <Input
                              id="cardCvc"
                              type="password"
                              value={cardCvc}
                              onChange={(e) => setCardCvc(e.target.value.slice(0, 4))}
                              placeholder="•••"
                              maxLength={4}
                              className="mt-1 bg-secondary/70 border-border font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'amazon' && (
                    <div className="p-5 rounded-xl bg-[#FF9900]/10 border border-[#FF9900]/30 text-center space-y-3">
                      <div className="inline-flex p-3 rounded-full bg-[#FF9900]/20 text-[#FF9900]">
                        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                          <path d="M14.9 14.8c-.2-.4-.8-.6-1.5-.6-.7 0-1.8.3-2.7.9-.9.5-1.5 1.2-1.5 2 0 1.1.9 1.7 2.1 1.7 1 0 2-.4 2.8-1.2.5-.5.8-1.2.8-1.9v-.9zm2.4 4.5c-.1.2-.4.4-.7.4-.3 0-.7-.2-.9-.4-1.2 1-2.6 1.5-4.2 1.5-2.6 0-4.4-1.6-4.4-3.8 0-1.8 1.1-3.2 2.8-4 1.3-.6 3-.8 4.7-.7v-.5c0-.9-.2-1.5-.7-1.9-.6-.5-1.5-.7-2.6-.7-1.2 0-2.3.3-3.2.9-.3.2-.6.1-.8-.1l-.8-1.2c-.2-.3-.1-.6.2-.8 1.3-.9 2.9-1.3 4.8-1.3 1.9 0 3.3.4 4.3 1.3 1 .9 1.5 2.3 1.5 4.1v5.1c0 .7.1 1.3.3 1.8.1.3 0 .6-.2.8l-1.1.9zm5.3 1.6c-.3.3-.9.4-1.3.2-3.1-1.7-6.9-2.6-10.7-2.6-4 0-7.8.9-11.2 2.7-.4.2-1 .1-1.3-.2-.3-.3-.2-.9.2-1.2 3.6-2 7.7-3 12.3-3 4 0 8 1 11.3 2.8.4.3.5.9.2 1.3z" />
                        </svg>
                      </div>
                      <p className="font-semibold text-foreground text-sm">Pay with your saved Amazon Wallet &amp; Addresses</p>
                      <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                        Clicking Place Order will securely authorize via Amazon Pay without having to type your credit card details.
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'paypal' && (
                    <div className="p-5 rounded-xl bg-[#0070BA]/10 border border-[#0070BA]/30 text-center space-y-2">
                      <p className="font-semibold text-foreground text-sm">PayPal Express Checkout</p>
                      <p className="text-xs text-muted-foreground">
                        You will be redirected to PayPal to complete your payment securely.
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'klarna' && (
                    <div className="p-5 rounded-xl bg-pink-500/10 border border-pink-500/30 text-center space-y-2">
                      <p className="font-semibold text-foreground text-sm">
                        Pay in 3 interest-free installments of {formatPrice({ amount: String(grandTotal / 3), currencyCode: 'GBP' })}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        No added fees when you pay on time.
                      </p>
                    </div>
                  )}

                  {/* Submit CTA */}
                  <div className="pt-6 border-t border-border/60">
                    <Button
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-heading text-xl tracking-wider py-6 shadow-xl relative overflow-hidden"
                      size="lg"
                    >
                      {isProcessing ? (
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          <span>PROCESSING SECURE ORDER...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <Lock className="w-5 h-5" />
                          <span>PAY {formatPrice({ amount: String(grandTotal), currencyCode: 'GBP' })} &amp; COMPLETE ORDER</span>
                        </div>
                      )}
                    </Button>

                    <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground mt-4">
                      <div className="flex items-center gap-1">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>Buyer Protection</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span>Authentic Heritage Formula</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">Complete information and shipping steps to proceed with payment.</p>
              )}
            </section>
          </div>

          {/* Right Column: Order Summary Sticky Sidebar (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-card/80 border border-border/80 rounded-2xl p-6 lg:sticky lg:top-24 shadow-lg space-y-6">
              <div className="flex items-center justify-between border-b border-border/60 pb-4">
                <h2 className="font-heading text-2xl tracking-wider text-foreground">
                  ORDER SUMMARY ({totalQuantity})
                </h2>
                <span className="text-xs text-primary font-semibold">UK Heritage Guarantee</span>
              </div>

              {/* Items List */}
              <div className="space-y-3.5 max-h-72 overflow-y-auto pr-1">
                {cartLines.map((line) => (
                  <div key={line.id} className="flex gap-3.5 items-center justify-between p-2 rounded-lg bg-secondary/40 hover:bg-secondary/70 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      {line.merchandise.product.featuredImage && (
                        <div className="relative w-14 h-14 rounded-lg bg-background overflow-hidden shrink-0 border border-border/60">
                          <Image
                            src={line.merchandise.product.featuredImage.url}
                            alt={line.merchandise.product.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="min-w-0">
                        <h4 className="font-medium text-xs sm:text-sm text-foreground line-clamp-1">
                          {line.merchandise.product.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">Qty: {line.quantity}</span>
                          <span className="text-muted-foreground/40">•</span>
                          <a
                            href={getAmazonUrl(line.merchandise.product)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-muted-foreground hover:text-[#FF9900] flex items-center gap-0.5"
                            title="View product on Amazon UK"
                          >
                            <span>Amazon</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="font-semibold text-sm text-primary">
                        {formatPrice({
                          amount: String(parseFloat(line.merchandise.price.amount) * line.quantity),
                          currencyCode: line.merchandise.price.currencyCode,
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Voucher / Coupon Code Form */}
              <form onSubmit={handleApplyPromo} className="space-y-2 border-t border-border/60 pt-4">
                <Label htmlFor="promo" className="text-xs uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-primary" />
                  <span>Promo Code / Gift Voucher</span>
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="promo"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="e.g. WELCOME10"
                    className="bg-secondary/70 border-border uppercase font-mono text-xs"
                  />
                  <Button
                    type="submit"
                    variant="outline"
                    className="border-border hover:border-foreground shrink-0 font-heading tracking-wider text-xs"
                  >
                    APPLY
                  </Button>
                </div>
                {appliedDiscount && (
                  <p className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    Coupon {appliedDiscount.code} applied ({appliedDiscount.percent}% OFF)
                  </p>
                )}
                {promoError && (
                  <p className="text-xs text-destructive flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {promoError}
                  </p>
                )}
              </form>

              {/* Price Calculation Breakdown */}
              <div className="space-y-2.5 border-t border-border/60 pt-4 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="text-foreground">
                    {formatPrice({ amount: String(subtotal), currencyCode: 'GBP' })}
                  </span>
                </div>

                {appliedDiscount && (
                  <div className="flex justify-between text-emerald-400 font-medium">
                    <span>Discount ({appliedDiscount.code})</span>
                    <span>-{formatPrice({ amount: String(discountAmount), currencyCode: 'GBP' })}</span>
                  </div>
                )}

                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="text-foreground">
                    {isFreeShipping ? (
                      <span className="text-emerald-400 font-semibold">FREE</span>
                    ) : (
                      formatPrice({ amount: String(shippingCost), currencyCode: 'GBP' })
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-muted-foreground text-xs">
                  <span>Estimated UK VAT (included)</span>
                  <span>{formatPrice({ amount: String((grandTotal * 0.2) / 1.2), currencyCode: 'GBP' })}</span>
                </div>

                <div className="flex justify-between items-center text-lg font-bold text-foreground border-t border-border/60 pt-3">
                  <span>Total Amount</span>
                  <span className="text-2xl font-heading tracking-wider text-primary">
                    <NumberFlow
                      value={grandTotal}
                      locales="en-GB"
                      format={{ style: 'currency', currency: 'GBP' }}
                    />
                  </span>
                </div>
              </div>

              {/* Amazon Alternative CTA */}
              <div className="p-4 rounded-xl bg-[#FF9900]/10 border border-[#FF9900]/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#FF9900] uppercase tracking-wider">Prefer Amazon Checkout?</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#FF9900]" />
                </div>
                <p className="text-[11px] text-muted-foreground">
                  You can purchase all authentic Shamas &amp; Sons formulas directly on Amazon UK with Prime 1-Day delivery.
                </p>
                <a
                  href="https://www.amazon.co.uk/s?k=Brasso+Metal+Polish"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center py-2 px-3 rounded-lg bg-[#FF9900] hover:bg-[#ffaa22] text-[#0A0A0A] font-bold text-xs tracking-wide transition-colors"
                >
                  BUY THESE ITEMS ON AMAZON UK
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
