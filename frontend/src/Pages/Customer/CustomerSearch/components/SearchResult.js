import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import SearchResultInfo from './SearchResultInfo';
import { restaurantService } from "../../.././../services";


class SearchResult extends Component {
    state = { 
        results: [],
        keywords: this.props.keywords,
     }

     fetchResults() {
        restaurantService.searchAvailableFood(this.state.keywords).then((response) => {
            response.json().then((data) => {
                console.log('hellodata: ', data)
                this.setState({ results: restaurantService.restaurantMenuResults(data) }, () => {console.log('results: ', this.state.results)})
            })
        })
     }

     componentDidMount() {
         console.log('hello', this.props.keywords);
        this.fetchResults();

        // history.listen(() => {
        //     this.fetchResults();
        //     window.location.reload(false);
        // })
     }

    render() { 
        return ( 
                <TableContainer component={Paper} >
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Restaurant</TableCell>
                                <TableCell>Food</TableCell>
                                <TableCell align="center">Price</TableCell>
                                <TableCell align="center">Qty left</TableCell>
                                <TableCell align="center">Quantity to order</TableCell>
                                <TableCell align="right"> </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                           {this.state.results.map((item, index) => (
                               <SearchResultInfo key={index} itemid={item} />
                           ))} 
                        </TableBody>
                    </Table>
                </TableContainer>
        );
    }
}
 
export default SearchResult;