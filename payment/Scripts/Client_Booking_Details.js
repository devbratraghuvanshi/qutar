


$(document).ready(function () {

    var Email = qs("Email");
    var BookigRef = qs("BookigRef");
    //alert(Email);
    //alert(BookigRef);
    if (Email != undefined && BookigRef != undefined) {
        $("#txt_email").val(Email);
      //  alert(BookigRef); alert(Email);
        $("#txt_bookingref").val(BookigRef);
        $("#hdn_booking_id").val(BookigRef);
        $("#hdn_emailid").val(Email);
        $("#waiting-overlay").show();
        var url = $("#hdn_url").val() + "Client/Client_Service.asmx/Booking_details";
        var obj = {};
        obj.mail_id = Email;
        obj.booking_ref = BookigRef;
        $.ajax({
            url: url,
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            type: "POST",
            success: function (data) {
                if (data.d != "[]") {
                    $("#hdn_booking_id").val(BookigRef);
                    $("#hdn_emailid").val(Email);
                    bind_grid(data.d)
                    $("#waiting-overlay").hide();
                } else {
                    $("#txt_error").text("Booking Not Found");
                    $("#waiting-overlay").hide();
                }
            },
            error: function (reponse) {

            }
        });
    }
    else {


//        if ($("#txt_email").val().trim() == "") {
//            $("#txt_error").text("Please Fill Email Id");
//        }
//        else if ($("#txt_bookingref").val().trim() == "") {
//            $("#txt_error").text("Please Fill Booking Ref");
//        }


    }
    $("#accordion").accordion({

    });

    $("#TermAndcondithion").click(function () {
        if($("#TermAndcondithion").is(":checked")) {
            $("#btn_make_payment").removeAttr("disabled");
        } else {
            $("#btn_make_payment").attr("disabled", "disabled");
        }
    });

    $($("#accordion > h3")[1]).addClass("ui-state-disabled");
    $("#btn_login").click(function () {
        if ($("#txt_email").val().trim() != "" && $("#txt_bookingref").val().trim() != "") {
            $("#waiting-overlay").show();
            var url = $("#hdn_url").val() + "Client/Client_Service.asmx/Booking_details";
            var obj = {};
            obj.mail_id = $("#txt_email").val();
            obj.booking_ref = $("#txt_bookingref").val();
            $.ajax({
                url: url,
                data: JSON.stringify(obj),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                type: "POST",
                success: function (data) {
                    if (data.d != "[]") {
                        $("#hdn_booking_id").val($("#txt_bookingref").val());
                        $("#hdn_emailid").val($("#txt_email").val());
                        $("#TermAndcondithion").removeAttr("checked");
                        bind_grid(data.d)
                        $("#waiting-overlay").hide();
                    } else { $("#txt_error").text("Booking Not Found"); $("#waiting-overlay").hide(); }
                },
                error: function (reponse) {

                }
            });
        } else {


            if ($("#txt_email").val().trim() == "") {
                $("#txt_error").text("Please Fill Email Id");
            }
            else if ($("#txt_bookingref").val().trim() == "") {
                $("#txt_error").text("Please Fill Booking Ref");
            }


        }
    });

    $("#btn_other_booking").click(function () {

        $("#accordion").accordion("option", "active", 0);
        $($("#accordion > h3")[1]).addClass("ui-state-disabled");
        $($("#accordion > h3")[0]).removeClass("ui-state-disabled");
    });

    $("#btn_make_payment").click(function () {


        $("#waiting-overlay").show();
        var url = $("#hdn_url").val() + "Client/Client_Service.asmx/Booking_hit";
        var obj = {};
        obj.mail_id = $("#hdn_emailid").val();
        obj.booking_ref = $("#hdn_booking_id").val();
        obj.termAndCondition = $("#TermAndcondithion").is(":checked") ? true : false;
        $.ajax({
            url: url,
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            type: "POST",
            success: function (data) {
                window.location = data.d;

            },
            error: function (reponse) {

            }
        });






    });


});

function qs(key) {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars[key];
}
function bind_grid(_data) {
    var data = jQuery.parseJSON(_data);

    $("#accordion").accordion("option", "active", 1);
    $($("#accordion > h3")[0]).addClass("ui-state-disabled");
    $($("#accordion > h3")[1]).removeClass("ui-state-disabled");
    $("#_name").text(data[0].Client_nAME);
    $("#_name1").text(data[0].Client_nAME);
    $("#_address").text(data[0].CLIENT_Address);
    $("#_mobileno").text(data[0].Client_MobileNo);
    $("#_emailid").text(data[0].Client_Email);
    $("#_packeg_name").text(data[0].Client_Packegname);
    $("#_nationality").text(data[0].Clinet_Nationallty);
    $("#_currency").text(data[0].Clinet_Currency);
    $("#_amount").text(data[0].Clinet_Amount);
    $("#lblBookingRef").text(data[0].Client_BookingRef);
    
    if (data[0].Payment_Code == "0") {
        $("#_paymentstatus").html("<b style='color:green'>" + data[0].Payment_Status + "</b>");
        $("#btn_make_payment").hide();

    } else {

        $("#_paymentstatus").html("<b style='color:red'>" + data[0].Payment_Status + "</b>");
        $("#btn_make_payment").show();
    }

    if (data[0].IsBlocked) {
        $("#_paymentstatus").html("<b style='color:red'> Blocked  </b>");
        $("#btn_make_payment").hide();
    }
}