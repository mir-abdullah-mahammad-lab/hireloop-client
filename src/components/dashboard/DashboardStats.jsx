'use client';

import StatCard from '@/components/dashboard/StatCard';


const DashboardStats =({statsData}) =>{
 
  

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