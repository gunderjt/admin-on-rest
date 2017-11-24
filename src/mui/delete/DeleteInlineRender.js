import React, { Component } from 'react';
import PropTypes from 'prop-types';
import inflection from 'inflection';
import pure from 'recompose/pure';
import compose from 'recompose/compose';
import translate from '../../i18n/translate';

class DeleteInlineRender extends Component {
	render() {
		const { record, inlineForm, reference } = this.props
		if(!inlineForm) return (<div></div>);
		return (
			<div>
				{inlineForm && 
					React.cloneElement(inlineForm, {
					  reference,
					  record
					})
				}
			</div>
		)
	}
}

DeleteInlineRender.propTypes = {
    record: PropTypes.object.isRequired,
    inlineForm: PropTypes.object.isRequired,
    translate: PropTypes.func.isRequired,
    reference: PropTypes.string.isRequired
};

DeleteInlineRender.defaultProps = {
    translate: x => x,
};

const enhance = compose(pure, translate);

export default enhance(DeleteInlineRender);
