import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import compose from 'recompose/compose';
import RaisedButton from 'material-ui/RaisedButton';
import ActionCheck from 'material-ui/svg-icons/action/check-circle';
import AlertError from 'material-ui/svg-icons/alert/error-outline';
import inflection from 'inflection';
import DeleteInlineButton from '../button/DeleteInlineButton';
import { crudDeleteReference as crudDeleteReferenceAction } from '../../actions/dataActions';
import translate from '../../i18n/translate';

export class DeleteModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDialog: false,
        };
        this.data = props.record;
        this.id = props.record.id;
    }

    delete = () => {
        this.props.crudDeleteReference(
            this.props.reference,
            this.id,
            this.data
        );
        this.closeDialog();
    };

    openDialog = e => {
        e.preventDefault();
        this.setState({
            showDialog: true,
        });
    };

    closeDialog = () => {
        this.setState({
            showDialog: false,
        });
    };

    render() {
        const { children, reference, basePath, translate } = this.props;
        const actions = [
            <RaisedButton
                label={translate('aor.action.delete')}
                icon={<ActionCheck />}
                primary
                onClick={this.delete}
            />,
            <RaisedButton
                label={translate('aor.action.cancel')}
                icon={<AlertError />}
                onClick={this.closeDialog}
            />,
        ];
        return (
            <div>
                <Dialog
                    open={this.state.showDialog}
                    modal={false}
                    autoScrollBodyContent
                    onRequestClose={this.closeDialog}
                    actions={actions}
                >
                    {translate('aor.message.are_you_sure')}
                </Dialog>
                <DeleteInlineButton clickEvent={this.openDialog} />
            </div>
        );
    }
}

DeleteModal.propTypes = {
    children: PropTypes.node,
    crudDeleteReference: PropTypes.func.isRequired,
    record: PropTypes.object.isRequired,
    reference: PropTypes.string.isRequired
};

function mapStateToProps(state) {
    return {
        isLoading: state.admin.loading > 0,
    };
}

const enhance = compose(
    connect(mapStateToProps, {
        crudDeleteReference: crudDeleteReferenceAction,
    }),
    translate
);

export default enhance(DeleteModal);
