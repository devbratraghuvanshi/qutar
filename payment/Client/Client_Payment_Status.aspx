<%@ Page Title="" Language="C#" MasterPageFile="~/ClientMaster.Master" AutoEventWireup="true"
 CodeBehind="Client_Payment_Status.aspx.cs" Inherits="Qa_Payment.Client.Client_Payment_Status" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
<div style="margin-top:150px">
<div class="container">
  <div class="row" id="bbk_booking_details">
  	<div class="col-md-1"></div>
 	<div class="col-md-4">
        <div class="form-group">  
                <label>Client Name</label>:-
                 <label style="font-weight:normal" runat="server" clientidmode="Static" id="_name"></label>
                
            </div>
        
        <div class="form-group">  
                <label>Address</label>:-
                  <label style="font-weight:normal" runat="server" clientidmode="Static" id="_address"></label>
                </div>
        <div class="form-group">  
                <label>Mobile No.</label>:-
                  <label style="font-weight:normal" runat="server" clientidmode="Static" id="_mobileno"></label>
                </div>
        <div class="form-group">
              <label>Email Id</label>:-
                <label style="font-weight:normal" runat="server" clientidmode="Static" id="_emailid"></label>
              <!-- Email --> 	
      </div>
        <div class="form-group">
              <label>Booking Ref</label>:-
                <label style="font-weight:normal" runat="server" clientidmode="Static" id="_booking"></label>
              <!-- Email --> 	
      </div>
        </div>
    <div class="col-md-4">
	     <div class="form-group">
        <label>Package Name</label>:-
          <label style="font-weight:normal" runat="server" clientidmode="Static" id="_packeg_name"></label>
        



      </div>
         <div class="form-group">
        <label>Nationality</label>:-
          <label style="font-weight:normal" runat="server" clientidmode="Static" id="_nationality"></label>
        



      </div>
         <%--<div class="form-group">
        <label>Currency</label>:-
          <label style="font-weight:normal" runat="server" clientidmode="Static" id="_currency"></label>
        
      

      </div>--%>
         <div class="form-group">
         <label>Amount</label>:-
           <label style="font-weight:normal" runat="server" clientidmode="Static" id="_amount"></label>
           <label style="font-weight:bold" runat="server" clientidmode="Static" id="_currency"></label>
        
          </div>
         <div class="form-group">
         <label>Booking Status</label>:-
           <label style="font-weight:normal" runat="server" clientidmode="Static" id="_status"></label>
        
          </div>
         </div>
         <div class="col-md-1"></div>
  </div>
   
   </div>
</div>
</asp:Content>
