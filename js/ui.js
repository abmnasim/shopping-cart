class UI {
    constructor(){}

    addToCart(title, price){
        if(document.querySelector(".empty")){
            document.querySelector(".empty").remove();
        }
        
        let cartRow = document.createElement('tr');
        cartRow.classList.add('cartRow');
        let cartProducts = document.querySelectorAll('#cart-products')[0];
        let cartProductNames = cartProducts.querySelectorAll('#cart-product-title');
        let cartProductQuantities = cartProducts.querySelectorAll('#cart-product-quantity');

        for (let index = 0; index < cartProductNames.length; index++) {
            if(cartProductNames[index].innerText === title){
                cartProductQuantities[index].value =  parseInt(cartProductQuantities[index].value) + 1;
                this.notice("Product already in the cart. Quantity increases successfully!", "error");
                return;
            }
        }
    
        var cartContent = `
            <td id="cart-product-title">${title}</td>
            <td id="cart-product-price">${price}</td>
            <td><input type="number" id="cart-product-quantity" value="1"></td>
            <td><button class="btn btn-sm btn-danger" id="cart-product-remove">Remove</button></td>
        `;
        cartRow.innerHTML = cartContent;
        cartProducts.append(cartRow);
        this.notice("Product added successfully!", "success");
        cartRow.querySelectorAll('#cart-product-quantity')[0].addEventListener('change', (e) => {this.quantityChange(e)});
        cartRow.querySelectorAll('#cart-product-remove')[0].addEventListener('click', (e) => {this.removeCartProduct(e)});
        
    }

    updateTotal(){
        let cart = document.querySelectorAll("#cart-products")[0];
        let cartRows = cart.querySelectorAll(".cartRow");
    
        var total = 0;
        for (let index = 0; index < cartRows.length; index++) {
            let cartRow = cartRows[index];
            let priceElement = cartRow.querySelectorAll("#cart-product-price")[0];
            let quantityElement = cartRow.querySelectorAll("#cart-product-quantity")[0];
            let price = parseFloat(priceElement.innerText.replace('$',' '));
            let quantity = parseInt(quantityElement.value);
            total = total + (price * quantity);
        }
        total = Math.round(total * 100) / 100;
        document.querySelector("#total-price").innerText = '$' + total;
        if(cartRows.length == 0){
            this.emptyCart();
        }
    }

    quantityChange(e){
        let quantity = e.target;
        if(isNaN(quantity.value) || quantity.value <= 0){
            quantity.value = 1;
        }
        this.updateTotal();
        this.notice("Cart successfully updated!", "success");
    }

    removeCartProduct(e) {
        let removeItem = e.target;
        removeItem.parentElement.parentElement.remove();
        this.updateTotal();
        this.notice("Product removed successfully!", "success");
    }

    notice(msg, status){
        this.clearAlert();
        let div = document.createElement('div');
        div.className = `alert ${status}`;
        div.appendChild(document.createTextNode(msg));

        let noticeLoc = document.querySelector("#notice");
        noticeLoc.append(div);

        setTimeout(() => {
            this.clearAlert();
        }, 3000);
    }

    clearAlert(){
        let currentAlert = document.querySelector('.alert');
        if(currentAlert){
            currentAlert.remove();
        }
    }

    emptyCart(){
        let cartProducts = document.getElementsByClassName('cart-products')[0];
        let cartRow = document.createElement('tr');
        cartRow.classList.add("empty");
        let cartContent = `<td colspan="4" class="text-center">There is no item in cart yet.</td>`;
        cartRow.innerHTML = cartContent;
        cartProducts.append(cartRow);
    }
}