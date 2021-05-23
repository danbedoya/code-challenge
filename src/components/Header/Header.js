import React, { useState } from 'react'
import logo from './gistimage.png';
import '../Header/Header.css';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userFetch } from '../../app/store/userSlice';
import { selectUser } from '../../app/store/userSlice';
import { useSelector } from 'react-redux';
import '../Header/Gists-Page.css';
import GistRow from "../Gist-Row/Gist-Row";
import Loading from "../Loading/Loading";


function Home() {

    const [username, setUserName] = useState();
    const { user } = useSelector(selectUser);
    const dispatch = useDispatch();

    //Function to handle the form submission and dispatch the different states of the user information
    const handleOnSubmit = async (e) => {
        dispatch(userFetch({
            fetching: true,
        }))
        try {

            e.preventDefault();

            const { data } = await axios.get(`https://api.github.com/users/${username}/gists`);

            dispatch(userFetch({
                data,
                id: data.id,
                username: username
            }));

        } catch (error) {
            dispatch(userFetch({
                data: [],
                fetching: false,
                error: error.message
            }))
        } finally {
            dispatch(userFetch({
                fetching: false,
            }))
        }
    }

    return (
        <div className="header">
            <div className="image__container">
                <img src={logo} alt="gists Image" />
            </div>

            <div className="search__container">
                <SearchIcon />
                <form onSubmit={handleOnSubmit}>
                    <input onChange={e => setUserName(e.target.value)} placeholder="Enter username and press enter" type="text" />
                </form>
            </div>
            <div>{user.error && user.error}</div>
            {user.fetching ? <Loading className="loading" /> : (<div className="gists"><div className="gists__lists">
                {(user.data.length > 0 && !user.error && user.fetching == false) && <h2>Public gists by {user.username}</h2>}
                {user.data.map((data) => (

                    <GistRow
                        id={data.id}
                        key={data.id}
                        description={data.description ? data.description : 'No provided'}
                        tags={data}
                    />
                ))}
            </div></div>)}
        </div >
    )
}

export default Home
