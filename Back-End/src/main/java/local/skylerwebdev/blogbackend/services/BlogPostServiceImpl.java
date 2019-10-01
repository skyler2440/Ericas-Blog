package local.skylerwebdev.blogbackend.services;

import local.skylerwebdev.blogbackend.exceptions.ResourceFoundException;
import local.skylerwebdev.blogbackend.exceptions.ResourceNotFoundException;
import local.skylerwebdev.blogbackend.models.BlogPost;
import local.skylerwebdev.blogbackend.models.User;
import local.skylerwebdev.blogbackend.repository.BlogPostRepostitory;
import local.skylerwebdev.blogbackend.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

//import local.skylerwebdev.blogbackend.models.UserBlogPosts;
@Service(value = "blogPostService")
public class BlogPostServiceImpl implements BlogPostService
{
    @Autowired
    BlogPostRepostitory blogPostRepostitory;
    @Autowired
    UserRepository userRepository;
    @Override
    public List<BlogPost> findAll(Integer pageNo, Integer pageSize, String sortBy)
    {
        Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by(sortBy));
        Page<BlogPost> pagedResult = blogPostRepostitory.findAll(paging);
        if (pagedResult.hasContent())
        {
            return pagedResult.getContent();
        } else {
            return new ArrayList<BlogPost>();
        }
//        List<BlogPost> postList = new ArrayList<>();
//        Pageable pageableRequest = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize());
//        Page <BlogPost> posts = blogPostRepostitory.findAll(pageableRequest);
//        postList = posts.getContent();
////        blogPostRepostitory.findAll(pageableRequest).iterator().forEachRemaining(postList::add);
//
//        return postList;
    }

    @Override
    public Page<BlogPost> findPaginated(int page, int size)
    {
return blogPostRepostitory.findAll(new PageRequest(page, size));
    }

    @Override
    public BlogPost findBlogPostById(long id)
    {

        return blogPostRepostitory.findById(id).orElseThrow(()-> new ResourceNotFoundException("Post ID " + id + " not found!"));
    }

    @Override
    public void delete(long postid, long uuid)
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User authenticatedUser = userRepository.findByUsername(authentication.getName());
        if (uuid == authenticatedUser.getUuid())
        {
            blogPostRepostitory.deleteById(postid);
        }        else
        {
            throw new ResourceNotFoundException(uuid + " not Current User");
        }

    }

    @Override
    public BlogPost save(BlogPost blogPost, long uuid)
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User authenticatedUser = userRepository.findByUsername(authentication.getName());
        if (uuid == authenticatedUser.getUuid())
        {
            BlogPost newBlogPost = new BlogPost();
            newBlogPost.setDate(blogPost.getDate());
            newBlogPost.setUuid(uuid);
            newBlogPost.setPostauthor(userRepository.findById(uuid).get().getFname() + " " + userRepository.findById(uuid).get().getLname());
            newBlogPost.setPosttitle(blogPost.getPosttitle());
            newBlogPost.setPostbody(blogPost.getPostbody());
            BlogPost savedBlogpost = blogPostRepostitory.save(newBlogPost);
            if (blogPostRepostitory.checkUserBlogPostCombo(uuid, savedBlogpost.getPostid()).getCount() <= 0)
            {
                blogPostRepostitory.insertUserBlogPosts(uuid, savedBlogpost.getPostid());
                System.out.println(uuid);
            } else
            {
                throw new ResourceFoundException("Post and User Combination Already Exists");
            }
            System.out.println(uuid);
            return blogPostRepostitory.save(newBlogPost);
        }
        else
        {
            throw new ResourceNotFoundException(uuid + " not Current User");
        }
    }

    @Override
    public BlogPost update(BlogPost blogPost, long uuid, long postid)
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User authenticatedUser = userRepository.findByUsername(authentication.getName());
        if (uuid == authenticatedUser.getUuid())
        {
            BlogPost currentPost = findBlogPostById(postid);
//
            if (blogPost.getPosttitle() != null)
            {
                currentPost.setPosttitle(blogPost.getPosttitle());
            }
            if (blogPost.getPostbody() != null)
            {
                currentPost.setPostbody(blogPost.getPostbody());
            }
            return blogPostRepostitory.save(currentPost);
        }
        else
        {
            throw new ResourceNotFoundException(uuid + " not Current User");
        }
    }

    @Override
    public BlogPost findByName(String name)
    {
        return null;
    }
}
