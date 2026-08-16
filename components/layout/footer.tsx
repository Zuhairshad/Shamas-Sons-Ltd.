'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Twitter, Facebook, Youtube, Linkedin } from 'lucide-react'

const navLinks = [
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
]

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
]

export function Footer() {
  return (
    <footer className="bg-background border-t border-border/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Shamas & Sons"
              width={190}
              height={400}
              className="h-12 w-auto invert"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
          {navLinks.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Dotted Separator */}
        <div className="border-t border-dotted border-border/40 mb-8" />

        {/* Business Information */}
        <div className="mb-8 grid grid-cols-1 gap-x-8 gap-y-3 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground/70">Business Name</p>
            <p className="text-sm text-foreground">Shamas &amp; Sons Ltd</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground/70">VAT Number</p>
            <p className="text-sm text-foreground">GB458915253</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground/70">Trade Register No.</p>
            <p className="text-sm text-foreground">13659351</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground/70">Customer Service</p>
            <p className="text-sm text-foreground">+44 7438 106866</p>
          </div>
          <div className="sm:col-span-2 lg:col-span-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground/70">Registered Address</p>
            <p className="text-sm text-foreground">2 Hesper Road, Colchester, Essex, CO2 8JS, United Kingdom</p>
          </div>
        </div>

        {/* Dotted Separator */}
        <div className="border-t border-dotted border-border/40 mb-8" />

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-muted-foreground order-2 sm:order-1">
            &copy; {new Date().getFullYear()} Shamas &amp; Sons Ltd
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4 order-1 sm:order-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
