package local.skylerwebdev.blogbackend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "blogpostcategories")
public class BlogPostCategory extends Auditable implements Serializable
{
    @Id
    @ManyToOne
    @JoinColumn(name = "postid")
    @JsonIgnoreProperties("blogPostCategory")
    private BlogPost blogPost;

    @Id
    @ManyToOne
    @JoinColumn(name = "categoryid")
    @JsonIgnoreProperties("blogPostCategory")
    private Category category;

    public BlogPostCategory()
    {
    }

    public BlogPostCategory(BlogPost blogPost, Category category)
    {
        this.blogPost = blogPost;
        this.category = category;
    }

    public BlogPost getBlogPost()
    {
        return blogPost;
    }

    public void setBlogPost(BlogPost blogPost)
    {
        this.blogPost = blogPost;
    }

    public Category getCategory()
    {
        return category;
    }

    public void setCategory(Category category)
    {
        this.category = category;
    }

    @Override
    public boolean equals(Object o)
    {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BlogPostCategory that = (BlogPostCategory) o;
        return Objects.equals(blogPost, that.blogPost) &&
                Objects.equals(category, that.category);
    }

    @Override
    public int hashCode()
    {
        return Objects.hash(blogPost, category);
    }

    @Override
    public String toString()
    {
        return "BlogPostCategory{" +
                "blogPost=" + blogPost +
                ", category=" + category +
                '}';
    }
}
