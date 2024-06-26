import PageLayout from "../components/pageLayout";
import React, { useEffect, useState } from "react";
import "../styles/info.css";
import { useParams } from "react-router-dom";
import { getDoc, doc, arrayUnion, updateDoc, deleteDoc } from "firebase/firestore";
import {onAuthStateChanged} from "firebase/auth";
import { db } from "../config/firebase";
import { auth } from "../config/firebase";
import PopUp from "../components/newPost";
import { get, set, update } from "firebase/database";
import firebase from "firebase/compat/app";

const Info = () => {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [comment, setComment] = useState('');
    const [trigger, setTrigger] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const getPost = async () => {
        const docRef = doc(db, "posts", `${id}`);
        await getDoc(docRef)
            .then((doc) => {
                if (doc.exists()) {
                    setPost(doc.data());
                    console.log(doc.data(), "smile");
                } else {
                    console.log("No such document!");
                }
            });

    }
    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, redirect to homepage
                setIsSignedIn(true);
            } else {
                setIsSignedIn(false);
            }
        });

        getPost();

        return () => unsubscribe();
    }, []);

    /*const handleSubmit = async () => {
        try{
            console.log(id);
            const docRef = doc(db, "posts", `${id}`);
            let newMap = {user: auth.currentUser.email, comment: comment};
            await getDoc(docRef)
            .then((doc) => {
                console.log(doc);
                if (doc.exists()) {
                    updateDoc(doc.data(), {comments: arrayUnion(newMap)});
                } else {
                    console.log("No such document!");
                }
            });
            
            
            
        }catch(err){
            console.error(err);
        }
    }
*/
    const handleSubmit = async () => {
    const docRef = doc(db, "posts", `${id}`);
    let newMap = {user: auth.currentUser.email, comment: comment};
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
        await updateDoc(docRef, {comments: arrayUnion(newMap)});
    } else {
        console.log("No such document!");
    }

    setComment('');
    getPost();
}

    const editPost = async () => {
        try{
            const postRef = doc(db, "posts", `${id}`);
            await updateDoc(postRef, {title: title, description: description, numb: phoneNumber});
            setTrigger(false);
            setTitle('');
            setDescription('');
            setPhoneNumber('');
            getlist();
        }catch(err){
            console.error(err);
        }
    }

    const deletePost = async () => {
        try{
            const postRef = doc(db, "posts", id);
            await deleteDoc(postRef);
            window.location = '/';
        }catch(err){
            console.error(err);
        }
    }

    return (
        <PageLayout>
            <div className="post">
                <h1>{post.title}</h1>
                <p>Posted by: {post.email}</p>
            </div>
            <div className="editor">
                {isSignedIn && auth.currentUser.email == post.email? 
                <button onClick={() => setTrigger(true)}>edit</button>
                : null}
                {isSignedIn && auth.currentUser.email == post.email? 
                <button onClick={() => deletePost()}>delete</button>
                : null}
            </div>
            <PopUp trigger={trigger}>
                            <h1>New Post</h1>
                            <div className="boxes">
                                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                <input type="number" placeholder="Phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                <textarea placeholder="Write your description here..." value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <br />
                            <button className="submits" onClick={editPost}>Submit</button>
                    </PopUp>
            <div className="info">
                <div className="des-container">
                    <div className="des-title">
                        <h1>Description:</h1>
                    </div>
                    <p>{post.description}</p>
                    <p>Phone number: {post.numb}</p>
                </div>
                <div className="comments">
                    
                    <h1>Comments:</h1>
                    <textarea placeholder="Add a comment" value={comment} onChange={(e) => setComment(e.target.value)}/>
                    <button onClick={() => handleSubmit()} className="submit" >Submit</button>

                    {post.comments && post.comments.length > 0? 
                    post.comments.map((comment) => (
                        <div className="comment">
                            <p>user: {comment.user}</p>
                            <p>{comment.comment}</p>
                        </div>
                    )): <p>No comments</p>}            
                </div>
            </div>

            
        </PageLayout>
    )
}

export default Info