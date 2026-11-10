import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ShieldCheck, Sparkles, Award, Layers } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Our Story | shamasandsons',
  description: 'Discover the story behind shamasandsons and its growing product catalogue.',
}

const values = [
  {
    icon: Award,
    title: 'Worth Your Time',
    description:
      'We focus on products that are useful, giftable, or simply good to discover — not noise for the sake of filling a page.',
  },
  {
    icon: Layers,
    title: 'Easy to Navigate',
    description:
      'Clear categories, plain information, and a simple path from browsing to the product you want.',
  },
  {
    icon: Sparkles,
    title: 'No Guesswork',
    description:
      'Each listing is designed to surface the details that help you decide, without dressing them up as promises.',
  },
  {
    icon: ShieldCheck,
    title: 'Always Evolving',
    description:
      'The range can grow as new finds earn their place, keeping shamasandsons open to more than one kind of product.',
  },
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
                Our Story
              </p>
              <h1 className="font-heading text-5xl lg:text-6xl tracking-wider text-foreground mb-6">
                MORE TO
                <br />
                <span className="text-primary">EXPLORE</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                shamasandsons is a storefront built around discovery: a considered place to explore a growing range of products without being limited to one category.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                The aim is simple: make browsing feel clear, useful, and open to whatever belongs in the catalogue next.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading text-lg tracking-wider"
              >
                <Link href="/products">
                  EXPLORE THE CATALOGUE
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
            <div className="relative aspect-square lg:aspect-[4/5] bg-secondary rounded-2xl overflow-hidden border border-border/50 shadow-xl">
              <Image
                src="/logo.png"
                alt="Shamas & Sons Ltd"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-16 opacity-25 invert"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8 bg-background/60 backdrop-blur-md rounded-2xl border border-border/40">
                  <p className="font-heading text-4xl lg:text-5xl text-foreground tracking-wider mb-2">
                    ONE PLACE
                  </p>
                  <p className="font-heading text-6xl lg:text-7xl text-primary tracking-wider">
                    TO EXPLORE
                  </p>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mt-2">
                    shamasandsons
                  </p>
                </div>
              </div>
            </div>
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
              WHAT WE CARE ABOUT
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
              Built for discovery
            </p>
            <h2 className="font-heading text-4xl lg:text-5xl tracking-wider text-foreground mb-6">
              MORE THAN ONE THING
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-10">
              shamasandsons is designed to make space for more: more products to discover, more reasons to return, and more ways to find what works for you.
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
