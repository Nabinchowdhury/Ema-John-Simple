import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import Cart from '../cart/Cart';
import ReviewOrders from '../ReviewOrders/ReviewOrders';

const Order = () => {
    const { initialCart } = useLoaderData()
    // console.log(products)
    const [cart, setCart] = useState(initialCart);

    const deleteItem = id => {
        const rest = cart.filter(product => product.id !== id)
        setCart(rest)
        removeFromDb(id)
    }
    const clearCart = () => {
        setCart([])
        deleteShoppingCart()
    }

    return (
        <div className='shop-container'>
            <div className='order-container'>
                {
                    cart.map(product => <ReviewOrders key={product.id} product={product} deleteItem={deleteItem}></ReviewOrders>)
                }
                {
                    cart.length === 0 && <h2>No Order yet. <Link to="/shop">Shop now</Link></h2>
                }
            </div>

            <div className='cart-container'>
                <Cart cart={cart} clearCart={clearCart}></Cart>
            </div>


        </div>
    );
};

export default Order;