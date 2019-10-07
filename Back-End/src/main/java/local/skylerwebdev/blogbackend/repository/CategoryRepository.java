package local.skylerwebdev.blogbackend.repository;

import local.skylerwebdev.blogbackend.models.Category;
import org.springframework.data.repository.CrudRepository;

public interface CategoryRepository extends CrudRepository<Category, Long>
{

}
