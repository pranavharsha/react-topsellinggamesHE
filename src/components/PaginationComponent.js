import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentPage, populateNextSet, populatePreviousSet } from '../actions/actions';
import { Pagination, PaginationItem, PaginationLink, Col } from 'reactstrap';
import { getRange } from '../utils';

class PaginationComponent extends Component {
    constructor(props) {
        super(props);
        this.pageClick = this.pageClick.bind(this);
        this.pageNextSet = this.pageNextSet.bind(this);
        this.pagePrevSet = this.pagePrevSet.bind(this);
    }

    pageClick(pageNumber) {
        this.props.setCurrentPage(pageNumber);
    }

    pagePrevSet() {
        this.props.populatePreviousSet();
    }

    pageNextSet() {
        this.props.populateNextSet();
    }

    render() {

        const pg_items = getRange(this.props.pageCountStart, this.props.pageCountEnd).map((item) => {
            if(item <= this.props.totalPages){
                return (
                    <PaginationItem className={this.props.currentPage == item ? "active" : ""} key={item}>
                        <PaginationLink href="#" onClick={() => this.pageClick(item)}>
                            {item}
                        </PaginationLink>
                    </PaginationItem>
                )
            }
        })

        return (
            <React.Fragment>
                <Col className="text-center">
                    <Pagination>
                        <PaginationItem>
                            <PaginationLink href="#" onClick={() => this.pagePrevSet()}>
                                <span aria-hidden="true">«</span>
                            </PaginationLink>
                        </PaginationItem>
                        {pg_items}
                        <PaginationItem>
                            <PaginationLink href="#" onClick={() => this.pageNextSet()}>
                                <span aria-hidden="true">»</span>
                            </PaginationLink>
                        </PaginationItem>
                    </Pagination>
                </Col>
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
    pageCountStart: state.games.pageCountStart,
    pageCountEnd: state.games.pageCountEnd,
});

export default connect(mapStateToProps, { setCurrentPage, populateNextSet, populatePreviousSet })(PaginationComponent);



