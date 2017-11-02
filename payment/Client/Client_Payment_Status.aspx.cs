using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;
using System.IO;
using System.Net.Mail;
using System.Net;
using System.Text.RegularExpressions;



namespace Qa_Payment.Client
{
    public partial class Client_Payment_Status : System.Web.UI.Page
    {
        QuatarPayemntEntities context = new QuatarPayemntEntities();
        private string debugData = "";
        private string getResponseDescription(string vResponseCode)
        {
            /* 
             <summary>Maps the vpc_TxnResponseCode to a relevant description</summary>
             <param name="vResponseCode">The vpc_TxnResponseCode returned by the transaction.</param>
             <returns>The corresponding description for the vpc_TxnResponseCode.</returns>
             */
            string result = "Unknown";

            if (vResponseCode.Length > 0)
            {
                switch (vResponseCode)
                {
                    case "0": result = "Transaction Successful"; break;
                    case "1": result = "Transaction Declined"; break;
                    case "2": result = "Bank Declined Transaction"; break;
                    case "3": result = "No Reply from Bank"; break;
                    case "4": result = "Expired Card"; break;
                    case "5": result = "Insufficient Funds"; break;
                    case "6": result = "Error Communicating with Bank"; break;
                    case "7": result = "Payment Server detected an error"; break;
                    case "8": result = "Transaction Type Not Supported"; break;
                    case "9": result = "Bank declined transaction (Do not contact Bank)"; break;
                    case "A": result = "Transaction Aborted"; break;
                    case "B": result = "Transaction Declined - Contact the Bank"; break;
                    case "C": result = "Transaction Cancelled"; break;
                    case "D": result = "Deferred transaction has been received and is awaiting processing"; break;
                    case "F": result = "3-D Secure Authentication failed"; break;
                    case "I": result = "Card Security Code verification failed"; break;
                    case "L": result = "Shopping Transaction Locked (Please try the transaction again later)"; break;
                    case "N": result = "Cardholder is not enrolled in Authentication scheme"; break;
                    case "P": result = "Transaction has been received by the Payment Adaptor and is being processed"; break;
                    case "R": result = "Transaction was not processed - Reached limit of retry attempts allowed"; break;
                    case "S": result = "Duplicate SessionID"; break;
                    case "T": result = "Address Verification Failed"; break;
                    case "U": result = "Card Security Code Failed"; break;
                    case "V": result = "Address Verification and Card Security Code Failed"; break;
                    default: result = "Unable to be determined"; break;
                }
            }
            return result;
        }
        private string displayAVSResponse(string vAVSResultCode)
        {
            /*
             <summary>Maps the vpc_AVSResultCode to a relevant description</summary>
             <param name="vAVSResultCode">The vpc_AVSResultCode returned by the transaction.</param>
             <returns>The corresponding description for the vpc_AVSResultCode.</returns>
             */
            string result = "Unknown";

            if (vAVSResultCode.Length > 0)
            {
                if (vAVSResultCode.Equals("Unsupported"))
                {
                    result = "AVS not supported or there was no AVS data provided";
                }
                else
                {
                    switch (vAVSResultCode)
                    {
                        case "X": result = "Exact match - address and 9 digit ZIP/postal code"; break;
                        case "Y": result = "Exact match - address and 5 digit ZIP/postal code"; break;
                        case "S": result = "Service not supported or address not verified (international transaction)"; break;
                        case "G": result = "Issuer does not participate in AVS (international transaction)"; break;
                        case "A": result = "Address match only"; break;
                        case "W": result = "9 digit ZIP/postal code matched, Address not Matched"; break;
                        case "Z": result = "5 digit ZIP/postal code matched, Address not Matched"; break;
                        case "R": result = "Issuer system is unavailable"; break;
                        case "U": result = "Address unavailable or not verified"; break;
                        case "E": result = "Address and ZIP/postal code not provided"; break;
                        case "N": result = "Address and ZIP/postal code not matched"; break;
                        case "0": result = "AVS not requested"; break;
                        default: result = "Unable to be determined"; break;
                    }
                }
            }
            return result;
        }
        private System.Collections.Hashtable splitResponse(string rawData)
        {
            /*
             * <summary>This function parses the content of the VPC response
             * <para>This function parses the content of the VPC response to extract the
             * individual parameter names and values. These names and values are then
             * returned as a Hashtable.</para>
             *
             * <para>The content returned by the VPC is a HTTP POST, so the content will
             * be in the format "parameter1=value&parameter2=value&parameter3=value".
             * i.e. key/value pairs separated by ampersands "&".</para>
             *
             * <param name="RawData"> data string containing the raw VPC response content
             * <returns> responseData - Hashtable containing the response data
             */
            System.Collections.Hashtable responseData = new System.Collections.Hashtable();
            try
            {
                // Check if there was a response containing parameters
                if (rawData.IndexOf("=") > 0)
                {
                    // Extract the key/value pairs for each parameter
                    foreach (string pair in rawData.Split('&'))
                    {
                        int equalsIndex = pair.IndexOf("=");
                        if (equalsIndex > 1 && pair.Length > equalsIndex)
                        {
                            string paramKey = System.Web.HttpUtility.UrlDecode(pair.Substring(0, equalsIndex));
                            string paramValue = System.Web.HttpUtility.UrlDecode(pair.Substring(equalsIndex + 1));
                            responseData.Add(paramKey, paramValue);
                        }
                    }
                }
                else
                {
                    // There were no parameters so create an error
                    responseData.Add("vpc_Message", "The data contained in the response was not a valid receipt.<br/>\nThe data was: <pre>" + rawData + "</pre><br/>\n");
                }
                return responseData;
            }
            catch (Exception ex)
            {
                // There was an exception so create an error
                responseData.Add("vpc_Message", "\nThe was an exception parsing the response data.<br/>\nThe data was: <pre>" + rawData + "</pre><br/>\n<br/>\nException: " + ex.ToString() + "<br/>\n");
                return responseData;
            }
        }
        private string CreateMD5Signature(string RawData)
        {
            /*
             <summary>Creates a MD5 Signature</summary>
             <param name="RawData">The string used to create the MD5 signautre.</param>
             <returns>A string containing the MD5 signature.</returns>
             */

            System.Security.Cryptography.MD5 hasher = System.Security.Cryptography.MD5CryptoServiceProvider.Create();
            byte[] HashValue = hasher.ComputeHash(Encoding.ASCII.GetBytes(RawData));

            string strHex = "";
            foreach (byte b in HashValue)
            {
                strHex += b.ToString("x2");
            }
            return strHex.ToUpper();
        }
        private void Page_Load(object sender, System.EventArgs e)
        {

            try
            {

           
           
                #region Info
                string SECURE_SECRET = "A2C2BF47D45714B5E546B64F1DFF1596 ";
                //Panel_Debug.Visible = false;
                //Panel_Receipt.Visible = false;
                //Panel_StackTrace.Visible = false;
                string message = "";
                bool errorExists = false;
                string txnResponseCode = "";
                string rawHashData = SECURE_SECRET;
                string bookingref=Page.Request.QueryString["vpc_MerchTxnRef"].ToString();
                #endregion
                #region InSert Into Payment His update
                    //dynamic query1 = (from s in context.TBLQU_PAYMENTHIS
                    //where s.vpc_MerchTxnRef == bookingref
                    //select new
                    //{
                    //vpc_MerchTxnRef = s.vpc_MerchTxnRef,

                    //}).ToList();

                    //if (query1.Count == 0)
                    //{
                        context = new QuatarPayemntEntities();
                        TBLQU_PAYMENTHIS objPAYMENTHIS = new TBLQU_PAYMENTHIS();
                        objPAYMENTHIS.vpc_MerchTxnRef = Page.Request.QueryString["vpc_MerchTxnRef"].Length > 0 ? Page.Request.QueryString["vpc_MerchTxnRef"] : "Unknown";
                        objPAYMENTHIS.vpc_TxnResponseCode = Page.Request.QueryString["vpc_TxnResponseCode"].Length > 0 ? Page.Request.QueryString["vpc_TxnResponseCode"] : "Unknown";
                        objPAYMENTHIS.vpc_Amount = Page.Request.QueryString["vpc_Amount"].Length > 0 ? Page.Request.QueryString["vpc_Amount"] : "Unknown";
                        objPAYMENTHIS.vpc_Command = Page.Request.QueryString["vpc_Command"].Length > 0 ? Page.Request.QueryString["vpc_Command"] : "Unknown";
                        objPAYMENTHIS.vpc_Version = Page.Request.QueryString["vpc_Version"].Length > 0 ? Page.Request.QueryString["vpc_Version"] : "Unknown";
                        objPAYMENTHIS.vpc_OrderInfo = Page.Request.QueryString["vpc_OrderInfo"].Length > 0 ? Page.Request.QueryString["vpc_OrderInfo"] : "Unknown";
                        objPAYMENTHIS.vpc_Merchant = Page.Request.QueryString["vpc_Merchant"].Length > 0 ? Page.Request.QueryString["vpc_Merchant"] : "Unknown";
                        objPAYMENTHIS.vpc_BatchNo = Page.Request.QueryString["vpc_BatchNo"].Length > 0 ? Page.Request.QueryString["vpc_BatchNo"] : "Unknown";
                        objPAYMENTHIS.vpc_Card = Page.Request.QueryString["vpc_Card"].Length > 0 ? Page.Request.QueryString["vpc_Card"] : "Unknown";
                        objPAYMENTHIS.vpc_ReceiptNo = Page.Request.QueryString["vpc_ReceiptNo"].Length > 0 ? Page.Request.QueryString["vpc_ReceiptNo"] : "Unknown";
                        objPAYMENTHIS.vpc_AuthorizeId = "test";// Page.Request.QueryString["vpc_AuthorizeId"].Length > 0 ? Page.Request.QueryString["vpc_AuthorizeId"] : "Unknown";
                        objPAYMENTHIS.vpc_AcqResponseCode = Page.Request.QueryString["vpc_AcqResponseCode"].Length > 0 ? Page.Request.QueryString["vpc_AcqResponseCode"] : "Unknown";
                        objPAYMENTHIS.vpc_TransactionNo = Page.Request.QueryString["vpc_TransactionNo"].Length > 0 ? Page.Request.QueryString["vpc_TransactionNo"] : "Unknown";
                        objPAYMENTHIS.vpc_Message = Page.Request.QueryString["vpc_Message"].Length > 0 ? Page.Request.QueryString["vpc_Message"] : "Unknown";
                        objPAYMENTHIS.created_date = DateTime.Now;
                        objPAYMENTHIS.modifed_date = DateTime.Now;
                        context.AddToTBLQU_PAYMENTHIS(objPAYMENTHIS);
                        context.SaveChanges();


                        context = new QuatarPayemntEntities();
                        using (QuatarPayemntEntities db = new QuatarPayemntEntities())
                        {
                            db.TBLQU_PAYMENTMASTER.Where(x => x.BookingRef == objPAYMENTHIS.vpc_MerchTxnRef).ToList().ForEach(x =>
                            {
                                x.Status = Convert.ToInt16(Page.Request.QueryString["vpc_TxnResponseCode"].ToString());
                                x.Var_Status = getResponseDescription(objPAYMENTHIS.vpc_TxnResponseCode);
                                x.payment_id = objPAYMENTHIS.vpc_ReceiptNo;
                                x.payment_token = objPAYMENTHIS.vpc_TransactionNo;
                                x.modifed_date = DateTime.Now;
                                x.PaymentDate = DateTime.Now.ToString();
                            });
                            db.SaveChanges();
                        }
                    //}
                 #endregion
                #region Booking Details
                    txnResponseCode = Page.Request.QueryString["vpc_TxnResponseCode"].Length > 0 ? 
                        Page.Request.QueryString["vpc_TxnResponseCode"] : "Unknown";
                    context = new QuatarPayemntEntities();
                    dynamic query = (from s in context.TBLQU_CLIENTMASTER
                                     from e1 in context.TBLQU_PAYMENTMASTER.Where(x => x.ClientID == s.ClientID).DefaultIfEmpty()
                                     select new
                                     {
                                         Client_ID = s.ClientID,
                                         Client_nAME = s.ClientfirstName + " " + s.ClientLastName,
                                         CLIENT_Address = s.Address,
                                         Client_MobileNo = s.MobileNo,
                                         Client_Email = s.EmailID,
                                         Clinet_Nationallty = s.Nationality,
                                         Client_BookingRef = e1.BookingRef,
                                         Client_Packegname = e1.PackageName,
                                         Clinet_Amount = e1.Amount,
                                         Clinet_Currency = e1.Currency,
                                         Payment_Status = e1.Var_Status,
                                         bookigtr=e1.payment_id

                                     }).ToList().Where(x => x.Client_BookingRef == Page.Request.QueryString["vpc_MerchTxnRef"].ToString()); 

                    foreach (var item in query)
                    {

                        _name.InnerText = item.Client_nAME;
                        _address.InnerText = item.CLIENT_Address;
                        _packeg_name.InnerText = item.Client_Packegname;
                        _nationality.InnerText = item.Clinet_Nationallty;
                        _mobileno.InnerText = Convert.ToString(item.Client_MobileNo);
                        _currency.InnerText = item.Clinet_Currency;
                        _emailid.InnerText = item.Client_Email;
                        _amount.InnerText = Convert.ToString(item.Clinet_Amount); 
                        if (txnResponseCode == "0")
                        {

                            _status.InnerHtml = "<b style='color:green'>" + getResponseDescription(txnResponseCode) + "</b>";
                        }
                        else
                        {

                            _status.InnerHtml = "<b style='color:red'>" + getResponseDescription(txnResponseCode) + "</b>";

                        }

                        _booking.InnerText = item.Client_BookingRef;

                        send_mail(
                                    item.Client_Email, 
                                    item.Client_BookingRef, 
                                    item.Client_nAME, 
                                    item.Client_Packegname,
                                    item.Clinet_Nationallty,
                                    item.Clinet_Currency,
                                    item.Clinet_Amount,
                                    getResponseDescription(txnResponseCode),
                                    item.CLIENT_Address,
                                    item.Client_MobileNo,
                                    item.bookigtr
                        );
                    }               
              

                   
                #endregion

            }
            catch (Exception)
            {

                Response.Write("Some Error");
            }
       }
           
       public void send_mail(string email, string bookigref, string name, string pname, string nat, string cur, string amt
          , string var_sta, string add, string mobile,string trid)
        {

            try
            {
                MailMessage Msg = new MailMessage();
                SmtpClient smtp = new SmtpClient();
                // Sender e-mail address.
                Msg.From = new MailAddress("payment@yallacheckinn.com", var_sta);
                Msg.To.Add("payment@yallacheckinn.com");
                Msg.To.Add(email);
                Msg.Subject = "YC:" + var_sta + " <" + trid + ">";
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


        public string mail_body(string email, string bookigref, string name, string pname, string nat, string cur,string amt, string var_sta, string add, string mobile)
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
    }
}