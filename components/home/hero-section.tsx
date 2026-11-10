import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-[#151515]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(185,28,28,0.24),transparent_38%),radial-gradient(circle_at_85%_78%,rgba(127,29,29,0.14),transparent_42%)]" />
      <div className="relative mx-auto flex min-h-[770px] max-w-5xl items-center justify-center px-6 py-24 text-center sm:min-h-[810px] lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-6 flex items-center justify-center gap-2 text-sm font-medium uppercase tracking-[0.28em] text-primary">
            <Sparkles className="h-4 w-4" /> Welcome to
          </p>
          <h1 className="font-heading text-6xl leading-[0.88] tracking-wide text-white sm:text-8xl lg:text-9xl">
            shamasandsons
          </h1>
          <div className="mx-auto mt-8 h-px w-16 bg-primary" />
          <p className="mx-auto mt-8 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
            Discover thoughtfully selected products in one easy-to-browse place. Explore what suits your day, your home, and the moments worth sharing.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="h-14 rounded-none bg-primary px-8 font-heading text-lg tracking-wider text-primary-foreground hover:bg-primary/90">
              <Link href="/products">EXPLORE PRODUCTS <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 rounded-none border-white/30 bg-transparent px-8 font-heading text-lg tracking-wider text-white hover:bg-white hover:text-black">
              <Link href="/about">OUR STORY</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
    </section>
  )
}
