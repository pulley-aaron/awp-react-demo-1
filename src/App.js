import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results:[]
        };
        
        this.ajaxSearch = this.ajaxSearch.bind(this);
    }
    
    ajaxSearch(e) {
        e.preventDefault();
        
        // Fetch from API
        fetch('http://hn.algolia.com/api/v1/search?query="test"')
            .then(results => {return results.json();})
            .then(results => {console.log(results.hits);});
        
        this.setState((state, props) => ({results: [Math.floor(Math.random()*99), Math.floor(Math.random()*99), Math.floor(Math.random()*99)]}));
    }
    
    render() {
        var results = this.state.results.map((item, index) => {
            return(
                <li
                    key={index}
                >
                    <a
                        href="#"
                    >
                        {item}
                    </a>
                </li>
            );
        });
        
        return(
            <div className="App">
                <form
                    className="searchBar"
                >
                    <input
                        type="search"
                        name="q"
                    ></input>
                    <input
                        type="submit"
                        value="Search"
                        onClick={this.ajaxSearch}
                    ></input>
                </form>
                <ul>
                    {results}
                </ul>
            </div>
        );
    }
}

export default App;
