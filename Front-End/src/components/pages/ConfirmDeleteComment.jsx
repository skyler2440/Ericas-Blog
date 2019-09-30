import React from "react";
import { Button, Modal } from "semantic-ui-react";
//This Modal Component

const ConfirmDeleteComment = props => {
  console.log("confirmdeletecommentProps", props);
  return (
    <div className="edit-account">
      <Modal
        closeIcon
        size="mini"
        trigger={
          <p className="delete">Delete</p>
        }
      >
        <Modal.Header>Would you like to delete your Post?</Modal.Header>
        <Modal.Content>
          <Button
            onClick={() => {
              props.deleteComment.deleteComment(props.commentprops.commentid, props.commentprops.commentuser).then(() => {
                window.location.reload();
              });
            }}
            type="submit"
            positive
          >
            Yes
          </Button>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default ConfirmDeleteComment;
