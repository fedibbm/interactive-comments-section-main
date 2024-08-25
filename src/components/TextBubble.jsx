import React, { useEffect, useState, useContext } from "react";
import PlusIconSVG from "../svgs/PlusIconSVG";
import MinusIconSVG from "../svgs/MinusIconSVG";
import ReplyIconSVG from "../svgs/ReplyIconSVG";
import AddComment from "./AddComment";
import { CommentContext } from "../pages/HomePage";
import data from "../../data.json";
import DeleteIconSVG from "../svgs/DeleteIconSVG";
import EditIconSVG from "../svgs/EditIconSVG";
import DeletePrompt from "./DeletePrompt";

// Function to process content with links
const processContent = (content) => {
    return content.split(/(\s+)/).map((word, index) =>
        word.startsWith("@") ? (
            <a
                key={index}
                className="text-primary-blue font-[500] hover:cursor-pointer"
                href="https://www.facebook.com/amine.maaloul.754"
                target="_blank"
                rel="noopener noreferrer"
            >
                {word}
            </a>
        ) : (
            word
        )
    );
};

// Function to unprocess content
const reverseContentProcessing = (elements) => {
    return elements
        .map((element) => {
            if (typeof element === "string") {
                return element;
            } else if (React.isValidElement(element)) {
                return element.props.children;
            }
            return "";
        })
        .join("");
};

const TextBubble = ({ comment, className, replyHandler }) => {
    const [editMode, setEditMode] = useState(false);
    const handleCommentDelete = useContext(CommentContext);
    const [isReplying, setIsReplying] = useState(false);
    const [content, setContent] = useState("");
    const [score, setScore] = useState(comment?.score || 0);
    const [promptDelete, setPromptDelete] = useState({ bool: false, id: 0 });

    // Update content with links if they start with '@'
    useEffect(() => {
        if (comment?.content) {
            setContent(processContent(comment.content));
        }
    }, [comment]);

    // Handlers for score
    const handleIncreaseScore = () => {
        setScore((prevScore) => Math.min(prevScore + 1, comment.score + 1));
    };

    const handleDecreaseScore = () => {
        setScore((prevScore) => Math.max(prevScore - 1, comment.score - 1));
    };

    // Update comment content
    const updateComment = (newContent) => {
        setContent(processContent(newContent));
        setEditMode(false);
    };

    // Early return if comment or content is not available
    if (!comment || !content) {
        return null;
    }

    // Conditional rendering for edit mode
    if (editMode) {
        return (
            <AddComment
                value={reverseContentProcessing(content)}
                replyHandler={updateComment}
                className={"h-40"}
                action = "UPDATE"
            />
        );
    }

    return (
        <div className={`flex flex-col ${isReplying ? "gap-6" : ""}`}>
            {promptDelete.bool ? (
                <DeletePrompt
                    handleCommentDelete={() => {
                        handleCommentDelete(promptDelete.id);
                        setPromptDelete({bool:false,id:0})
                    }}
                    setPromptDelete={setPromptDelete}
                />
            ) : (
                ""
            )}
            <div
                className={`flex flex-col-reverse md:flex-row justify-center bg-neutral-white rounded-lg gap-4 p-2 md:p-8 pt-6 min-h-48 ${
                    className || ""
                }`}
            >
                <div className="flex justify-between gap-2 items-center">
                    <div className="flex grow md:flex-col items-center justify-between bg-neutral-veryLightGray rounded-xl p-3 my-2 md:h-28 md:min-w-10 max-w-28">
                        <div className="flex items-center justify-center">
                            <PlusIconSVG
                                onClick={handleIncreaseScore}
                                className={`text-lg hover:text-primary-blue hover:cursor-pointer scale-125 ${
                                    score === comment.score + 1
                                        ? "text-primary-blue"
                                        : "text-primary-lightBlue"
                                }`}
                            />
                        </div>
                        <p className="text-primary-blue font-[500] text-xl">
                            {score}
                        </p>
                        <div className="flex items-center justify-center">
                            <MinusIconSVG
                                onClick={handleDecreaseScore}
                                className={`text-lg hover:text-primary-blue hover:cursor-pointer scale-125 ${
                                    score === comment.score - 1
                                        ? "text-primary-blue"
                                        : "text-primary-lightBlue"
                                }`}
                            />
                        </div>
                    </div>
                    <div className="flex gap-2 md:hidden">
                        {comment.user.username === data.currentUser.username ? (
                            <>
                                <button
                                    className="bg-transparent hover:opacity-50 text-primary-red font-[500] flex align-center gap-2 justify-center"
                                    onClick={() =>
                                        setPromptDelete({
                                            bool: true,
                                            id: comment.id,
                                        })
                                    }
                                >
                                    <DeleteIconSVG className="text-white" />
                                    <p>Delete</p>
                                </button>
                                <button
                                    className="bg-transparent hover:opacity-50  text-primary-blue font-[500] flex align-center gap-2 justify-center"
                                    onClick={() => setEditMode(true)}
                                >
                                    <EditIconSVG className="text-white" />
                                    <p>Edit</p>
                                </button>
                            </>
                        ) : (
                            <button
                                className="flex items-center text-primary-blue hover:opacity-50 gap-2 focus-visible:outline-none"
                                onClick={() => setIsReplying((prev) => !prev)}
                            >
                                <ReplyIconSVG />
                                <p className="font-bold">Reply</p>
                            </button>
                        )}
                    </div>
                </div>
                <div className="flex flex-col grow px-4 gap-4">
                    <div className="flex flex-col md:flex-row justify-between">
                        <div className="flex items-center gap-2">
                            <div
                                className="h-8 w-8 bg-cover bg-center rounded-full hover:cursor-pointer"
                                style={{
                                    backgroundImage: `url(${comment.user.image.png})`,
                                }}
                            ></div>
                            <h2 className="hover:cursor-pointer">
                                {comment.user.username}
                            </h2>
                            <p className="text-neutral-grayishBlue">
                                {comment.createdAt}
                            </p>
                        </div>
                        <div className=" gap-4 hidden md:flex">
                            {comment.user.username ===
                            data.currentUser.username ? (
                                <>
                                    <button
                                        className="bg-transparent hover:opacity-50 p-4 text-primary-red font-[500] flex align-center gap-2 justify-center"
                                        onClick={() =>
                                            setPromptDelete({
                                                bool: true,
                                                id: comment.id,
                                            })
                                        }
                                    >
                                        <DeleteIconSVG className="text-white" />
                                        <p>Delete</p>
                                    </button>
                                    <button
                                        className="bg-transparent hover:opacity-50 p-4  text-primary-blue font-[500] flex align-center gap-2 justify-center"
                                        onClick={() => setEditMode(true)}
                                    >
                                        <EditIconSVG className="text-white" />
                                        <p>Edit</p>
                                    </button>
                                </>
                            ) : (
                                <button
                                    className="flex items-center text-primary-blue hover:opacity-50 gap-2 focus-visible:outline-none"
                                    onClick={() =>
                                        setIsReplying((prev) => !prev)
                                    }
                                >
                                    <ReplyIconSVG />
                                    <p className="font-bold">Reply</p>
                                </button>
                            )}
                        </div>
                    </div>
                    <p className="text-neutral-grayishBlue mt-2">{content}</p>
                </div>
            </div>
            <AddComment
                replyingTo={comment.user.username}
                replyHandler={(content, replyingTo) => {
                    setIsReplying(false);
                    replyHandler(content, replyingTo);
                }}
                className={
                    isReplying ? "h-40" : "h-0 opacity-0 md:py-0 [&>textarea]:p-0"
                }
                action = "REPLY"
            />
        </div>
    );
};

export default TextBubble;
