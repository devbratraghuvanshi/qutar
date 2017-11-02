<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="creatUser.aspx.cs" Inherits="Qa_Payment.Admin.creatUser" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
</head>
<body>
   <form id="form1" runat="server">
<div>
<table>
<tr>
<td>
Name:
</td>
<td>
<asp:TextBox ID="txtName" runat="server" />
<asp:RequiredFieldValidator ID="rfvName" runat="server" ControlToValidate="txtName" ErrorMessage="Please enter name"/>
</td>
</tr>
<tr>
<td>
Email:
</td>
<td>
<asp:TextBox ID="txtEmail" runat="server" />
<asp:RequiredFieldValidator ID="rfvEmail" runat="server" ControlToValidate="txtEmail" ErrorMessage="Please enter email id"/>
</td>
</tr>
<tr>
<td>
Username:
</td>
<td>
<asp:TextBox ID="txtUserName" runat="server"/>
<asp:RequiredFieldValidator ID="rfvUser" ErrorMessage="Please enter Username" ControlToValidate="txtUserName" runat="server" />
</td>
</tr>
<tr>
<td>
Password:
</td>
<td>
<asp:TextBox ID="txtPWD" runat="server" TextMode="Password"/>
<asp:RequiredFieldValidator ID="rfvPWD" runat="server" ControlToValidate="txtPWD" ErrorMessage="Please enter Password"/>
</td>
</tr>
<tr>
<td>
</td>
<td>
<asp:Button ID="btnSubmit" runat="server" Text="Submit" onclick="btnsubmit_Click" />
</td>
</tr>
</table>
</div>
</form>
</body>
</html>
