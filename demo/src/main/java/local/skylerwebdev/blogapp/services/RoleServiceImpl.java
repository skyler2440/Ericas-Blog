package local.skylerwebdev.blogapp.services;

import local.skylerwebdev.blogapp.models.Role;
import local.skylerwebdev.blogapp.models.User;
import local.skylerwebdev.blogapp.models.UserRoles;
import local.skylerwebdev.blogapp.repositories.RoleRepository;
import local.skylerwebdev.blogapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

@Service(value = "roleService")
public class RoleServiceImpl implements RoleService
{
    @Autowired
    RoleRepository roleRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public List<Role> findAll()
    {
        List<Role> list = new ArrayList<>();
        roleRepository.findAll()
                 .iterator()
                 .forEachRemaining(list::add);
        return list;
    }


    @Override
    public Role findRoleById(long id)
    {
        return roleRepository.findById(id)
                        .orElseThrow(() -> new EntityNotFoundException("Role id " + id + " not found!"));
    }

    @Override
    public Role findByName(String name)
    {
        Role rr = roleRepository.findByNameIgnoreCase(name);

        if (rr != null)
        {
            return rr;
        } else
        {
            throw new EntityNotFoundException(name);
        }
    }

    @Transactional
    @Override
    public void delete(long id)
    {
        roleRepository.findById(id)
                 .orElseThrow(() -> new EntityNotFoundException("Role id " + id + " not found!"));
        roleRepository.deleteById(id);
    }


    @Transactional
    @Override
    public Role save(Role role)
    {
        Role newRole = new Role();
        newRole.setName(role.getName());

        ArrayList<UserRoles> newUsers = new ArrayList<>();
        for (UserRoles ur : role.getUserroles())
        {
            long id = ur.getUser()
                        .getUuid();
            User user = userRepository.findById(id)
                                 .orElseThrow(() -> new EntityNotFoundException("User id " + id + " not found!"));
            newUsers.add(new UserRoles(ur.getUser(),
                                       newRole));
        }
        newRole.setUserroles(newUsers);

        return roleRepository.save(role);
    }
}
