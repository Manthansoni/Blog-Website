import React from 'react';
import articles from './article-content';
import Articles from '../components/Articles';

const ArticlesList = () => {
  return (
    <div>
      <h1 className="sm:text-4xl text-2xl font-bold my-6 text-grey-900">
        Articles
    </h1>
    <div className='sm:text-4xl text-2xl font-bold my-6 text-gray-900'>
        <div className='flex flex-wrap -m-4'>
            <Articles articless={articles} />
        </div>
    </div>
    </div>
  )
}

export default ArticlesList
