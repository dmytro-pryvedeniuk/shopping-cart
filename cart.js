function onload() {
    for (var i = 0; i < 20; i++) {
        $(`<div class="col col-xs-12 col-md-6 col-lg-4"> 
                <div> 
                    <img src="http://lorempixel.com/250/250/"> 
                </div> 
                <h2>Product Name</h2> 
                <p>Product Name</p> 
                <p>$10.99</p> 
            </div>`
        ).appendTo($("#products"));
    }
}

$(document).ready(onload);