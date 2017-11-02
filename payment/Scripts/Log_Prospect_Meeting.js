 
        $(function () {
            var Meeting_date;
            Meeting_date = $("option:selected", $("#ddl_days")).text() + "/" + $("option:selected", $("#ddl_month")).text() + "/" + $("option:selected", $("#ddl_year")).text();
            $("#hdn_Meeting_date").val(Meeting_date);

            $("#txt_NextMeetingDue").datepicker({ dateFormat: 'dd/mm/yy', minDate: 0, changeMonth: true, changeYear: true });
            $("#btn_Submit_NewCleint").click(function (e) {
                $("#waiting-overlay").show();
                e.preventDefault();
                var Meeting_date;
                var Region_meet = $("option:selected", $("#FooBarDropDown")).text();
                var txt_client = $("option:selected", $("#ddl_Client")).text();
                var txt_mobile = $("label[for='mobile']").text();

                //Meeting_date 
                Meeting_date = $("option:selected", $("#ddl_days")).text() + "/" + $("option:selected", $("#ddl_month")).text() + "/" + $("option:selected", $("#ddl_year")).text();
                //endmeeting date

                $("#hdn_FooBarDropDown").val(Region_meet);
                $("#hdn_ddl_Client").val(txt_client);
                $("#hdn_mobile").val(txt_mobile);
                $("#hdn_Meeting_date").val(Meeting_date);

                if ($("#ddl_Client").val().trim() == "") {
                    $("#waiting-overlay").hide();
                     $("#div_error").text("Please Select Prospect Name");
                    
                    return false;
                }
                else if (isCheckedById("Product_Pitching") && isCheckedById("Degree_FP") && isCheckedById("Redemption_of_MF") && isCheckedById("Portfolio_Review") && isCheckedById("Referral") && isCheckedById("Others")) {
                    $("#waiting-overlay").hide();
                     $("#div_error").text("Please Select Purpose of Call");
                    return false;
                }
                else if (isCheckedById("MF") && isCheckedById("FI") && isCheckedById("LI") && isCheckedById("GI") && isCheckedById("JT") && isCheckedById("Realty")) {
                    $("#waiting-overlay").hide();
                     $("#div_error").text("Please Select Product Pitched");
                    return false;
                }
                else if ($("#txt_Remarks").val().trim() == "") {
                    $("#waiting-overlay").hide();
                     $("#div_error").text("Please Fill Remarks");
                    return false;
                }
                else if ($("#txt_NextMeetingDue").val().trim() == "") {
                    $("#waiting-overlay").hide();
                     $("#div_error").text("Please Fill Next Meeting Date");
                    return false;
                }
                else if ($("#txt_Email").val().trim() == "") {
                    $("#waiting-overlay").hide();
                     $("#div_error").text("Please Fill Email Id");
                    return false;
                }
                else if (!validateEmail($("#txt_Email").val())) {
                    $("#waiting-overlay").hide();
                     $("#div_error").text("Please Fill Valid Email Id");
                    return false;
                }
                else if ($("#FooBarDropDown").val().trim() == "") {
                    $("#waiting-overlay").hide();
                     $("#div_error").text("Please Fill Purpose of Meeting");
                    return false;
                }

                else {
                    $("#waiting-overlay").hide();
                    $("#Log_Prospect_Meeting").submit();
                }
                
            });

        });

      
        function validateEmail(email) {
              var re = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            return re.test(email);
        }

        function GetCity(_stateId) {
            $("#waiting-overlay").show();
            //var url = "http://wealthmaker.in/Dar_New/DARHOME/GETCLIENT_DETAILS/";
            var url = "http://localhost:49555/DARHOME/GETCLIENT_DETAILS/";
            $.ajax({
                url: url,
                data: { SN_NO: _stateId },
                cache: false,
                type: "POST",
                success: function (data) {
                    if (data[0] != undefined) {
                        $("#div_mobile").html();
                        $("#div_mobile").html("<label for='mobile'>" + data[0].mobile + "</label>")

                        var dada_purposr_call = data[0].purpose_of_call.split(",");
                        var daproductoiched = data[0].product_pitched.split(",");
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

                        var markup = "";
                        if (data[0].typeofmeeting == null) {
                            var markup = "";

                            markup += "<option value='First Meeting'>First Meeting</option>";
                            markup += "<option value='Follow Up Meeting'>Follow Up Meeting</option>";

                            $("#FooBarDropDown").html(markup).show();
                        } else {
                            if (data[0].typeofmeeting == "First Meeting") {
                                markup += "<option value='First Meeting' selected='true'>First Meeting</option>";
                                markup += "<option value='Follow Up Meeting'>Follow Up Meeting</option>";

                            } else if (data[0].typeofmeeting == "Follow Up Meeting") {
                                markup += "<option value='First Meeting' >First Meeting</option>";
                                markup += "<option value='Follow Up Meeting' selected='true'>Follow Up Meeting</option>";
                            } else {

                                markup += "<option value='First Meeting' selected='true'>First Meeting</option>";
                                markup += "<option value='Follow Up Meeting'>Follow Up Meeting</option>";
                            }

                        }

                        $("#FooBarDropDown").html(markup).show();
                        $("#txt_Remarks").val(data[0].remark);
                        $("#txt_Email").val(data[0].email);
                        $("#txt_NextMeetingDue").val(data[0].next_meeting_date);
                        $("#waiting-overlay").hide();
                    } else {
                        $("#div_mobile").html();
                        $("#div_mobile").html("<label for='mobile'></label>")
                        var markup = "";

                        markup += "<option value='First Meeting'>First Meeting</option>";
                        markup += "<option value='Follow Up Meeting'>Follow Up Meeting</option>";



                        $("#FooBarDropDown").html(markup).show();
                        $("#txt_Remarks").val("");
                        $("#txt_Email").val("");
                        $("#txt_NextMeetingDue").val("");
                        $("#waiting-overlay").hide();
                    }
                },
                error: function (reponse) {
                    //  $("#div_error").text("error : " + reponse);
                }
            });

        }

       
 
     function isCheckedById(id) {
         debugger;
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
         //var url = "http://wealthmaker.in/Dar_New/DARHOME/Edit_Prospect/";
         var url = "http://localhost:49555/DARHOME/Edit_Prospect/";
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
                 $("#hdn_type").val("UPDATE");
                 $("#hdn_S_NO").val(data[0].S_NO);
                 $("#hdn_Meeting_date").val(data[0].MEETING_DATE);
                 $("#ddl_Client").val(data[0].S_NO);
                 var dada_purposr_call = data[0].PURP_CALL.split(",");
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
                 $("#txt_Remarks").val(data[0].CLIENT_REM);
                 $("#txt_NextMeetingDue").val(data[0].NEXT_DUE_DATE)
                 $("#txt_Email").val(data[0].EMAILID)
                 if (data[0].TYPE_OF_MEETING == null) {
                     var markup = "";

                     markup += "<option value='First Meeting'>First Meeting</option>";
                     markup += "<option value='Follow Up Meeting'>Follow Up Meeting</option>";

                     $("#FooBarDropDown").html(markup).show();
                 } else {

                     var markup = "";
                     if (data[0].TYPE_OF_MEETING == "First Meeting") {
                         markup += "<option value='First Meeting' selected='true'>First Meeting</option>";
                         markup += "<option value='Follow Up Meeting'>Follow Up Meeting</option>";

                     } else if (data[0].TYPE_OF_MEETING == "Follow Up Meeting") {
                         markup += "<option value='First Meeting' >First Meeting</option>";
                         markup += "<option value='Follow Up Meeting' selected='true'>Follow Up Meeting</option>";
                     } else {

                         markup += "<option value='First Meeting' selected='true'>First Meeting</option>";
                         markup += "<option value='Follow Up Meeting'>Follow Up Meeting</option>";
                     }
                     $("#FooBarDropDown").html(markup).show();


                 }


                 $("#div_mobile").html();
                 $("#div_mobile").html("<label for='mobile'>" + data[0].MOBILE_NO + "</label>")
                 $("#btn_submit").val("Update");
                 $("#waiting-overlay").hide();
             },
             error: function (reponse) {
                 //  $("#div_error").text("error : " + reponse);
             }
         });

         return false;



     }



     $(function () {

         $("#btn_go").click(function () {


             //var url = "http://wealthmaker.in/Dar_New/DARHOME/ON_DATE_PROSPECT/";
             var url = "http://localhost:49555/DARHOME/ON_DATE_PROSPECT/";
             $("#hdn_type").val("INSERT");
             $("#waiting-overlay").show();
             Meeting_date = $("option:selected", $("#ddl_days")).text() + "/" + $("option:selected", $("#ddl_month")).text() + "/" + $("option:selected", $("#ddl_year")).text();
             $("#hdn_Meeting_date").val(Meeting_date);

             $.ajax({
                 url: url,
                 data: { date: Meeting_date },
                 cache: false,
                 type: "POST",
                 success: function (data) {
                     var htm = "";
                     if (data[0] != undefined) {
                         htm = "<table class='table table-bordered table-striped'>";

                         htm += " <tr>";
                         htm += " <th>Prospect Name</th>";
                         htm += "<th>Address	</th>";
                         htm += "<th>Phone</th>";
                         htm += "<th>Mobile No.	</th>";
                         htm += "<th>Purpose Of Call</th>";
                         htm += "<th>Product Pitched</th>";
                         htm += "<th>Remarks</th>";
                         htm += "<th>Next Meeting Due</th>";
                         htm += "<th>Email ID</th>";
                         htm += "<th>Edit</th>";
                         htm += "<th>Delete</th>";
                         htm += " </tr>";

                         for (var i = 0; i < data.length; i++) {
                             htm += " <tr>";
                             htm += " <td style='text-align:left'>";
                             htm += data[i].CLIENT_NAME;
                             htm += "</td>";
                             htm += "<td style='text-align:left'>";
                             htm += data[i].ADDRESS;
                             htm += "</td>";
                             htm += "<td  style='text-align:right' > ";
                             htm += data[i].PHONE;
                             htm += "</td>";
                             htm += "<td style='text-align:right'>";
                             htm += data[i].MOBILE_NO;
                             htm += "	</td>";
                             htm += "<td style='text-align:left'>";
                             htm += data[i].PURP_CALL;
                             htm += "</td>";
                             htm += "<td style='text-align:left'>";
                             htm += data[i].PRODUCT_PITCHED;
                             htm += "</td>";
                             htm += "<td style='text-align:left'>";
                             htm += data[i].CLIENT_REM;
                             htm += "</td>";
                             htm += "<td style='text-align:left'>";
                             htm += data[i].NEXT_DUE_DATE;
                             htm += "</td>";
                             htm += "<td style='text-align:left'>";
                             htm += data[i].EMAILID;
                             htm += "</td>";
                             htm += "<td>";
                             htm += "<a onclick='return GetEdit(this.href);' id='edit_link_prospect' href='/DARHOME/Edit_Prospect/" + data[i].S_NO + "'>Edit</a>";
                             htm += "</td>";
                             htm += "<td>";
                             htm += "<a href='/DARHOME/Delete_text_Prospect/" + data[i].S_NO + "'>Delete</a>";
                             htm += "</td>";
                             htm += " </tr>";
                         }

                         htm += "</table>";
                     } else {  $("#div_error").text("No records found"); }
                     $("#dar_client_pro").html(htm);
                     $("#waiting-overlay").hide();
                 },
                 error: function (reponse) {
                     // $("#div_error").text("error : " + reponse);
                 }
             });

             return false;


         });

     });

