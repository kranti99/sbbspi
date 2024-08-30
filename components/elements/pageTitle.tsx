import React from 'react';
import Link from 'next/link';

interface PageHeaderProps {
  title: string;
  breadcrumb: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, breadcrumb }) => {
  return (
    <div className="pageHeader bg-primary-700">
      <h1>{title}</h1>
      <nav>
        <Link href="/">Home</Link> &gt; <span>{breadcrumb}</span>
      </nav>
    </div>
  );
};

export default PageHeader;
