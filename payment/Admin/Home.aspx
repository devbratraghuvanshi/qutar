<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Home.aspx.cs" Inherits="Qa_Payment.Home" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <script src="../Scripts/jquery-1.5.1.min.js" type="text/javascript"></script>
<script src="../Scripts/jquery-ui-1.8.11.min.js" type="text/javascript"></script>
   <%-- <center style="margin-top:300px"><img src="../Image/logoyalla.png" alt=""></center>--%>
          <script>
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
    </script>
    <script>
      $(function () {
            $("#li_home").addClass("active");

        });

    </script>
   
     
</asp:Content>
