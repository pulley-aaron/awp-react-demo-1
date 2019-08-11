import React from 'react';
import SearchResult from './SearchResult';
import { connect } from 'react-redux';

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
            this.props.updateSearch(this.state.query, results);
            console.log("results via connection",this.props.results);
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

// these two functions are required to connect component with Redux store.
function mapStateToProps(state) {
    return {
        query: state.query,
        results: state.results
    };
};

function mapDispatchToProps(dispatch) {
    return {
        updateSearch: (query, results) => dispatch({type: "UPDATE_SEARCH", query: query, results: results})
    };
    // This could be enhanced by separating the actions into their own files for reusability.
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
