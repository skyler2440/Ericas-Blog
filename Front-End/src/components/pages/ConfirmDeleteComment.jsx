import React from "react";
import { Button, Modal } from "semantic-ui-react";
//This Modal Component

const ConfirmDeleteComment = props => {
  return (
    <div className="edit-account">
      <Modal
        closeIcon
        size="mini"
        trigger={
          <p className="delete">Delete</p>
        }
      >
        <Modal.Header>Would you like to delete your Comment?</Modal.Header>
        <Modal.Content>
          <Button
            // onClick={() => {
            //   props.deleteComment.deleteComment(props.commentprops.commentid, props.commentprops.commentuserid).then(() => {
            //     window.location.reload();
            //   });
              onClick={() => {
                props.deleteComment.deleteComment(props.commentprops.commentid, props.commentprops.commentuserid)
                .then(() => {
                  props.deleteComment.getBlogPosts(props.deleteComment.pagenumber);
                })
                .then(() => {
                  //Needs to close on delete.
                  let active = document.querySelector('.visible');
                  active.classList.remove('active', 'visible')
                })
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
