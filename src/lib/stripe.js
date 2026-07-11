import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID = {
    'seeker_pro': 'price_1TrNbT78mlvatoOwM2erXDPF',
    'seeker_premium': 'price_1TrMnS78mlvatoOwd9FVhH4Z',
    'recruiter_enterprise':'price_1TrNnY78mlvatoOw0IxXLRyf',
    'recruiter_growth':'price_1TrNpN78mlvatoOwDVw0Xq9r'
}