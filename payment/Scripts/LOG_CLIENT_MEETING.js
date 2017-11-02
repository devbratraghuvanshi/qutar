
$(function () {
    var Meeting_date;
    Meeting_date = $("option:selected", $("#ddl_days")).text() + "/" + $("option:selected", $("#ddl_month")).text() + "/" + $("option:selected", $("#ddl_year")).text();
    $("#hdn_Meeting_date").val(Meeting_date);
    $("#txt_NextMeetingDue").datepicker({ dateFormat: 'dd/mm/yy', minDate: 0, changeMonth: true, changeYear: true });
    $("#txt_autocomplete").autocomplete({
        //source: "http://wealthmaker.in/Dar_New/DARHOME/Autocomplete",
        source: "http://localhost:49555/DARHOME/Autocomplete",
        minLength: 1,
        select: function (event, ui) {
            if (ui.item) { $("#txt_autocomplete").val(ui.item.value); }
        }
    });

    $("#btn_submit").click(function (e) {
     
        var a_test = $("#txt_autocomplete").val().split("-");
        var a_test1 = $("#txt_autocomplete").val().split("-")[a_test.length - 1].replace(")", "").trim().length;
        $("#waiting-overlay").show();
          e.preventDefault();
        if ($("#txt_autocomplete").val().trim() == "") {
            $("#waiting-overlay").hide();
            alert("Please Fill Name");

            return false;

        } else if (a_test1 != 11) {
            alert("Please Fill Correct Name");
            $("#waiting-overlay").hide();
            return false;
        }
        else if (isCheckedById("Product_Pitching") && isCheckedById("Degree_FP") && isCheckedById("Redemption_of_MF") && isCheckedById("Portfolio_Review") && isCheckedById("Referral") && isCheckedById("Others")) {
            $("#waiting-overlay").hide();
            alert("Please Select Purpose of Meeting");

            return false;
        }
        else if (isCheckedById("MF") && isCheckedById("FI") && isCheckedById("LI") && isCheckedById("JT") && isCheckedById("GI") && isCheckedById("Realty")) {
            $("#waiting-overlay").hide();
            alert("Please Select Product Pitched");

            return false;
        }
        else if ($("#txt_Remarks").val().trim() == "") {
            $("#waiting-overlay").hide();
            alert("Please Fill Remarks");

            return false;
        }
        else if ($("#txt_NextMeetingDue").val().trim() == "") {
            $("#waiting-overlay").hide();
            alert("Please Fill Next Meeting Date");

            return false;
        }

        else {
            $("#Log_Client_Meeting").submit();
            $("#waiting-overlay").hide();
            //insert_data();
            //return false;
        }
    });

});

     function isCheckedById(id) {
         
         //alert(id);
         var checked = $("input[id=" + id + "]:checked").length;
        // alert(checked);

         if (checked == 0) {
             return true;
         } else {
             return false;
         }
     }
     function GetEdit(_stateId) {
        
         //var url = "http://wealthmaker.in/Dar_New/DARHOME/Edit_text/";
         var url = "http://localhost:49555/DARHOME/Edit_text/";
         $("#hdn_type").val("UPDATE"); 
           $("#hdn_S_NO").val(_stateId.split('/')[6]);
           $("#waiting-overlay").show();
         var procemessage = "<option value='0'> Please wait...</option>";
         $("#FooBarDropDown").html(procemessage).show();
         $.ajax({
             url: url,
             data: { id: _stateId.split('/')[6] },
             cache: false,
             type: "POST",
             success: function (data) {
                 $("#hdn_Meeting_date").val(data[0].MEETING_DATE);
                 $("#txt_autocomplete").val(data[0].INVESTOR_NAME + "(" + data[0].ADDRESS2 + "-" + data[0].INVCODE + ")");
                 var dada_purposr_call = data[0].PURPOSE_MEETING.split(",");
                 var daproductoiched = data[0].PRODUCT_PITCHED.split(",");
                 for (var i = 0; i < dada_purposr_call.length; i++) {

                     if (dada_purposr_call[i] == "Product Pitching") { $("#Product_Pitching").attr('checked', 'checked'); }
                     if (dada_purposr_call[i] == "360 Degree FP") { $("#Degree_FP").attr('checked', 'checked'); }
                     if (dada_purposr_call[i] == "Redemption of MF") { $("#Redemption_of_MF").attr('checked', 'checked'); }
                     if (dada_purposr_call[i] == "Portfolio Review") { $("#Portfolio_Review").attr('checked', 'checked'); }
                     if (dada_purposr_call[i] == "Referral") { $("#Referral").attr('checked', 'checked'); }
                     if (dada_purposr_call[i] == "Others") { $("#Others").attr('checked', 'checked'); }
                 }
                 for (var j = 0; j < daproductoiched.length; j++) {


                     if (daproductoiched[j] == "MF") { $("#MF").attr('checked', 'checked'); }
                     if (daproductoiched[j] == "FI") { $("#FI").attr('checked', 'checked'); }
                     if (daproductoiched[j] == "LI") { $("#LI").attr('checked', 'checked'); }
                     if (daproductoiched[j] == "GI") { $("#GI").attr('checked', 'checked'); }
                     if (daproductoiched[j] == "JT") { $("#JT").attr('checked', 'checked'); }
                     if (daproductoiched[j] == "Realty") { $("#Realty").attr('checked', 'checked'); }

                 }
                 $("#txt_Remarks").val(data[0].RM_REMARKS);
                 $("#txt_NextMeetingDue").val(data[0].NEXT_MEETING);

                 $("#btn_submit").val("Update");
                 $("#waiting-overlay").hide();
             },
             error: function (reponse) {
                
             }
         });

         return false;



     }

     //vALIDATION

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

//     function valid(o, w) {
//         var specialChars = "!#$^&%*+=[]\/{}|:<>?.";
//         for (var i = 0; i < specialChars.length; i++) {

//             o.value = o.value.replace(specialChars[i], '');
//         }

//     }



     //END vALIDATION

     $(function () {

         $("#btn_go").click(function () {


             bind_html();
             return false;


         });

     });



     function bind_html() {

        // var url = "http://wealthmaker.in/Dar_New/DARHOME/ON_DATE_SELECT/";
         var url = "http://localhost:49555/DARHOME/ON_DATE_SELECT/";
         $("#hdn_type").val("INSERT");
         Meeting_date = $("option:selected", $("#ddl_days")).text() + "/" + $("option:selected", $("#ddl_month")).text() + "/" + $("option:selected", $("#ddl_year")).text();
         $("#hdn_Meeting_date").val(Meeting_date);
         $("#waiting-overlay").show();
         $.ajax({
             url: url,
             data: { date: Meeting_date },
             cache: false,
             type: "POST",
             success: function (data) {

                 var htm = "";
                 if (data[0] != undefined) {
                     htm = "<table class='table table-bordered table-striped'>";
                     htm += "<thead>";
                     htm += "<tr>";
                     htm += "<th>";
                     htm += "Client Name";
                     htm += "</th>";
                     htm += "<th>";
                     htm += " Purpose of Meeting";
                     htm += " </th>";
                     htm += "<th>";
                     htm += "  Product Pitched";
                     htm += " </th>";
                     htm += " <th>";
                     htm += "Remarks";
                     htm += " </th>";
                     htm += " <th>";
                     htm += "  Next Meeting Due";
                     htm += " </th>";
                     htm += "<th>";
                     htm += "Edit";
                     htm += " </th>";
                     htm += " <th>";
                     htm += " Delete";
                     htm += " </th>";
                     htm += "</tr>";

                     for (var i = 0; i < data.length; i++) {
                         htm += "<tr>";
                         htm += "<td style='text-align:left'>";
                         htm += data[i].INVESTOR_NAME;
                         htm += "</td>";
                         htm += "<td style='text-align:left' > ";
                         htm += data[i].PURPOSE_MEETING;
                         htm += " </td>";
                         htm += "<td style='text-align:left'>";
                         htm += data[i].PRODUCT_PITCHED;
                         htm += " </td>";
                         htm += " <td style='text-align:left'>";
                         htm += data[i].RM_REMARKS;
                         htm += " </td>";
                         htm += " <td style='text-align:left'>";
                         htm += data[i].NEXT_MEETING;
                         htm += " </td>";
                         htm += "<td>";
                         htm += "<a onclick='return GetEdit(this.href);' id='edit_linK' href='/Dar_new/DARHOME/Edit/" + data[i].S_NO + "'>Edit</a>";
                         htm += " </td>";
                         htm += " <td>";
                         htm += " <a href='/Dar_new/DARHOME/Delete_text/" + data[i].S_NO + "'>Delete</a>";
                         htm += " </td>";
                         htm += "</tr>";
                     }
                     htm += "</thead>";
                     htm += "<tbody>";
                     htm += " </tbody>";
                     htm += "</table>";
                 } else { alert("No records found"); }
                 $("#dar_client_ex").html(htm);
                 $("#waiting-overlay").hide();
             },
             error: function (reponse) {
                 alert("error : " + reponse);
             }
         });


     }


     function insert_data() {
      
         //var url = "http://wealthmaker.in/Dar_New/DARHOME/btn_Submit/";
         var url = "http://localhost:49555/DARHOME/btn_Submit/";
         $("#hdn_type").val("INSERT");

         Meeting_date = $("option:selected", $("#ddl_days")).text() + "/" + $("option:selected", $("#ddl_month")).text() + "/" + $("option:selected", $("#ddl_year")).text();
         $("#hdn_Meeting_date").val(Meeting_date);

         var var__Client_Name = $("[name='_Client_Name']").val();

         var var_Product_Pitching = $("input:hidden[name='Product_Pitching']").val();
         var var_Redemption_of_MF = $("input:hidden[name='Redemption_of_MF']").val();
         var var_Degree_FP = $("input:hidden[name='Degree_FP']").val();
         var var_Portfolio_Review = $("input:hidden[name='Portfolio_Review']").val();
         var var_Referral = $("input:hidden[name='Referral']").val();
         var var_Others = $("input:hidden[name='Others']").val();

         alert(var_Product_Pitching);
         var var_MF = $("[name='MF']").val();
         var var_FI = $("[name='FI']").val();
         var var_LI = $("[name='LI']").val();
         var var_JT = $("[name='JT']").val();
         var var_GI = $("[name='GI']").val();
         var var_Realty = $("[name='Realty']").val();
         var var_Remarks = $("[name='Remarks']").val();
         var var__NextMeetingDue = $("[name='_NextMeetingDue']").val();
         
         var var__TYPE = $("[name='hdn_type']").val();
         var var__SNO = $("[name='hdn_S_NO']").val();
        var var_Meeting_DAte = $("#hdn_Meeting_date").val();
        
         $.ajax({
             url: url,
             data: {
                 _Client_Name: var__Client_Name,
                 Product_Pitching: var_Product_Pitching,
                 Redemption_of_MF: var_Redemption_of_MF,
                 Degree_FP: var_Degree_FP,
                 Portfolio_Review: var_Portfolio_Review,
                 Referral: var_Referral,
                 Others: var_Others,
                 MF: var_MF,
                 FI: var_FI,
                 LI: var_LI,
                 JT: var_JT,
                 GI: var_GI,
                 Realty: var_Realty,
                 Remarks: var_Remarks,
                 _NextMeetingDue: var__NextMeetingDue,
                 _TYPE: var__TYPE,
                 _SNO: var__SNO,
                 Meeting_DAte: var_Meeting_DAte

             },
             cache: false,
             type: "POST",
             success: function (data) {
                 alert(data.d);
                 bind_html();
             },
             error: function (reponse) {
                 alert("error : " + reponse);
             }
         });

     
      }