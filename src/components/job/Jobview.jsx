"use client";

import React, { useState, useMemo } from 'react';
import { Input, Select, Label, ListBox } from '@heroui/react';
import JobCard from '@/components/job/JobCard';

export default function JobsView({ initialJobs = [] }) {
    // State management for search inputs and selections
    const [searchQuery, setSearchQuery] = useState("");
    const [jobTypeFilter, setJobTypeFilter] = useState("all");
    const [workModeFilter, setWorkModeFilter] = useState("all");

    // Filter logic processed whenever state conditions update
    const filteredJobs = useMemo(() => {
        return initialJobs.filter((job) => {
            // 1. Core text search index matching title, responsibilities, or location
            const matchesSearch =
                job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.responsibilities?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.location?.toLowerCase().includes(searchQuery.toLowerCase());

            // 2. Select matching for the exact job type string 
            const matchesType =
                jobTypeFilter === "all" ||
                job.type?.toLowerCase() === jobTypeFilter.toLowerCase();

            // 3. Work setting evaluation using Boolean maps from DB payload
            const matchesWorkMode =
                workModeFilter === "all" ||
                (workModeFilter === "remote" && job.isRemote) ||
                (workModeFilter === "hybrid" && !job.isRemote);

            return matchesSearch && matchesType && matchesWorkMode;
        });
    }, [initialJobs, searchQuery, jobTypeFilter, workModeFilter]);

    return (
        <div className="w-full max-w-7xl mx-auto p-4 space-y-6 text-white">

           {/* Filter Control Inputs Wrapper */}
<div className="flex flex-col md:flex-row gap-4 bg-[#121214] p-4 rounded-xl border border-[#27272a]">
    
    {/* Search Text Input */}
    <div className="flex-1">
        <Input
            variant="primary"
            placeholder="Search by title, skills, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
        />
    </div>

    {/* Job Type Dropdown Selector */}
    <div className="w-full md:w-48">
        <Select
            value={jobTypeFilter}
            onChange={(val) => setJobTypeFilter(String(val))}
            placeholder="All Types"
        >
            <Label className="text-zinc-400 text-xs mb-1 block">Job Type</Label>
            <Select.Trigger className="w-full bg-[#1c1c1f] text-white border border-[#27272a] rounded-xl p-2.5 flex justify-between items-center">
                <Select.Value />
                <Select.Indicator />
            </Select.Trigger>
            
            <Select.Popover>
                <ListBox className="bg-[#121214] border border-[#27272a] rounded-xl p-1 text-white">
                    <ListBox.Item id="all" textValue="All Types" className="p-2 hover:bg-[#1c1c1f] rounded-lg cursor-pointer">All Types</ListBox.Item>
                    <ListBox.Item id="Full-time" textValue="Full-time" className="p-2 hover:bg-[#1c1c1f] rounded-lg cursor-pointer">Full-time</ListBox.Item>
                    <ListBox.Item id="Part-time" textValue="Part-time" className="p-2 hover:bg-[#1c1c1f] rounded-lg cursor-pointer">Part-time</ListBox.Item>
                    <ListBox.Item id="Contract" textValue="Contract" className="p-2 hover:bg-[#1c1c1f] rounded-lg cursor-pointer">Contract</ListBox.Item>
                </ListBox>
            </Select.Popover>
        </Select>
    </div>

    {/* Work Setting Mode Dropdown Selector */}
    <div className="w-full md:w-48">
        <Select
            value={workModeFilter}
            onChange={(val) => setWorkModeFilter(String(val))}
            placeholder="All Settings"
        >
            <Label className="text-zinc-400 text-xs mb-1 block">Work Setting</Label>
            <Select.Trigger className="w-full bg-[#1c1c1f] text-white border border-[#27272a] rounded-xl p-2.5 flex justify-between items-center">
                <Select.Value />
                <Select.Indicator />
            </Select.Trigger>

            <Select.Popover>
                <ListBox className="bg-[#121214] border border-[#27272a] rounded-xl p-1 text-white">
                    <ListBox.Item id="all" textValue="All Settings" className="p-2 hover:bg-[#1c1c1f] rounded-lg cursor-pointer">All Settings</ListBox.Item>
                    <ListBox.Item id="remote" textValue="Remote Only" className="p-2 hover:bg-[#1c1c1f] rounded-lg cursor-pointer">Remote Only</ListBox.Item>
                    <ListBox.Item id="hybrid" textValue="Hybrid / On-site" className="p-2 hover:bg-[#1c1c1f] rounded-lg cursor-pointer">Hybrid / On-site</ListBox.Item>
                </ListBox>
            </Select.Popover>
        </Select>
    </div>
</div>

            {/* Zero State Fallback UI */}
            {filteredJobs.length === 0 && (
                <div className="text-center py-12 bg-[#121214] rounded-2xl border border-dashed border-zinc-800">
                    <p className="text-zinc-400 text-base">No jobs match your search parameters.</p>
                </div>
            )}

            {/* Grid Result Output Rendering */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredJobs.map((job) => (
                    <JobCard key={job._id?.$oid || job._id} job={job} />
                ))}
            </div>
        </div>
    );
}