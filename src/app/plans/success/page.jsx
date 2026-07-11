import { redirect } from 'next/navigation';
import Link from 'next/link';
import { stripe } from '../../../lib/stripe';

// HeroUI V3 Primitives & Icons
import { Card, Button, Chip } from "@heroui/react";
import { CircleCheckFill, Envelope, ArrowRight, Star } from "@gravity-ui/icons";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)');
  }

  const {
    status,
    customer_details: { email: customerEmail },
    metadata 
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  });

  if (status === 'open') {
    return redirect('/');
  }

  if (status === 'complete') {
    const subsInfo = {
      email: customerEmail,
      planId:metadata.planId
    }
    const result = await fetch(`${process.env.PUBLIC_BASE_URL}/api/subscription`,{
      method:'POST',
      headers:{
        "Content-Type" : "application/json",
    },
    body :JSON.stringify(subsInfo)
    }).then(res => res.json())
    console.log(result, 'RESULT OF THE POST IN BACKEND')

    return (
      <main className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-slate-50/50 dark:bg-slate-950/20">
        <div className="w-full max-w-md relative">
          
          {/* Subtle background glow effect */}
          <div className="absolute inset-0 bg-linear-to-r from-success-400/20 to-primary-400/10 blur-3xl -z-10 rounded-full transform scale-90" />

          <Card variant="default" className="border border-slate-100 dark:border-slate-800 shadow-xl overflow-visible">
            
            {/* Top Success Floating Badge Icon */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="w-12 h-12 bg-success text-white rounded-full flex items-center justify-center shadow-lg shadow-success/20 ring-4 ring-white dark:ring-slate-900 animate-bounce-short">
                <CircleCheckFill width={28} height={28} />
              </div>
            </div>

            <Card.Header className="flex flex-col items-center text-center p-6 pt-10 pb-2">
              <Chip size="sm" color="success" variant="flat" className="font-bold uppercase tracking-wider mb-2">
                Payment Received
              </Chip>
              <Card.Title className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Thank You!
              </Card.Title>
              <Card.Description className="text-slate-500 font-medium text-sm mt-1">
                Your subscription has been successfully activated.
              </Card.Description>
            </Card.Header>

            <Card.Content className="p-6 text-center space-y-6">
              {/* Message block matching your exact requirements string text */}
              <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800/60 text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-left">
                <p>
                  We appreciate your business! A confirmation email will be sent to{' '}
                  <strong className="text-slate-900 dark:text-white font-semibold break-all">
                    {customerEmail}
                  </strong>
                  .
                </p>
                <p className="mt-3 text-slate-400 flex items-center gap-1.5 text-xs">
                  <Envelope width={14} height={14} className="shrink-0" />
                  <span>
                    Questions? Email{' '}
                    <a href="mailto:orders@example.com" className="text-primary hover:underline font-medium">
                      orders@example.com
                    </a>
                  </span>
                </p>
              </div>

              {/* Functional Navigation Blocks */}
              <div className="space-y-2 pt-2">
                <Link href="/jobs">
                  <Button color="primary" variant="solid" className="w-full font-bold shadow-md shadow-primary/10" endContent={<ArrowRight width={16} height={16} />}>
                    Go to Dashboard
                  </Button>
                </Link>
                
                <Link href="/jobs">
                  <Button variant="light" className="w-full text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 text-xs font-semibold">
                    Explore New Job Opportunities
                  </Button>
                </Link>
              </div>
            </Card.Content>

          </Card>
        </div>
      </main>
    );
  }
}