"use client";

import React, { useState } from 'react';
// HeroUI V3 Primitives
import { Card, Button, Chip, Accordion } from "@heroui/react";
// Gravity UI Icons
import { CircleCheck, Thunderbolt, Flame, House, Person } from "@gravity-ui/icons";

const Planpage = () => {
    // Client state tracking for selector
    const [userRole, setUserRole] = useState("seeker");

    // Dynamic data mapping for Seekers and Recruiters
    const plansData = {
        seeker: [
            {
                name: "Free",
                price: "$0",
                period: "/forever",
                description: "Essential tools to kickstart your job hunting journey.",
                variant: "default",
                features: [
                    "Browse & save up to 10 jobs",
                    "Apply to up to 3 jobs per month",
                    "Basic profile creation",
                    "Email notifications & alerts",
                ],
                buttonText: "Current Plan",
                buttonColor: "default",
            },
            {
                name: "Pro",
                price: "$19",
                period: "/month",
                description: "Accelerate your search with advanced tracking.",
                variant: "tertiary",
                isFeatured: true,
                features: [
                    "Apply to up to 30 jobs per month",
                    "Unlimited saved jobs",
                    "Advanced application status tracking",
                    "Salary insight metrics",
                ],
                buttonText: "Upgrade to Pro",
                buttonColor: "primary",
            },
            {
                name: "Premium",
                price: "$39",
                period: "/month",
                description: "Ultimate exposure directly to high-tier employers.",
                variant: "secondary",
                features: [
                    "Everything in Pro",
                    "Unlimited job applications",
                    "Profile boost directly to recruiters",
                    "Early access to newly posted jobs",
                    "Priority customer support",
                ],
                buttonText: "Go Premium",
                buttonColor: "secondary",
            },
        ],
        recruiter: [
            {
                name: "Free",
                price: "$0",
                period: "/forever",
                description: "Perfect for testing or finding your first core hire.",
                variant: "default",
                features: [
                    "Up to 3 active job posts",
                    "Basic applicant tracking system (ATS)",
                    "Standard listing visibility",
                    "Great for a company's first year of hiring",
                ],
                buttonText: "Start Free",
                buttonColor: "default",
            },
            {
                name: "Growth",
                price: "$49",
                period: "/month",
                description: "Scale your workforce with targeted analytic views.",
                variant: "tertiary",
                isFeatured: true,
                features: [
                    "Up to 10 active job posts",
                    "Advanced applicant pipeline tracking",
                    "Basic recruitment metrics & analytics",
                    "Email customer support",
                ],
                buttonText: "Choose Growth",
                buttonColor: "primary",
            },
            {
                name: "Enterprise",
                price: "$149",
                period: "/month",
                description: "Complete custom pipeline tooling for large operations.",
                variant: "secondary",
                features: [
                    "Up to 50 active job posts",
                    "Advanced analytics dashboard analytics",
                    "Featured premium job listings",
                    "Team collaboration & multiple seats",
                    "Custom corporate branding control",
                    "24/7 Priority support channel",
                ],
                buttonText: "Contact Sales",
                buttonColor: "secondary",
            },
        ],
    };

    const currentPlans = plansData[userRole];

    return (
        <main className="max-w-6xl mx-auto px-4 py-12 md:py-20 space-y-16">
            
            {/* 1. Interactive Role Switcher Toggle */}
            <div className="flex justify-center">
                <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200/40">
                    <button
                        type="button"
                        onClick={() => setUserRole("seeker")}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                            userRole === "seeker"
                                ? "bg-white dark:bg-slate-800 text-primary shadow-sm"
                                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
                        }`}
                    >
                        <Person width={16} height={16} />
                        For Job Seekers
                    </button>
                    <button
                        type="button"
                        onClick={() => setUserRole("recruiter")}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                            userRole === "recruiter"
                                ? "bg-white dark:bg-slate-800 text-primary shadow-sm"
                                : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
                        }`}
                    >
                        <House width={16} height={16} />
                        For Recruiters
                    </button>
                </div>
            </div>

            {/* 2. Pricing Matrix Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                {currentPlans.map((plan, index) => (
                    <Card
                        key={index}
                        variant={plan.variant}
                        className={`flex flex-col justify-between h-full border transition-all duration-200 relative ${
                            plan.isFeatured
                                ? "border-primary shadow-lg ring-4 ring-primary/5 scale-102 z-10 m-2"
                                : "border-slate-200 dark:border-slate-800 shadow-sm"
                        }`}
                    >
                        {plan.isFeatured && (
                            <span className="absolute -top-3.7 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-primary text-white text-xs font-bold rounded-full uppercase tracking-widest flex items-center gap-1 shadow-sm">
                                <Flame width={12} height={12} /> Popular Choice
                            </span>
                        )}

                        <Card.Header className="p-6 md:p-8 flex flex-col items-start space-y-2">
                            <Card.Title className="text-xl font-bold text-slate-900 dark:text-white">
                                {plan.name}
                            </Card.Title>
                            <Card.Description className="text-sm text-slate-400 min-h-10 mt-1">
                                {plan.description}
                            </Card.Description>
                            <div className="flex items-baseline mt-4 gap-1">
                                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                                    {plan.price}
                                </span>
                                <span className="text-sm font-medium text-slate-400">
                                    {plan.period}
                                </span>
                            </div>
                        </Card.Header>

                        <Card.Content className="p-6 md:p-8 pt-0 grow flex flex-col justify-between space-y-8">
                            <ul className="space-y-4">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                                        <CircleCheck
                                            className={`mt-0.5 shrink-0 ${
                                                plan.isFeatured ? "text-primary" : "text-slate-400"
                                            }`}
                                            width={16}
                                            height={16}
                                        />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                color={plan.buttonColor}
                                variant={plan.isFeatured ? "solid" : "flat"}
                                size="lg"
                                className="w-full font-bold tracking-wide"
                                endContent={plan.isFeatured ? <Thunderbolt width={16} height={16} /> : null}
                            >
                                {plan.buttonText}
                            </Button>
                        </Card.Content>
                    </Card>
                ))}
            </div>

            {/* 3. FAQ Accordion Section */}
            <div className="max-w-3xl mx-auto space-y-6 pt-10">
                <div className="text-center space-y-2 mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-sm text-slate-400">
                        Everything you need to know about plans, subscription cycles, and account features.
                    </p>
                </div>

                <Accordion variant="splitted" selectionMode="multiple" className="px-0">
                    <Accordion.Item
                        key="cancel"
                        title="Can I change or cancel my subscription at any time?"
                        className="dark:bg-slate-950 border border-slate-100 dark:border-slate-800"
                    >
                        Yes, absolutely. You can upgrade, downgrade, or cancel your premium or pro membership anytime straight from your dashboard settings. If you cancel, your feature set remains active until the end of the current billing tier.
                    </Accordion.Item>

                    <Accordion.Item
                        key="refunds"
                        title="How do refunds work if I change my mind?"
                        className="dark:bg-slate-950 border border-slate-100 dark:border-slate-800"
                    >
                        We offer a satisfaction guarantee. Reach out to priority customer care within 7 days of your initial transactional upgrade, and we can issue a full refund if the premium parameters have not been extensively utilized.
                    </Accordion.Item>

                    <Accordion.Item
                        key="methods"
                        title="What payment methods do you accept securely?"
                        className="dark:bg-slate-950 border border-slate-100 dark:border-slate-800"
                    >
                        We support all major international processing tools via standard secure infrastructure pipelines—including Visa, Mastercard, American Express, Apple Pay, Google Pay, and localized bank integrations depending on your location.
                    </Accordion.Item>

                    <Accordion.Item
                        key="reset"
                        title="When do my application limits reset each period?"
                        className="dark:bg-slate-950 border border-slate-100 dark:border-slate-800"
                    >
                        Monthly submission quota caps (e.g., 3 jobs for Free Tier, 30 applications for Pro Tier) refresh automatically on your personal monthly billing timestamp, precisely 30 days following registration or subscription setup execution.
                    </Accordion.Item>
                </Accordion>
            </div>
        </main>
    );
};

export default Planpage;