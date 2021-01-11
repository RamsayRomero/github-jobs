import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({
  id,
  companyLogo,
  createdAt,
  company,
  location,
  title,
  type,
}) => {
  function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = seconds / 31536000;
    if (interval > 1) {
      return Math.floor(interval) === 1
        ? Math.floor(interval) + ' year ago'
        : Math.floor(interval) + ' years ago';
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) === 1
        ? Math.floor(interval) + ' month ago'
        : Math.floor(interval) + ' months ago';
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) === 1
        ? Math.floor(interval) + ' day ago'
        : Math.floor(interval) + ' days ago';
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) === 1
        ? Math.floor(interval) + ' hour ago'
        : Math.floor(interval) + ' hours ago';
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) === 1
        ? Math.floor(interval) + ' minute ago'
        : Math.floor(interval) + ' minutes ago';
    }
    return Math.floor(interval) === 1
      ? Math.floor(interval) + ' second ago'
      : Math.floor(interval) + ' seconds ago';
  }

  const dateCreated = new Date(createdAt);

  return (
    <Link
      to={id}
      className='mt-5 p-3 flex bg-white shadow transition-shadow hover:shadow-lg rounded text-gray-700'
    >
      <div className='mr-3 flex-shrink-0'>
        <img
          className='h-24 w-24 object-contain rounded'
          src={companyLogo}
          alt=''
        />
      </div>
      <div className='lg:flex justify-between w-full'>
        <div>
          <div className='text-xs font-bold'>{company}</div>
          <div className='mt-2'>{title}</div>
          <div className='inline-block mt-3.5 py-1.5 px-2 text-xs font-bold rounded border border-gray-700'>
            {type}
          </div>
        </div>
        <div className='self-end flex-shrink-0'>
          <div className='flex space-x-3 mt-5 text-gray-400 font-medium text-xs'>
            <div className='flex items-center'>
              <svg
                className='h-4 w-4 inline flex-shrink-0'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>

              <span className='ml-1.5'>{location}</span>
            </div>
            <div className='flex items-center'>
              <svg
                className='h-4 w-4 inline flex-shrink-0'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>

              <span className='ml-1.5'>{timeSince(dateCreated)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
