(function() {

    var products = [{
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
    }];

    var state = {
        orderItems: []
    };

    var app = {
        initialize: function() {
            this.setupListeners();
        },

        setupListeners: function() {
            $(document).ready(app.onload);
            $("#shipping-address-show").click(app.showShipTo);
            $("#shipping-address-apply").click(app.applyShipTo);
            $("#send").click(app.send);
        },

        send: function(e) {
            let text = $("#shipToForm").serialize();
            alert("The order has been sent: " + text);
            $('#cartBody')
                .empty()
                .html('<p>The order has been sent. Thank you.</p>');
            $(".addToCart").attr('disabled', '');
        },

        addToCart: function(e) {
            const id = $(e.target).attr("data-id");

            let item = state.orderItems.find(p=>p.id == id);
            if (!item) {
                item = {
                    id: id,
                    item: products[id],
                    num: 0
                };
                state.orderItems.push(item);
            }
            item.num++;
            app.refreshCart();
        },

        removeFromCart: function(e) {
            const id = $(e.target).attr("data-id");
            let item = state.orderItems.find(p=>p.id == id);
            if (item)
                item.num--;
            state.orderItems = state.orderItems.filter(x=>x.num > 0);
            app.refreshCart();
        },

        refreshCart: function() {
            const cart = $("#cart");
            cart.empty();

            for (let i in state.orderItems) {
                let item = state.orderItems[i].item
                  , num = state.orderItems[i].num
                  , id = state.orderItems[i].id;
                cart.append(`<p>
                    <button data-id="${id}" class="btn btn-danger btn-sm removeFromCart glyphicon glyphicon-minus"/>
                    <button data-id="${id}" class="btn btn-primary btn-sm addFromCart glyphicon glyphicon-plus"/>
                    ${num} x ${item.name} $${item.price}
                </p>`);
            }
            $(".addFromCart").click(app.addToCart);
            $(".removeFromCart").click(app.removeFromCart);

            const totalReport = $("#totalreport");
            totalReport.empty();
            if (state.orderItems.length > 0) {
                const subTotal = state.orderItems.map(x=>parseFloat(x.item.price) * x.num).reduce((p,c)=>p + c, 0);
                const tax = subTotal * 0.1;
                const total = subTotal + tax;
                totalReport.append(`<p>Subtotal:$${subTotal.toFixed(2)}</p>
                    <p>Tax:$${tax.toFixed(2)}</p>
                    <p>Total:<b>$${total.toFixed(2)}</b></p>`);
            }
        },

        onload: function() {
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
            $(".addToCart").click(app.addToCart);
        },

        showShipTo: function() {
            $("#myModal").modal("show");
        },

        validate: function() {
            let formValid = true;

            $('input').each((i,el)=>{
                let formGroup = $(el).parents('.form-group');
                let glyphicon = formGroup.find('.form-control-feedback');
                if (el.checkValidity()) {
                    formGroup.addClass("has-success").removeClass("has-error");
                    glyphicon.addClass("glyphicon-ok").removeClass("glyphicon-remove");
                } else {
                    formGroup.addClass('has-error').removeClass('has-success');
                    glyphicon.addClass('glyphicon-remove').removeClass('glyphicon-ok');
                    formValid = false;
                }
            }
            );

            if (formValid) {
                $("#myModal").modal("hide");
            }

            return formValid;
        },

        applyShipTo: function() {
            let validShipTo = app.validate();

            if (!validShipTo) {
                $("#shipping-address-show").removeClass("btn-success").addClass("btn-warning");
                $("#shipping-address-icon").removeClass("glyphicon-ok").addClass("glyphicon-exclamation-sign");
                $('#send').attr("disabled", true);
                return;
            }
            $('#send').removeAttr('disabled');
            $("#shipping-address-show").removeClass("btn-warning").addClass("btn-success");
            $("#shipping-address-icon").removeClass("glyphicon-exclamation-sign").addClass("glyphicon-ok");
        }
    }

    app.initialize();
}());
