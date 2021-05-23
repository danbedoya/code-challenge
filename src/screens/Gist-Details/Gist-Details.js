import React, { useEffect, useState } from 'react'
import { Link, useParams, withRouter } from 'react-router-dom'
import qs from 'query-string';
import axios from "axios";
import Card from '@material-ui/core/Card'
import Avatar from '@material-ui/core/Avatar';
import "../Gist-Details/Gist-Details.css"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ReactMarkdown from 'react-markdown';

function GistDetails(props) {

    const params = useParams();
    const { id } = qs.parse(props.location.search);
    const [gist, setGist] = useState();


    //Pre-load the information from the Api
    useEffect(async () => {

        try {

            //the id is share through the URL
            const { data } = await axios.get(`https://api.github.com/gists/${id}`);

            setGist(data);

        } catch (error) {

        }

    }, [])

    return (
        <div className="gistDetails">
            {gist && <Card className="card">
                <Link className='link' to="/">
                    <div className="return">
                        <ArrowBackIcon />
                        <div className="return__description">Back</div>
                    </div>
                </Link>
                <p className="gistDetails__description">{gist?.description}</p>
                <div className="files">
                    <p>Files:</p>
                    {Object.values(gist?.files ?? {})?.map((file, id) => (
                        <div key={id} className="file__raw_url"><a href={file?.raw_url}>{file?.filename}</a></div>
                    ))}
                </div>
                <div className="file__avatar">
                    <Avatar src={gist?.owner?.avatar_url} />
                    <p>By:{gist?.owner?.login}</p>
                </div>

            </Card>}
        </div >
    )
}

export default withRouter(GistDetails)
