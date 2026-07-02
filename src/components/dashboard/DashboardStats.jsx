'use client';

import StatCard from '@/components/dashboard/StatCard';
// Make sure @gravity-ui/icons is installed
import { Bookmark, PaperPlane, Calendar, Medal} from '@gravity-ui/icons';

const DashboardStats =({statsData}) =>{
  // Mock data structure matching your exact image layout
  

  return (
    <div className="min-h-screen bg-zinc-950 p-8 text-white">
      <div className="mx-auto max-w-7xl">
        
        {/* Responsive Responsive Grid layout */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statsData.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              subtitle={stat.subtitle}
              value={stat.value}
              icon={stat.icon}
              iconClassName={stat.iconClassName}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

export default DashboardStats