
$(function () {
    $("#btn_submit_add").click(function () {

        $("#waiting-overlay").show();
        if (validaion_booking() == true) {
            var url = $("#hdn_url").val() + "Admin/QuPaymentData.asmx/Create_Booking";
            var obj = {};
            obj.firstname = $("#txt_name").val();
            obj.lastname = $("#txt_lastname").val();
            obj.address = $("#txt_Address").val();
            obj.mobile = $("#txt_Mobile").val();
            obj.email = $("#txt_Email").val();
            obj.packegname = $("#ddl_packegname").val();
            obj.nationality = $("#ddl_Nationality option:selected").text();
            obj.currency = $("#ddl_currency").val();
            obj.amount = $("#txt_amount").val();
            obj.description = $("#Description").val();
            $.ajax({
                url: url,
                data: JSON.stringify(obj),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                type: "POST",
                success: function (data) {
                    $("#waiting-overlay").hide();
                    if (data.d != "") {
                        $("#spn_error").text("Booking ID (" + data.d + ") mail to the client ");
                        $("#spn_error").attr("style", "color:green;font-weight:bold");
                        valueReset();

                    } else {
                        $("#spn_error").text("There is some error to generate the booking");
                    }

                },
                error: function (reponse) {
                    $("#waiting-overlay").hide();
                    $("#spn_error").text("There is some error to generate the booking");
                }
            });
        } else { $("#waiting-overlay").hide(); }


    });
});


function validaion_booking() {
 if ($("#txt_name").val().trim() == "") {
        $("#waiting-overlay").hide();
        $("#spn_error").text("Please Enter First Name");
        return false;
    }
    else if ($("#txt_Address").val().trim() == "") {
        $("#waiting-overlay").hide();
        $("#spn_error").text("Please Fill Address");
        return false;
    }
    else if ($("#txt_Mobile").val().trim() == "") {
        $("#waiting-overlay").hide();
        $("#spn_error").text("Please Fill Mobile No");
        return false;
    }
   else if ($("#txt_Email").val().trim() == "") {
        $("#waiting-overlay").hide();
        $("#spn_error").text("Please Fill Email Id");
        return false;
    }
    else if (!validateEmail($("#txt_Email").val())) {
        $("#waiting-overlay").hide();
        $("#spn_error").text("Please Fill Valid Email Id");
        return false;
    }
    else if ($("#ddl_packegname").val().trim()=="") {
        $("#waiting-overlay").hide();
        $("#spn_error").text("Please Fill Service Name");
        return false;
    }
    else if ($("#ddl_Nationality").val().trim() == "0") {
        $("#waiting-overlay").hide();
        $("#spn_error").text("Please Select Nationality");
        return false;
    }
    else if ($("#ddl_currency").val().trim() == "0") {
        $("#waiting-overlay").hide();
        $("#spn_error").text("Please Select Currency");
        return false;
    }
    else if ($("#txt_amount").val().trim() == "") {
        $("#waiting-overlay").hide();
        $("#spn_error").text("Please Fill Amount");
        return false;
    } else { return true; }


    



}


function AllowAlphabet(e) {
    isIE = document.all ? 1 : 0
    keyEntry = !isIE ? e.which : event.keyCode;
    if (((keyEntry >= '65') && (keyEntry <= '90')) || ((keyEntry >= '97') && (keyEntry <= '122')) || (keyEntry == '8') || (keyEntry == '0') || (keyEntry == '127') || (keyEntry == '32'))
        return true;
    else {
        return false;
    }
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

    return true;
}
function validateEmail(email) {
    var re = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return re.test(email);
}

function log_out() {


    var url =  $("#hdn_url").val() + "Admin/QuPaymentData.asmx/log_out";
    var obj = {};

    $.ajax({
        url: url,
        data: '',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "POST",
        success: function (data) {
            window.location =  $("#hdn_url").val() + "Admin/login.aspx"
        },
        error: function (reponse) {

        }
    });


}

function valueReset() {
    $("#txt_name").val('');
    $("#txt_lastname").val('');
    $("#txt_Address").val('');
    $("#txt_Mobile").val('');
    $("#txt_Email").val('');
    $("#ddl_packegname").val('');
    $("#ddl_Nationality option:selected").text('');
    $("#ddl_currency").val('');
    $("#txt_amount").val('');

}