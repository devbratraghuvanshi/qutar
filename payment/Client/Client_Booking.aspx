<%@ Page Title="" Language="C#" MasterPageFile="~/ClientMaster.Master"
    AutoEventWireup="true" CodeBehind="Client_Booking.aspx.cs"
    Inherits="Qa_Payment.Client.Client_Booking" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

    <link href="../Styles/jquery-ui.css" rel="stylesheet" type="text/css" />
    <script src="../Scripts/jquery-1.12.4.js"></script>
    <script src="../Scripts/jquery-ui.js"></script>
    <script src="../Scripts/Client_Booking_Details.js" type="text/javascript"></script>
    <script type="text/javascript">

        $(function () {
            $("#li_CLIENT").addClass("active");
        });

    </script>
    <style>
        #ui-id-2 {
            height: 200px !important;
        }
    </style>
    <input type="hidden" id="hdn_booking_id" />
    <input type="hidden" id="hdn_emailid" />
    <input type="hidden" id="hdn_ConvertedAmount" />

    <div class="col-lg-8 col-lg-offset-2">
        <div class="backgroundImg_client">
            <div class="site-wrapper">
                <div class="site-wrapper-inner">
                    <div class="cover-container">
                        <div id="accordion">
                            <h3 style="text-align: left">Find Booking</h3>
                            <div class="row">
                                <div class="col-md-6 col-md-offset-3" align="center">
                                    <div class="form-group">
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                                            </span>
                                            <input type="text" id="txt_email" class="form-control" name="txt_loginid" placeholder="Email Id / Mobile No." maxlength="50" value="" />
                                        </div>
                                        <!-- /input-group -->

                                    </div>
                                    <div class="form-group" id="div_acco1">
                                        <div class="input-group">
                                            <span class="input-group-addon">
                                                <span class="glyphicon glyphicon-lock" aria-hidden="true"></span>
                                            </span>
                                            <input type="text" id="txt_bookingref" class="form-control" name="login_pass" placeholder="Booking Ref" maxlength="50" value="" />


                                        </div>
                                        <!-- /input-group -->
                                    </div>
                                    <div class="help-block with-errors" style="color: red" id="div_error" align="left"></div>
                                    <div class="form-group" align="right">
                                        <label></label>
                                        <div class="input-group">
                                            <span style="color: Red; font-weight: bold" id="txt_error"></span>

                                            <button class="btn btn-danger btn-block" id="btn_login" type="button">Find Booking</button>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <h3 style="text-align: left">Booking Details</h3>
                            <div>
                                <div class="row" id="bbk_booking_details">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Client Name</label>:-
                 <label style="font-weight: normal" id="_name"></label>

                                        </div>
                                        <div class="form-group">
                                            <label>Address</label>:-
                  <label style="font-weight: normal" id="_address"></label>
                                        </div>
                                        <div class="form-group">
                                            <label>Mobile No.</label>:-
                  <label style="font-weight: normal" id="_mobileno"></label>
                                        </div>
                                        <div class="form-group">
                                            <label>Email Id</label>:-
                <label style="font-weight: normal" id="_emailid"></label>
                                            <!-- Email -->
                                        </div>
                                        <div class="form-group">
                                            <label>Payment Status</label>:-
                <label style="font-weight: normal" id="_paymentstatus"></label>
                                            <!-- Email -->
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Package Name</label>:-
          <label style="font-weight: normal" id="_packeg_name"></label>




                                        </div>
                                        <div class="form-group">
                                            <label>Nationality</label>:-
          <label style="font-weight: normal" id="_nationality"></label>




                                        </div>
                                        <div class="form-group">
                                            <label>Booking Ref</label>:-
           <label style="font-weight: normal; color: Green" id="lblBookingRef"></label>

                                        </div>
                                        <div class="form-group">
                                            <label>Amount</label>:-
           <label style="font-weight: normal" id="_amount"></label>
                                            <b>
                                                <label style="font-weight: bold" id="_currency"></label>
                                            </b>
                                        </div>

                                        <div class="form-group">
                                            <label for="TermAndcondithion">
                                                Term & Condithions:
                                                          <input type="checkbox" id="TermAndcondithion" name="TermAndcondithion" />
                                            </label>
                                            <a href="https://www.yallacheckinn.com/TermsConditions.aspx" target="_blanck" style="color: blue;">Read Term & Condithions</a>
                                        </div>

                                    </div>
                                    <div class="col-md-12 text-left">
                                       Note: User need checkbox to accept the terms and condition before making payment.
                                    </div>

                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                    </div>
                                </div>
                                <div class="row" id="Div1">
                                    <div class="col-md-12">
                                        <div class="form-group" align="right">
                                            <label></label>
                                            <div class="input-group">
                                                <span id="spn_error" style="color: Red; font-weight: bold"></span>
                                                <input style="width: 150px;"
                                                    value="Choose Other Booking"
                                                    id="btn_other_booking" class="btn btn-primary" type="button" />
                                                <input style="width: 150px;" value="Make Payment" id="btn_make_payment" disabled="disabled" class="btn btn-primary" type="button" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>


    <style type="text/css">
        .ui-dialog-titlebar {
            background: #3772bc none repeat scroll 0 0;
            color: #fff;
        }
    </style>
    <div id="dialog-confirm" style="display: none" title="Converted In Qatar Currency">
        <%--<p> <span class="ui-icon ui-icon-alert" style="float:left; margin:12px 12px 20px 0;">
   Converted Amount For Qatar Currency <b id="bconvert"></b><br />  Are you sure Go For Payment
  </span></p>--%>

        <p>
            <span class="ui-icon ui-icon-alert" style="float: left; margin: 12px 12px 20px 0;"></span>
            Converted Amount For Qatar Currency <b id="bconvert"></b>
            <br />
            QAR  Are you sure Go For Payment
        </p>

    </div>
    <style type="text/css">
        body .ui-dialog-titlebar-close {
            visibility =visible;
        }

        #bbk_booking_details .form-group {
            text-align: left;
        }

        .ui-state-disabled {
            background-color: #000;
            color: #FFF;
            font-size: 15px;
            font-weight: bold;
        }

        .ui-state-disabled {
        }

        .ui-accordion .ui-accordion-header {
            font-size: 15px;
            font-weight: bold;
        }

        .ui-state-active, .ui-widget-content .ui-state-active, .ui-widget-header .ui-state-active, a.ui-button:active, .ui-button:active, .ui-button.ui-state-active:hover {
            background: #3772bc none repeat scroll 0 0;
            border: 1px solid #3772bc;
            color: #ffffff;
            font-weight: normal;
        }
    </style>
</asp:Content>
