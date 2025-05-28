"use client"


import { productsDummyData, userDummyData } from "@/assets/assets";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";


export const AppContext = createContext();


export const useAppContext = () => {
	return useContext(AppContext)
}


export const AppContextProvider = (props) => {
	const currency = process.env.NEXT_PUBLIC_CURRENCY
	const router = useRouter()

	const { user } = useUser()
	const { getToken } = useAuth()

	const [products, setProducts] = useState([])
	const [userData, setUserData] = useState(false)
	const [isSeller, setIsSeller] = useState(true)
	const [cartItems, setCartItems] = useState({})

	// fetch all products
	const fetchProductData = async () => {
		setProducts(productsDummyData)
	}

	// fetch user auth status, user data and cart items
	const fetchUserData = async () => {
		try {
			if (user.publicMetadata.role === "seller") {
				setIsSeller(true)
			}

			const token = await getToken()
			const { data } = await axios.get(
				"/api/user/data",
				{ headers: { Authorization: `Bearer ${token}` } }
			)

			if (data.success) {
				setUserData(data.user)
				setCartItems(data.user.cartItems)
			} else {
				toast.error(data.message)
			}
		} catch (error) {
			toast.error(error.message)
		}
	}

	// add product to cart
	const addToCart = async (itemId) => {
		let cartData = structuredClone(cartItems);
		if (cartData[itemId]) {
			cartData[itemId] += 1;
		}
		else {
			cartData[itemId] = 1;
		}
		setCartItems(cartData);
	}

	// update cart item quantity
	const updateCartQuantity = async (itemId, quantity) => {

		let cartData = structuredClone(cartItems);
		if (quantity === 0) {
			delete cartData[itemId];
		} else {
			cartData[itemId] = quantity;
		}
		setCartItems(cartData)

	}

	// get cart items count
	const getCartCount = () => {
		let totalCount = 0;
		for (const items in cartItems) {
			if (cartItems[items] > 0) {
				totalCount += cartItems[items];
			}
		}
		return totalCount;
	}

	// get cart total amount
	const getCartAmount = () => {
		let totalAmount = 0;
		for (const items in cartItems) {
			let itemInfo = products.find((product) => product._id === items);
			if (cartItems[items] > 0) {
				totalAmount += itemInfo.offerPrice * cartItems[items];
			}
		}
		return Math.floor(totalAmount * 100) / 100;
	}

	useEffect(() => {
		fetchProductData()
	}, [])

	useEffect(() => {
		if (user) {
			fetchUserData()
		}
	}, [user])

	const value = {
		user, getToken,
		currency, router,
		isSeller, setIsSeller,
		userData, fetchUserData,
		products, fetchProductData,
		cartItems, setCartItems,
		addToCart, updateCartQuantity,
		getCartCount, getCartAmount,
	}

	return (
		<AppContext.Provider value={value}>
			{props.children}
		</AppContext.Provider>
	)
}
