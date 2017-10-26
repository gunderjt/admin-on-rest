import React from 'react';
import { crudGetManyReference as crudGetManyReferenceAction } from '../actions/dataActions';

export default class ReferenceInlineHelper {
	constructor(reference, target, parentRecord, relatedTo, pagination, sort, filter, createInlineForm = {}, editInlineForm = {}) {
		this.reference = reference;
		this.target = target;
		this.parentRecord = parentRecord;
		this.createInlineForm = createInlineForm;
		this.editInlineForm = editInlineForm;
		this.referenceAction = crudGetManyReferenceAction(
			reference,
			target,
			parentRecord.id,
			relatedTo,
			pagination,
			sort,
			filter
		);
	}

	getReferenceAction() {
		return this.referenceAction;
	}

	hasCreate() {
		return (!!this.createInlineForm);
	}

	hasEdit() {
		return (!!this.editInlineForm);
	}

	onRenderCreate() {
		if(!this.createInlineForm) {
			return false;
		}
		return (
			<div>
			{React.cloneElement(this.createInlineForm, {
				reference: this.reference,
				target: this.target,
				parentRecord: this.parentRecord,
				getReferenceAction: this.referenceAction,
			})}
			</div>
		)
	}

	onRenderEdit(record) {
		if(!this.editInlineForm) {
			return false;
		}
		return (
			<div>
			{React.cloneElement(this.editInlineForm, {
				record,
				reference: this.reference,
				target: this.target,
				parentRecord: this.parentRecord,
				getReferenceAction: this.referenceAction,
			})}
			</div>
		)
	}
}