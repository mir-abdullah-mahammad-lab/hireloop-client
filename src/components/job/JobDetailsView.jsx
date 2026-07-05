"use client";

import React from 'react';
import { Button, Card} from '@heroui/react';
import { Briefcase, Compass, CircleDollar, Calendar, ShieldCheck, Gift } from "@gravity-ui/icons";

export default function JobDetailsView({ job }) {
    if (!job) {
        return (
            <div className="min-h-screen bg-[#09090b] text-white flex items-center justify-center">
                <p className="text-zinc-400">Loading job details...</p>
            </div>
        );
    }

    const {
        title,
        category,
        type,
        minSalary,
        maxSalary,
        currency,
        location,
        isRemote,
        deadline,
        responsibilities,
        requirements,
        benefits
    } = job;

    // Currency Formatting
    const currencySymbols = { USD: "$", EUR: "€", GBP: "£" };
    const symbol = currencySymbols[currency?.toUpperCase()] || "$";
    const workModeText = isRemote ? "Remote" : "Hybrid / On-site";

    const handleApply = () => {
        // Implement your application tracking logic or external link redirect here
        alert(`Applying for ${title}!`);
    };

    return (
        <div className="min-h-screen bg-[#09090b] text-white py-10 px-4 md:px-8">
            <div className="max-w-4xl mx-auto space-y-6">
                
                {/* Header Banner Card */}
                <Card className="bg-[#121214] border border-[#27272a] p-6 md:p-8 rounded-2xl shadow-xl">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-2">
                            <span className="text-xs font-semibold tracking-wider text-purple-400 uppercase bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                                {category}
                            </span>
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-2">{title}</h1>
                            
                            {/* Inline Metadata Quick Badges */}
                            <div className="flex flex-wrap gap-4 pt-2 text-zinc-400 text-sm">
                                <div className="flex items-center gap-1.5">
                                    <Compass className="text-zinc-500" size={16} />
                                    <span>{location} ({workModeText})</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Briefcase className="text-zinc-500" size={16} />
                                    <span>{type}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="text-zinc-500" size={16} />
                                    <span>Deadline: {deadline}</span>
                                </div>
                            </div>
                        </div>

                        {/* Apply Action block */}
                        <div className="flex flex-col sm:items-end justify-center gap-3 border-t md:border-t-0 border-[#27272a] pt-4 md:pt-0">
                            <div className="text-left sm:text-right">
                                <p className="text-xs text-zinc-500 uppercase tracking-wider">Salary Estimation</p>
                                <p className="text-xl font-bold text-emerald-400 mt-0.5">
                                    {symbol}{Number(minSalary).toLocaleString()} - {symbol}{Number(maxSalary).toLocaleString()} <span className="text-xs text-zinc-400 font-normal">/mo</span>
                                </p>
                            </div>
                            <Button 
                                color="primary" 
                                size="lg" 
                                className="w-full sm:w-auto font-medium rounded-xl shadow-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors px-8"
                                onPress={handleApply}
                            >
                                Apply Now
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Main Content Sections Layout */}
                <div className="bg-[#121214] border border-[#27272a] rounded-2xl shadow-xl p-6 md:p-8 space-y-6">
                    
                    {/* Responsibilities */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-zinc-200 font-semibold text-lg">
                            <ShieldCheck className="text-purple-400" size={20} />
                            <h2>Core Responsibilities</h2>
                        </div>
                        <p className="text-zinc-400 leading-relaxed text-sm whitespace-pre-line">
                            {responsibilities}
                        </p>
                    </div>

                    <div className="h-px w-full bg-[#27272a]" />

                    {/* Requirements */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-zinc-200 font-semibold text-lg">
                            <Gift className="text-purple-400" size={20} />
                            <h2>Requirements & Skills</h2>
                        </div>
                        <p className="text-zinc-400 leading-relaxed text-sm whitespace-pre-line">
                            {requirements}
                        </p>
                    </div>

                    <div className="h-px w-full bg-[#27272a]" />

                    {/* Benefits */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-zinc-200 font-semibold text-lg">
                            <CircleDollar className="text-purple-400" size={20} />
                            <h2>Perks & Benefits</h2>
                        </div>
                        <p className="text-zinc-400 leading-relaxed text-sm whitespace-pre-line">
                            {benefits}
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}