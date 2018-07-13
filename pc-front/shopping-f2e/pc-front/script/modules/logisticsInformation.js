define(['jquery', ], function($) {

    $('body').on('click', '.logisticsInfo', function() {
        var afterSaleId = $(this).attr("data-afterSaleId");
        var orderId = $(this).attr("data-orderId");
        $("#deliveryAfterSaleId").text(afterSaleId);
        $("#deliveryOrderId").text(orderId);
        $('#logisticsInfo').show();
    });

    $("body").on('click', '.logistics', function() {
        $("#deliveryCompanyName").val(null);
        $("#deliveryNumber").val(null);
        $('#logisticsInfo').hide();
    });

});
