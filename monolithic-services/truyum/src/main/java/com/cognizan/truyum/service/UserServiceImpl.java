package com.cognizan.truyum.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizan.truyum.dao.UserDao;
import com.cognizan.truyum.exception.UserAlredyExistsException;
import com.cognizan.truyum.model.User;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	UserDao userdao;
	

	@Override
	public void signUp(User user) throws UserAlredyExistsException {
		userdao.signUp(user);
	
	}

}
