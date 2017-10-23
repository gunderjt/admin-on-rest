import { all, put, takeEvery, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { reset } from 'redux-form';
import {
    CRUD_CREATE_FAILURE,
    CRUD_CREATE_SUCCESS,
    CRUD_DELETE_FAILURE,
    CRUD_DELETE_SUCCESS,
    CRUD_GET_LIST_FAILURE,
    CRUD_GET_MANY_FAILURE,
    CRUD_GET_MANY_REFERENCE_FAILURE,
    CRUD_GET_ONE_FAILURE,
    CRUD_UPDATE_FAILURE,
    CRUD_UPDATE_SUCCESS,
    crudGetManyReference
} from '../../actions/dataActions';

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
            if (meta.referenceArgs) {
                return yield put(crudGetManyReference( 
                    meta.referenceArgs.reference,
                    meta.referenceArgs.target,
                    meta.referenceArgs.recordId,
                    meta.referenceArgs.relatedTo,
                    meta.referenceArgs.pagination,
                    meta.referenceArgs.sort,
                    meta.referenceArgs.filter
                ));
            }
        default:
            return yield all([]);
    }
}

export default function*() {
    yield takeEvery(
        action => action.meta && action.meta.referenceArgs,
        refreshReference
    );
}

//(reference, target, id, relatedTo, pagination, sort, filter)