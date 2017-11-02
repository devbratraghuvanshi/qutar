$(document).ready(function () {


    $("#fromDate").datepicker({
        dateFormat: 'dd/mm/yyyy',
        changeMonth: true,
        changeYear: true,
        maxDate: '0',
        yearRange: "1:c+10" // 1AD to 2013AD + 10
    });

    $("#toDate").datepicker({
        dateFormat: 'dd/mm/yyyy',
        changeMonth: true,
        changeYear: true,
        maxDate: '0',
        yearRange: "1:c+10" // 1AD to 2013AD + 10
    });

    $("#applyDateFilter").click(function () {
        $("#btn_export").hide();
        $("#waiting-overlay").show();
        var url = $("#hdn_usertype").val() != "1" ?
         $("#hdn_url").val() + "Admin/QuPaymentData.asmx/GET_Paymaent_Data" :
         $("#hdn_url").val() + "Admin/QuPaymentData.asmx/GET_Paymaent_Data_Admin";

        var obj = {};
        obj.userid = $("#hdn_userid").val();

        var today = new Date();
        var bak6Month = new Date(new Date().setMonth(today.getMonth() - 6))
        obj.fromDate = $("#fromDate").val() ? $("#fromDate").val() : $.datepicker.formatDate('dd/MM/yyyy', today);
        obj.toDate = $("#toDate").val() ? $("#toDate").val() : $.datepicker.formatDate('dd/MM/yyyy', bak6Month);

        $.ajax({
            url: url,
            data: JSON.stringify(obj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            type: "POST",
            success: function (data) {

                if (data.d) {
                    bind_grid(JSON.parse(data.d));
                    $("#btn_export").show();
                    $("#waiting-overlay").hide();
                } else {
                    alert("No data found");
                    window.location.href = window.location.href;
                }

            },
            error: function (reponse) {

            }
        });
    });

    $("#applyDateFilter").trigger("click");


    $("#btn_export").click(function () {


        //$('#jqxgrid').jqxGrid('setcolumnproperty','Client_ID',  'text', "New header text");
        //$('#jqxgrid').jqxGrid('setcolumnproperty','Client_nAME',  'text', "New header text");
        //$('#jqxgrid').jqxGrid('setcolumnproperty','CLIENT_Address',  'text', "New header text");
        //$('#jqxgrid').jqxGrid('setcolumnproperty','Client_MobileNo',  'text', "New header text");
        //$('#jqxgrid').jqxGrid('setcolumnproperty','Client_Email',  'text', "New header text");
        //$('#jqxgrid').jqxGrid('setcolumnproperty','Clinet_Nationallty',  'text', "New header text");
        //$('#jqxgrid').jqxGrid('setcolumnproperty','Client_BookingRef',  'text', "New header text");
        //$('#jqxgrid').jqxGrid('setcolumnproperty','Client_Packegname',  'text', "New header text");
        //$('#jqxgrid').jqxGrid('setcolumnproperty','Clinet_Amount',  'text', "New header text");
        //$('#jqxgrid').jqxGrid('setcolumnproperty','Clinet_Currency',  'text', "New header text");
        //$('#jqxgrid').jqxGrid('setcolumnproperty','Payment_Status',  'text', "New header text");
        //$('#jqxgrid').jqxGrid('setcolumnproperty','BankTrID',  'text', "New header text");
        //$('#jqxgrid').jqxGrid('setcolumnproperty','TRID',  'text', "New header text");
        //$('#jqxgrid').jqxGrid('setcolumnproperty','modifieddate','text', "New header text");

        $("#jqxgrid").jqxGrid('exportdata', 'xls', 'jqxGrid');
        //  $("#jqxgrid").jqxGrid('exportdata', 'xls', 'jqxGrid', false);

    });


});



function bind_grid(_data) {

    var data = _data;
    var source =
            {
                localdata: data,
                datafields:
                [
                    { name: 'Client_ID', type: 'string' },
                    { name: 'Client_nAME', type: 'string' },
                    { name: 'CLIENT_Address', type: 'string' },
                    { name: 'Client_MobileNo', type: 'string' },
                    { name: 'Client_Email', type: 'string' },
                    { name: 'Clinet_Nationallty', type: 'string' },
                    { name: 'Client_BookingRef', type: 'string' },
                    { name: 'Client_Packegname', type: 'string' },
                    { name: 'Clinet_Amount', type: 'string' },
                    { name: 'Clinet_Currency', type: 'string' },
                    { name: 'Payment_Status', type: 'string' },
                    { name: 'BankTrID', type: 'string' },
                    { name: 'TRID', type: 'string' },
                    { name: 'IsBlocked', type: 'boolean' },
                    { name: 'FailedAttempt', type: 'int' },
                    { name: 'FailedAttemptLimit', type: 'int' },
                    { name: 'modifieddate', type: 'string' },
                    { name: 'CreatedBy', type: 'string' },
                    { name: 'CreatedDate', type: 'string' },

                ],
                datatype: "json",
                updaterow: function (rowid, rowdata, commit) {
                    console.log(rowdata);
                    updateadata(rowdata);
                    commit(true);
                },


            };
    // initialize the input fields.
    $("#clientId").height(20);
    $("#clientName").width(200);
    $("#address").width(200);
    $("#mobile").width(200);
    $("#email").width(200);
    $("#bookingRef").width(200);
    $("#currency").width(200);
    $("#nationallty").width(200);
    $("#BookingDate").width(200);
    $("#packageName").width(200);
    $("#amount").width(200);

    $("#clientId").height(20);
    $("#clientName").height(20);
    $("#address").height(20);
    $("#mobile").height(20);
    $("#BookingDate").height(20);
    $("#packageName").height(20);
    $("#amount").height(20);
    $("#email").height(20);
    $("#bookingRef").height(20);
    $("#currency").height(20);
    $("#nationallty").height(20);

    var dataAdapter = new $.jqx.dataAdapter(source);

    var cellsrenderer = function (row, column, value) {
        var testVal = value.split("(")[0];
        if (value.split("(")[1].split(")")[0] != 0) {
            return '<a style="cursor:pointer" onClick=buttonclickBooking("' + testVal.trim() + '")>' + value + '</a>';
        } else {

            return '<a style="cursor:pointer" >' + value + '</a>';
        }
    }
    $("#jqxgrid").jqxGrid(
            {
                width: '100%',
                height: '100%',
                source: dataAdapter,
                selectionmode: 'multiplerowsextended',
                sortable: true,
                pageable: true,
                columnsresize: true,
                columnsreorder: true,
                showfilterrow: true,
                filterable: true,
                pagesize: 100,
                editmode: 'selectedrow',
                selectionmode: 'singlerow',
                columns: [
                  { text: 'Client Name', datafield: 'Client_nAME' },
                  { text: 'Address', datafield: 'CLIENT_Address' },
                  { text: 'Mobile No', datafield: 'Client_MobileNo' },
                  { text: 'Email', datafield: 'Client_Email' },
                  { text: 'Package Name', datafield: 'Client_Packegname' },
                  { text: 'Booking Ref', datafield: 'Client_BookingRef', cellsrenderer: cellsrenderer },
                  { text: 'Amount', datafield: 'Clinet_Amount' },
                  { text: 'Currency', datafield: 'Clinet_Currency' },
                  { text: 'Payment Status', datafield: 'Payment_Status' },
                  { text: 'Nationallty', datafield: 'Clinet_Nationallty' },
                  { text: 'Transaction Id', datafield: 'TRID', editable: false },
                  { text: 'Payment Token', datafield: 'BankTrID', editable: false },
                  { text: 'Is Blocked', datafield: 'IsBlocked', columntype: 'checkbox', width: 100, editable: true, resizable: false },
                  { text: 'Pay Attempt', datafield: 'FailedAttempt', columntype: 'int', width: 100 },
                  { text: 'Failed Limit', datafield: 'FailedAttemptLimit', columntype: 'int', width: 100, editable: true, resizable: false },
                  { text: 'Created By', datafield: 'CreatedBy', editable: false },
                  { text: 'Created Date', datafield: 'CreatedDate', editable: false },
                  { text: 'Booking Date', datafield: 'modifieddate', editable: false },
                  {
                      text: 'Edit', datafield: 'Edit', columntype: 'button',
                      cellsrenderer: function (row) {
                          editrow = row;
                          var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', editrow);
                          if (dataRecord.Payment_Status != "Transaction Successful") {
                              return "Edit";
                          } else {
                              return "<div style='text-align:center;left: 18px;top: 4px;'>Fix</div>";
                          }

                      }
                   , buttonclick: function (row) {
                       // open the popup window when the user clicks a button.
                       editrow = row;
                       var offset = $("#jqxgrid").offset();
                       $("#popupWindow").jqxWindow({ position: { x: parseInt(offset.left) + 60, y: parseInt(offset.top) + 60 } });
                       // get the clicked row's data and initialize the input fields.
                       var dataRecord = $("#jqxgrid").jqxGrid('getrowdata', editrow);
                       $("#clientId").val(dataRecord.Client_ID);
                       $("#clientName").val(dataRecord.Client_nAME);
                       $("#address").val(dataRecord.CLIENT_Address);
                       $("#mobile").val(dataRecord.Client_MobileNo);
                       $("#email").val(dataRecord.Client_Email);
                       $("#packageName").val(dataRecord.Client_Packegname);
                       $("#bookingRef").val(dataRecord.Client_BookingRef);
                       $("#amount").val(dataRecord.Clinet_Amount);
                       $("#currency").val(dataRecord.Clinet_Currency);
                       $("#nationallty").val(dataRecord.Clinet_Nationallty);
                       $("#FailedAttemptLimit").val(dataRecord.FailedAttemptLimit);

                       if ( dataRecord.IsBlocked) {
                           $("#IsBlocked").attr("checked","checked")
                       }else {
                           $("#IsBlocked").removeAttr("checked");
                       }
                     
                       $("#popupWindow").jqxWindow('open');
                   }
                  }
                ]

            });
    $("#jqxgrid").on('cellbeginedit', function (event) {
        var args = event.args;
        $("#cellbegineditevent").text("Event Type: cellbeginedit, Column: " + args.datafield + ", Row: " + (1 + args.rowindex) + ", Value: " + args.value);
    });
    $("#jqxgrid").on('cellendedit', function (event) {
        var args = event.args;
        $("#cellendeditevent").text("Event Type: cellendedit, Column: " + args.datafield + ", Row: " + (1 + args.rowindex) + ", Value: " + args.value);
    });
    // initialize the popup window and buttons.
    $("#popupWindow").jqxWindow({
        width: 350, height: 400, resizable: true, isModal: true, autoOpen: false, cancelButton: $("#Cancel"), modalOpacity: 0.01
        , position: "center"
    });
    $("#popupWindow").on('open', function () {
        $("#clientName").jqxInput('selectAll');
    });

    $("#Cancel").jqxButton({ theme: theme });
    $("#Save").jqxButton({ theme: theme });
    // update the edited row when the user clicks the 'Save' button.
    $("#Save").click(function () {
        if (editrow >= 0) {

             var row = {
                Client_ID: $("#clientId").val(),
                Client_nAME: $("#clientName").val(),
                Client_BookingRef: $("#bookingRef").val(),
                CLIENT_Address: $("#address").val(),
                Client_MobileNo: $("#mobile").val(),
                Client_Email: $("#email").val(),
                Client_Packegname: $("#packageName").val(),
                Clinet_Amount: $("#amount").val(),// parseInt($("#amount").jqxNumberInput('decimal')), 
                Clinet_Nationallty: $("#nationallty").val(),
                Clinet_Currency: $("#currency").val(),
                FailedAttemptLimit: $("#FailedAttemptLimit").val(),
                IsBlocked: $("#IsBlocked").is(":checked")
            };
            var rowID = $('#jqxgrid').jqxGrid('getrowid', editrow);
            $('#jqxgrid').jqxGrid('updaterow', rowID, row);
            $("#popupWindow").jqxWindow('hide');
        }
    });
    $("#btn_export").jqxButton();
}


function log_out() {
    var url = $("#hdn_url").val() + "Admin/QuPaymentData.asmx/log_out";
    var obj = {};
    $.ajax({
        url: url,
        data: '',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "POST",
        success: function (data) {
            window.location = $("#hdn_url").val() + "Admin/login.aspx"
        },
        error: function (reponse) {

        }
    });
}

function updateadata(strData) {
    var data = {};
    data.Client_ID = strData.Client_ID;
    data.Client_BookingRef = strData.Client_BookingRef;
    data.Client_nAME = strData.Client_nAME;
    data.CLIENT_Address = strData.CLIENT_Address;
    data.Client_MobileNo = strData.Client_MobileNo;
    data.Client_Email = strData.Client_Email;
    data.Client_Packegname = strData.Client_Packegname;
    data.Clinet_Amount = strData.Clinet_Amount;
    data.Clinet_Nationallty = strData.Clinet_Nationallty;
    data.Clinet_Currency = strData.Clinet_Currency;
    data.FailedAttemptLimit = strData.FailedAttemptLimit;
    data.IsBlocked = strData.IsBlocked;


    var url = $("#hdn_url").val() + "Admin/QuPaymentData.asmx/updatedata";
    var obj = {};
    $.ajax({
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "POST",
        success: function (data) {
            alert("Update Successfully")
        },
        error: function (reponse) {

        }
    });
    return true;
}

function buttonclickBooking(value) {

    var url = $("#hdn_url").val() + "Admin/QuPaymentData.asmx/getDataForBooking";
    var obj = {};
    obj.Booking = value;
    $.ajax({
        url: url,
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "POST",
        success: function (data) {


            $("#pTable").html(data.d);
            $("#dialog").dialog();
        },
        error: function (reponse) {

        }
    });
    return true;

}

$("#dialog").dialog({
    autoOpen: false,
    show: {
        effect: "blind",
        duration: 1000
    },
    hide: {
        effect: "explode",
        duration: 1000
    }
});

$("#opener").on("click", function () {
    $("#dialog").dialog("open");
});