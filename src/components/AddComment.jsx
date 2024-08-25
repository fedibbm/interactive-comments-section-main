import React, { useEffect, useState } from "react";
import data from '../../data.json';

const AddComment = ({ className, replyingTo, replyHandler, value="" }) => {
    const [content, setContent] = useState(replyingTo?`@${replyingTo} `:value);

    // Handle input changes
    const handleChange = (event) => {
        setContent(event.target.value);
    };

    
    

    return (
        <div className={`flex items-start rounded-xl bg-neutral-white p-2 gap-2 md:p-6 md:gap-6 transition-all ease-in-out duration-300 ${className || ""}`}>
            <div
                className="h-12 w-12 bg-cover bg-center rounded-full hidden min-[400px]:block hover:cursor-pointer"
                style={{ backgroundImage: `url(${data.currentUser.image.png})` }}
            ></div>
            <textarea
                placeholder="Add a comment..."
                value={content}
                onChange={handleChange}
                className="placeholder:text-gray-400 resize-none border border-neutral-lightGray grow rounded-md focus-visible:outline-none p-4 max-h-36 h-full"
            />
            <button
                className="p-2 md:py-4 md:px-6 rounded-md bg-primary-blue text-white hover:opacity-50"
                onClick={()=>{
                    replyHandler(content,replyingTo);
                    setContent(replyingTo?`@${replyingTo} `:"");
                }}
            >
                SEND
            </button>
        </div>
    );
};

export default AddComment;
