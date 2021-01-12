import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Card from '../components/Card';
import PaginationTab from '../components/PaginationTab';

const JobSearch = (props) => {
  const [data, setData] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [fullTime, setFullTime] = useState(false);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const inputEl = useRef(null);

  const searchJobs = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!searchValue && !fullTime && !location) {
      props.history.push('/');
      setLoading(false);
    } else {
      props.history.push(
        `/jobs?description=${searchValue}&full_time=${fullTime}&location=${location}&page=1`
      );
    }
  };

  useEffect(() => {
    setLoading(true);
    let query = new URLSearchParams(props.location.search);
    if (
      query.get('description') ||
      query.get('full_time') ||
      query.get('location')
    ) {
      setSearchValue(query.get('description'));
      setFullTime(query.get('full_time') === 'true');
      setLocation(query.get('location'));
      axios
        .get('http://localhost:8080/https://jobs.github.com/positions.json', {
          params: {
            description: query.get('description'),
            full_time: query.get('full_time'),
            location: query.get('location'),
            page: query.get('page'),
          },
        })
        .then((response) => {
          setLoading(false);
          if (Array.isArray(response.data)) {
            setData(response.data);
          } else setError(true);
        })
        .catch((error) => {
          setLoading(false);
          setError(true);
        });
    } else {
      setLoading(false);
      setData(null);
    }
  }, [props.location]);

  return (
    <div>
      <div className='flex items-center justify-center h-28 px-3 mx-3 bg-search-background bg-cover bg-center font-body rounded-md'>
        <form className='flex flex-1 max-w-sm rounded-md h-12'>
          <div className='relative flex items-stretch flex-grow'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <svg
                className='w-5 h-5 text-gray-400'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                />
              </svg>
            </div>
            <input
              type='text'
              className='focus:ring-blue-600 focus:border-blue-600 block w-full rounded-l-md pl-10 text-sm border-gray-300 truncate'
              placeholder='Title, companies, expertise or benefits'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          <button
            onClick={searchJobs}
            className='-ml-px px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 focus:z-10'
          >
            Search
          </button>
        </form>
      </div>
      <div className='lg:flex'>
        <form onSubmit={searchJobs} className='lg:w-1/3'>
          <div className='flex items-center px-7 mt-7 font-display font-medium text-gray-600'>
            <input
              className=''
              type='checkbox'
              id='full-time'
              name='full-time'
              checked={fullTime}
              onChange={(e) => {
                setFullTime(e.target.checked);
                inputEl.current.focus();
              }}
            />
            <label className='ml-3 text-sm' htmlFor='full-time'>
              Full time only
            </label>
          </div>
          <div className='mt-8 px-3'>
            <h2 className='font-display uppercase tracking-wide font-bold text-sm text-gray-400'>
              Location
            </h2>
            <div className='h-12 mt-2 relative rounded-md shadow-sm'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <svg
                  className='w-5 h-5 text-gray-400'
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
              </div>
              <input
                ref={inputEl}
                type='text'
                className='focus:ring-blue-600 focus:border-blue-600 block h-full w-full pl-10 text-sm border-gray-300 rounded-md'
                placeholder='City, state, zipcode or country'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
        </form>
        <div className='flex-1 px-3'>
          {loading ? (
            <div className='loader'>Loading...</div>
          ) : data ? (
            data.map((job) => (
              <Card
                id={job.id}
                key={job.id}
                companyLogo={job.company_logo}
                createdAt={job.created_at}
                company={job.company}
                location={job.location}
                title={job.title}
                description={job.description}
                howToApply={job.how_to_apply}
                type={job.type}
              />
            ))
          ) : error ? (
            <div className='text-center'>Something went wrong :( </div>
          ) : null}
        </div>
      </div>
      {data && (
        <div className='pt-4 flex justify-end px-3 space-x-3'>
          <PaginationTab history={props.history} page={1} />
          <PaginationTab history={props.history} page={2} />
          <PaginationTab history={props.history} page={3} />
        </div>
      )}
    </div>
  );
};

export default withRouter(JobSearch);
