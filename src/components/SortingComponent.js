import React, { Component } from 'react';
import { Container, Row, Col, Button, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { setSortValue, searchSortData } from '../actions/actions';

class SortingComponent extends Component {
    constructor(props) {
        super(props);
        this.onSortIpChange = this.onSortIpChange.bind(this);
    }

    onSortIpChange(event){
        this.props.setSortValue(event.target.value);
        this.props.searchSortData(this.props.searchWord, event.target.value);
    }

    render() {
        return (
            <React.Fragment>
                <FormGroup>
                    <Input type="select" name="select" id="sortSelect" value={this.props.sortValue}
                    onChange={(event) => this.onSortIpChange(event)} >
                        <option value="none">Sort Year by</option>
                        <option value="asc">Sort Year by ascending</option>
                        <option value="desc">Sort Year by descending</option>
                    </Input>
                </FormGroup>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    current_data: state.games.current_data,
    sortValue: state.games.sortValue,
    searchWord: state.games.searchWord,
})

export default connect(mapStateToProps, { setSortValue, searchSortData })(SortingComponent);
