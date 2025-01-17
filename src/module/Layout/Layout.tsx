import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-surface-100">
      <div className="max-w-4xl mx-auto px-4 py-8">{children}</div>
    </div>
  );
};
