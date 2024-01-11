import React from 'react'

const CommentsList = ({ comments }) => {
  return (
    <>
      <h3 className='sm:text-2xl text-xl font-body my-6 text-gray-900'>

      </h3>
      {comments?.map((comment) => {
        return(
            <div>
            <h4 className='font-bold'>{comment.username}</h4>
            <p className='mt-1 mb-4'>{comment.text}</p>
            </div>
        )
      })}
      </>
  )
}

export default CommentsList
