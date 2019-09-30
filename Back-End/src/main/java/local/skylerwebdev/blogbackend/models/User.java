package local.skylerwebdev.blogbackend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

// User is considered the parent entity

@Entity
@Table(name = "users")
public class User extends Auditable
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long uuid;

    @Column(nullable = false,
            unique = true)
    private String username;

    @Column(nullable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private String email;

    private String fname;

    private String lname;

    @OneToMany(mappedBy = "user",
               cascade = CascadeType.ALL)
    @JsonIgnoreProperties("user")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<UserRoles> userroles = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("user")
    private List<UserComments> usercomments = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("user")
    private List<UserBlogPosts> userBlogPosts = new ArrayList<>();

    public User()
    {
    }

    public User(String username,
                String password,
                String fname,
                String lname,
                String email,
                List<UserRoles> userRoles,
                List<UserComments> usercomments,
                List<UserBlogPosts> userBlogPosts)
    {
        setUsername(username);
        setPassword(password);
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        for (UserRoles ur : userRoles)
        {
            ur.setUser(this);
        }
        this.userroles = userRoles;
        for (UserBlogPosts bp : userBlogPosts)
        {
            bp.setUser(this);
        }
        this.userBlogPosts = userBlogPosts;
        for (UserComments uc : usercomments)
        {
            uc.setUser(this);
        }
        this.usercomments= usercomments;
    }

    public long getUuid()
    {
        return uuid;
    }

    public void setUuid(long uuid)
    {
        this.uuid = uuid;
    }

    public String getUsername()
    {
        return username;
    }

    public void setUsername(String username)
    {
        this.username = username.toLowerCase();
    }

    public String getPassword()
    {
        return password;
    }

    public void setPassword(String password)
    {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        this.password = passwordEncoder.encode(password);
    }

    public void setPasswordNoEncrypt(String password)
    {
        this.password = password;
    }

    public String getEmail()
    {
        return email;
    }

    public void setEmail(String email)
    {
        this.email = email;
    }

    public String getFname()
    {
        return fname;
    }

    public void setFname(String fname)
    {
        this.fname = fname;
    }

    public String getLname()
    {
        return lname;
    }

    public void setLname(String lname)
    {
        this.lname = lname;
    }

    public List<UserRoles> getUserroles()
    {
        return userroles;
    }

    public void setUserroles(List<UserRoles> userroles)
    {
        this.userroles = userroles;
    }

    public List<UserComments> getUsercomments()
    {
        return usercomments;
    }

    public void setUsercomments(List<UserComments> usercomments)
    {
        this.usercomments = usercomments;
    }

    public List<UserBlogPosts> getUserBlogPosts()
    {
        return userBlogPosts;
    }

    public void setUserBlogPosts(List<UserBlogPosts> userBlogPosts)
    {
        this.userBlogPosts = userBlogPosts;
    }


    @JsonIgnore
    public List<SimpleGrantedAuthority> getAuthority()
    {
        List<SimpleGrantedAuthority> rtnList = new ArrayList<>();

        for (UserRoles r : this.userroles)
        {
            String myRole = "ROLE_" + r.getRole()
                                       .getName()
                                       .toUpperCase();
            rtnList.add(new SimpleGrantedAuthority(myRole));
        }

        return rtnList;
    }

    @Override
    public String toString()
    {
        return "User{" +
                "uuid=" + uuid +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", fname='" + fname + '\'' +
                ", lname='" + lname + '\'' +
                ", userroles=" + userroles +
                ", usercomments=" + usercomments +
                ", userBlogPosts=" + userBlogPosts +
                '}';
    }
}
