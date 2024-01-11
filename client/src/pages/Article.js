import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import articles from './article-content';

import NotFound from './notFound';


import Articles from "../components/Articles";
import CommentsList from '../components/commentsList';
import AddCommentForm from '../components/AddCommentForm';

const Article = () => {
    const {name} = useParams();
    const article = articles.find((article) => article.name === name);
    const [articleInfo, setArticleInfo] = useState({ comments: [] });

    useEffect(() => {
      const fetchData = async () => {
        const result = await fetch(`/api/articles/${name}`);
        const body = await result.json();
        console.log(body);
        setArticleInfo(body)
      }
      fetchData();
      // console.log("Component Mounted");
    }, [name]);

    if(!article) return <NotFound />;
    const otherArticles = articles.filter(article => article.name !== name)
  return (
    <>
      <h1 className="sm:text-4xl text-2xl font-bold my-6 text-grey-900">
        {article.title}
    </h1>
    {article.content.map((paragraph, index) => (
        <p className='mx-auto leading-relaxed text-base mb-4' key={index}>
            {paragraph}
        </p>
    ))}    
    <h1 className='text-xl font-bold'>Comments</h1>
    <CommentsList comments={articleInfo.comments} />
    <AddCommentForm articleName={name} setArticleInfo={setArticleInfo} />
    <h1 className='sm:text-2xl text-xl font-bold my-4 text-gray-900'>
      Other articles
    </h1>
    <div className='flex flex-wrap -m-4'>
      <Articles articless={otherArticles} />
    </div>
    </>
  )
}

export default Article
