package local.skylerwebdev.blogbackend.services;

import local.skylerwebdev.blogbackend.models.BlogPostComments;
import local.skylerwebdev.blogbackend.models.Comment;

import java.util.List;

public interface CommentService
{
    List<Comment> findAll();

    List <Comment> findCommentsByPostId(long postid);

    Comment findCommentById(long id);

    void delete(long commentid, long uuid);

    Comment save(Comment comment, long uuid, long postid);

    Comment update(Comment comment, long uuid, long commentid);


    Comment findByName(String name);
}
