package local.skylerwebdev.blogbackend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "blogpostcomments")
public class BlogPostComments extends Auditable implements Serializable
{
    @Id
    @ManyToOne
    @JoinColumn(name = "postid")
    @JsonIgnoreProperties("blogPostComments")
    private BlogPost blogPost;

    @Id
    @ManyToOne
    @JoinColumn(name = "commentid")
    @JsonIgnoreProperties("blogPostComments")
    private Comment comment;

    public BlogPostComments()
    {
    }

    public BlogPostComments(BlogPost blogPost, Comment comment)
    {
        this.blogPost = blogPost;
        this.comment = comment;
    }

    public BlogPost getBlogPost()
    {
        return blogPost;
    }

    public void setBlogPost(BlogPost blogPost)
    {
        this.blogPost = blogPost;
    }

    public Comment getComment()
    {
        return comment;
    }

    public void setComment(Comment comment)
    {
        this.comment = comment;
    }

    @Override
    public boolean equals(Object o)
    {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BlogPostComments that = (BlogPostComments) o;
        return Objects.equals(blogPost, that.blogPost) &&
                Objects.equals(comment, that.comment);
    }

    @Override
    public int hashCode()
    {
        return Objects.hash(blogPost, comment);
    }

    @Override
    public String toString()
    {
        return "BlogPostComments{" +
                "blogPost=" + blogPost +
                ", comment=" + comment +
                '}';
    }
}
