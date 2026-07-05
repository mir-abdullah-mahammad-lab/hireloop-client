'use client'
import React from 'react';
import { useSession } from "@/lib/auth-client";
import DashboardStats from '@/components/dashboard/DashboardStats';
import { Bookmark, PaperPlane, Calendar, Medal} from '@gravity-ui/icons';
const RecruiterDashboardHomePage = () => {
  const {data:session, isPending} = useSession()

 if(isPending){
  return <>Loading...</>
 }
 const user = session?.user
 console.log(user, 'session from user')

 const statsData = [
    {
      title: 'Saved Jobs',
      value: 12,
      icon: Bookmark,
      iconClassName: 'text-zinc-400',
    },
    {
      title: 'Applications',
      subtitle: 'Submitted',
      value: 24,
      icon: PaperPlane,
      iconClassName: 'text-zinc-400',
    },
    {
      title: 'Interviews',
      subtitle: 'Scheduled',
      value: 3,
      icon: Calendar,
      iconClassName: 'text-amber-500', // Matches the orange calendar color
    },
    {
      title: 'Offers Received',
      value: 1,
      icon: Medal, // Or use the precise 'Award' icon if available in your build
      iconClassName: 'text-emerald-500', // Matches the green ribbon color
    },
  ];
  return (
    <div>
      <h1>Hello {user?.name}</h1>
      <DashboardStats statsData={statsData} ></DashboardStats>
    </div>
  );
};

export default RecruiterDashboardHomePage;