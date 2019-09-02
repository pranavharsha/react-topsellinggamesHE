import { SET_CURRENT_DATA, SET_CURRENT_PAGE, POPULATE_NEXT_SET, POPULATE_PREV_SET, SET_SEARCH_WORD,
        SET_SORT_VALUE } from '../actions/types';

const initialState = {
    current_data: [],
    totalRecords: 0,
    pageLimit: 15,
    pageNeighbours: 7,
    totalPages: 0,
    currentPage: 1,
    pageCountStart: 1,
    pageCountEnd: 7,
    searchWord: '',
    sortValue: 'none',
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_DATA:
            return {
                ...state,
                current_data: action.payload.data,
                totalRecords: action.payload.data.length,
                totalPages: Math.ceil(action.payload.data.length / state.pageLimit),
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload.currentPage,
            }
        case POPULATE_NEXT_SET:
            return {
                ...state,
                pageCountStart: state.pageCountEnd > state.totalPages ? state.pageCountStart : state.pageCountStart + state.pageNeighbours,
                pageCountEnd: state.pageCountEnd > state.totalPages ? state.pageCountEnd : state.pageCountEnd + state.pageNeighbours,
                currentPage: state.pageCountEnd > state.totalPages ? state.currentPage : state.currentPage + state.pageNeighbours,
            }
        case POPULATE_PREV_SET:
            return {
                ...state,
                pageCountStart: state.pageCountStart <= 1 ? state.pageCountStart : state.pageCountStart - state.pageNeighbours,
                pageCountEnd: state.pageCountStart <= 1 ? state.pageCountEnd : state.pageCountEnd - state.pageNeighbours,
                currentPage: state.pageCountStart <= 1 ? state.currentPage : state.currentPage - state.pageNeighbours,
            }
        case SET_SEARCH_WORD:
            return{
                ...state,
                searchWord: action.payload.searchWord,
            }
        case SET_SORT_VALUE:
            return{
                ...state,
                sortValue: action.payload.sortValue,
            }
        default:
            return state;
    }
}

