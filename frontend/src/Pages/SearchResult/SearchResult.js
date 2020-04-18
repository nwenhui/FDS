import React, { Component } from 'react';
import NavBar from '../../components/Navigation/Navigation';
import SearchResultButton from '../../components/SearchResultButton/SearchResultButton';

import history from '../../history';

import { restaurantService } from '../../services';


class SearchResult extends Component {
    state = { 
        results: []
     }

     fetchResults() {
        const query = decodeURI(window.location.search.substring(10));

        restaurantService.searchRestaurant(query).then((response) => {
            response.json()
            .then((data) => {
                this.setState({ results: restaurantService.searchRestaurantResults(data) },() => console.log('results: ', this.state.results));

            })
        })
     }

     componentDidMount() {
        this.fetchResults();

        history.listen(() => {
            this.fetchResults();
            window.location.reload(false);
        })
     }

    render() { 
        return ( 
            <div>
                <NavBar history={this.props.history}/>
                <h2>test test this is search results page :^)</h2>
                {this.state.results.map((result, index) => (
                    <SearchResultButton key={index} resid={result} />
                ))}
            </div>
        );
    }
}
 
export default SearchResult;