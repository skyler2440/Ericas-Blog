package local.skylerwebdev.blogbackend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "usercomments")
public class UserComments extends Auditable implements Serializable
{
    @Id
    @ManyToOne
    @JoinColumn(name = "uuid")
    @JsonIgnoreProperties("usercomments")
    private User user;

    @Id
    @ManyToOne
    @JoinColumn(name = "commentid")
    @JsonIgnoreProperties("usercomments")
    private Comment comment;

    public UserComments()
    {
    }

    public UserComments(User user, Comment comment)
    {
        this.user = user;
        this.comment = comment;
    }

    public User getUser()
    {
        return user;
    }

    public void setUser(User user)
    {
        this.user = user;
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
        UserComments that = (UserComments) o;
        return Objects.equals(user, that.user) &&
                Objects.equals(comment, that.comment);
    }

    @Override
    public int hashCode()
    {
        return Objects.hash(user, comment);
    }

    @Override
    public String toString()
    {
        return "UserComments{" +
                "user=" + user +
                ", comment=" + comment +
                '}';
    }
}
