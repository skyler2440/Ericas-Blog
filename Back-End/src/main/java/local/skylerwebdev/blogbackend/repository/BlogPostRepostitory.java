package local.skylerwebdev.blogbackend.repository;

import local.skylerwebdev.blogbackend.models.BlogPost;
import local.skylerwebdev.blogbackend.view.JustTheCount;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.transaction.annotation.Transactional;

public interface BlogPostRepostitory extends PagingAndSortingRepository<BlogPost, Long>
{
    @Query(value = "SELECT COUNT(*) as count FROM userblogposts WHERE uuid = :uuid AND postid = :postid",
            nativeQuery = true)
    JustTheCount checkUserBlogPostCombo(long uuid,
                                     long postid);

//    @Transactional
//    @Modifying
//    @Query(value = "DELETE FROM UserBlogPosts WHERE uuid = :uuid AND postid = :postid")
//    void deleteBlogPosts(long uuid,
//                         long postid);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO userblogposts(uuid, postid) VALUES (:uuid, :postid)",
            nativeQuery = true)
    void insertUserBlogPosts(long uuid,
                         long postid);
}
