import React, { Component } from 'react';
import {
    Container, Row, Col, Button, Card, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody, CardHeader
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { } from '../actions/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class GameDetail extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let filtered = { "Rank": "", "Name": "", "Platform": "", "Year": "", "Genre": "", "Publisher": "", "Global_Sales": "" }
        if (this.props.match.params.gamerank) {
            filtered = this.props.current_data.filter((item) => {
                return parseInt(item.Rank) === parseInt(this.props.match.params.gamerank);
            });
            filtered = filtered.length > 0 ? filtered[0] : { "Rank": "", "Name": "", "Platform": "", "Year": "", "Genre": "", "Publisher": "", "Global_Sales": "" };
        }

        return (
            <React.Fragment>
                <Container fluid={true}>
                    <Col className="text-center mt-3 custHeading">
                        <Link to='/'>
                            <FontAwesomeIcon className="backspan" icon="chevron-left" />
                        </Link>
                        Game Details
                    </Col>
                    <CardDeck className="mt-4 detailsCardDeck">
                        <Card>
                            <CardHeader>Rank</CardHeader>
                            <CardBody>
                                <CardText>{filtered.Rank}</CardText>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>Name</CardHeader>
                            <CardBody>
                                <CardText>{filtered.Name}</CardText>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>Platform</CardHeader>
                            <CardBody>
                                <CardText>{filtered.Platform}</CardText>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>Year</CardHeader>
                            <CardBody>
                                <CardText>{filtered.Year}</CardText>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>Genre</CardHeader>
                            <CardBody>
                                <CardText>{filtered.Genre}</CardText>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>Publisher</CardHeader>
                            <CardBody>
                                <CardText>{filtered.Publisher}</CardText>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>Global Sales</CardHeader>
                            <CardBody>
                                <CardText>{filtered.Global_Sales}</CardText>
                            </CardBody>
                        </Card>
                    </CardDeck>
                </Container>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    current_data: state.games.current_data,
})

export default connect(mapStateToProps, {})(GameDetail);
