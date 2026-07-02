import React from 'react';

const  StatCard = ({ title, subtitle, value, icon: Icon, iconClassName = "text-zinc-400" }) =>{
  return (
    <div className="flex flex-col justify-between h-40 w-full rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 shadow-sm transition-hover hover:border-zinc-700">
      {/* Top Section: Title & Icon */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium text-zinc-400">{title}</span>
          {subtitle && (
            <span className="text-xs text-zinc-500">{subtitle}</span>
          )}
        </div>
        {Icon && (
          <span className={`flex items-center justify-center ${iconClassName}`}>
            <Icon className="w-5 h-5" />
          </span>
        )}
      </div>

      {/* Bottom Section: The Big Number */}
      <div>
        <h3 className="text-4xl font-semibold tracking-tight text-zinc-100">
          {value}
        </h3>
      </div>
    </div>
  );
}
export default StatCard;