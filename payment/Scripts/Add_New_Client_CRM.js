
$(function () {
    $("#txt_Next_Due_Date").datepicker({ dateFormat: 'dd/mm/yy', minDate: 0, changeMonth: true, changeYear: true });
    $("#txt_Meetin_Date").datepicker({ dateFormat: 'dd/mm/yy', minDate: 0, changeMonth: true, changeYear: true });
    $("#li_CRM").addClass("active");
});

      function validateEmail(email) {
          var re = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
          return re.test(email);
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

      $(function () {

          $("#btn_submit_add").click(function (e) {
              debugger;
              $("#waiting-overlay").show();
              $("#hdn_type_of_meeting").val($("option:selected", $("#ddl_typeofmeeting")).text());
              $("#hdn_lead_source").val($("option:selected", $("#ddl_typeofleadsource")).text());



              if ($("#txt_name").val().trim() == "") {
                  $("#waiting-overlay").hide();
                   $("#div_error").text("Please Enter Name");
                  return false;
              }
              else if ($("#txt_Address").val().trim() == "") {
                  $("#waiting-overlay").hide();
                   $("#div_error").text("Please Fill Address");
                  return false;
              }

              else if ($("#txt_Mobile").val().trim() == "") {
                  $("#waiting-overlay").hide();
                   $("#div_error").text("Please Fill Mobile No");
                  return false;
              } else if ($("#txt_Mobile").val().trim().length != 10) {
                  $("#waiting-overlay").hide();
                   $("#div_error").text("Please Fill Correct Mobile No");
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

              else if (isCheckedById("Product_Pitching") && isCheckedById("Redemption_of_MF") && isCheckedById("degree_FP") && isCheckedById("Portfolio_Review") && isCheckedById("Referral") && isCheckedById("Others")) {
                  $("#waiting-overlay").hide();
                   $("#div_error").text("Please Select Purpose of Call");
                  return false;
              }
              else if (isCheckedById("MF") && isCheckedById("FI") && isCheckedById("LI") && isCheckedById("JT") && isCheckedById("GI") && isCheckedById("Realty") && isCheckedById("Secondary_Debt")) {
                  $("#waiting-overlay").hide();
                   $("#div_error").text("Please Select Product Pitched");
                  return false;
              }


              else if ($("#txt_Meetin_Date").val().trim() == "") {
                  $("#waiting-overlay").hide();
                   $("#div_error").text("Please Fill Meeting Date");
                  return false;
              }
              else if ($("#txt_Next_Due_Date").val().trim() == "") {
                  $("#waiting-overlay").hide();
                   $("#div_error").text("Please Fill Next Meeting Date");
                  return false;
              }


              else if ($("#ddl_typeofmeeting").val().trim() == "") {
                  $("#waiting-overlay").hide();
                   $("#div_error").text("Please Fill Type of Meeting");
                  return false;
              }

              else if ($("#ddl_typeofleadsource").val().trim() == "") {
                  $("#waiting-overlay").hide();
                   $("#div_error").text("Please Fill Lead Source");
                  return false;
              }

              else if ($("#txt_Meeting_Remarks").val().trim() == "") {
                  $("#waiting-overlay").hide();
                   $("#div_error").text("Please Fill Remarks");
                  return false;
              }
              else {
                  $("#waiting-overlay").hide();
                  $("#Log_Client_Meeting").submit();
              }


              //  $("#Log_Client_Meeting").submit();



          });

      });



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