package local.skylerwebdev.blogapp.repositories;

import local.skylerwebdev.blogapp.models.User;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface UserRepository extends PagingAndSortingRepository<User, Long>
{
    User findByUsername(String username);

}
