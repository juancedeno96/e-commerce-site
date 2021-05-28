const initialState = {
    cart: [
        {
            total: 0,
            user_id:0,
            product_id: 0,
            quantity: 0
        }
    ]
    
    };
    
    const ADD_TO_CART = 'ADD_TO_CART'
    
    export function addToCart(cartItem) {
        return{
            type: ADD_TO_CART,
            payload: cartItem
        }
    }
    
    export default function cartReducer(state=initialState, action) {
        const {type, payload} = action;
    
        switch(type){
            case ADD_TO_CART:
                const {total, user_id, product_id, quantity } = payload
            return {...state, cart: [{total, user_id, product_id, quantity}]};
            default:
                return state
        }
    }