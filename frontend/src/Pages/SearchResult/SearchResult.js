import React, { Component } from 'react';
import Suggestion from '../../components/Suggestion';
import NavBar from '../../components/Navigation/Navigation';

import history from '../../history';

import { searchService } from '../../services';


class SearchResult extends Component {
    state = { 
        results: []
     }

     componentDidMount() {
         searchService.currentSearch.subscribe(x => this.setState({
             results: x
         }));

         console.log('hehe: ', this.state.results);

        history.listen((location) => {
            console.log('here', this.state.results);
            // if (location.pathname == '/restaurant/search') {
                window.location.reload(false); //reloading the same page to update state values (idky needed cos HARDCODE)
            // }
        })
     }

    render() { 
        return ( 
            <div>
                <NavBar history={this.props.history}/>
                <h1>testing</h1>
                <h2>hello: {this.state.results}</h2>
            </div>
        );
    }
}
 
export default SearchResult;