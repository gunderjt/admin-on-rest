import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardText } from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import compose from 'recompose/compose';
import inflection from 'inflection';
import ViewTitle from '../layout/ViewTitle';
import Title from '../layout/Title';
import EditInlineButton from '../button/EditInlineButton';
import { crudUpdateReference as crudUpdateReferenceAction } from '../../actions/dataActions';
import translate from '../../i18n/translate';

export class EditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDialog: false,
        };
        this.data = props.record;
        this.id = props.record.id;
    }

    save = (record, redirect) => {
        this.props.crudUpdateReference(
            this.props.reference,
            this.id,
            record,
            this.data,
            this.props.getReferenceAction
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
        return (
            <div>
                <Dialog
                    open={this.state.showDialog}
                    modal={false}
                    autoScrollBodyContent
                    onRequestClose={this.closeDialog}
                >
                    {React.cloneElement(children, {
                        resource: reference,
                        record: this.data,
                        save: this.save,
                        redirect: false,
                        basePath,
                        translate,
                    })}
                </Dialog>
                <EditInlineButton clickEvent={this.openDialog} />
            </div>
        );
    }
}

EditModal.propTypes = {
    children: PropTypes.node,
    crudUpdateReference: PropTypes.func.isRequired,
    parentRecord: PropTypes.object.isRequired,
    target: PropTypes.string.isRequired,
    record: PropTypes.object.isRequired,
    reference: PropTypes.string.isRequired,
    getReferenceAction: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoading: state.admin.loading > 0,
    };
}

const enhance = compose(
    connect(mapStateToProps, {
        crudUpdateReference: crudUpdateReferenceAction,
    }),
    translate
);

export default enhance(EditModal);
