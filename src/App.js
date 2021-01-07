import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import JobDescription from './pages/JobDescription';
import JobSearch from './pages/JobSearch';

const App = () => {
  return (
    <BrowserRouter>
      <div className='font-body bg-gray-100 min-h-screen'>
        <div className='md:container mx-auto lg:px-6 lg:py-4'>
          <header className='p-3 font-display text-2xl'>
            <span className='font-bold'>Github</span>{' '}
            <span className='font-light'>Jobs</span>
          </header>
          <Route exact path='/'>
            <JobSearch />
          </Route>
          <Route path='/:id'>
            <JobDescription />
          </Route>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
