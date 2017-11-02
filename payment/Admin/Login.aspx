<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="Qa_Payment.Login" %>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Login</title>
<link href="../Styles/bootstrap.min.css" rel="stylesheet" type="text/css" />
<link href="../Styles/style.css" rel="stylesheet" type="text/css" />
</head>
<body>

 <div class="backgroundImg2_Admin">
<div class="site-wrapper">
  <div class="site-wrapper-inner">
    <div class="cover-container">

      
      <div class="masthead">
        <div class="inner">
          <h3 class="masthead-brand" align="center" style="margin-top:5px !important;"><img src="../Image/logoyalla.png" alt=""></h3>
        </div>
      </div>


    <!-- Login Form Start -->
    <div class="row">
 
    	<div class="col-md-6 col-md-offset-3" align="center">
        <div align="center" class="loginBg"><img src="../Image/login.png"></div>
        <form class="askFrm form-horizontal" runat="server">
        	   <asp:HiddenField runat="server" Value="" ID="hdn_url" ClientIDMode="Static" />
                    <div class="form-group">
                    	<div class="input-group">
                           <span class="input-group-addon">
                           		<span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                           </span>
                          <input type="text" id="txt_loginid" class = "form-control" name="txt_loginid" placeholder="Login Id" maxlength="10" />
                        </div><!-- /input-group -->
                        
                    </div>
                    <div class="form-group">
                    	<div class="input-group">
                           <span class="input-group-addon">
                           		<span class="glyphicon glyphicon-lock" aria-hidden="true"></span>
                           </span>
                           <input type="password" id="login_pass" class = "form-control" name="login_pass" placeholder="Password" maxlength="10" />
                        
                         
                        </div><!-- /input-group -->
                    </div>
                      <div class="help-block with-errors" style="color:red" id="div_error" align="left" ></div>
                    <div class="form-group">
                    	<button class="btn btn-danger btn-block"  id="btn_login" type="button">Login</button>
                    </div>
            </form>

        </div>
    </div>
    <!-- Login Form End -->

     

      <!-- Footer -->
      <div class="mastfoot">
        <div class="inner">
          <p style="color:#333">© 2016 Yalla Check INN
 </p>
        </div>
      </div>
      <!-- Footer -->
      
      
      
    </div>
</div>
</div>
</div>
    <script src="../Scripts/jquery-1.5.1.min.js" type="text/javascript"></script>
    <script src="../Scripts/jquery-ui-1.8.11.js" type="text/javascript"></script>
    <script type="text/javascript">
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
 </script>

 <script>

     $(function () {


         $('body').keypress(function (e) {
             var key = e.which;
             if (key == 13)  // the enter key code
             {
                 $('#btn_login').click();
                 return false;
             }
         });

         $("#btn_login").click(function () {
             debugger;
             $("#div_error").text("");
             if ($("#txt_loginid").val().trim() == "") {
                 $("#txt_loginid").focus();
                 $("#div_error").text("Please Enter Login Id");
                 return false;
             }
             else if ($("#login_pass").val().trim() == "") {
                 $("#login_pass").focus();
                 $("#div_error").text("Please Enter Password");
                 return false;
             }
             else {

               
                 var url =$("#hdn_url").val()+"Admin/QuPaymentData.asmx/btn_login";
                 var obj = {};
                 obj.id = $("#txt_loginid").val();
                 obj.pass = $("#login_pass").val();
                 $.ajax({
                     url: url,
                     data: JSON.stringify(obj),
                     contentType: "application/json; charset=utf-8",
                     dataType: "json",
                     type: "POST",
                     success: function (data) {

                         if (data.d == "SUCCESS") {

                             window.location = $("#hdn_url").val() + "Admin/Booking.aspx"
                         }
                         else {
                             $("#div_error").text("* Please Check User Name & Password");
                         }
                     },
                     error: function (reponse) {
                         // alert("error : " + reponse);
                     }
                 });


             }




         })




     });

 </script>
</body>
</html>
