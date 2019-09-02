import React, { Component } from 'react';
import { Container, Row, Col, Button, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { searchSortData, setSearchWord } from '../actions/actions';
import TableComponent from './TableComponent';

class SearchComponent extends Component {
    constructor(props) {
        super(props);
        this.onSearchClick = this.onSearchClick.bind(this);
        this.onSearchIpChange = this.onSearchIpChange.bind(this);
        this.onSearchIpKeyPress = this.onSearchIpKeyPress.bind(this);
    }

    onSearchClick() {
        this.props.searchSortData(this.props.searchWord,this.props.sortValue);
    }

    onSearchIpChange(event) {
        this.props.setSearchWord(event.target.value);
    }

    onSearchIpKeyPress(event) {
        if (event.key == "Enter") {
            this.props.searchSortData(this.props.searchWord,this.props.sortValue);
        }
    }

    render() {
        return (
            <React.Fragment>
                <InputGroup>
                    <Input className="searchIpBox" placeholder="Search by Name"
                        onChange={(event) => this.onSearchIpChange(event)}
                        onKeyPress={(event) => this.onSearchIpKeyPress(event)} />
                    <InputGroupAddon addonType="append">
                        <Button onClick={() => this.onSearchClick()}>Search</Button>
                    </InputGroupAddon>
                </InputGroup>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    current_data: state.games.current_data,
    searchWord: state.games.searchWord,
    sortValue: state.games.sortValue,
})

export default connect(mapStateToProps, { searchSortData, setSearchWord })(SearchComponent);