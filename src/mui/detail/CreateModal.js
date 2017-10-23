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
} from '../../actions/dataActions';
import DefaultActions from './CreateActions';
import translate from '../../i18n/translate';
import withPermissionsFilteredChildren from '../../auth/withPermissionsFilteredChildren';

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
      record,
      resource,
      target,
      perPage,
      filter,
      pagination,
      relatedTo,
      sort
    } = this.props;

    this.props.crudCreateReference(
      this.props.reference,
      newRecord,
      {
        reference,
        target,
        recordId: record.id,
        relatedTo,
        pagination,
        sort,
        filter
      }
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
    const {record, reference, target, resource} = this.props;

    let newRecord = {};
    newRecord[target] = record.id;

    return newRecord;
  }

  render() {
      const { children, meta, reference, record, basePath, translate } = this.props;
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
    filter: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    record: PropTypes.object.isRequired,
    reference: PropTypes.string.isRequired,
    relatedTo: PropTypes.string.isRequired,
    pagination: PropTypes.shape({
        page: PropTypes.number.isRequired,
        perPage: PropTypes.number.isRequired,
    }),
    resource: PropTypes.string.isRequired,
    sort: PropTypes.shape({
        field: PropTypes.string,
        order: PropTypes.oneOf(['ASC', 'DESC']),
    }),
    target: PropTypes.string.isRequired,
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

