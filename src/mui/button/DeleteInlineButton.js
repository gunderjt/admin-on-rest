import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import linkToRecord from '../../util/linkToRecord';
import translate from '../../i18n/translate';

const DeleteInlineButton = ({
    label = 'aor.action.delete',
    translate,
    clickEvent,
}) => (
    <FlatButton
        secondary
        label={label && translate(label)}
        icon={<ActionDelete />}
        style={{ overflow: 'inherit' }}
        onClick={clickEvent}
    />
);

DeleteInlineButton.propTypes = {
    clickEvent: PropTypes.func.isRequired,
    label: PropTypes.string,
    translate: PropTypes.func.isRequired,
};

export default translate(DeleteInlineButton);
