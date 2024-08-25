import React from 'react'

const Reply = ({reply}) => {
  return (
    <li><div>
        <p className='text-primary-blue'>{reply.user.username}</p>
        <p>{reply.id}:{reply.content}</p>
    </div></li>
  )
}

export default Reply