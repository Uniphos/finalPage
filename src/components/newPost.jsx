import React from "react";
import "../styles/newPost.css";

const NewPost = (prop) => {
    return (prop.trigger) ? (
        <div className="popup">
            
            <div className="new-post">
                {prop.children}
                
            </div>
        </div>
    ) : null;
};

export default NewPost;