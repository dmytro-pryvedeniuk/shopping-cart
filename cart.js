const products = [{
    name: "Rock&roll",
    image: "item1.jpg",
    price: "12.50"
}, {
    name: "Pop",
    image: "item1.jpg",
    price: "9.50"
}, {
    name: "Hard rock",
    image: "item1.jpg",
    price: "78.2"
}]

const shippingAddress = {}

let orderItems = []

function onload() {
    for (var i in products) {
        $(`<div class="col col-xs-12 col-md-6 col-lg-4"> 
                <div> 
                    <img src="Products/${products[i].image}"> 
                </div> 
                <button data-id="${i}" class="btn btn-default addToCart">Add to Cart</button>
                <h2 class="name">${products[i].name}</h2> 
                <p class="price">$${products[i].price}</p>
            </div>`).appendTo($("#products"));
    }

    $(".addToCart").click(addToCart);
    $("#submitOrder").click(submitOrder);
    $("#shipping-address-show").click(showShippingAddress);
    $("#shipping-address-apply").click(applyShippingAddress);
}

function showShippingAddress()
{
    $("#myModal").modal("show");
}

function applyShippingAddress()
{
    $("#myModal").modal("hide");
    
    $("#shipping-address-show").removeClass("btn-warning").addClass("btn-success");
    $("#shipping-address-status").removeClass("glyphicon-exclamation-sign")
        .addClass("glyphicon-ok");
    
    shippingAddress.fullName = $("#fullname").val();
    shippingAddress.zip = $("#zip").val();
    shippingAddress.address1 = $("#address1").val();
    shippingAddress.address2 = $("#address2").val();
    shippingAddress.city = $("#city").val();
    shippingAddress.state = $("#state").val();
    shippingAddress.phone = $("#phone").val();
}

function addToCart(e) {
    const id = $(e.target).attr("data-id");

    let item = orderItems.find(p=>p.id == id);
    if (!item) {
        item = {
            id: id,
            item: products[id],
            num: 0
        };
        orderItems.push(item);
    }
    item.num++;
    refreshCart();
}

function removeFromCart(e) {
    const id = $(e.target).attr("data-id");
    let item = orderItems.find(p=>p.id == id);
    if (item)
        item.num--;
    orderItems = orderItems.filter(x=>x.num > 0);
    refreshCart();
}

function refreshCart() {
    const cart = $("#cart");
    cart.empty();

    for (let i in orderItems) {
        let item = orderItems[i].item;
        let num = orderItems[i].num;
        let id = orderItems[i].id;
        cart.append(`<p>
            <button data-id="${id}" class="btn btn-danger btn-sm removeFromCart glyphicon glyphicon-minus"/>
            <button data-id="${id}" class="btn btn-primary btn-sm addFromCart glyphicon glyphicon-plus"/>
            ${num} x ${item.name} $${item.price}
            </p>`);
    }
    $(".addFromCart").click(addToCart);
    $(".removeFromCart").click(removeFromCart);

    const totalReport = $("#totalreport");
    totalReport.empty();
    if (orderItems.length > 0) {
        const subTotal = orderItems.map(x=>parseFloat(x.item.price) * x.num).reduce((p,c)=>p + c, 0);
        const tax = subTotal * 0.1;
        const total = subTotal + tax;
        totalReport.append(`<p>Subtotal:$${subTotal.toFixed(2)}</p>
            <p>Tax:$${tax.toFixed(2)}</p>
            <p>Total:<b>$${total.toFixed(2)}</b></p>`);
    }
    const itemsQty = orderItems.map(x=>x.num).reduce((p,c)=>p + c, 0);
    $("#itemsqty").text(itemsQty);
}


function submitOrder(e) {
    alert("The order has been sent.");
}

$(document).ready(onload);