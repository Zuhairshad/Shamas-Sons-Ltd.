import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Sparkles, Layers, Award, Star, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react'
import { getFeaturedProducts, getCollections } from '@/lib/shopify/client'
import { ProductCard } from '@/components/product/product-card'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { HeroSection } from '@/components/home/hero-section'

const features = [
  {
    icon: Sparkles,
    title: 'Fast Tarnish Removal',
    description: 'A few drops on a cloth lift built-up oxidation and tarnish from brass and copper in minutes, without aggressive scrubbing on lightly soiled surfaces.',
  },
  {
    icon: Layers,
    title: 'Multi-Metal Formula',
    description: 'One versatile formula works across brass, bronze, copper, chrome, and stainless steel to cover most metal surfaces around your home or workshop.',
  },
  {
    icon: Award,
    title: 'Time-Tested Heritage',
    description: 'Manufactured in Britain with over a century of trusted pedigree, staying true to a proven recipe that restores brilliant, long-lasting luster.',
  },
]

const categories = [
  {
    title: 'Brass Polish & Cleaners',
    description: 'Traditional liquid polish formula engineered for fast tarnish removal on door handles, ornaments, and brass fittings.',
    image: '/picas/pp/712oFUjZ0zL._AC_UL480_FMwebp_QL65_.webp',
    href: '/products?type=liquid',
  },
  {
    title: 'Copper & Bronze Care',
    description: 'Deep-cleaning treatment that gently dissolves green verdigris and dark oxidation on cookware and architectural accents.',
    image: '/picas/pp/71a0vxYvO0L._AC_UL480_FMwebp_QL65_.webp',
    href: '/products?type=liquid',
  },
  {
    title: 'Chrome & Stainless Steel',
    description: 'Specialized formula for streak-free shine, water spot removal, and micro-scratch reduction on modern fixtures.',
    image: '/picas/pp/815fhQPtz9L._AC_UL480_FMwebp_QL65_.webp',
    href: '/products?type=polish',
  },
  {
    title: 'Polish Wadding & Creams',
    description: 'Pre-treated cotton wadding and heavy-duty pastes for targeted, mess-free detailing on intricate metalwork.',
    image: '/picas/pp/810n3lfq1zL._AC_UL480_FMwebp_QL65_.webp',
    href: '/products?type=wipe',
  },
]

const testimonials = [
  {
    name: 'Marcus T.',
    role: 'Antique Restorer',
    rating: 5,
    comment: 'Used it on a set of antique brass drawer pulls that had oxidized almost completely black. Two light passes with a cotton cloth and they looked brand new with a deep, mirror-like reflection.',
  },
  {
    name: 'Sandra K.',
    role: 'Homeowner & Collector',
    rating: 5,
    comment: 'The wadding format is remarkably easy to use on detailed vintage copper pans and silverware. Zero mess, effortless buffing, and it keeps tarnish away for weeks.',
  },
  {
    name: 'David R.',
    role: 'Workshop Craftsman',
    rating: 5,
    comment: 'Keeps bathroom chrome fixtures, vehicle trim, and brass fittings gleaming without any harsh abrasiveness. I always keep a bottle in the workshop.',
  },
]

const polishFaqs = [
  {
    question: 'How do you use metal polish for the best mirror shine?',
    answer: 'Apply a small amount of metal polish to a soft lint-free cloth or use a piece of pre-treated wadding. Rub over the brass, copper, chrome, or stainless steel surface using light, circular pressure. Once the tarnish begins lifting and the liquid begins to dry to a light haze, buff the surface with a clean, dry microfiber cloth until a high gloss appears.',
  },
  {
    question: 'What metals and surfaces is the formula safe on?',
    answer: 'Our metal polish formula is safe and effective on brass, copper, bronze, chrome, stainless steel, pewter, and aluminum. It can also be used on hard plastics and Bakelite. Always test a small hidden area first on antique or lacquered metals.',
  },
  {
    question: 'Does the polish remove light surface scratches?',
    answer: 'Yes. Light surface scuffs and oxidation marks on brass, chrome, and stainless steel fade with repeated buffing, as the micro-abrasive formula gently refines the tarnished metal surface. While deep gouges cannot be filled, the restored luster makes them significantly less noticeable.',
  },
  {
    question: 'What is the difference between liquid polish and wadding?',
    answer: 'Liquid polish is ideal for covering larger, smooth surfaces like plaques, copper cookware, and bar rails. Impregnated cotton wadding is ready to use without liquid spills, making it the perfect mess-free choice for intricate filigree, musical instruments, and delicate hardware.',
  },
  {
    question: 'Does it leave a protective coating against future tarnish?',
    answer: 'Yes. The formulation leaves behind an ultra-thin protective barrier that seals the polished metal against humidity, atmospheric moisture, and fingerprint oils, significantly extending the time between cleanings.',
  },
]

export default async function HomePage() {
  let products = []
  let collections = []

  try {
    ;[products, collections] = await Promise.all([
      getFeaturedProducts(4),
      getCollections(),
    ])
  } catch {
    // Keep the editorial homepage useful while the Shopify connection is being configured.
  }

  const featuredCollection = collections[0]

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

          {products.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {products.map((product, index) => (
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
                Connect your Shopify store to display products here.
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

      {/* Features / Why Choose Us */}
      <section className="py-20 lg:py-32 border-b border-border bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <p className="text-primary font-semibold tracking-widest uppercase mb-3 text-xs sm:text-sm">
              Trusted Craftsmanship
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl tracking-wider text-foreground mb-6 leading-tight">
              WHY HOUSEHOLDS REACH FOR OUR POLISH
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              A specialized formula built for brass, bronze, copper, chrome, and stainless steel — available in liquid, cream, and wadding form to match every task.
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
              Tailored Solutions
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl tracking-wider text-foreground mb-4">
              SHOP BY CATEGORY
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              From liquid metal polish to specialized wadding and creams, each format is engineered for specific surfaces and cleaning requirements.
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
                    Explore Format <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection Banner */}
      {featuredCollection && (
        <section className="py-16 lg:py-24 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <p className="text-primary font-medium tracking-widest uppercase mb-4">
Made for the finish
                </p>
                <h2 className="font-heading text-4xl lg:text-6xl tracking-wider text-foreground mb-6">
                  {featuredCollection.title.toUpperCase()}
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
                  {featuredCollection.description || 'Explore our carefully curated collection of premium products designed to elevate your metal restoration experience.'}
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading text-lg tracking-wider"
                >
                  <Link href={`/products`}>
                    EXPLORE COLLECTION
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
              <div className="order-1 lg:order-2 relative aspect-square lg:aspect-[4/5] bg-white rounded-2xl shadow-xl overflow-hidden flex items-center justify-center p-6 sm:p-10">
                <Image
                  src="/picas/pp/61Ah67TnasL._AC_UL640_FMwebp_QL65_.webp"
                  alt={featuredCollection?.title || "Metal Polish Collection"}
                  fill
                  className="object-contain p-4 sm:p-6"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Customer Reviews & Testimonials */}
      <section className="py-20 lg:py-32 border-b border-border bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary font-semibold tracking-widest uppercase mb-3 text-xs sm:text-sm">
              Proven Satisfaction
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl tracking-wider text-foreground mb-4">
              WHAT CUSTOMERS SAY
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Real feedback from craftsmen, antique collectors, and homeowners who trust our formula on brass, copper, and chrome.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {testimonials.map((test) => (
              <div
                key={test.name}
                className="bg-card/70 border border-border/60 rounded-2xl p-8 flex flex-col justify-between shadow-sm hover:border-primary/40 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center gap-1 text-primary mb-4">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary" />
                    ))}
                  </div>
                  <p className="text-sm sm:text-base text-foreground/90 leading-relaxed italic mb-6">
                    &ldquo;{test.comment}&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-border/40 flex items-center justify-between">
                  <div>
                    <h4 className="font-heading text-lg tracking-wider text-foreground">{test.name}</h4>
                    <p className="text-xs text-muted-foreground">{test.role}</p>
                  </div>
                  <span className="text-xs font-semibold text-primary flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                  </span>
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
                <p className="text-sm text-foreground font-medium mt-0.5">0044 743 810 6866</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground/70">Customer Service</p>
                <p className="text-sm text-foreground font-medium mt-0.5">Available for support and queries</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground/70">Business Type</p>
                <p className="text-sm text-foreground font-medium mt-0.5">Privately-owned business</p>
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
                  2 Hesper Road, Colchester, Essex, CO2 8JS, GB
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
              Care Guide &amp; Expert Advice
            </p>
            <h2 className="font-heading text-4xl lg:text-6xl tracking-wider text-foreground mb-4">
              METAL CARE &amp; FAQS
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
              Everything you need to know about using metal polish, surface safety, scratch reduction, and tarnish prevention.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-5 sm:space-y-6">
            {polishFaqs.map((faq, index) => (
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
              RESTORE WITH CONFIDENCE
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Join thousands of collectors, restorers, and households who trust our authentic metal polish essentials.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-secondary border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading tracking-wider px-8"
              >
                SUBSCRIBE
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
