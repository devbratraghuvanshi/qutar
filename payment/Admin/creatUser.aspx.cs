using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;
using System.Net.Mail;
using System.IO;
using CSEncryptDecrypt;

namespace Qa_Payment.Admin
{
    public partial class creatUser : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            send_mail("manishcs0019@gmail.com", "teewt", "test", "teewt", "teewt", "teewt", "test",
          "teewt", "teewt", "teewt","teewt");

          //  send_mailBooking("manishcs0019@gmail.com","teewt","teewt","teewt", "teewt","teewt", 0.0,
       //, "teewt", "teewt", "teewt");
        }

        public void send_mail(string email, string bookigref, string name, string pname, string nat, string cur, string amt
          , string var_sta, string add, string mobile, string trid)
        {

            try
            {
                MailMessage Msg = new MailMessage();
                SmtpClient smtp = new SmtpClient();
                // Sender e-mail address.
                Msg.From = new MailAddress("payment@yallacheckinn.com", "Payment Status");
                Msg.To.Add("payment@yallacheckinn.com");
                Msg.To.Add(email);
                Msg.Subject = "YC:" + var_sta +" <" + trid + ">";
                Msg.Body = mail_body(email, bookigref, name, pname, nat, cur, amt.ToString(), var_sta, add, mobile.ToString());
                Msg.IsBodyHtml = true;
                smtp.Host = "webmail.yallacheckinn.com";
                smtp.Credentials = new System.Net.NetworkCredential("payment@yallacheckinn.com", "pOo$e529");
                smtp.Send(Msg);
                Msg = null;

            }
            catch (Exception ex)
            {

            }



        }


        public string mail_body(string email, string bookigref, string name, string pname, string nat, string cur, string amt, 
            string var_sta, string add, string mobile)
        {
            string html = File.ReadAllText(Server.MapPath("~/mailbooking.html"));
            html = html.Replace("[[Booking_Ref]]", bookigref);
            html = html.Replace("[[P_NAME]]", pname);
            html = html.Replace("[[NAT]]", nat);
            html = html.Replace("[[CUR]]", cur);
            html = html.Replace("[[AMOUNT]]", amt);
            html = html.Replace("[[TSTAT]]", var_sta);
            html = html.Replace("[[Address]]", add);
            html = html.Replace("[[Mobile]]", mobile);
            html = html.Replace("[[EMAIL]]", email);
            html = html.Replace("[[NAME]]", name);
            html = html.Replace("[[urlpayment]]", "http://localhost:49462/client/client_booking.aspx?Email=" + email + "&BookigRef=" + bookigref + "");
        
            return html;



        }


        public void send_mailBooking(string email, string bookigref, string name, string pname, string nat, string cur, decimal amt
       , string var_sta, string add, string mobile)
        {

            try
            {
                MailMessage Msg = new MailMessage();
                SmtpClient smtp = new SmtpClient();
                // Sender e-mail address.
                Msg.From = new MailAddress("payment@yallacheckinn.com", "Booking Details");
                Msg.To.Add("payment@yallacheckinn.com");
                Msg.To.Add(email);
                Msg.Subject = "Booking Details";
                Msg.Body = mail_bodbookingy(email, bookigref, name, pname, nat, cur, amt.ToString(), var_sta, add, mobile.ToString());
                Msg.IsBodyHtml = true;
                smtp.Host = "webmail.yallacheckinn.com";
                smtp.Credentials = new System.Net.NetworkCredential("payment@yallacheckinn.com", "pOo$e529");
                smtp.Send(Msg);
                Msg = null;




            }
            catch (Exception ex)
            {

            }



        }


        public string mail_bodbookingy(string email, string bookigref, string name, string pname, string nat, string cur,
       string amt, string var_sta, string add, string mobile)
        {
            string html = File.ReadAllText(Server.MapPath("~/index.html"));
            html = html.Replace("[[Booking_Ref]]", bookigref);
            html = html.Replace("[[P_NAME]]", pname);
            html = html.Replace("[[NAT]]", nat);
            html = html.Replace("[[CUR]]", cur);
            html = html.Replace("[[AMOUNT]]", amt);
            html = html.Replace("[[TSTAT]]", var_sta);
            html = html.Replace("[[Address]]", add);
            html = html.Replace("[[Mobile]]", mobile);
            html = html.Replace("[[EMAIL]]", email);
            html = html.Replace("[[NAME]]", name);
            return html;



        }


        protected void btnsubmit_Click(object sender, EventArgs e)
        {
            QuatarPayemntEntities context = new QuatarPayemntEntities();
            TBLQU_User_Master objUserMaster = new TBLQU_User_Master();
            Class1 cl = new Class1();
            objUserMaster.Name = txtName.Text;
            objUserMaster.emailid = txtEmail.Text;
           // objUserMaster.mobileno = 9582790793;
            objUserMaster.userid = txtUserName.Text;
            objUserMaster.password = cl.Encryptdata(txtPWD.Text);
            objUserMaster.user_type = 1;

            context.AddToTBLQU_User_Master(objUserMaster);
            context.SaveChanges();
               
        }
    }
}