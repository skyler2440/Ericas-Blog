package local.skylerwebdev.blogbackend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "userblogposts")
public class UserBlogPosts extends Auditable implements Serializable
{
    @Id
    @ManyToOne
    @JoinColumn(name = "uuid")
    @JsonIgnoreProperties("userposts")
    private User user;

    @Id
    @ManyToOne
    @JoinColumn(name = "postid")
    @JsonIgnoreProperties("userposts")
    private BlogPost blogPost;

    public UserBlogPosts(User user, BlogPost blogPost)
    {
        this.user = user;
        this.blogPost = blogPost;
    }

    public UserBlogPosts()
    {
    }

    public User getUser()
    {
        return user;
    }

    public void setUser(User user)
    {
        this.user = user;
    }

    public BlogPost getBlogPost()
    {
        return blogPost;
    }

    public void setBlogPost(BlogPost blogPost)
    {
        this.blogPost = blogPost;
    }

    @Override
    public boolean equals(Object o)
    {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserBlogPosts that = (UserBlogPosts) o;
        return Objects.equals(user, that.user) &&
                Objects.equals(blogPost, that.blogPost);
    }

    @Override
    public int hashCode()
    {
        return Objects.hash(user, blogPost);
    }

    @Override
    public String toString()
    {
        return "UserBlogPosts{" +
                "user=" + user +
                ", blogPost=" + blogPost +
                '}';
    }
}
