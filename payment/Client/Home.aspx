<%@ Page Title="" Language="C#" MasterPageFile="~/ClientMaster.Master" AutoEventWireup="true"
 CodeBehind="Home.aspx.cs" Inherits="Qa_Payment.Client.Home" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <script src="../Scripts/jquery-1.12.4.js"></script>
    <script type="text/javascript">

        $(function () {
            $("#li_home").addClass("active");

        });

    </script>

<%--  <center style="margin-top:300px"><img src="../Image/logoyalla.png" alt=""></center>--%>
</asp:Content>
