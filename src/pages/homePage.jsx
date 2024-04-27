import React from "react";
import PageLayout from "../components/pageLayout";
import "../styles/homepage.css";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { db } from "../config/firebase";
import { getDocs,collection, addDoc, updateDoc } from "firebase/firestore";
import PopUp from "../components/newPost";
import { doc, increment } from "firebase/firestore";
import { get, set } from "firebase/database";

const HomePage = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [postlist, setPostList] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const postRef = collection(db, "posts");
    const [trigger, setTrigger] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const getDate = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        return today;
    }

    const getlist = async () => {
        try{
            const data = await getDocs(postRef);
            const filteredData = data.docs.map(doc => ({...doc.data(), id: doc.id}));
            console.log(filteredData);
            setPostList(filteredData);
        }catch(err){
            console.error(err);
        }

    }

    const addPost = async () => {
        try{
            await addDoc(postRef, {title: title, 
                description: description, 
                numb: phoneNumber, 
                date: getDate(),
                creator: auth.currentUser.uid,
                upVotes: 0,
            });

            setTrigger(false);
            setTitle('');
            setDescription('');
            setPhoneNumber('');
            getlist();
        }catch(err){
            console.error(err);
        }
    }

    const handleInfo = (id) => {
        window.location = '/info/' + id;
    }

    const handleUpVote = async (id) => {
        try{
            const postRef = doc(db, "posts", id);
            await updateDoc(postRef, { upVotes: increment(1) });
    
            // Manually update postlist and filteredResults
            setPostList((prevPostList) => {
                return prevPostList.map((post) => {
                    if (post.id === id) {
                        return { ...post, upVotes: post.upVotes + 1 };
                    } else {
                        return post;
                    }
                });
            });
    
            setFilteredResults((prevFilteredResults) => {
                return prevFilteredResults.map((post) => {
                    if (post.id === id) {
                        return { ...post, upVotes: post.upVotes + 1 };
                    } else {
                        return post;
                    }
                });
            });
        }catch(err){
            console.error(err);
        }
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

        getlist();
        
        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const searchItems = searchValue => {
        setSearchInput(searchValue);
        if (searchValue !== "") {
            const filteredData = postlist.filter((post) => 
                post.numb.toLowerCase().includes(searchValue.toLowerCase())
                // Add any other post properties you want to search through
            )
            setFilteredResults(filteredData);
        } else {
            setFilteredResults(postlist);
        }
    };

    const handleSelectChange = (event) => {
        const selectedOption = event.target.value;
    
        switch (selectedOption) {
            case 'option1':
                getlist();
                break;
            case 'option2':
                const reversedPostList = [...postlist].reverse();
                setPostList(reversedPostList);
                break;
            case 'option3':
                const sortedByUpvotesMost = [...postlist].sort((a, b) => b.upVotes - a.upVotes);
                setPostList(sortedByUpvotesMost);
                break;
            case 'option4':
                const sortedByUpvotesLeast = [...postlist].sort((a, b) => a.upVotes - b.upVotes);
                setPostList(sortedByUpvotesLeast);
                break;
            default:
                break;
        }
    };

    return (
        <div className="home-page">
            <PageLayout>
                <div className="home-page-body">
                    <div className="filter">
                    <input
                        type="text"
                        placeholder="Search for a number..."
                        onChange={(inputString) => searchItems(inputString.target.value)}
                    />
                    <select onChange={handleSelectChange}>
                        <option value="option1">Time Created (newest)</option>
                        <option value="option2">Time Created (oldest)</option>
                        <option value="option3">Upvotes (most)</option>
                        <option value="option4">Upvotes (least)</option>
                    </select>
                    </div>
                    <br />
                    <div className="button-container">
                        <button className="add-post" onClick={() => isSignedIn == true ? setTrigger(true): alert("you need to Sign In to an account.")}>Add Post +</button>
                    </div>
                    <PopUp trigger={trigger}>
                            <h1>New Post</h1>
                            <div className="boxes">
                                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                <input type="number" placeholder="Phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                <textarea placeholder="Write your description here..." value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <br />
                            <button className="submit" onClick={addPost}>Submit</button>
                    </PopUp>

                    <div className="post-container">
                    {searchInput.length > 0
                        ? filteredResults.map((post) => (
                            <div className="post-list">
                                <img src="https://cdn-icons-png.flaticon.com/512/8/8201.png" alt="more info" className="moreInfo" onClick={ () => handleInfo(post.id) }/>
                                <h1>{post.title}</h1>
                                <div className="post-detail">
                                    <div className="upVote" onClick={ () => handleUpVote(post.id) }>
                                        <img src="https://www.svgrepo.com/show/109844/straight-arrow.svg" />
                                        <h4> {post.upVotes} </h4>
                                    </div>
                                    <div className="body">
                                        <h4>the phone number: {post.numb}</h4>
                                        <h4>posted date: {post.date}</h4>
                                    </div>
                                </div>
                            </div>
                        )) :

                            postlist.map((post) => (
                                <div className="post-list">
                                    <img src="https://cdn-icons-png.flaticon.com/512/8/8201.png" alt="more info" className="moreInfo" onClick={ () => handleInfo(post.id) }/>
                                    <h1>{post.title}</h1>
                                    <div className="post-detail">
                                        <div className="upVote" onClick={ () => handleUpVote(post.id) }>
                                            <img src="https://www.svgrepo.com/show/109844/straight-arrow.svg" />
                                            <h4> {post.upVotes} </h4>
                                        </div>
                                        <div className="body">
                                            <h4>the phone number: {post.numb}</h4>
                                            <h4>posted date: {post.date}</h4>
                                        </div>
                                    </div>
                                </div>
                                
                        ))
                        }
                    </div>
                </div>
            </PageLayout>
        </div>
    )
}

export default HomePage;