import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import shouldUpdate from 'recompose/shouldUpdate';
import ContentCreate from 'material-ui/svg-icons/content/create';
import translate from '../../i18n/translate';

const EditInlineButton = ({
    label = 'aor.action.edit',
    translate,
    clickEvent,
}) => (
    <FlatButton
        primary
        label={label && translate(label)}
        icon={<ContentCreate />}
        style={{ overflow: 'inherit' }}
        onClick={clickEvent}
    />
);

EditInlineButton.propTypes = {
    clickEvent: PropTypes.func.isRequired,
    label: PropTypes.string,
    translate: PropTypes.func.isRequired,
};

export default translate(EditInlineButton);
