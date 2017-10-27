import React from 'react';
import PropTypes from 'prop-types';
import inflection from 'inflection';
import pure from 'recompose/pure';
import compose from 'recompose/compose';
import translate from '../../i18n/translate';

export const DeleteInlineRender = ({ record, referenceInlineHelper }) =>
    referenceInlineHelper &&
    referenceInlineHelper.hasDelete() &&
    referenceInlineHelper.onRenderDelete(record);

DeleteInlineRender.propTypes = {
    record: PropTypes.object.isRequired,
    referenceInlineHelper: PropTypes.object.isRequired,
    translate: PropTypes.func.isRequired,
};

DeleteInlineRender.defaultProps = {
    translate: x => x,
};

const enhance = compose(pure, translate);

export default enhance(DeleteInlineRender);
