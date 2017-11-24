import { all, put, takeEvery, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { reset } from 'redux-form';
import {
    CRUD_CREATE_SUCCESS,
    CRUD_DELETE_SUCCESS,
    CRUD_UPDATE_SUCCESS,
} from '../../actions/dataActions';

import { refreshView } from '../../actions/uiActions';

/**
 * Side effects for fetch responses associated with references
 *
 * Refreshes the oneToMany state
 */
function* refreshReference({ type, requestPayload, error, meta }) {
    switch (type) {
        case CRUD_CREATE_SUCCESS:
        case CRUD_UPDATE_SUCCESS:
        case CRUD_DELETE_SUCCESS:
            if (meta.refresh) {
                return yield put(refreshView());
            }
        default:
            return yield all([]);
    }
}

export default function*() {
    yield takeEvery(
        action => action.meta && action.meta.refresh,
        refreshReference
    );
}

//(reference, target, id, relatedTo, pagination, sort, filter)
