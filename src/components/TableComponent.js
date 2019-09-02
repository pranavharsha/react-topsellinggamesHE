import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { } from '../actions/actions';
import { Table } from 'reactstrap';
import PaginationComponent from './PaginationComponent';

class TableComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        
        let th_render = Object.keys(this.props.current_data[0]).map((item) => {
            return(
                <td key={item}>{item}</td>
            )
        });

        let start = (this.props.currentPage-1) * this.props.pageLimit;
        let end = this.props.currentPage * this.props.pageLimit;
        let sliced_data = this.props.current_data.slice( start, end );

        let tb_render = sliced_data.map((item) => {
            return(
                <tr key={item.Rank}>
                    <td>{item.Rank}</td>
                    <td className="GameName"><Link to={`/gamedetails/${item.Rank}`}>{item.Name}</Link></td>
                    <td>{item.Platform}</td>
                    <td>{item.Year}</td>
                    <td>{item.Genre}</td>
                    <td>{item.Publisher}</td>
                    <td>{item.Global_Sales}</td>
                </tr>
            )
        });

        return (
            <React.Fragment>
                <Table className="w-100 table-responsive-sm GamesTable" bordered>
                    <thead><tr className="text-center">{th_render}</tr></thead>
                    <tbody>
                        {tb_render}
                    </tbody>
                </Table>
                <PaginationComponent></PaginationComponent>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    current_data: state.games.current_data,
    totalRecords: state.games.totalRecords,
    pageLimit: state.games.pageLimit,
    pageNeighbours: state.games.pageNeighbours,
    totalPages: state.games.totalPages,
    currentPage: state.games.currentPage,
})

export default connect(mapStateToProps, {})(TableComponent);
