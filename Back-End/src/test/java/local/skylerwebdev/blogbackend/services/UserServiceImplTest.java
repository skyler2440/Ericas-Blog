package local.skylerwebdev.blogbackend.services;

import local.skylerwebdev.blogbackend.BlogBackendApplication;
import local.skylerwebdev.blogbackend.exceptions.ResourceNotFoundException;
import org.junit.After;
import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.*;
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BlogBackendApplication.class)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class UserServiceImplTest
{

    @Autowired
    private UserService userService;

    @Before
    public void setUp() throws Exception
    {
        MockitoAnnotations.initMocks(this);
    }

    @After
    public void tearDown() throws Exception
    {
    }

    @Test
    public void A_loadUserByUsername()
    {
        assertEquals("admin", userService.loadUserByUsername("admin").getUsername());
    }
    @Test (expected = UsernameNotFoundException.class)
    public void AA_loadUserByUsernameNotfound()
    {
        assertEquals("admin", userService.loadUserByUsername("turtle").getUsername());
    }

    @Test
    @WithUserDetails("admin")
    public void B_findUserById()
    {
        assertEquals("admin", userService.findUserById(4).getUsername());
    }

    @Test(expected = ResourceNotFoundException.class)
    @WithUserDetails("admin")
    public void BA_findUserByIdNotFound()
    {
        assertEquals("admin", userService.findUserById(10).getUsername());
    }
    @Test
    public void findByNameContaining()
    {
    }

    @Test
    @WithUserDetails("admin")
    public void C_findAll()
    {
        assertEquals(105, userService.findAll(Pageable.unpaged()).size());
    }

    @Test
    @WithUserDetails("admin")
    public void D_delete()
    {
        userService.delete(13);
        assertEquals(104, userService.findAll(Pageable.unpaged()).size());
    }
    @Test
    public void findByName()
    {
    }

    @Test
    public void save()
    {
    }

    @Test
    public void update()
    {
    }

    @Test
    public void deleteUserRole()
    {
    }

    @Test
    public void addUserRole()
    {
    }

    @Test
    public void addUserBlogPost()
    {
    }

    @Test
    public void deleteUserBlogPost()
    {
    }

    @Test
    public void addUserComment()
    {
    }

    @Test
    public void deleteUserComment()
    {
    }
}