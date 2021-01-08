import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

const JobDescription = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  let { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/https://jobs.github.com/positions/${id}.json`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
  }, [id]);

  return loading ? (
    <div className='loader'>Loading...</div>
  ) : error ? (
    <div className='text-center'>Something went wrong :(</div>
  ) : data ? (
    <div className='px-3 lg:flex lg:space-x-4 lg:mt-6'>
      <div className='lg:w-1/4 lg:flex-shrink-0'>
        <button
          onClick={() => history.goBack()}
          className='mt-5 flex items-center text-blue-500  text-sm font-medium font-display lg:mt-0'
        >
          <svg
            className='h-5 w-5 inline-block mr-3'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M7 16l-4-4m0 0l4-4m-4 4h18'
            />
          </svg>
          Back to search
        </button>
        <h2 className='mt-8 font-display uppercase font-bold text-sm tracking-wide text-gray-400'>
          How to apply
        </h2>
        <div
          className='mt-4 font-display font-medium text-sm text-gray-800'
          dangerouslySetInnerHTML={{ __html: data.how_to_apply }}
        ></div>
      </div>
      <div>
        <div className='lg:flex lg:space-x-4'>
          <h2 className='mt-9 text-gray-800 font-bold text-2xl lg:mt-0'>
            {data.title}
          </h2>
          <div className='inline-block items-center justify-center mt-4 px-2 py-1.5 border rounded border-gray-800 text-gray-800 text-xs font-bold lg:flex lg:mt-0'>
            {data.type}
          </div>
        </div>
        <div className='flex items-center mt-4 text-gray-400 text-sm font-medium'>
          <svg
            className='h-4 w-4 inline'
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
          <span className='ml-1.5'>5 days ago</span>
        </div>
        <div className='flex mt-6'>
          <div className='mr-4 flex-shrink-0'>
            <img
              className='h-12 w-12 rounded object-contain'
              src={data.company_logo}
              alt=''
            />
          </div>
          <div>
            <h3 className='text-lg font-bold text-gray-800'>{data.company}</h3>
            <div className='flex items-center text-gray-400 text-sm font-medium'>
              <svg
                className='h-4 w-4 inline'
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

              <span className='ml-1.5'>{data.location}</span>
            </div>
          </div>
        </div>
        <div
          className='mt-6 text-gray-700 job-description'
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>
      </div>
    </div>
  ) : null;
};

export default JobDescription;
