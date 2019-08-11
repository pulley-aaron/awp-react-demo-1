import React from 'react';
import SearchResult from './SearchResult';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            results: []
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(e) {
        this.setState({query: e.target.value});
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        // Fetch from API
        var queryString = 'http://hn.algolia.com/api/v1/search?query="'+this.state.query+'"';
        fetch(queryString)
            .then(reply => {return reply.json();})
            .then(data => {
                var results = data.hits.map((item, index) => {
                    return(
                        <SearchResult
                        key={index}
                        url={item.url}
                        title={item.title}
                        />
                    );
                });
                // This could be enhanced to filter out results with no URL.
                this.setState({results: results});
            });
    }
    
    render() {
        return(
            <div className="App">
                <form
                    className="searchBar"
                    onSubmit={this.handleSubmit}
                >
                    <input
                        type="search"
                        name="search"
                        value={this.state.query}
                        onChange={this.handleChange}
                    ></input>
                    <input
                        type="submit"
                        value="Search"
                    ></input>
                </form>
                <ul>
                    {this.state.results}
                </ul>
            </div>
        );
        // This could be enhanced to separate the search bar into a reusable React component.
    }
}

export default App;
