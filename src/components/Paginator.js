import React from 'react';
import PaginationTab from './PaginationTab';

const Paginator = (props) => {
  const pageRange = props.totalJobs / 10;
  const totalPages = Math.ceil(pageRange);
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className='pt-4 flex justify-end px-3 space-x-3'>
      {pages.map((page) => {
        return <PaginationTab history={props.history} page={page} key={page} />;
      })}
    </div>
  );
};

export default Paginator;
