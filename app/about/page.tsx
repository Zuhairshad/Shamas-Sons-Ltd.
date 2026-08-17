import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ShieldCheck, Sparkles, Award, Layers } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Our Heritage | Metal Care & Restoration',
  description: 'Discover the tradition, precision, and craftsmanship behind our authentic multi-metal polish collections.',
}

const values = [
  {
    icon: Award,
    title: 'Centurial Heritage',
    description:
      'Rooted in British craftsmanship, our formulas stay true to the time-tested recipe trusted across generations of households and workshops.',
  },
  {
    icon: Layers,
    title: 'Multi-Metal Versatility',
    description:
      'Engineered to restore brass, copper, bronze, chrome, and stainless steel with a single, dependable formulation.',
  },
  {
    icon: Sparkles,
    title: 'Lasting Mirror Luster',
    description:
      'Micro-abrasive polishing action lifts stubborn oxidation quickly, leaving a sealed protective microfilm against humidity and tarnish.',
  },
  {
    icon: ShieldCheck,
    title: 'Uncompromising Quality',
    description:
      'Formulated to meet strict safety and quality standards, ensuring gentle yet powerful results on architectural hardware, cookware, and antiques.',
  },
]

const stats = [
  { number: '100+', label: 'Years of Tradition' },
  { number: '5', label: 'Core Metals Restored' },
  { number: '98%', label: 'Customer Satisfaction' },
  { number: '1000s', label: 'Of Surfaces Protected' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-primary font-medium tracking-widest uppercase mb-4">
                The Restoration Story
              </p>
              <h1 className="font-heading text-5xl lg:text-6xl tracking-wider text-foreground mb-6">
                CRAFTED FOR
                <br />
                <span className="text-primary">THE FINISH</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Liquid metal polish traces its pedigree back over a century in Britain, originally developed to replace labor-intensive pastes and bring fast, mirror-like clarity to industrial railways, maritime vessels, and luxury hotels.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Today, that same commitment to timeless shine lives on in every bottle, cream, and wadding format we supply — designed to restore treasured door hardware, antique copper cookware, and modern chrome fixtures effortlessly.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading text-lg tracking-wider"
              >
                <Link href="/products">
                  EXPLORE POLISH PRODUCTS
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
            <div className="relative aspect-square lg:aspect-[4/5] bg-secondary rounded-2xl overflow-hidden border border-border/50 shadow-xl">
              <Image
                src="/logo.png"
                alt="Shamas & Sons Ltd"
                fill
                className="object-contain p-16 opacity-25 invert"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8 bg-background/60 backdrop-blur-md rounded-2xl border border-border/40">
                  <p className="font-heading text-4xl lg:text-5xl text-foreground tracking-wider mb-2">
                    PROVEN FORMULA
                  </p>
                  <p className="font-heading text-6xl lg:text-7xl text-primary tracking-wider">
                    EST. 1905
                  </p>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mt-2">
                    Heritage Quality &amp; Care
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 lg:py-20 bg-secondary/40 border-y border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-heading text-5xl lg:text-6xl text-primary tracking-wider mb-2">
                  {stat.number}
                </p>
                <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary font-medium tracking-widest uppercase mb-4 text-xs sm:text-sm">
              Our Principles
            </p>
            <h2 className="font-heading text-4xl lg:text-5xl tracking-wider text-foreground">
              THE STANDARDS OF RESTORATION
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-card border border-border/60 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                    <value.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading text-xl tracking-wider text-foreground mb-3">
                    {value.title.toUpperCase()}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission / Call to Action */}
      <section className="py-20 lg:py-32 bg-secondary/30 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-primary font-medium tracking-widest uppercase mb-4 text-xs sm:text-sm">
              Authentic Performance
            </p>
            <h2 className="font-heading text-4xl lg:text-5xl tracking-wider text-foreground mb-6">
              PRESERVING BEAUTY ACROSS GENERATIONS
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-10">
              Whether restoring a century-old brass heirloom or keeping daily kitchen copper pristine, our formulas provide the dependable luster and anti-tarnish protection you can count on.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading text-lg tracking-wider px-8"
              >
                <Link href="/products">VIEW ALL PRODUCTS</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-border text-foreground hover:bg-secondary font-heading text-lg tracking-wider px-8"
              >
                <Link href="/contact">CONTACT SUPPORT</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
