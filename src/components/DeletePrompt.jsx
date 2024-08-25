import React from "react";

const DeletePrompt = ({ setPromptDelete, handleCommentDelete }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
            <div className="flex flex-col bg-white rounded-lg p-6 md:p-8 shadow-lg w-[min(95%,350px)]">
                <h1 className="text-xl font-semibold mb-2 text-neutral-darkBlue ">Delete Comment</h1>
                <p className="mb-4 text-neutral-grayishBlue">
                    Are you sure you want to delete this comment? This will remove the comment and
                    cannot be undone.
                </p>
                <div className="flex gap-4 justify-center ">
                    <button
                        className="p-2 md:py-2 md:px-5 rounded-md bg-neutral-grayishBlue text-white hover:opacity-80"
                        onClick={() => setPromptDelete({ bool: false, id: null })}
                    >
                        NO, CANCEL
                    </button>
                    <button
                        className="p-2 md:py-2 md:px-5 rounded-md bg-primary-red text-white hover:opacity-80"
                        onClick={() => {
                            handleCommentDelete();
                            setPromptDelete({ bool: false, id: null });
                        }}
                    >
                        YES, DELETE
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeletePrompt;
