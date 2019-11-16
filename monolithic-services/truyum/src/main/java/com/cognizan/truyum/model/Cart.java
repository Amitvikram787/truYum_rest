package com.cognizan.truyum.model;

import java.util.ArrayList;
import java.util.List;

public class Cart {

	private List<CartItems> items;
	private int total;

	public List<CartItems> getItems() {
		return items;
	}

	public void setItems(List<CartItems> items) {
		this.items = items;
	}

	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	public Cart(List<CartItems> items, int total) {
		super();
		this.items = items;
		this.total = total;
	}

	public Cart() {

	}

}
