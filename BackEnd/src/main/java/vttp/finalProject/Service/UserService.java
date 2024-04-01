package vttp.finalProject.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import vttp.finalProject.Model.Itinerary.User;
import vttp.finalProject.Repository.UserRepo;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;
    
    
    @Transactional(rollbackFor = {DataAccessException.class,DuplicateKeyException.class})
    public void createUser(User User) throws DataAccessException,DuplicateKeyException
    {
        userRepo.createUser(User);
    }

    public boolean validateUser(User user)
    {
        return userRepo.validateUser(user);
    }
}
