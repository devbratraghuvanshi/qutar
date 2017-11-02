using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Security.Cryptography;
using Newtonsoft.Json;
using System.Net.Mail;
using System.Net;
using System.Text.RegularExpressions;
using System.IO;
using CSEncryptDecrypt;
using System.Data;
using System.Data.SqlClient;

namespace Qa_Payment
{
    /// <summary>
    /// Summary description for QuPaymentData
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class QuPaymentData : System.Web.Services.WebService
    {
        QuatarPayemntEntities context = new QuatarPayemntEntities();
        [WebMethod(EnableSession = true)]
        public string HelloWorld()
        {
            return "Hello World";
        }
        [WebMethod(EnableSession = true)]
        public string Create_Booking(string firstname, string lastname, string address, string mobile, string email, string packegname, string nationality, string currency, string amount, string description)
        {

            context = new QuatarPayemntEntities();
            #region InSert Into Client Master
            TBLQU_CLIENTMASTER objClient_master = new TBLQU_CLIENTMASTER();
            objClient_master.ClientID = "YALA" + DateTime.Now.ToString().Replace("/", "").Replace(" ", "").Replace(":", "").Replace("AM", "").Replace("PM", ""); ;
            objClient_master.ClientfirstName = firstname.Trim().ToUpper();
            objClient_master.ClientLastName = lastname.Trim().ToUpper();
            objClient_master.Address = address.Trim().ToUpper();
            objClient_master.PhoneNo = mobile;
            objClient_master.MobileNo = mobile;
            objClient_master.EmailID = email;
            objClient_master.Nationality = nationality;
            objClient_master.CreatedDate = DateTime.Now;
            objClient_master.ModifiedDate = DateTime.Now;

            // dynamic query = (from s in context.TBLQU_CLIENTMASTER
            //where s.MobileNo == objClient_master.MobileNo
            // && s.EmailID == objClient_master.EmailID
            //select new
            //{
            //  Client_ID = s.ClientID,
            //
            // }).ToList();

            // if (query.Count == 0)
            // {

            context.AddToTBLQU_CLIENTMASTER(objClient_master);
            context.SaveChanges();
            //}
            //else
            //{
            //   objClient_master.ClientID = query[0].Client_ID.ToString();
            //}
            #endregion
            #region InSert Into Payment Master
            context = new QuatarPayemntEntities();
            TBLQU_PAYMENTMASTER objPAYMENTMASTER = new TBLQU_PAYMENTMASTER();
            objPAYMENTMASTER.ClientID = objClient_master.ClientID;
            objPAYMENTMASTER.BookingRef = "YCIO" + Get8Digits();// paymrnt_insert.firstname;
            objPAYMENTMASTER.PackageName = packegname.Trim().ToUpper();
            objPAYMENTMASTER.Amount = amount;
            objPAYMENTMASTER.Currency = currency;
            objPAYMENTMASTER.Status = 1;
            objPAYMENTMASTER.Var_Status = "Pending";
            objPAYMENTMASTER.payment_id = "";
            objPAYMENTMASTER.payment_token = "";
            objPAYMENTMASTER.created_date = DateTime.Now;
            objPAYMENTMASTER.modifed_date = DateTime.Now;
            objPAYMENTMASTER.booked_by = Session["Admin_UserName"].ToString();
            objPAYMENTMASTER.currencyrate = ConvertYHOO(currency);
            objPAYMENTMASTER.Discription = description;
            context.AddToTBLQU_PAYMENTMASTER(objPAYMENTMASTER);
            context.SaveChanges();
            #endregion
            send_mail(objClient_master.EmailID, objPAYMENTMASTER.BookingRef,
                objClient_master.ClientfirstName + " " + objClient_master.ClientLastName,
              objPAYMENTMASTER.PackageName, objClient_master.Nationality, objPAYMENTMASTER.Currency,
              objPAYMENTMASTER.Amount, objPAYMENTMASTER.Var_Status, objClient_master.Address, objClient_master.MobileNo);
            return objPAYMENTMASTER.BookingRef;
        }

        [WebMethod(EnableSession = true)]
        public string updatedata(string Client_ID, string Client_BookingRef, string Client_nAME, string CLIENT_Address,
            string Client_MobileNo, string Client_Email,
            string Client_Packegname, string Clinet_Amount,
            string Clinet_Nationallty, string Clinet_Currency,
            int FailedAttemptLimit, bool IsBlocked)
        {
            #region Update Into Client Master
            TBLQU_CLIENTMASTER objClient_master = context.TBLQU_CLIENTMASTER.First(i => i.ClientID == Client_ID);
            if (objClient_master != null)
            {

                objClient_master.ClientfirstName = Client_nAME;
                objClient_master.ClientLastName = "";
                objClient_master.Address = CLIENT_Address.Trim().ToUpper();
                objClient_master.PhoneNo = Client_MobileNo;
                objClient_master.MobileNo = Client_MobileNo;
                objClient_master.EmailID = Client_Email;
                objClient_master.Nationality = Clinet_Nationallty;
                objClient_master.ModifiedDate = DateTime.Now;
                context.SaveChanges();
            }

            #endregion
            #region Update Into Payment Master
            // context = new QuatarPayemntEntities();
            //TBLQU_PAYMENTMASTER objPAYMENTMASTER = context.TBLQU_PAYMENTMASTER.First(i => i.BookingRef == Client_BookingRef);
            //if (objPAYMENTMASTER != null)
            //{
            //    objPAYMENTMASTER.PackageName = Client_Packegname;
            //    objPAYMENTMASTER.Currency = Clinet_Currency;
            //    objPAYMENTMASTER.modifed_date = DateTime.Now;
            //    objPAYMENTMASTER.Amount = Clinet_Amount;
            //    objPAYMENTMASTER.currencyrate = ConvertYHOO(Clinet_Currency);

            //    context.SaveChanges();
            //}

            var idParam1 = new SqlParameter
            {
                ParameterName = "PackageName",
                Value = Client_Packegname
            };
            var idParam2 = new SqlParameter
            {
                ParameterName = "Currency",
                Value = Clinet_Currency
            };
            var idParam3 = new SqlParameter
            {
                ParameterName = "Amount",
                Value = Clinet_Amount
            };
            var idParam4 = new SqlParameter
            {
                ParameterName = "BookingRef",
                Value = Client_BookingRef.Split('(')[0].ToString()
            };
            var idParam5 = new SqlParameter
            {
                ParameterName = "currencyrate",
                Value = ConvertYHOO(Clinet_Currency)
            };

            var IsBlockedParam = new SqlParameter
            {
                ParameterName = "IsBlocked",
                Value = IsBlocked
            };

            var FailedAttemptLimitParam = new SqlParameter
            {
                ParameterName = "FailedAttemptLimit",
                Value = FailedAttemptLimit
            };


            //Get student name of string type
            var courseList = context.ExecuteStoreQuery<test>("exec update_paymentMaster @PackageName,@Currency,@Amount,@currencyrate,@BookingRef,@FailedAttemptLimit,@IsBlocked", idParam1, idParam2, idParam3, idParam5, idParam4, FailedAttemptLimitParam, IsBlockedParam).ToList<test>();


            #endregion


            return "";
        }

        public string Get8Digits()
        {
            var bytes = new byte[4];
            var rng = RandomNumberGenerator.Create();
            rng.GetBytes(bytes);
            uint random = BitConverter.ToUInt32(bytes, 0) % 100000000;
            return String.Format("{0:D5}", random);
        }
        [WebMethod(EnableSession = true)]
        public string GET_Paymaent_Data(string userid, string toDate, string fromDate)
        {
            if (!string.IsNullOrEmpty(userid) && !string.IsNullOrEmpty(toDate) && !string.IsNullOrEmpty(fromDate))
            {
                DateTime _toDate;
                var isValidToDate = DateTime.TryParseExact(toDate, "dd/MM/yyyy", System.Globalization.CultureInfo.InvariantCulture, System.Globalization.DateTimeStyles.None, out _toDate);

                DateTime _fromDate;
                var isValidFromDate = DateTime.TryParseExact(fromDate, "dd/MM/yyyy", System.Globalization.CultureInfo.InvariantCulture, System.Globalization.DateTimeStyles.None, out _fromDate);

                if (isValidToDate && isValidFromDate)
                {
                    context = new QuatarPayemntEntities();
                    dynamic query = (from s in context.TBLQU_CLIENTMASTER
                                     from e in context.TBLQU_PAYMENTMASTER.Where(x => x.ClientID == s.ClientID).DefaultIfEmpty()
                                     from f in context.TBLQU_User_Master.Where(x => x.userid == e.booked_by).DefaultIfEmpty()
                                     from d in context.TBLQU_PAYMENTHIS.Where(b => b.vpc_MerchTxnRef == e.BookingRef).DefaultIfEmpty()
                                     select new
                                     {
                                         Client_ID = s.ClientID,
                                         Client_nAME = s.ClientfirstName + " " + s.ClientLastName,
                                         CLIENT_Address = s.Address,
                                         Client_MobileNo = s.MobileNo,
                                         Client_Email = s.EmailID,
                                         Clinet_Nationallty = s.Nationality,
                                         Client_BookingRef = e.BookingRef,
                                         Client_Packegname = e.PackageName,
                                         Clinet_Amount = e.Amount,
                                         Clinet_Currency = e.Currency,
                                         Payment_Status = e.Var_Status,
                                         user_type = f.user_type,
                                         user_name = f.userid,
                                         BankTrID = d.vpc_TransactionNo,
                                         TRID = e.payment_token,
                                         modifieddate = e.modifed_date
                                     }).ToList().Where(x => x.user_name == userid).Where(x => (x.modifieddate <= _fromDate && x.modifieddate > _toDate));

                    var result = context.ExecuteStoreQuery<test123>("exec GetAdminData").ToList<test123>().Where(x => (DateTime.ParseExact(x.CreatedDate, "MMM dd yyyy", System.Globalization.CultureInfo.InvariantCulture) <= _fromDate && DateTime.ParseExact(x.CreatedDate, "MMM dd yyyy", System.Globalization.CultureInfo.InvariantCulture) > _toDate));

                    return JsonConvert.SerializeObject(result);
                }

                return "Invalid  dates or user id";
            }
            return "Empty  dates or user id";

        }
        [WebMethod(EnableSession = true)]
        public string GET_Paymaent_Data_Admin(string userid, string toDate, string fromDate)
        {
            context = new QuatarPayemntEntities(); string _result = "";

            try
            {
               
                if (!string.IsNullOrEmpty(userid) && !string.IsNullOrEmpty(toDate) && !string.IsNullOrEmpty(fromDate))
                {
                    DateTime _toDate;
                    var isValidToDate = DateTime.TryParseExact(toDate, "dd/MM/yyyy", System.Globalization.CultureInfo.InvariantCulture, System.Globalization.DateTimeStyles.None, out _toDate);

                    DateTime _fromDate;
                    var isValidFromDate = DateTime.TryParseExact(fromDate, "dd/MM/yyyy", System.Globalization.CultureInfo.InvariantCulture, System.Globalization.DateTimeStyles.None, out _fromDate);

                    if (isValidToDate && isValidFromDate)
                    {
                        // getting data as string from db in "MMM dd yyyy"
                        var result = context.ExecuteStoreQuery<test123>("exec GetAdminData").ToList<test123>()
                            .Where(x => (DateTime.ParseExact(x.CreatedDate, "MMM dd yyyy", System.Globalization.CultureInfo.InvariantCulture) <= _fromDate && DateTime.ParseExact(x.CreatedDate, "MMM dd yyyy", System.Globalization.CultureInfo.InvariantCulture) > _toDate));
                        return JsonConvert.SerializeObject(result);
                    }
                }
            }
            catch (Exception ex)
            {
                _result = ex.Message;
            }
            return _result;

        }
        [WebMethod(EnableSession = true)]
        public string btn_login(string id, string pass)
        {
            Class1 cl = new Class1();
            string passdec = cl.Encryptdata(pass);// utilityclass.Decrypt(pass);
            string _result = "";
            context = new QuatarPayemntEntities();
            try
            {

                dynamic query = (from s in context.TBLQU_User_Master.Where(x => x.userid == id
                                  && x.password == passdec)
                                 select new
                                 {
                                     Admin_ID = s.id,
                                     Admin_nAME = s.Name,
                                     Admin_UserName = s.userid,
                                     Admin_MobileNo = s.mobileno,
                                     Admin_Email = s.emailid,
                                     Admin_UserType = s.user_type

                                 }).ToList();
                foreach (var item in query)
                {
                    Session["Admin_ID"] = item.Admin_ID;
                    Session["Admin_nAME"] = item.Admin_nAME;
                    Session["Admin_UserName"] = item.Admin_UserName;
                    Session["Admin_MobileNo"] = item.Admin_MobileNo;
                    Session["Admin_Email"] = item.Admin_Email;
                    Session["Admin_UserType"] = item.Admin_UserType;
                }

                _result = Session["Admin_ID"] == null ? "UNSUCCESS" : "SUCCESS";

            }
            catch (Exception ex)
            {

                _result = ex.Message;
            }
            //  return _result;
            return "SUCCESS";
        }
        public void send_mail(string email, string bookigref, string name, string pname, string nat, string cur, string amt
        , string var_sta, string add, string mobile)
        {

            try
            {
                MailMessage Msg = new MailMessage();
                SmtpClient smtp = new SmtpClient();
                // Sender e-mail address.
                Msg.From = new MailAddress("payment@yallacheckinn.com", "Payment Details_Yallacheckin");
                Msg.To.Add("payment@yallacheckinn.com");
                Msg.To.Add(email);
                Msg.Subject = "Booking Payment Details";
                Msg.Body = mail_body(email, bookigref, name, pname, nat, cur, amt.ToString(), var_sta, add, mobile.ToString());
                Msg.IsBodyHtml = true;
                smtp.Host = "webmail.yallacheckinn.com";
                smtp.Credentials = new System.Net.NetworkCredential("payment@yallacheckinn.com", "pOo$e529");
                smtp.Send(Msg);
                Msg = null;


                MailMessage Msg1 = new MailMessage();
                SmtpClient smtp1 = new SmtpClient();
                // Sender e-mail address.
                Msg1.From = new MailAddress("payment@yallacheckinn.com", "Booking Details");
                Msg1.To.Add("payment@yallacheckinn.com");
                Msg1.To.Add("manishcs0019@gmail.com");
                Msg1.Subject = "Booking Details";
                Msg1.Body = mail_body(email, bookigref, name, pname, nat, cur, amt.ToString(), var_sta, add, mobile.ToString());
                Msg1.IsBodyHtml = true;
                smtp1.Host = "webmail.yallacheckinn.com";
                smtp1.Credentials = new System.Net.NetworkCredential("payment@yallacheckinn.com", "pOo$e529");
                smtp1.Send(Msg);
                Msg = null;




            }
            catch (Exception ex)
            {

            }



        }
        [WebMethod(EnableSession = true)]
        public string log_out()
        {

            Session.Abandon();
            return "true";
        }
        public string ConvertYHOO(string fromCurrency)
        {
            context = new QuatarPayemntEntities();
            string booking_ref_test = ""; string packeg_name = ""; string Amount = ""; string rate = "";
            dynamic query = (from s in context.TBLQU_PAYMENTRate.Where(x => x.Currency_From == fromCurrency).DefaultIfEmpty()
                             select new
                             {
                                 rate = s.rate,

                             }).ToList();

            foreach (var item in query)
            {

                rate = Convert.ToString(item.rate);
            }
            return rate;
        }
        public string mail_body(string email, string bookigref, string name, string pname, string nat, string cur,
        string amt, string var_sta, string add, string mobile)
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
            html = html.Replace("[[urlpayment]]", "http://payment.yallacheckinn.com/client/client_booking.aspx?Email=" + email + "&BookigRef=" + bookigref + "");

            return html;



        }

        [WebMethod(EnableSession = true)]
        public string getDataForBooking(string Booking)
        {

            var idParam1 = new SqlParameter
            {
                ParameterName = "Booking",
                Value = Booking
            };

            //Get student name of string type
            var courseList = context.ExecuteStoreQuery<getData>("exec getDataForBooking @Booking", idParam1).ToList<getData>();


            var str = "<table border='1'>";
            str += "<tr><td>Message</td><td>Attempt Date</td><td>Receipt No</td></tr>";
            for (var i = 0; i < courseList.Count; i++)
            {

                str += "<tr><td>" + courseList[i].vpc_Message + "</td><td>" + courseList[i].created_date + "</td><td>" + courseList[i].vpc_ReceiptNo + "</td></tr>";
            }

            str += "</table>";
            return str;
        }
    }
    public class test { public int ffvdfd { get; set; } }
    public class test123
    {
        public string Client_ID { get; set; }
        public string Client_nAME { get; set; }
        public string CLIENT_Address { get; set; }
        public string Client_MobileNo { get; set; }
        public string Client_Email { get; set; }
        public string Clinet_Nationallty { get; set; }
        public string Client_BookingRef { get; set; }
        public string Client_Packegname { get; set; }
        public string Clinet_Amount { get; set; }
        public string Clinet_Currency { get; set; }
        public string Payment_Status { get; set; }
        public string BankTrID { get; set; }
        public string TRID { get; set; }
        public int FailedAttempt { get; set; }
        public int FailedAttemptLimit { get; set; }
        public bool? IsBlocked { get; set; }
        public string modifieddate { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedDate { get; set; }

    }

    public class getData
    {
        public string vpc_Message { get; set; }
        public string created_date { get; set; }
        public string vpc_ReceiptNo { get; set; }
    }
}
