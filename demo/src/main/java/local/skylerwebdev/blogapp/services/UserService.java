package local.skylerwebdev.blogapp.services;

import local.skylerwebdev.blogapp.models.User;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserService
{

    List<User> findAll(Pageable pageable);

    User findUserById(long uuid);

    void delete(long uuid);

    User save(User user);

    User update(User user,
                long id,
                boolean isAdmin);

    void deleteUserRole(long uuid,
                        long roleid);

    void addUserRole(long uuid,
                     long roleid);

}