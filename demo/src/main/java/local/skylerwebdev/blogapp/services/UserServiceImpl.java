package local.skylerwebdev.blogapp.services;

import local.skylerwebdev.blogapp.models.Role;
import local.skylerwebdev.blogapp.models.User;
import local.skylerwebdev.blogapp.models.UserRoles;
import local.skylerwebdev.blogapp.repositories.RoleRepository;
import local.skylerwebdev.blogapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;


@Service(value = "userService")
public class UserServiceImpl implements UserDetailsService,
        UserService
{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException
    {
        return null;
    }

    @Override
    public List<User> findAll(Pageable pageable)
    {
        List<User> list = new ArrayList<>();
        userRepository.findAll(pageable)
                .iterator()
                .forEachRemaining(list::add);
        return list;
    }

    @Override
    public User findUserById(long uuid)
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User authenticatedUser = userRepository.findByUsername(authentication.getName());
        if (uuid == authenticatedUser.getUuid())
        {
            return userRepository.findById(uuid)
                    .orElseThrow(() -> new EntityNotFoundException("User id " + uuid + " not found!"));
        }        else
        {
            throw new EntityNotFoundException(uuid + " not Current User");
        }
    }

    @Transactional
    @Override
    public void delete(long uuid)
    {
        userRepository.findById(uuid)
                .orElseThrow(() -> new EntityNotFoundException("User id " + uuid + " not found!"));
        userRepository.deleteById(uuid);
    }

    @Transactional
    @Override
    public User save(User user)
    {
        if (userRepository.findByUsername(user.getUsername()) != null)
        {
            throw new EntityNotFoundException(user.getUsername() + " is already taken!");
        }

        User newUser = new User();
        newUser.setUsername(user.getUsername());
        newUser.setPasswordNoEncrypt(user.getPassword());

        ArrayList<UserRoles> newRoles = new ArrayList<>();
        for (UserRoles ur : user.getUserroles())
        {
            long id = ur.getRole()
                    .getRoleid();
            Role role = roleRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Role id " + id + " not found!"));
            newRoles.add(new UserRoles(newUser,
                    ur.getRole()));
        }
        newUser.setUserroles(newRoles);

        return userRepository.save(newUser);
    }

    @Transactional
    @Override
    public User update(User user, long id, boolean isAdmin)
    {
        Authentication authentication = SecurityContextHolder.getContext()
                .getAuthentication();

        User authenticatedUser = userRepository.findByUsername(authentication.getName());

        if (id == authenticatedUser.getUuid() || isAdmin)
        {
            User currentUser = findUserById(id);

            if (user.getUsername() != null)
            {
                currentUser.setUsername(user.getUsername());
            }

            if (user.getPassword() != null)
            {
                currentUser.setPasswordNoEncrypt(user.getPassword());
            }
            
            if (user.getUserroles()
                    .size() > 0)
            {
                throw new EntityNotFoundException("User Roles are not updated through User");
            }
            return userRepository.save(currentUser);
        } else
        {
            throw new EntityNotFoundException(id + " Not current user");
        }
    }

    @Transactional
    @Override
    public void deleteUserRole(long uuid, long roleid)
    {
        userRepository.findById(uuid)
                .orElseThrow(() -> new EntityNotFoundException("User id " + uuid + " not found!"));
        roleRepository.findById(roleid)
                .orElseThrow(() -> new EntityNotFoundException("Role id " + roleid + " not found!"));

        if (roleRepository.checkUserRolesCombo(uuid,
                roleid)
                .getCount() > 0)
        {
            roleRepository.deleteUserRoles(uuid,
                    roleid);
        } else
        {
            throw new EntityNotFoundException("Role and User Combination Does Not Exists");
        }
    }
    @Transactional
    @Override
    public void addUserRole(long uuid, long roleid)
    {
        userRepository.findById(uuid)
                .orElseThrow(() -> new EntityNotFoundException("User id " + uuid + " not found!"));
        roleRepository.findById(roleid)
                .orElseThrow(() -> new EntityNotFoundException("Role id " + roleid + " not found!"));

        if (roleRepository.checkUserRolesCombo(uuid,
                roleid)
                .getCount() <= 0)
        {
            roleRepository.insertUserRoles(uuid,
                    roleid);
        } else
        {
            throw new EntityNotFoundException("Role and User Combination Already Exists");
        }
    }
}
