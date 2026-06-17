import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    cartItems : [],
    isLoading : false
}

export const addToCart = createAsyncThunk('cart/addToCart', async({ userId, productId, quantity }) => {

    const response = await axios.post('http://localhost:5000/api/shop/cart/add', 
        {userId, productId, quantity,}
    )
    
    return response.data
    }
)

export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async( userId ) => {

    const response = await axios.get(`http://localhost:5000/api/shop/cart/get/${userId}`
    )
    
    return response.data
    }
)

export const deleteCartItem = createAsyncThunk('cart/deleteCartItem', async({ userId, productId }) => {

    const response = await axios.delete(`http://localhost:5000/api/shop/cart/${userId}/${productId}`
    )
    
    return response.data
}
)
export const updateCartQuantity = createAsyncThunk('cart/updateCartQuantity', async({ userId, productId, quantity }) => {

    const response = await axios.put('http://localhost:5000/api/shop/cart/update-cart', 
        {userId, productId, quantity}
    )
    
    return response.data
}
)



const shoppingCartSlice = createSlice({
    name : 'shoppingCart',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(addToCart.pending, (state)=> {
            state.isLoading = true
        }).addCase(addToCart.fulfilled, (state,action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data
        }).addCase(addToCart.rejected, (state) => {
            state.isLoading = false
            state.cartItems = []
        })
        .addCase(fetchCartItems.pending, (state)=> {
            state.isLoading = true
        }).addCase(fetchCartItems.fulfilled, (state,action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data
        }).addCase(fetchCartItems.rejected, (state) => {
            state.isLoading = false
            state.cartItems = []
        })
        .addCase(updateCartQuantity.pending, (state)=> {
            state.isLoading = true
        }).addCase(updateCartQuantity.fulfilled, (state,action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data
        }).addCase(updateCartQuantity.rejected, (state) => {
            state.isLoading = false
            state.cartItems = []
        })
        .addCase(deleteCartItem.pending, (state)=> {
            state.isLoading = true
        }).addCase(deleteCartItem.fulfilled, (state,action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data
        }).addCase(deleteCartItem.rejected, (state) => {
            state.isLoading = false
            state.cartItems = []
        })
    }





//     extraReducers : (builder) => {
//     builder
//         // ADD TO CART
//         .addCase(addToCart.pending, (state)=> {
//             state.isLoading = true
//         })
//         .addCase(addToCart.fulfilled, (state, action) => {
//             state.isLoading = false;
//             // Extract the items array safely
//             state.cartItems = action.payload?.data?.items || [];
//         })
//         .addCase(addToCart.rejected, (state) => {
//             state.isLoading = false;
//         })

//         // FETCH CART ITEMS
//         .addCase(fetchCartItems.pending, (state)=> {
//             state.isLoading = true
//         })
//         .addCase(fetchCartItems.fulfilled, (state, action) => {
//             state.isLoading = false;
//             // Pull the items array from the response data object
//             state.cartItems = action.payload?.data?.items || [];
//         })
//         .addCase(fetchCartItems.rejected, (state) => {
//             state.isLoading = false;
//             state.cartItems = [];
//         })

//         // UPDATE QUANTITY
//         .addCase(updateCartQuantity.pending, (state)=> {
//             state.isLoading = true
//         })
//         .addCase(updateCartQuantity.fulfilled, (state, action) => {
//             state.isLoading = false;
//             // Update state with the newly populated items array sent by backend
//             state.cartItems = action.payload?.data?.items || [];
//         })
//         .addCase(updateCartQuantity.rejected, (state) => {
//             state.isLoading = false;
//         })

//         // DELETE CART ITEM
//         .addCase(deleteCartItem.pending, (state)=> {
//             state.isLoading = true
//         })
//         .addCase(deleteCartItem.fulfilled, (state, action) => {
//             state.isLoading = false;
//             // Grab the fresh items array returned after deletion
//             state.cartItems = action.payload?.data?.items || [];
//         })
//         .addCase(deleteCartItem.rejected, (state) => {
//             state.isLoading = false;
//         })
// }
})


export default shoppingCartSlice.reducer;