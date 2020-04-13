import React, { Component } from 'react';
import Suggestion from '../../components/Suggestion';
import NavBar from '../../components/Navigation/Navigation';


class SearchResult extends Component {
    state = { 
        results: []
     }

     componentDidMount() {
         console.log('oof results: ', this.state.results);
     }

    render() { 
        return ( 
            <div>
                <NavBar history={this.props.history}/>
                <h1>testing</h1>
                <h2>hello, {this.state.results}</h2>
                <Suggestion results={this.state.results} />
            </div>
        );
    }
}
 
export default SearchResult;