package local.skylerwebdev.blogbackend.services;

import local.skylerwebdev.blogbackend.models.User;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface UserService
{
    UserDetails loadUserByUsername(String username);

    List<User> findAll(Pageable pageable);

    List<User> findByNameContaining(String username, Pageable pageable);

    User findUserById(long id);

    User findByName(String name);

    void delete(long id);

    User save(User user);

    User update(User user,
                long id,
                boolean isAdmin);

    void deleteUserRole(long uuid,
                        long roleid);

    void addUserRole(long uuid,
                     long roleid);

    void addUserBlogPost(long uuid, long postid);

    void deleteUserBlogPost(long uuid, long postid);

    void addUserComment(long uuid, long commentid);

    void deleteUserComment(long uuid, long commentid);
}