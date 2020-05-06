import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { restaurantService } from "../../../services";
import NavBar from '../../../components/Navigation/Navigation';
import history from '../../../history';
import MenuRow from './components/MenuRow/MenuRow';


class OtherMenu extends Component {
    state = { 
        items: []
     }

     fetchResults() {
        const id = decodeURI(window.location.search.substring(4));

        restaurantService.getMenu(id).then((response) => {
            response.json()
            .then((data) => {
                console.log(data);
                this.setState({ items: restaurantService.restaurantMenuResults(data) },() => console.log('items: ', this.state.items));

            })
        })
     }

     componentDidMount() {
         console.log('hello');
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
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Food</TableCell>
                                <TableCell align="center">Price</TableCell>
                                {/* <TableCell align="center">Qty left</TableCell>
                                <TableCell align="center">Quantity to order</TableCell>
                                <TableCell align="right"> </TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                           {this.state.items.map((item, index) => (
                               <MenuRow key={index} itemid={item} />
                           ))} 
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}
 
export default OtherMenu;