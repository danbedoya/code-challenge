import React from 'react'
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import '../Gist-Row/Gist-Row.css'

function GistRow({ description, tags, id }) {


    const objectDestructuring = (object) => {
        let { files } = object;
        let tags = [];
        const gists = Object.values(files);
        for (let { language } of Object.values(gists)) {
            if (language != null)
                tags.push(language);
        }

        return tags;
    }


    return (
        <Link className="link" to={`/gistDetails?id=${id}`}>

            <div className="gistRow">
                <div className='gistRow__description'>
                    {description}
                </div>
                <div className="gistRow__tag"><span>Languages:</span>{" "}
                    {objectDestructuring(tags).map((element, index) =>
                        <div key={index} className="tag__element">{element}</div>)}
                </div>
            </div>
        </Link>
    )
}

export default GistRow
