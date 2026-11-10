import type { Metadata } from 'next'
import { CheckoutClient } from './checkout-client'

export const metadata: Metadata = {
  title: 'Secure Checkout | Shamas & Sons Ltd',
  description: 'Review your Shamas & Sons order before checkout.',
}

export default function CheckoutPage() {
  return <CheckoutClient />
}
