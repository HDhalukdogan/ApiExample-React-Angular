import React, { Component } from 'react';
import './App.css';
//jQuery libraries
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
//For API Requests
class ListComponent extends Component {
    // State array variable to save and show data
    constructor(props) {
        super(props)
        this.state = {
            data: [],

        }
    }
    componentDidMount() {
        //Get all users details in bootstrap table
        this.setState({ data: this.props.data });


        //initialize datatable
        $(document).ready(function () {
            $('#example').DataTable();

        });
    }
    render() {
        //Datatable HTML
        return (
            <div className="MainDiv">
                <div className="jumbotron text-center">
                    <h3>First DataTable</h3>

                </div>

                <div className="container">

                    <table id="example" className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((result) => {
                                return (

                                    <tr key={result.id}>
                                        <td>{result.id}</td>
                                        <td>{result.name}</td>
                                    </tr>
                                )
                            })}


                        </tbody>
                    </table>

                </div>
            </div>
        );
    }
}
export default ListComponent;