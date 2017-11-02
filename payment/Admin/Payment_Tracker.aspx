<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Payment_Tracker.aspx.cs" Inherits="Qa_Payment.Payment_Tracker" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

    <link rel="stylesheet" href="../jqwidgets/styles/jqx.base.css" type="text/css" />
    <script type="text/javascript" src="../Scripts/jquery-1.11.1.min.js"></script>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <link rel="stylesheet" href="/resources/demos/style.css">
    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script type="text/javascript" src="../jqwidgets/jqxcore.js"></script>
    <script type="text/javascript" src="../jqwidgets/jqxdata.js"></script>
    <script type="text/javascript" src="../jqwidgets/jqxbuttons.js"></script>
    <script type="text/javascript" src="../jqwidgets/jqxscrollbar.js"></script>
    <script type="text/javascript" src="../jqwidgets/jqxlistbox.js"></script>
    <script type="text/javascript" src="../jqwidgets/jqxdropdownlist.js"></script>
    <script type="text/javascript" src="../jqwidgets/jqxmenu.js"></script>
    <script type="text/javascript" src="../jqwidgets/jqxgrid.js"></script>
    <script type="text/javascript" src="../jqwidgets/jqxgrid.filter.js"></script>
    <script type="text/javascript" src="../jqwidgets/jqxgrid.sort.js"></script>
    <script type="text/javascript" src="../jqwidgets/jqxgrid.selection.js"></script>
    <script type="text/javascript" src="../jqwidgets/jqxpanel.js"></script>
    <script type="text/javascript" src="../jqwidgets/globalization/globalize.js"></script>
    <script type="text/javascript" src="../jqwidgets/jqxcalendar.js"></script>
    <script type="text/javascript" src="../jqwidgets/jqxdatetimeinput.js"></script>
    <script type="text/javascript" src="../jqwidgets/jqxcheckbox.js"></script>
    <script src="../jqwidgets/jqxgrid.columnsresize.js" type="text/javascript"></script>
    <script src="../jqwidgets/jqxgrid.pager.js" type="text/javascript"></script>
    <script src="../jqwidgets/jqxgrid.columnsreorder.js" type="text/javascript"></script>
    <script src="../jqwidgets/jqxdata.export.js" type="text/javascript"></script>
    <script src="../jqwidgets/jqxgrid.export.js" type="text/javascript"></script>
    <script src="../jqwidgets/jqxgrid.edit.js" type="text/javascript"></script>
    <script src="../jqwidgets/jqxeditor.js" type="text/javascript"></script>
    <script src="../jqwidgets/jqxinput.js" type="text/javascript"></script>
    <script src="../jqwidgets/jqxnumberinput.js" type="text/javascript"></script>
    <script src="../jqwidgets/jqxwindow.js" type="text/javascript"></script>
    <script type="text/javascript" src="../Scripts/demos.js"></script>
    <script src="../Scripts/Payment_Tracker.js" type="text/javascript"></script>
    <script>
        $(function () {
            $("#li_Prospect").addClass("active");

        });

    </script>


    <div class="container-fluid">

        <div class="row" style="margin-top:15px">

            <div id="jqxgrid">
            </div>
            <div class="row">
                <div style="display: inline; margin-left: 20px;">
                    <label for="fromDate">From Date</label>
                    <input type="text" name="fromDate" id="fromDate" value="<%= DateTime.Today.ToString("dd/MM/yyyy")%>" />
                </div>
                <div style="display: inline; margin-left: 20px;">
                    <label for="toDate">To Date</label>
                    <input type="text" name="toDate" id="toDate" value="<%= DateTime.Today.AddMonths(-6).ToString("dd/MM/yyyy")%>" />
                </div>

                <div style="display: inline; margin-left: 20px;">
                    <input type="button" name="applyDateFilter" id="applyDateFilter" value="Apply Filter" class="button" />
                </div>
            </div>


            <div class="col-lg-12">
                <input id="btn_export" class="btn btn-primary" type="button" value="Export in Excel" />
            </div>
        </div>

    </div>


    <div id="popupWindow">
        <div>Edit</div>
        <div style="overflow: hidden;">
            <table>
                <tr>
                    <td align="right">Client Id:</td>
                    <td align="left">
                        <input id="clientId" readonly="readonly"></td>
                </tr>
                <tr>
                    <td align="right">Booking Ref:</td>
                    <td align="left">
                        <input id="bookingRef" readonly="readonly"></td>
                </tr>
                <tr>
                    <td align="right">Client Name:</td>
                    <td align="left">
                        <input id="clientName" /></td>
                </tr>
                <tr>
                    <td align="right">Address:</td>
                    <td align="left">
                        <input id="address" /></td>
                </tr>
                <tr>
                    <td align="right">Email:</td>
                    <td align="left">
                        <input id="email" /></td>
                </tr>
                <tr>
                    <td align="right">Mobile:</td>
                    <td align="left">
                        <input id="mobile" /></td>
                </tr>
                <tr>
                    <td align="right">Service Name:</td>
                    <td align="left">
                        <input id="packageName" /></td>
                </tr>

                <tr>
                    <td align="right">Amount:</td>
                    <td align="left">
                        <input id="amount" /></td>
                </tr>
                <tr>
                    <td align="right">Currency:</td>
                    <td align="left">
                        <input id="currency" /></td>
                </tr>

                <tr>
                    <td align="right">Nationallty:</td>
                    <td align="left">
                        <input id="nationallty" /></td>
                </tr>
                <tr>
                    <td align="right">Failed Attempt Limit:</td>
                    <td align="left">
                    <input id="FailedAttemptLimit" type="number" /></td>
                </tr>
                <tr>
                    <td align="right">Is Blocked:</td>
                    <td align="left">
                    <input id="IsBlocked" type="checkbox" /></td>
                </tr>

                <%--  <tr>
                        <td align="right">Client Name:</td>
                        <td align="left"><input id="BookingDate" /></td>
                    </tr>--%>
                <tr>
                    <td align="right"></td>
                    <td style="padding-top: 10px;" align="right">
                        <input style="margin-right: 5px;" type="button" id="Save" value="Save" />
                        <input id="Cancel" type="button" value="Cancel" />
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <div id="dialog" title="Payment Attempt History">
        <p id="pTable">
        </p>
    </div>

    <style type="text/css">
        .jqx-grid-column-header {
            Color: red !important;
            text-align: center !important;
            font-weight: bold !important;
        }
    </style>
</asp:Content>
