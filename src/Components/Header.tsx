import React from "react";

interface HeaderProps {
  totalTasks: number;
  completedTasks: number;
}

export const Header: React.FC<HeaderProps> = ({
  totalTasks,
  completedTasks,
}) => {
  const percentage =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="relative mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Task Space</h1>
          <p className="mt-2 text-gray-600">Organize your day, achieve more</p>
        </div>
        <div className="relative w-32 h-32">
          <svg className="transform -rotate-90 w-32 h-32">
            <circle
              cx="60"
              cy="60"
              r="54"
              className="stroke-current text-primary-100"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="60"
              cy="60"
              r="54"
              className="stroke-current text-primary-500"
              strokeWidth="12"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 54}`}
              strokeDashoffset={`${2 * Math.PI * 54 * (1 - percentage / 100)}`}
              style={{ transition: "stroke-dashoffset 0.5s ease" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="text-2xl font-bold text-primary-600">
                {percentage}%
              </span>
              <span className="block text-xs text-gray-500">Complete</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
