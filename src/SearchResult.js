import React from 'react';

function SearchResult(props) {
    return(
        <li>
            <a
                href={props.url}
            >
                {props.title}
            </a>
        </li>
    );
}

export default SearchResult;