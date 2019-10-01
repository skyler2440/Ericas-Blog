package local.skylerwebdev.blogbackend.services;

import local.skylerwebdev.blogbackend.models.BlogPost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BlogPostService
{
    List<BlogPost> findAll(Integer pageNo, Integer pageSize, String sortBy);

    Page<BlogPost> findPaginated(int page, int size);

    BlogPost findBlogPostById(long id);

    void delete(long postid, long uuid);

    BlogPost save(BlogPost blogPost, long uuid);

    BlogPost update(BlogPost blogPost, long uuid, long postid);

    BlogPost findByName(String name);
}
