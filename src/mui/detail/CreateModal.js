import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card } from 'material-ui/Card';
import compose from 'recompose/compose';
import inflection from 'inflection';
import ViewTitle from '../layout/ViewTitle';
import Title from '../layout/Title';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Add from 'material-ui/svg-icons/content/add'
import { 
	crudCreateReference as crudCreateReferenceAction,
  crudUpdateReference as crudUpdateReferenceAction,
} from '../../actions/dataActions';
import DefaultActions from './CreateActions';
import translate from '../../i18n/translate';

class CreateModal extends Component {

	constructor(props) {
    super(props);
    this.state = {
      showDialog: false,
    };
  }

  save = (newRecord, redirect) => {
    const { 
      reference,
      getReferenceAction,
      crudCreateReference,
    } = this.props;

    crudCreateReference(
      reference,
      newRecord,
      getReferenceAction
    );

    this.closeDialog();
  };

  openDialog = (e) => {
    e.preventDefault();
    this.setState({
      showDialog: true
    });
  };

  closeDialog = () => {
    this.setState({
      showDialog: false
    });
  };

  generateRecord = () => {
    const {parentRecord, target} = this.props;

    let newRecord = {};
    newRecord[target] = parentRecord.id;

    return newRecord;
  }

  render() {
      const { children, meta, reference, record, basePath, translate, updateRecord } = this.props;
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
              record: this.generateRecord(),
              save: this.save,
              redirect: false,
              basePath,
              translate,
              redirect: false,
            })}
          </Dialog>
          <FlatButton 
            primary
            label="Add"
            icon={<Add />}
            style={{ overflow: 'inherit' }} 
            onClick={this.openDialog} />
        </div>
      );
    };

}

CreateModal.propTypes = {
    children: PropTypes.element.isRequired,
    crudCreateReference: PropTypes.func.isRequired,
    getReferenceAction: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    parentRecord: PropTypes.object.isRequired, 
    target: PropTypes.string.isRequired,
    reference: PropTypes.string.isRequired,
    translate: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoading: state.admin.loading > 0,
    };
}

const enhance = compose(
    connect(mapStateToProps, { crudCreateReference: crudCreateReferenceAction }),
    translate,
);

export default enhance(CreateModal);

