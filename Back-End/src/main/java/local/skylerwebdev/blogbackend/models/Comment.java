package local.skylerwebdev.blogbackend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "comments")
public class Comment
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long commentid;

    private String date;


    private String comment;

    private long postid;

    @OneToMany(mappedBy = "comment", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("comment")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<UserComments> usercomments = new ArrayList<>();

    private long commentuser;

    @OneToMany(mappedBy = "comment", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("comment")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<BlogPostComments> blogPostComments = new ArrayList<>();

    public Comment(String date, String comment, long commentuser, long postid)
    {
        this.date = date;
        this.comment = comment;
        this.commentuser = commentuser;
        this.postid = postid;
    }

    public Comment()
    {
    }

    public long getCommentid()
    {
        return commentid;
    }

    public void setCommentid(long commentid)
    {
        this.commentid = commentid;
    }

    public String getDate()
    {
        return date;
    }

    public void setDate(String date)
    {
        this.date = date;
    }

    public String getComment()
    {
        return comment;
    }

    public void setComment(String comment)
    {
        this.comment = comment;
    }

    public long getPostid()
    {
        return postid;
    }

    public void setPostid(long postid)
    {
        this.postid = postid;
    }

    public List<UserComments> getUsercomments()
    {
        return usercomments;
    }

    public void setUsercomments(List<UserComments> usercomments)
    {
        this.usercomments = usercomments;
    }

    public List<BlogPostComments> getBlogPostComments()
    {
        return blogPostComments;
    }

    public void setBlogPostComments(List<BlogPostComments> blogPostComments)
    {
        this.blogPostComments = blogPostComments;
    }

    public long getCommentuser()
    {
        return commentuser;
    }

    public void setCommentuser(long commentuser)
    {
        this.commentuser = commentuser;
    }

    @Override
    public String toString()
    {
        return "Comment{" +
                "commentid=" + commentid +
                ", date='" + date + '\'' +
                ", comment='" + comment + '\'' +
                ", postid=" + postid +
                ", usercomments=" + usercomments +
                ", commentuser='" + commentuser + '\'' +
                ", blogPostComments=" + blogPostComments +
                '}';
    }
}
