import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import translate from '../../i18n/translate';
import Add from 'material-ui/svg-icons/content/add';

export class AddButton extends Component {
	render() {
		const {
			label = 'aor.action.add',
			raised = true,
			translate,
			clickEvent
		} = this.props
		return (
			<FlatButton 
				primary
				label={label && translate(label)}
				icon={<Add />}
				style={{ overflow: 'inherit' }} 
				onClick={clickEvent} />
		)
	};
}

AddButton.propTypes = {
		clickEvent: PropTypes.func.isRequired,
		label: PropTypes.string,
		record: PropTypes.object,
		translate: PropTypes.func.isRequired,
};

export default translate(AddButton);

