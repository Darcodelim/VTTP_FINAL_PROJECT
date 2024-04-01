package vttp.finalProject.Repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import vttp.finalProject.Model.Itinerary.User;

@Repository
public class UserRepo {

    private static final String SQL_VALIDATE_USER = "select count(*) from itineraryuser where Email = ? AND Password = ?";
    private static final String SQL_INSERT_USER = "insert into itineraryuser(Email,Password) values(?,?)";

    @Autowired
    private JdbcTemplate template;

    public void createUser(User User) throws DataAccessException,DuplicateKeyException {

        int num = template.update(SQL_INSERT_USER,User.getEmail(),User.getPassword());



    }

    //for login
    public boolean validateUser(User user)
    {
        int count  = template.queryForObject(SQL_VALIDATE_USER,Integer.class,user.getEmail(),user.getPassword());

        return count == 1;
    }
    
}
