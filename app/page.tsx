import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Sparkles, Layers, Award, CheckCircle2 } from 'lucide-react'
import { getFeaturedProducts, getProducts } from '@/lib/shopify/client'
import { ProductCard } from '@/components/product/product-card'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { HeroSection } from '@/components/home/hero-section'

const features = [
  {
    icon: Sparkles,
    title: 'Thoughtfully Selected',
    description: 'Explore a growing range of useful finds chosen to make everyday shopping feel simple and considered.',
  },
  {
    icon: Layers,
    title: 'Easy to Explore',
    description: 'Use clear categories and filters to move from the full catalogue to what you are looking for.',
  },
  {
    icon: Award,
    title: 'Made for Browsing',
    description: 'Every listing brings the key details together, so you can explore the catalogue with confidence.',
  },
]

const categories = [
  {
    title: 'Metal Polish',
    description: 'Explore the products currently available in this part of the catalogue.',
    image: '/picas/pp/712oFUjZ0zL._AC_UL480_FMwebp_QL65_.webp',
    href: '/products?type=metal-polish',
  },
  {
    title: 'Lip & Nail',
    description: 'Explore the products currently available in this part of the catalogue.',
    image: 'https://m.media-amazon.com/images/I/71WdnuR4hgL._AC_SX679_.jpg',
    href: '/products?type=Lip%20%26%20Nail',
  },
  {
    title: 'Fragrance',
    description: 'Explore the products currently available in this part of the catalogue.',
    image: 'https://m.media-amazon.com/images/I/71synqTHxAL._AC_SX679_.jpg',
    href: '/products?type=Fragrance',
  },
  {
    title: 'Bath & Body',
    description: 'Explore the products currently available in this part of the catalogue.',
    image: 'https://m.media-amazon.com/images/I/71fvRx3-vPL._AC_SX679_PIbundle-2,TopRight,0,0_SH20_.jpg',
    href: '/products?type=Bath%20%26%20Body',
  },
]

const shopperHighlights = [
  {
    title: 'One place to explore',
    description: 'A single catalogue for discovering products across a variety of everyday needs and occasions.',
  },
  {
    title: 'Find your way',
    description: 'Browse the complete range or use a category filter when you already know what you are looking for.',
  },
  {
    title: 'See the details',
    description: 'Open any product to view its information and make a more informed choice at your own pace.',
  },
]

const catalogueFaqs = [
  {
    question: 'How do I browse the catalogue?',
    answer: 'Start on the Products page to view the complete range, then use category filters or sorting to narrow what you see.',
  },
  {
    question: 'Where can I find product information?',
    answer: 'Open any product from the catalogue to see its available details and the next steps for that item.',
  },
  {
    question: 'Can prices and availability change?',
    answer: 'Yes. Product information can change over time, so please check the most current details before completing an order.',
  },
  {
    question: 'How do I choose the right product?',
    answer: 'Use category filters to compare relevant products, then open a listing to review its description and available options.',
  },
  {
    question: 'How can I keep up with new products?',
    answer: 'Use the email field below to hear about new arrivals and updates from shamasandsons.',
  },
]

import type { ShopifyProduct } from '@/lib/shopify/types'

export default async function HomePage() {
  let products: ShopifyProduct[] = []
  let beautyProducts: ShopifyProduct[] = []

  try {
    ;[products, beautyProducts] = await Promise.all([
      getFeaturedProducts(4),
      getProducts({ first: 35, query: 'tag:beauty' }),
    ])
  } catch {
    // Keep the editorial homepage useful while the Shopify connection is being configured.
  }

  const beautyHighlights = ['Lip & Nail', 'Fragrance', 'Bath & Body', 'Beauty Accessories']
    .map((productType) => beautyProducts.find((product) => product.productType === productType))
    .filter((product): product is ShopifyProduct => Boolean(product))
  const bestSellerHighlights = [
    ...products.slice(0, 2),
    ...beautyHighlights.slice(0, 2),
  ]


  return (
    <div className="min-h-screen">
      {/* Hero Section with Scroll Velocity Marquee */}
      <HeroSection />

      {/* Featured Products (Best Sellers) */}
      <section className="py-16 lg:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-primary font-medium tracking-widest uppercase mb-2">
                Trusted Essentials
              </p>
              <h2 className="font-heading text-4xl lg:text-5xl tracking-wider text-foreground">
                BEST SELLERS
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden sm:flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {bestSellerHighlights.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {bestSellerHighlights.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  priority={index < 4}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">No products found</p>
              <p className="text-sm text-muted-foreground">
                Products are being prepared for this catalogue.
              </p>
            </div>
          )}

          <div className="mt-8 text-center sm:hidden">
            <Button asChild variant="outline">
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features / Why Shop With Us */}
      <section className="py-20 lg:py-32 border-b border-border bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <p className="text-primary font-semibold tracking-widest uppercase mb-3 text-xs sm:text-sm">
              Why shamasandsons
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl tracking-wider text-foreground mb-6 leading-tight">
              SHOP WITH CONFIDENCE
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              A clear, considered place to discover products, browse at your pace, and find something that fits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {features.map((feature) => (
              <div 
                key={feature.title} 
                className="flex flex-col items-center text-center p-8 sm:p-10 lg:p-12 bg-secondary/50 rounded-2xl border border-border/60 hover:border-primary/40 hover:bg-secondary/70 transition-all duration-300 shadow-md group"
              >
                <div className="p-4 sm:p-5 bg-primary/10 rounded-2xl mb-6 sm:mb-8 text-primary border border-primary/20 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>
                <h3 className="font-heading text-xl sm:text-2xl tracking-wider text-foreground mb-4">
                  {feature.title.toUpperCase()}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-20 lg:py-32 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary font-semibold tracking-widest uppercase mb-3 text-xs sm:text-sm">
              Find what fits
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl tracking-wider text-foreground mb-4">
              SHOP BY CATEGORY
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Browse the complete catalogue or begin with the category that feels right for you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {categories.map((cat) => (
              <Link
                key={cat.title}
                href={cat.href}
                className="group relative bg-secondary/40 border border-border/60 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 flex flex-col justify-between hover:shadow-xl"
              >
                <div className="aspect-[4/3] bg-white relative p-6 flex items-center justify-center overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-heading text-xl tracking-wider text-foreground mb-2 group-hover:text-primary transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
                      {cat.description}
                    </p>
                  </div>
                  <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-primary group-hover:translate-x-1 transition-transform">
                    Explore products <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Shopping Highlights */}
      <section className="py-20 lg:py-32 border-b border-border bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary font-semibold tracking-widest uppercase mb-3 text-xs sm:text-sm">
              Explore with clarity
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl tracking-wider text-foreground mb-4">
              SHOPPING HIGHLIGHTS
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              A straightforward way to explore the range without the store being defined by a single type of product.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {shopperHighlights.map((highlight) => (
              <div
                key={highlight.title}
                className="bg-card/70 border border-border/60 rounded-2xl p-8 flex flex-col justify-between shadow-sm hover:border-primary/40 transition-all duration-300"
              >
                <div>
                  <CheckCircle2 className="w-5 h-5 text-primary mb-5" />
                  <h3 className="font-heading text-2xl tracking-wider text-foreground mb-3">{highlight.title.toUpperCase()}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{highlight.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Seller Information */}
      <section className="py-16 lg:py-24 border-t border-border bg-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary font-medium tracking-widest uppercase mb-4">
              Verified Merchant
            </p>
            <h2 className="font-heading text-4xl lg:text-5xl tracking-wider text-foreground">
              SELLER INFORMATION
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* About & Trust */}
            <div className="bg-secondary/50 border border-border/50 rounded-xl p-6 lg:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-yellow-500 mb-4">
                  {[...Array(4)].map((_, i) => (
                    <span key={i} className="text-lg">★</span>
                  ))}
                  <span className="text-lg text-muted-foreground/30">★</span>
                  <span className="text-sm font-medium ml-2 text-foreground">4.4 / 5</span>
                </div>
                <h3 className="font-heading text-xl tracking-wider text-foreground mb-4">
                  SHAMAS & SONS LTD
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  shamas & Sons (VAT Registered) is committed to providing each customer with the highest standard of customer service.
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-border/50 flex items-center justify-between">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Customer Rating</span>
                <span className="text-sm font-semibold text-primary">86% Positive (95 ratings)</span>
              </div>
            </div>

            {/* Contact Details */}
            <div className="bg-secondary/50 border border-border/50 rounded-xl p-6 lg:p-8 space-y-4">
              <h3 className="font-heading text-lg tracking-wider text-foreground mb-2">
                GET IN TOUCH
              </h3>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground/70">Phone Number</p>
                <a href="tel:+447438106866" className="text-sm text-foreground font-medium mt-0.5 hover:text-primary transition-colors block">
                  +44 7438 106866
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground/70">Email Address</p>
                <a href="mailto:shamas_shahzada@hotmail.com" className="text-sm text-foreground font-medium mt-0.5 hover:text-primary transition-colors block">
                  shamas_shahzada@hotmail.com
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground/70">Business Type</p>
                <p className="text-sm text-foreground font-medium mt-0.5">Privately-owned business (UK)</p>
              </div>
            </div>

            {/* Registration Details */}
            <div className="bg-secondary/50 border border-border/50 rounded-xl p-6 lg:p-8 space-y-4">
              <h3 className="font-heading text-lg tracking-wider text-foreground mb-2">
                LEGAL REGISTRY
              </h3>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground/70">Trade Register Number</p>
                <p className="text-sm text-foreground font-medium mt-0.5">13659351</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground/70">VAT Number</p>
                <p className="text-sm text-foreground font-medium mt-0.5">GB458915253</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground/70">Registered Address</p>
                <p className="text-sm text-foreground font-medium mt-0.5 leading-relaxed">
                  2 Hesper Road, Colchester, Essex, CO2 8JS, United Kingdom
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ / Care Guide Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 lg:mb-20">
            <p className="text-primary font-semibold tracking-widest uppercase mb-3 text-xs sm:text-sm">
              Catalogue help
            </p>
            <h2 className="font-heading text-4xl lg:text-6xl tracking-wider text-foreground mb-4">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
              A quick guide to browsing the catalogue and checking product details.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-5 sm:space-y-6">
            {catalogueFaqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`} className="border-0">
                <div className="bg-secondary/50 border border-border/60 rounded-2xl overflow-hidden hover:border-primary/40 transition-colors shadow-sm">
                  <AccordionTrigger className="px-7 sm:px-9 py-6 sm:py-7 hover:no-underline text-left">
                    <span className="font-heading text-lg sm:text-xl tracking-wider text-foreground">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-7 sm:px-9 pb-7 sm:pb-8 pt-0">
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border border-border rounded-2xl p-8 lg:p-16 text-center">
            <p className="text-primary font-medium tracking-widest uppercase mb-4">
              Stay Connected
            </p>
            <h2 className="font-heading text-4xl lg:text-5xl tracking-wider text-foreground mb-6">
              STAY IN THE KNOW
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Be first to hear about new arrivals, useful finds, and updates from shamasandsons.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email for updates"
                className="flex-1 bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading tracking-wider px-8"
              >
                KEEP ME UPDATED
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
