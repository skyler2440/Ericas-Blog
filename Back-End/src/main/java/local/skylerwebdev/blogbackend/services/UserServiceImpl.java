package local.skylerwebdev.blogbackend.services;

import local.skylerwebdev.blogbackend.exceptions.ResourceFoundException;
import local.skylerwebdev.blogbackend.exceptions.ResourceNotFoundException;
import local.skylerwebdev.blogbackend.models.*;
import local.skylerwebdev.blogbackend.repository.BlogPostRepostitory;
import local.skylerwebdev.blogbackend.repository.CommentRepository;
import local.skylerwebdev.blogbackend.repository.RoleRepository;
import local.skylerwebdev.blogbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;


@Service(value = "userService")
public class UserServiceImpl implements UserDetailsService,
        UserService
{

    @Autowired
    private UserRepository userrepos;

    @Autowired
    private RoleRepository rolerepos;

    @Autowired
    private BlogPostRepostitory blogPostRepostitory;

    @Autowired
    private CommentRepository commentRepository;

    @Transactional
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException
    {
        User user = userrepos.findByUsername(username);
        if (user == null)
        {
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(),
                                                                      user.getPassword(),
                                                                      user.getAuthority());
    }

    public User findUserById(long id) throws ResourceNotFoundException
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User authenticatedUser = userrepos.findByUsername(authentication.getName());
        if (id == authenticatedUser.getUuid())
        {
            return userrepos.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("User id " + id + " not found!"));
        }        else
        {
            throw new ResourceNotFoundException(id + " not Current User");
        }
    }

    @Override
    public List<User> findByNameContaining(String username,
                                           Pageable pageable)
    {
        return userrepos.findByUsernameContainingIgnoreCase(username, pageable);
    }

    @Override
    public List<User> findAll(Pageable pageable)
    {
        List<User> list = new ArrayList<>();
        userrepos.findAll(pageable)
                 .iterator()
                 .forEachRemaining(list::add);
        return list;
    }

    @Transactional
    @Override
    public void delete(long id)
    {
        userrepos.findById(id)
                 .orElseThrow(() -> new ResourceNotFoundException("User id " + id + " not found!"));
        userrepos.deleteById(id);
    }

    @Override
    public User findByName(String name)
    {
        User uu = userrepos.findByUsername(name);
        if (uu == null)
        {
            throw new ResourceNotFoundException("User name " + name + " not found!");
        }
        return uu;
    }

    @Transactional
    @Override
    public User save(User user)
    {
        if (userrepos.findByUsername(user.getUsername()) != null)
        {
            throw new ResourceFoundException(user.getUsername() + " is already taken!");
        }

        User newUser = new User();
        newUser.setUsername(user.getUsername());
        newUser.setPasswordNoEncrypt(user.getPassword());
        newUser.setFname(user.getFname());
        newUser.setLname(user.getLname());
        newUser.setEmail(user.getEmail());

        ArrayList<UserRoles> newRoles = new ArrayList<>();
        newRoles.add(new UserRoles(newUser, rolerepos.findByNameIgnoreCase("user")));
        newUser.setUserroles(newRoles);

        ArrayList<UserBlogPosts> newBlogPosts = new ArrayList<>();
//        for (UserBlogPosts bp : user.getUserBlogPosts())
//        {
//            long id = bp.getUser().getUuid();
//            if (blogPostRepostitory.checkUserBlogPostCombo(id, .getPostid()).getCount()<=0)
//            {
//                blogPostRepostitory.insertUserBlogPosts(id, newUser..getPostid());
//                System.out.println(id);
//            } else
//            {
//                throw new ResourceFoundException("Post and User Combination Already Exists");
//            };
//        }
        newUser.setUserBlogPosts(newBlogPosts);
        ArrayList<UserComments> newComments = new ArrayList<>();
        for (UserComments c : user.getUsercomments())
        {
            long id = c.getComment().getCommentid();
            Comment comment = commentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Comment id " + id + " not found!"));
            newComments.add(new UserComments(newUser, c.getComment()));
        }
        newUser.setUsercomments(newComments);
        return userrepos.save(newUser);
    }

    @Transactional
    @Override
    public User update(User user,
                       long id)
    {
        Authentication authentication = SecurityContextHolder.getContext()
                                                             .getAuthentication();

        User authenticatedUser = userrepos.findByUsername(authentication.getName());

        if (id == authenticatedUser.getUuid())
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
            if (user.getFname() != null)
            {
                currentUser.setFname(user.getFname());
            }
            if (user.getLname() != null)
            {
                currentUser.setLname(user.getLname());
            }
            if (user.getEmail() != null)
            {
                currentUser.setEmail(user.getEmail());
            }

            if (user.getUserroles()
                    .size() > 0)
            {
                throw new ResourceFoundException("User Roles are not updated through User");
            }

            if (user.getUserBlogPosts().size()>0)
            {
                throw new ResourceFoundException("User Blog Posts are not updated through User");

            }
            if (user.getUsercomments().size()>0)
            {
                throw new ResourceFoundException("User Comments are not updated through User");

            }


            return userrepos.save(currentUser);
        } else
        {
            throw new ResourceNotFoundException(id + " Not current user");
        }
    }

    @Transactional
    @Override
    public void deleteUserRole(long uuid,
                               long roleid)
    {
        userrepos.findById(uuid)
                 .orElseThrow(() -> new ResourceNotFoundException("User id " + uuid + " not found!"));
        rolerepos.findById(roleid)
                 .orElseThrow(() -> new ResourceNotFoundException("Role id " + roleid + " not found!"));

        if (rolerepos.checkUserRolesCombo(uuid,
                                          roleid)
                     .getCount() > 0)
        {
            rolerepos.deleteUserRoles(uuid,
                                      roleid);
        } else
        {
            throw new ResourceNotFoundException("Role and User Combination Does Not Exists");
        }
    }

    @Transactional
    @Override
    public void addUserRole(long uuid,
                            long roleid)
    {
        userrepos.findById(uuid)
                 .orElseThrow(() -> new ResourceNotFoundException("User id " + uuid + " not found!"));
        rolerepos.findById(roleid)
                 .orElseThrow(() -> new ResourceNotFoundException("Role id " + roleid + " not found!"));

        if (rolerepos.checkUserRolesCombo(uuid,
                                          roleid)
                     .getCount() <= 0)
        {
            rolerepos.insertUserRoles(uuid,
                                      roleid);
        } else
        {
            throw new ResourceFoundException("Role and User Combination Already Exists");
        }
    }

    @Override
    public void addUserBlogPost(long uuid, long postid)
    {
//        userrepos.findById(uuid)
//                .orElseThrow(() -> new ResourceNotFoundException("User id " + uuid + " not found!"));
//        blogPostRepostitory.findById(postid)
//                .orElseThrow(() -> new ResourceNotFoundException("Role id " + postid + " not found!"));
//        if (blogPostRepostitory.checkUserBlogPostCombo(uuid, postid).getCount()<=0)
//        {
//            blogPostRepostitory.insertUserBlogPosts(uuid, postid);
//        }else
//        {
//            throw new ResourceFoundException("Post and User Combination Already Exists");
//
//        }
    }

    @Override
    public void deleteUserBlogPost(long uuid, long postid)
    {

    }

    @Override
    public void addUserComment(long uuid, long commentid)
    {

    }

    @Override
    public void deleteUserComment(long uuid, long commentid)
    {

    }
}
