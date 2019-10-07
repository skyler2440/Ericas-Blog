import React from "react";

import { Button, Modal } from "semantic-ui-react";

import AddCommentForm from "../../form/AddCommentForm";
//This Modal Component

const AddComment = props => {
  return (
    <div className="edit-account">
      <Modal
        closeIcon
        trigger={
          <Button color="blue" size="small">
            Add Comment
          </Button>
        }
      >
        <Modal.Header>AddComment</Modal.Header>
        <Modal.Content>
          <AddCommentForm commentprops={props} />
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default AddComment;
