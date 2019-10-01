package local.skylerwebdev.blogbackend.services;

import local.skylerwebdev.blogbackend.exceptions.ResourceNotFoundException;
import local.skylerwebdev.blogbackend.models.Comment;
import local.skylerwebdev.blogbackend.models.User;
import local.skylerwebdev.blogbackend.repository.BlogPostRepostitory;
import local.skylerwebdev.blogbackend.repository.CommentRepository;
import local.skylerwebdev.blogbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
@Service(value = "commentService")
public class CommentServiceImpl implements CommentService
{
    @Autowired
    CommentRepository commentRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    BlogPostRepostitory blogPostRepostitory;
    @Override
    public List<Comment> findAll()
    {
        return null;
    }

    @Override
    public Comment findCommentById(long id)
    {
        return commentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Comment id " + id + " not found!"));
    }

    @Override
    public void delete(long commentid, long uuid)
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User authenticatedUser = userRepository.findByUsername(authentication.getName());
        if (uuid == authenticatedUser.getUuid())
        {
        commentRepository.deleteById(commentid);
        }        else
        {
            throw new ResourceNotFoundException(uuid + " not Current User");
        }

    }

    @Override
    public Comment save(Comment comment, long uuid, long postid)
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User authenticatedUser = userRepository.findByUsername(authentication.getName());
        if (uuid == authenticatedUser.getUuid())
        {
        Comment newComment = new Comment();
        newComment.setDate(comment.getDate());
        newComment.setComment(comment.getComment());
        newComment.setPostid(postid);
        newComment.setCommentuserid(uuid);
        newComment.setCommentusername(authenticatedUser.getUsername());
        Comment savedComment = commentRepository.save(newComment);
            commentRepository.insertUserComment(uuid, savedComment.getCommentid());
            commentRepository.insertPostComment(postid, savedComment.getCommentid());
        return commentRepository.save(newComment);
        }
        else
        {
            throw new ResourceNotFoundException(uuid + " not Current User");
        }
    }

    @Override
    public Comment update(Comment comment, long uuid, long commentid)
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User authenticatedUser = userRepository.findByUsername(authentication.getName());
        if (uuid == authenticatedUser.getUuid())
        {
            Comment currentComment = findCommentById(commentid);
//
            if (comment.getComment() != null)
            {
                currentComment.setComment(comment.getComment());
            }
            return commentRepository.save(currentComment);
        }
        else
        {
            throw new ResourceNotFoundException(uuid + " not Current User");
        }
    }

    @Override
    public Comment findByName(String name)
    {
        return null;
    }
}
