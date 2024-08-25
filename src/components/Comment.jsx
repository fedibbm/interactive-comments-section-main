import React, { useEffect, useState } from "react";
import Reply from "./Reply";
import TextBubble from "./TextBubble";

const Comment = ({
    comment,
    latestId,
    updateLatestId,
    handleCommentDelete,
    updateCommentReplies,
}) => {
    const [replies, setReplies] = useState([]);
    const [shouldUpdate, setShouldUpdate] = useState(false);
    useEffect(() => {
        setReplies(comment.replies);
    }, [comment]);
    const replyHandler = (content, replyingTo) => {
        updateLatestId();
        setShouldUpdate(true);
        setReplies((prev) => [
            ...prev,
            {
                id: latestId,
                content: content,
                createdAt: "1 minute ago",
                score: 0,
                replyingTo: replyingTo,
                user: {
                    image: {
                        png: "/images/avatars/image-juliusomo.png",
                        webp: "/images/avatars/image-juliusomo.webp",
                    },
                    username: "juliusomo",
                },
            },
        ]);
    };
    useEffect(() => {
        if (shouldUpdate) {
            updateCommentReplies(comment.id, replies);
            setShouldUpdate(false);
        }
    }, [shouldUpdate, replies]);

    return (
        <div className="flex flex-col gap-6">
            {/* main comment */}
            <TextBubble
                comment={comment}
                username=""
                replyHandler={replyHandler}
            />
            {/* replies */}
            {replies.length > 0 ? (
                <div>
                    <ul className="ml-2 pl-2 md:ml-8 md:pl-8 flex flex-col gap-6 border-l-[3px] border-l-neutral-lightGray">
                        {replies.map((reply, index) => (
                            <TextBubble
                                key={index}
                                comment={reply}
                                replyHandler={replyHandler}
                            />
                        ))}
                    </ul>
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default Comment;
