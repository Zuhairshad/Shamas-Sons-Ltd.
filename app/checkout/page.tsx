import type { Metadata } from 'next'
import { CheckoutClient } from './checkout-client'

export const metadata: Metadata = {
  title: 'Secure Checkout | Shamas & Sons Ltd',
  description: 'Complete your order of premium British metal polish and restoration products.',
}

export default function CheckoutPage() {
  return <CheckoutClient />
}
