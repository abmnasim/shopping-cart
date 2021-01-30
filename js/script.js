if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}else{
    ready();
}
let ui = new UI();
function ready(){
    let cartProducts = document.getElementsByClassName('cart-products')[0];
    let cartProductNames = cartProducts.getElementsByClassName('cart-product-title');
    if(cartProductNames.length == 0){
        ui.emptyCart();
    }
    

    const addToCartButtons = document.querySelectorAll("#addProductButton");
    for (let index = 0; index < addToCartButtons.length; index++) {
        let button = addToCartButtons[index];
        button.addEventListener('click', addToCart);
    }
}

function addToCart(e){
    let button = e.target;
    let product = button.parentElement;
    let productTitle = product.querySelectorAll("#product-title")[0].innerText;
    let productPrice = product.querySelectorAll("#product-price")[0].innerText;
    ui.addToCart(productTitle, productPrice);
    ui.updateTotal();
}






