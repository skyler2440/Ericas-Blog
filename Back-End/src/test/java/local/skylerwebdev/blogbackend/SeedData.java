package local.skylerwebdev.blogbackend;

import com.github.javafaker.Faker;
import com.github.javafaker.service.FakeValuesService;
import com.github.javafaker.service.RandomService;
import local.skylerwebdev.blogbackend.models.*;
import local.skylerwebdev.blogbackend.services.BlogPostService;
import local.skylerwebdev.blogbackend.services.CommentService;
import local.skylerwebdev.blogbackend.services.RoleService;
import local.skylerwebdev.blogbackend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Locale;

@Transactional
@Component
public class SeedData implements CommandLineRunner
{
    @Autowired
    RoleService roleService;

    @Autowired
    UserService userService;
    @Autowired
    BlogPostService blogPostService;
    @Autowired
    CommentService commentService;


    @Override
    public void run(String[] args) throws Exception
    {
        Role r1 = new Role("admin");
        Role r2 = new Role("user");
        Role r3 = new Role("data");

        roleService.save(r1);
        roleService.save(r2);
        roleService.save(r3);

//        BlogPost p1 = new BlogPost("12-12-1222", "Title", "body");
//        blogPostService.save(p1);
//        BlogPost p2 = new BlogPost("12-12-1222", "Title", "body");
//        blogPostService.save(p2);
//        BlogPost p3 = new BlogPost("12-12-1222", "Title", "body");
//        blogPostService.save(p3);


//        Comment c1 = new Comment("12-12-1212", "Comment Here");
//        Comment comment1 = commentService.save(c1);
//        Comment c2 = new Comment("12-12-1212", "Comment Here");
//        Comment comment2 = commentService.save(c2);
//        Comment c3 = new Comment("12-12-1212", "Comment Here");
//
//        Comment comment3 = commentService.save(c3);
//        System.out.println(comment1.getCommentid());
        ArrayList<UserBlogPosts> posts = new ArrayList<>();
        ArrayList<UserComments> comments = new ArrayList<>();

        // admin, data, user
        ArrayList<UserRoles> admins = new ArrayList<>();
        admins.add(new UserRoles(new User(),
                                 r1));
        admins.add(new UserRoles(new User(),
                                 r2));
        admins.add(new UserRoles(new User(),
                                 r3));
//        posts.add(new UserBlogPosts(new User(), p1));
//        posts.add(new UserBlogPosts(new User(), p2));
//        comments.add(new UserComments(new User(), comment1));
        User u1 = new User("admin", "password", "First", "Last", "email@test.com",
                           admins, comments, posts);


        User thisuser1 = userService.save(u1);

        // data, user
        ArrayList<UserRoles> datas = new ArrayList<>();
        posts = new ArrayList<>();
        comments = new ArrayList<>();

        datas.add(new UserRoles(new User(),
                                r3));
        datas.add(new UserRoles(new User(),
                                r2));
//        comments.add(new UserComments(new User(), comment2));
        User u2 = new User("cinnamon",
                           "1234567", "First", "Last", "email@test.com",
                           datas, comments, posts);

        userService.save(u2);
//        userService.addUserBlogPost(thisuser1.getUuid(), p1.getPostid());

        // user
        ArrayList<UserRoles> users = new ArrayList<>();
        comments = new ArrayList<>();
        posts = new ArrayList<>();
        users.add(new UserRoles(new User(),
                r2));
//        comments.add(new UserComments(new User(), comment3));
//        posts.add(new UserBlogPosts(new User(), p3));
        User u3 = new User("barnbarn",
                           "password", "First", "Last", "email@test.com",
                           users,comments,posts);

        userService.save(u3);

        posts = new ArrayList<>();
        comments = new ArrayList<>();
        users = new ArrayList<>();
        users.add(new UserRoles(new User(),
                                r2));
        User u4 = new User("puttat",
                           "password", "First", "Last", "email@test.com",
                           users,comments, posts);
        userService.save(u4);
        posts = new ArrayList<>();
        comments = new ArrayList<>();
        users = new ArrayList<>();
        users.add(new UserRoles(new User(),
                                r2));
        User u5 = new User("misskitty",
                           "password", "First", "Last", "email@test.com",
                           users, comments,posts);
        userService.save(u5);
//        List<UserBlogPosts> blogPostsList = new ArrayList<>();



        // using JavaFaker create a bunch of regular users
        // https://www.baeldung.com/java-faker
        // https://www.baeldung.com/regular-expressions-java

        FakeValuesService fakeValuesService = new FakeValuesService(new Locale("en-US"),
                                                                    new RandomService());
        Faker nameFaker = new Faker(new Locale("en-US"));

        for (int i = 0; i < 100; i++)
        {
            comments = new ArrayList<>();
            User fakeUser = new User();
            posts = new ArrayList<>();
            users = new ArrayList<>();
            users.add(new UserRoles(new User(),
                                    r2));
            fakeUser = new User(nameFaker.name().username(),
                                "password", nameFaker.name().firstName(), nameFaker.name().lastName(), fakeValuesService.bothify("????##@gmail.com"),
                                users,comments,posts);
//            fakeUser.getUseremails()
//                    .add(new Useremail(fakeUser,
//                                       fakeValuesService.bothify("????##@gmail.com")));
            userService.save(fakeUser);
        }
    }
}