import React, { Component } from 'react';
import { Redirect } from 'react-router';

import ErrorAlert from '../../ErrorAlert/ErrorAlert';

import { restaurantService } from '../../../services';



class Searchbar extends Component {
    state = { 
        searchQuery: "",
        errorMessage: "",
        error: false
     }

    setSearchQuery = (event) => {
        var value = event.target.value;
        this.setState({ searchQuery: value}, () => {console.log(this.state.searchQuery)});
      }

      handleSearch(event) {
        event.preventDefault();
        restaurantService.searchRestaurant(this.state.searchQuery)
          .then((response) => {
            response.json()
            .then((data) => {
              // this.setState({ searchResult: searchService.currentSearch }, () => console.log('result: ', this.state.searchResult))
              const to = '/restaurant/search?keywords=' + this.state.searchQuery
              this.setState({ success: true })
              this.props.history.push(to)
            })
          })
            // ,
            // error => {
            //   console.log(error);
            // }
          .catch((error) => {
            // error.text().then( errorMessage => {
            //   this.setState({ error: true });
            //   this.setState({ errorMessage });
            //   console.log('Error: ', error);
            // })
            this.setState({ error: true });
            console.log('test: ', this.state.error);
            console.log('error: ', error);
        })
      }

    // handleSearch(event) {
    //     if (this.state.searchQuery) {
    //       event.preventDefault();
    //       const data = {search: this.state.searchQuery};
    //       const url = 'http://localhost:3000/api/v1/restaurant/search';
    
    //       var request = new Request(url, {
    //         method: 'POST',
    //         headers: new Headers({ 'Content-Type': 'application/json' }),
    //         body: JSON.stringify(data)
    //       });
    
    //       fetch(request)
    //         .then(handleErrors)
    //         .then((response) => {
    //           this.setState({ error: "" });
    //           response.json()
    //             .then((data) => {
    //               console.log("search donezo!!!");
    //               this.setState({ searchResult: data }, () => console.log('result: ', this.state.searchResult));
    //             })
    //         })
    //         .catch((error) => {
    //           error.text().then( errorMessage => {
    //             this.setState({ error: errorMessage}, () => {console.log('Error: ', this.state.error)});
    //           })
    //         })
    //       }
    //   }

    render() { 
        return (
          <div>
            <form class="form-inline" onSubmit={(e) => this.handleSearch(e)}>
                <input
                    class="form-control mr-sm-2"
                    type="search"
                    placeholder="Search for restaurants"
                    aria-label="Search"
                    onChange={this.setSearchQuery.bind(this)}
                />
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
                    Search
                </button>
            </form>
            {this.state.error && ErrorAlert("No restaurants found :(")}
          </div>
        );
    }
}
 
export default Searchbar;