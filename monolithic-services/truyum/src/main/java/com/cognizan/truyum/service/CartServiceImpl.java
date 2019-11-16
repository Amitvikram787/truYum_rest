package com.cognizan.truyum.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizan.truyum.dao.CartDao;
import com.cognizan.truyum.exception.CartEmptyException;
import com.cognizan.truyum.model.Cart;

@Service
public class CartServiceImpl implements CartService {
	
	@Autowired
	private CartDao cartdao;

	@Override
	public Cart getAllcartItems(String user) throws CartEmptyException {
		
		return cartdao.getAllCartItems(user);
	}

	@Override
	public void addCartItem(String user, long menuItemId) {
		cartdao.addCartItem(user, menuItemId);
	}

	@Override
	public void removeCartItem(String user, long menuItemId,Integer quantity) {
		cartdao.removeCartItem(user, menuItemId,quantity);

	}

}
