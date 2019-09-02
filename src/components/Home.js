import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCSVData } from '../actions/actions';
import TableComponent from './TableComponent';
import SearchComponent from './SearchComponent';
import SortingComponent from './SortingComponent';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchCSVData()
    }

    render() {
        return (
            <React.Fragment>
                <Container fluid={true}>
                    <Col className="text-center mt-4 custHeading">
                        Top Selling Games
                    </Col>
                    <Row className="ml-0 mr-0">
                        <Col md="9" className="mt-3">
                            <SearchComponent></SearchComponent>
                        </Col>
                        <Col md="3" className="mt-3">
                            <SortingComponent></SortingComponent>
                        </Col>
                    </Row>
                    <Col className="mt-4 pl-2 pr-2">
                        {
                            this.props.current_data.length > 0 ? (
                                <TableComponent></TableComponent>
                            ) : null
                        }
                    </Col>
                </Container>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    current_data: state.games.current_data,
})

export default connect(mapStateToProps, { fetchCSVData })(Home);

