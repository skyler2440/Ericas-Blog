import React, {useState} from "react";
import { Button, Modal } from "semantic-ui-react";
//This Modal Component

const ConfirmDelete = props => {
  const [isOpen, setIsOpen] = useState({open: false})
  return (
    <div className="edit-account">
      <Modal
        closeIcon
        size="mini"
        trigger={
         <p className="deletePost">X</p>
        }
      >
        <Modal.Header>Would you like to delete your Post?</Modal.Header>
        <Modal.Content>
          <Button
            onClick={() => {
              props.deleteBlogPost.deleteBlogPost(props.deleteBlogPost.postid, props.deleteBlogPost.uuid)
              .then(() => {
                props.deleteBlogPost.getBlogPosts(props.deleteBlogPost.pagenumber);
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

export default ConfirmDelete;
