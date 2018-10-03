$(document).ready(function(){
    if(getSelectedRestaurant() > 0){
       $("#restaurant-dropdown").val(getSelectedRestaurant());
    }
    setSelectedRestaurant($("#restaurant-dropdown option:selected").val());
    set_restaurant_menu();
});

$("#restaurant-dropdown").change(function(){
    location.href = "/restaurant/"
    loadBranchesOfRestaurant();
    setSelectedRestaurant($("#restaurant-dropdown option:selected").val());
    set_restaurant_menu();
});

function setSelectedRestaurant(selected_rest){
    sessionStorage.setItem("selected_rest", selected_rest);
};

function getSelectedRestaurant(){
    return sessionStorage.getItem("selected_rest");
};


function loadBranchesOfRestaurant(){
    var selectedRestaurantRecId = $("#restaurant-dropdown option:selected").val();
    var url = "/restaurant/"+parseInt(selectedRestaurantRecId)+"/branches/";
    $("#createBranch").prop("href", "/restaurant/"+selectedRestaurantRecId+"/branch/create/");
    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        error: function (xhr, ajaxOptions, thrownError) {
        },
        success: function(response) {
            var branch_len = Object.keys(response).length;
            build_branch_cards(response)
        },
        progress: function(e) {
            if(e.lengthComputable) {
                var pct = (e.loaded / e.total) * 100;
                $('#prog').progressbar('option', 'value', pct).children('.ui-progressbar-value').html(pct.toPrecision(3) + '%').css('display', 'block');
            } else {
                console.warn('Content Length not reported!');
            }
        }
    });
};

function build_branch_cards(branches){
    var branch_len = Object.keys(branches).length;
    var branch_card = $("#branch-single-card");
    branch_card.empty();
    $.each(branches, function( index, value ) {
        var url = "/restaurant/branch/" + value['record_id'] + "/details/"
        var style = 'style="background-image: url(' + value['image_url'] + ');"'
        var img_div = '<div class = "branch-card"><div class="branch-image" ' + style + ' ></div>'
        var text_div = '<div class="branch-card-container"><p>' + value['name'] + '</p></div></div>'
        var anchor_tag = '<a href="' + url + '">' + img_div + text_div +'</a>'
        var card = $(anchor_tag);
        branch_card.append(card);
    });
};

function set_restaurant_menu(){
    var selectedRestaurantRecId = $("#restaurant-dropdown option:selected").val();
    if(selectedRestaurantRecId){
        $("#restaurant_detail_menu").prop("href", "/restaurant/"+selectedRestaurantRecId+"/details/");
        $("#restaurant_items_menu").prop("href", "/restaurant/"+selectedRestaurantRecId+"/category/list");
    }
};