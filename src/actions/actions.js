import { SET_CURRENT_DATA, SET_CURRENT_PAGE, POPULATE_NEXT_SET, POPULATE_PREV_SET, SET_SEARCH_WORD, SET_SORT_VALUE } from './types';
import { csvToJSONConversion, searchNameAndSortYear } from '../utils';
import encoding from 'text-encoding'; // polyfill for TextDecoder as it is not available in all browsers

export function fetchCSVData() {
    return function (dispatch) {
        fetch("/data/vgsales55c93b8.csv").then(res => {
            let reader = res.body.getReader();
            let decoder = new encoding.TextDecoder();//new TextDecoder('utf-8');
            let chunks = [];
            var pump = function () {
                return reader.read().then(function (result) {
                    if (!result.done) {
                        chunks.push(result.value)
                        return pump()
                    }
                });
            }
            return pump().then(function () {
                let final_decoded = ""
                chunks.forEach(element => {
                    final_decoded += decoder.decode(element);
                });
                return final_decoded;
            })

        }).then(res => {
            let final_json_data = JSON.parse(csvToJSONConversion(res));
            localStorage.setItem("all_data", JSON.stringify(final_json_data));
            dispatch({
                type: SET_CURRENT_DATA,
                payload: { "data": final_json_data }
            });
        })
    }
}

export function setCurrentPage(pageNumber) {
    return function (dispatch) {
        dispatch({
            type: SET_CURRENT_PAGE,
            payload: { "currentPage": pageNumber }
        });
    }
}

export function populateNextSet() {
    return function (dispatch) {
        dispatch({
            type: POPULATE_NEXT_SET,
            payload: {}
        });
    }
}

export function populatePreviousSet() {
    return function (dispatch) {
        dispatch({
            type: POPULATE_PREV_SET,
            payload: {}
        });
    }
}

export function setSearchWord(searchWord) {
    return function (dispatch) {
        dispatch({
            type: SET_SEARCH_WORD,
            payload: { "searchWord": searchWord }
        });
    }
}

export function searchSortData(searchWord, sortValue) {
    return function (dispatch) {
        let all_data = JSON.parse(localStorage.getItem("all_data"));
        let filtered_data = searchNameAndSortYear(searchWord, all_data, sortValue);
        dispatch({
            type: SET_CURRENT_DATA,
            payload: { "data": filtered_data }
        });
    }
}

export function setSortValue(sortValue) {
    return function (dispatch) {
        dispatch({
            type: SET_SORT_VALUE,
            payload: { "sortValue": sortValue }
        });
    }
}



