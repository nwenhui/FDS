import React, { Component } from 'react';
import { Redirect } from 'react-router';

import { searchService } from '../../../services';


function handleErrors(response) {
  if (!response.ok) {
      throw response;
  }
  return response;
}

class Searchbar extends Component {
    state = { 
        searchQuery: "",
        errorMessage: "",
        searchResult: ""
     }

    setSearchQuery = (event) => {
        var value = event.target.value;
        this.setState({ searchQuery: value}, () => {console.log(this.state.searchQuery)});
      }

      handleSearch(event) {
        event.preventDefault();
        searchService.searchRestaurant(this.state.searchQuery)
          .then((data) => {
              // this.setState({ searchResult: searchService.currentSearch }, () => console.log('result: ', this.state.searchResult))
              // const { from } = { from : { pathname: "/search" } }
              this.props.history.push('/restaurant/search')
            }
            // ,
            // error => {
            //   console.log(error);
            // }
          )
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
                    placeholder="Search for restaurants dgrdrdtr"
                    aria-label="Search"
                    onChange={this.setSearchQuery.bind(this)}
                />
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
                    Search
                </button>
            </form>
            {/* {this.state.searchResult && 
              <Redirect to={{
                pathname: '/restaurant/search',
                state: { results: this.state.searchResult }
              }} />
            } */}
          </div>
        );
    }
}
 
export default Searchbar;