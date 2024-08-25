import React, { createContext, useEffect, useState } from "react";
import Comment from "../components/Comment";
import data from "../../data.json";
import AddComment from "../components/AddComment";

export const CommentContext = createContext();
const HomePage = () => {
    const [comments, setComments] = useState(data.comments);
    const [id, setId] = useState(5);
    const [sessionComments, setSessionComments] = useState([]);
    useEffect(() => {
        setComments(prev =>([...prev,...sessionComments]));
    }, [sessionComments]);
    const updateLatestId=()=>{  
        setId(prev=>prev+1)
    }
    const addComment = (content, replyingTo)=>{
        updateLatestId();
        setComments(prev=>[...prev,
            {
                "id": id,
                "content": content,
                "createdAt": "1 minute ago",
                "score": 0,
                "user": {
                  "image": data.currentUser.image,
                  "username": data.currentUser.username
                },
                "replies": []
            }
        ])
}
const handleCommentDelete = (id)=>{
    // setComments(prev=>(prev.filter(comment=>comment.id !== id)));
    setComments(prev=>prev.map(comment=>{
        if(comment.id === id ){
            return null
        }
        return{
            ...comment,
            replies:comment.replies.filter(reply=>reply.id !== id)
        }}).filter(comment=>comment !== null)
)
}
const updateCommentReplies =(id,replies)=>{
    setComments(prev=>prev.map(comment=>{
        if (comment.id == id){
            return {
                ...comment,
                replies:replies
            }
        }
        return comment;
    }))
}

    return (
        <CommentContext.Provider value={handleCommentDelete}>
            <div className="max-w-screen min-h-screen bg-neutral-veryLightGray py-20 ">
                <div className="flex flex-col w-[min(750px,95%)] mx-auto gap-6">
                    <div className="flex flex-col gap-6">
                        {comments.map((comment, index) => (
                            <Comment key={index} comment={comment} latestId={id} updateLatestId={updateLatestId} updateCommentReplies={updateCommentReplies} />
                        ))}
                    </div>
                    <AddComment replyHandler={addComment} />
                </div>
            </div>
        </CommentContext.Provider>
    );
};

export default HomePage;
