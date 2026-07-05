"use client";

import React from "react";
import { Card } from "@heroui/react";
import Link from "next/link";
import { Briefcase, Compass, CircleDollar, ArrowUpRight } from "@gravity-ui/icons";



export default function JobCard({ job }) {
    if (!job) return null;

    // Destructure database payload fields safely
    const {
        _id,
        title,
        minSalary,
        maxSalary,
        currency,
        location,
        isRemote,
        responsibilities
    } = job;

    // Extract string ID depending on if it's MongoDB raw structure or aggregated
    const jobId = _id?.$oid || _id;

    // Formatter for Currency Symbol Mapping
    const currencySymbols = {
        USD: "$",
        EUR: "€",
        GBP: "£"
    };
    const symbol = currencySymbols[currency?.toUpperCase()] || "$";

    // Build the location layout string (e.g., "Dubai" + " (Remote)" or "Hybrid")
    const workModeText = isRemote ? "Remote" : "Hybrid";

    return (
        <Card className="w-full max-w-sm bg-[#121214] text-white p-6 rounded-2xl border border-[#27272a] shadow-xl hover:border-zinc-700 transition-all flex flex-col justify-between">

            {/* Card Header Section */}
            <Card.Header className="p-0 flex flex-col gap-2 items-start">
                <Card.Title className="text-2xl font-semibold tracking-tight text-white m-0">

                    {job.title}
                </Card.Title>
                <Card.Description className="text-zinc-400 text-sm leading-relaxed line-clamp-2 mt-1">
                    {responsibilities}

                </Card.Description>
            </Card.Header>

            {/* Card Content Section (Badges & Metadata) */}
            <Card.Content className="p-0 my-6 flex flex-wrap gap-2">
                {/* Location Badge */}
                <div className="inline-flex items-center gap-1.5 bg-[#1c1c1f] text-zinc-300 text-xs font-medium px-3 py-1.5 rounded-full border border-[#27272a]">
                    <Compass className="text-purple-400" size={14} />
                    <span>{location}</span>
                </div>

                {/* Work Setting Badge */}
                <div className="inline-flex items-center gap-1.5 bg-[#1c1c1f] text-zinc-300 text-xs font-medium px-3 py-1.5 rounded-full border border-[#27272a]">
                    <Briefcase className="text-purple-400" size={14} />
                    <span>{workModeText}</span>
                </div>

                {/* Salary Estimation Badge */}
                <div className="inline-flex items-center gap-1.5 bg-[#1c1c1f] text-zinc-300 text-xs font-medium px-3 py-1.5 rounded-full border border-[#27272a] w-full sm:w-auto">
                    <CircleDollar className="text-purple-400" size={14} />
                    <span>
                        {symbol}
                        {Number(minSalary).toLocaleString()}-{symbol}
                        {Number(maxSalary).toLocaleString()}/month
                    </span>
                </div>
            </Card.Content>

            {/* Card Footer Section (Action Link) */}
            <Card.Footer className="p-0 pt-2 flex items-center justify-start">
                <Link
                    href={`/jobs/${jobId}`}
                    className="inline-flex items-center gap-2 text-white hover:text-zinc-300 font-medium text-sm group transition-colors cursor-pointer"
                >
                    <span>Apply Now</span>
                    <ArrowUpRight
                        size={16}
                        className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                </Link>
            </Card.Footer>

        </Card>
    );
}