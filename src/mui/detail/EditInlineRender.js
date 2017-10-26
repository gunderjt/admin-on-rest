import React from 'react';
import PropTypes from 'prop-types';
import inflection from 'inflection';
import pure from 'recompose/pure';
import compose from 'recompose/compose';
import translate from '../../i18n/translate';

export const EditInlineRender = ({
    record,
    referenceInlineHelper
}) => (
    (referenceInlineHelper && referenceInlineHelper.hasEdit())
			&& referenceInlineHelper.onRenderEdit(record)
);

EditInlineRender.propTypes = {
    record: PropTypes.object.isRequired,
    referenceInlineHelper: PropTypes.object.isRequired,
    translate: PropTypes.func.isRequired,
};

EditInlineRender.defaultProps = {
    translate: x => x,
};

const enhance = compose(pure, translate);

export default enhance(EditInlineRender);