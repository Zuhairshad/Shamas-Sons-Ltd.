'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

const heroImages = [
  {
    src: '/images/brasso-light.jpeg',
    alt: 'Brasso metal polish on a sunlit surface',
  },
  {
    src: '/images/brasso-dark.jpeg',
    alt: 'Brasso metal polish on a dark surface',
  },
]

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-[780px] overflow-hidden bg-black sm:min-h-[840px] lg:min-h-[920px]">
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[activeIndex].src}
              alt={heroImages[activeIndex].alt}
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 right-6 z-20 flex gap-2 lg:bottom-10 lg:right-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            aria-label={`Show slide ${index + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'w-8 bg-primary' : 'w-1.5 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/15" />
      <div className="relative z-10 mx-auto flex min-h-[780px] max-w-7xl items-center px-6 py-24 sm:min-h-[840px] lg:min-h-[920px] lg:px-8">
        <div className="max-w-2xl">
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mb-5 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.28em] text-primary">
            <Sparkles className="h-4 w-4" /> The original shine maker
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-heading text-5xl leading-[0.9] tracking-wide text-white sm:text-7xl lg:text-8xl">
            BRING BACK<br />THE BRILLIANCE.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-8 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
            Cut through years of tarnish on brass, copper, chrome and stainless steel with a hardworking polish made for the pieces you want to keep.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-9 flex flex-wrap gap-4">
            <Button asChild size="lg" className="h-14 rounded-none bg-primary px-8 font-heading text-lg tracking-wider text-primary-foreground hover:bg-primary/90">
              <Link href="/products">SHOP BEST SELLERS <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 rounded-none border-white/40 bg-black/20 px-8 font-heading text-lg tracking-wider text-white hover:bg-white hover:text-black">
              <Link href="/about">OUR STORY</Link>
            </Button>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
    </section>
  )
}
