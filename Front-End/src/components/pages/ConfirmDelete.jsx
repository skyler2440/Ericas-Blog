import React from "react";
import { Button, Modal } from "semantic-ui-react";
//This Modal Component

const ConfirmDelete = props => {
  console.log("deleteItemProps", props);
  return (
    <div className="edit-account">
      <Modal
        closeIcon
        size="mini"
        trigger={
         <p className="delete">DELETE</p>
        }
      >
        <Modal.Header>Would you like to delete your Post?</Modal.Header>
        <Modal.Content>
          <Button
            onClick={() => {
              props.deleteBlogPost.deleteBlogPost(props.deleteBlogPost.postid, props.deleteBlogPost.uuid).then(() => {
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

export default ConfirmDelete;
