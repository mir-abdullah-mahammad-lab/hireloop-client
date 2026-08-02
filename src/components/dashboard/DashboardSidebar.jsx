import { ComponentType, SVGProps } from "react";

import { Bell, Envelope, Gear, House, Magnifier, Person } from "@gravity-ui/icons";
import {  Drawer } from "@heroui/react";
import Link from "next/link";
import { getUserSession } from "@/lib/core/session";

const DashboardSidebar = async () => {
    const user = await getUserSession()
    const recruiterNavLinks = [
        { icon: House, href:`/dashboard/recruiter`, label: "Home" },
        { icon: Magnifier, href:"/dashboard/recruiter/jobs", label:"jobs"},
        { icon: Bell, href:"/dashboard/recruiter/jobs/new", label: "Create A Job" },
        { icon: Envelope, href: "/message", label: "Messages" },
        { icon: Person, href:"/profile", label: "Profile" },
        { icon: Gear, href:"/settings",label: "Settings" },
    ];

    const seekerNavLinks = [
    { icon: House, href: "/dashboard/seeker", label: "Dashboard" },
    { icon: Magnifier, href: "/dashboard/seeker/jobs", label: "Jobs" },
    { icon: Bell, href: "/dashboard/seeker/saved-jobs", label: "Saved Jobs" },
    { icon: Envelope, href: "/dashboard/seeker/applications", label: "Applications" },
    { icon: Person, href: "/dashboard/seeker/billing", label: "Billing" },
    { icon: Gear, href: "/dashboard/seeker/settings", label: "Settings" },
];
    const adminNavLinks = [
    { icon: House, href: "/dashboard/admin", label: "Dashboard" },
    { icon: Magnifier, href: "/dashboard/admin/jobs", label: "Jobs" },
    { icon: Bell, href: "/dashboard/admin/saved-jobs", label: "Saved Jobs" },
    { icon: Envelope, href: "/dashboard/admin/applications", label: "Applications" },
    { icon: Person, href: "/dashboard/admin/billing", label: "Billing" },
    { icon: Gear, href: "/dashboard/admin/settings", label: "Settings" },
];
    const navLinksMap = {
    seeker : seekerNavLinks,
    recruiter : recruiterNavLinks,
    admin: adminNavLinks
 }

    const navItems =navLinksMap[user?.role || 'seeker']
    const navContent = navItems.map((item) => (
        <Link
            key={item.label}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
            type="button"
            href={item.href}
        >
            <item.icon className="size-5 text-muted" />
            {item.label}
        </Link>
    ))
    return (
        <div>
            <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">{navContent}</aside>
           
        </div>
    );
};

export default DashboardSidebar;



