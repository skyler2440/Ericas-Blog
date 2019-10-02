package local.skylerwebdev.blogapp;

import local.skylerwebdev.blogapp.models.Role;
import local.skylerwebdev.blogapp.models.User;
import local.skylerwebdev.blogapp.models.UserRoles;
import local.skylerwebdev.blogapp.services.RoleService;
import local.skylerwebdev.blogapp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Transactional
@Component
public class SeedData implements CommandLineRunner
{
    @Autowired
    UserService userService;
    @Autowired
    RoleService roleService;
    @Override
    public void run(String[] args) throws Exception
    {
        Role r1 = new Role("admin");
        Role r2 = new Role("user");
        Role r3 = new Role("data");

        roleService.save(r1);
        roleService.save(r2);
        roleService.save(r3);

        ArrayList<UserRoles> admins = new ArrayList<>();
        admins.add(new UserRoles(new User(),
                r1));
        admins.add(new UserRoles(new User(),
                r2));
        admins.add(new UserRoles(new User(),
                r3));
        User u1 = new User("admin", "password",
                admins);

//      User thisuser1 = userService.save(u1);
        userService.save(u1);

        ArrayList<UserRoles> datas = new ArrayList<>();

        datas.add(new UserRoles(new User(),
                r3));
        datas.add(new UserRoles(new User(),
                r2));
        User u2 = new User("cinnamon",
                "1234567",
                datas);

//      User thisuser2 = userService.save(u2);
        userService.save(u2);

        ArrayList<UserRoles> users = new ArrayList<>();
        users.add(new UserRoles(new User(),
                r2));
        User u3 = new User("barnbarn",
                "password",
                users);

//      User thisuser3 = userService.save(u3);
        userService.save(u3);

        users = new ArrayList<>();
        users.add(new UserRoles(new User(),
                r2));
        User u4 = new User("user4",
                "password",
                users);

//      User thisuser4 = userService.save(u4);
        userService.save(u4);

        users = new ArrayList<>();
        users.add(new UserRoles(new User(),
                r2));
        User u5 = new User("user5",
                "password",
                users);

//      User thisuser5 = userService.save(u5);
        userService.save(u5);

    }
}
