package local.skylerwebdev.blogapp.repositories;

import local.skylerwebdev.blogapp.models.Role;
import local.skylerwebdev.blogapp.view.JustTheCount;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

public interface RoleRepository extends CrudRepository<Role, Long>
{
    //Checks that User/Role combo does not exist
    @Query(value = "SELECT COUNT(*) as count FROM userroles WHERE uuid = :uuid AND roleid = :roleid",
           nativeQuery = true)
    JustTheCount checkUserRolesCombo(long uuid,
                                     long roleid);

    //Deletes User Role combo
    @Transactional
    @Modifying
    @Query(value = "DELETE FROM UserRoles WHERE uuid = :uuid AND roleid = :roleid")
    void deleteUserRoles(long uuid,
                         long roleid);

    //Adds User role combo
    @Transactional
    @Modifying
    @Query(value = "INSERT INTO UserRoles(uuid, roleid) VALUES (:uuid, :roleid)",
           nativeQuery = true)
    void insertUserRoles(long uuid,
                         long roleid);
    Role findByNameIgnoreCase(String name);

}
