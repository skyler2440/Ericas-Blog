package local.skylerwebdev.blogbackend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "blogpost")
public class BlogPost
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long postid;

    private long uuid;

    private String date;

    private String postauthor;

    private String posttitle;

    private String postbody;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @OneToMany(mappedBy = "blogPost", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("blogPost")
    private List<UserBlogPosts> userposts = new ArrayList<>();

    @OneToMany(mappedBy = "blogPost", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("blogPost")
    private List<BlogPostComments> blogPostComments;


    //todo Add Comment List


    public BlogPost(String date, long uuid, String postauthor, String posttitle, String postbody)
    {
        this.date = date;
        this.uuid = uuid;
        this.postauthor = postauthor;
        this.posttitle = posttitle;
        this.postbody = postbody;

    }

    public BlogPost()
    {

    }

    public long getPostid()
    {
        return postid;
    }

    public void setPostid(long postid)
    {
        this.postid = postid;
    }

    public long getUuid()
    {
        return uuid;
    }

    public void setUuid(long uuid)
    {
        this.uuid = uuid;
    }

    public String getPostauthor()
    {
        return postauthor;
    }



    public void setPostauthor(String postauthor)
    {
        this.postauthor = postauthor;
    }

    public String getDate()
    {
        return date;
    }

    public void setDate(String date)
    {
        this.date = date;
    }

    public String getPosttitle()
    {
        return posttitle;
    }

    public void setPosttitle(String posttitle)
    {
        this.posttitle = posttitle;
    }

    public String getPostbody()
    {
        return postbody;
    }

    public void setPostbody(String postbody)
    {
        this.postbody = postbody;
    }

    public List<UserBlogPosts> getUserposts()
    {
        return userposts;
    }

    public void setUserposts(List<UserBlogPosts> userposts)
    {
        this.userposts = userposts;
    }

    public List<BlogPostComments> getBlogPostComments()
    {
        return blogPostComments;
    }

    public void setBlogPostComments(List<BlogPostComments> blogPostComments)
    {
        this.blogPostComments = blogPostComments;
    }

    @Override
    public String toString()
    {
        return "BlogPost{" +
                "postid=" + postid +
                ", uuid=" + uuid +
                ", date='" + date + '\'' +
                ", postauthor='" + postauthor + '\'' +
                ", posttitle='" + posttitle + '\'' +
                ", postbody='" + postbody + '\'' +
                ", userposts=" + userposts +
                ", blogPostComments=" + blogPostComments +
                '}';
    }
}
