package local.skylerwebdev.blogbackend.repository;

import local.skylerwebdev.blogbackend.models.Comment;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.transaction.annotation.Transactional;

public interface CommentRepository extends PagingAndSortingRepository<Comment, Long>
{
//    @Query(value = "SELECT COUNT(*) as count FROM usercomments WHERE uuid = :uuid AND commentid = :commentid",
//            nativeQuery = true)
//    JustTheCount checkUserCommentCombo(long uuid,
//                                     long commentid);
    @Transactional
    @Modifying
    @Query(value = "INSERT INTO blogpostcomments(postid, commentid) VALUES (:postid, :commentid)",
            nativeQuery = true)
    void insertPostComment(long postid,
                           long commentid);

//    @Transactional
//    @Modifying
//    @Query(value = "DELETE FROM usercomments WHERE uuid = :uuid AND commentid = :commentid")
//    void deleteUserRoles(long uuid,
//                         long commentid);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO usercomments(uuid, commentid) VALUES (:uuid, :commentid)",
            nativeQuery = true)
    void insertUserComment(long uuid,
                         long commentid);
}
