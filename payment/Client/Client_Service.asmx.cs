using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using Newtonsoft.Json;
using System.Collections;
using System.Text;
using qatarpayment;
using System.Data;
using System.Xml;

namespace Qa_Payment.Client
{
    /// <summary>
    /// Summary description for Client_Service
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class Client_Service : System.Web.Services.WebService
    {

        QuatarPayemntEntities context = new QuatarPayemntEntities();
        [WebMethod]
        public string HelloWorld()
        {
            return "Hello World";
        }
        [WebMethod]
        public string Booking_details(string mail_id, string booking_ref)
        {

            context = new QuatarPayemntEntities();

            dynamic query = (from s in context.TBLQU_CLIENTMASTER
                             from e in context.TBLQU_PAYMENTMASTER.Where(x => x.ClientID == s.ClientID).DefaultIfEmpty()
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
                                 Payment_Code = e.Status,
                                 ConvertedAmount = e.currencyrate,
                                 IsBlocked = e.IsBlocked || (e.FailedAttempt >= e.FailedAttemptLimit)

                             }).ToList().Where(x =>x.Client_BookingRef == booking_ref
                                 &&( x.Client_Email == mail_id || x.Client_MobileNo==mail_id)
                                  );


            string _result = JsonConvert.SerializeObject(query);
            return _result;

        }
        [WebMethod]
        public string Booking_hit(string mail_id, string booking_ref, bool termAndCondition)
        {

            context = new QuatarPayemntEntities();
            try
            {
                string ip;
                ip = HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
                if (string.IsNullOrEmpty(ip))
                {
                    ip = HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
                }
                string getdetails = "http://www.freegeoip.net/xml/" + ip;

                XmlDocument doc = new XmlDocument();
                doc.Load(getdetails);

                var loc = new TBLQU_UserLocation()
                {
                    BookingRef = booking_ref,
                    IP = doc.GetElementsByTagName("IP")[0].InnerText,
                    CountryCode = doc.GetElementsByTagName("CountryCode")[0].InnerText,
                    CountryName = doc.GetElementsByTagName("CountryName")[0].InnerText,
                    RegionCode = doc.GetElementsByTagName("RegionCode")[0].InnerText,
                    RegionName = doc.GetElementsByTagName("RegionName")[0].InnerText,
                    City = doc.GetElementsByTagName("City")[0].InnerText,
                    ZipCode = doc.GetElementsByTagName("ZipCode")[0].InnerText,
                    TimeZone = doc.GetElementsByTagName("TimeZone")[0].InnerText,
                    Latitude = doc.GetElementsByTagName("Latitude")[0].InnerText,
                    Longitude = doc.GetElementsByTagName("Longitude")[0].InnerText
                };


                context.TBLQU_UserLocation.AddObject(loc);
                context.SaveChanges();
            }
            catch (Exception ex)
            {

                
            }

            var Payment = context.TBLQU_PAYMENTMASTER.Where(x => x.BookingRef.Equals(booking_ref)).FirstOrDefault<TBLQU_PAYMENTMASTER>();
            if (Payment !=null)
            {
                Payment.FailedAttempt = Payment.FailedAttempt + 1;
            }
            context.SaveChanges();


            string booking_ref_test = ""; string packeg_name = ""; string Amount = ""; string rate="";
            dynamic query = (from s in context.TBLQU_CLIENTMASTER
                             from e in context.TBLQU_PAYMENTMASTER.Where(x => x.ClientID == s.ClientID).DefaultIfEmpty()
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
                                 Clinet_Currency_rate = e.currencyrate,

                             }).ToList().Where(x => x.Client_BookingRef == booking_ref && (x.Client_Email == mail_id || x.Client_MobileNo == mail_id));

            foreach (var item in query)
            {
                booking_ref_test = item.Client_BookingRef;
                packeg_name = item.Client_Packegname;
                Amount = Convert.ToString(item.Clinet_Amount);
                rate = Convert.ToString(item.Clinet_Currency_rate);
            }
            string _result = Payment_URL(booking_ref_test, packeg_name,Math.Round(Convert.ToDecimal(Amount)*Convert.ToDecimal(rate),2).ToString().Replace(".",""));
            return _result;

        }
        private string Payment_URL(string booking_ref, string packeg_name, string Amount)
        {
            string SECURE_SECRET = utilityclass.Secure_key; String url ="";
            string queryString = "";
            try
            {
                System.Collections.SortedList transactionData = new System.Collections.SortedList(new VPCStringComparer());

                string debugData = "<u>Data from Order Page</u><br/>";
                debugData += "<br/>Title=ASP.NET C# VPC 3-Party";
                debugData += "<br/>virtualPaymentClientURL=" + utilityclass.url_payment + "";
                debugData += "<br/>vpc_Version=" + utilityclass.VPC_Version + "";
                debugData += "<br/>vpc_Command=" + utilityclass.Command_Type + "";
                debugData += "<br/>vpc_AccessCode=" + utilityclass.Access_Code + "";
                debugData += "<br/>vpc_MerchTxnRef=" + booking_ref + "";
                debugData += "<br/>vpc_Merchant=" + utilityclass.MerchentID + "";
                debugData += "<br/>vpc_OrderInfo=" + packeg_name + "";
                debugData += "<br/>vpc_Amount=" + Amount + "";
                debugData += "<br/>vpc_ReturnURL=" + utilityclass.responce_url + "";
                debugData += "<br/>vpc_Locale=" + utilityclass.Pa_Language + "";
                debugData += "<br/>SubButL=Pay Now!";
                debugData += "<br/>vpc_TicketNo=<br/>";
                debugData += "<br/><u>Data from Transaction Sorted List</u><br/>";

                transactionData.Add("vpc_AccessCode", utilityclass.Access_Code);
                transactionData.Add("vpc_Amount", Amount);
                transactionData.Add("vpc_Command", utilityclass.Command_Type);
                transactionData.Add("vpc_Locale", utilityclass.Pa_Language);
                transactionData.Add("vpc_MerchTxnRef", booking_ref);
                transactionData.Add("vpc_Merchant", utilityclass.MerchentID);
                transactionData.Add("vpc_OrderInfo", packeg_name);
                transactionData.Add("vpc_ReturnURL", utilityclass.responce_url);
                transactionData.Add("vpc_Version", utilityclass.VPC_Version);
                transactionData.Add("AgainLink", utilityclass.responce_url);
                transactionData.Add("Title", packeg_name);

                // Connect to the Payment Client
                VPCRequest conn = new VPCRequest();
                // Add the Digital Order Fields for the functionality you wish to use
                // Core Transaction Fields
                conn.AddDigitalOrderField("vpc_Version", utilityclass.VPC_Version);
                conn.AddDigitalOrderField("vpc_Command", utilityclass.Command_Type);
                conn.AddDigitalOrderField("vpc_AccessCode", utilityclass.Access_Code);
                conn.AddDigitalOrderField("vpc_Merchant", utilityclass.MerchentID);
                conn.AddDigitalOrderField("vpc_ReturnURL", utilityclass.responce_url);
                conn.AddDigitalOrderField("vpc_MerchTxnRef", booking_ref);
                conn.AddDigitalOrderField("vpc_OrderInfo", packeg_name);
                conn.AddDigitalOrderField("vpc_Amount", Amount);
                conn.AddDigitalOrderField("vpc_Currency","QAR");
                conn.AddDigitalOrderField("vpc_Locale", utilityclass.Pa_Language);
                // Perform the transaction
             
                //Page.Response.Redirect(url);

                //string rawHashData = SECURE_SECRET;
                //string seperator = "?";
                //foreach (System.Collections.DictionaryEntry item in transactionData)
                //{
                //    debugData += item.Key.ToString() + "=" + item.Value.ToString() + "<br/>";
                //    queryString += seperator + System.Web.HttpUtility.UrlEncode(item.Key.ToString()) + "=" + System.Web.HttpUtility.UrlEncode(item.Value.ToString());
                //    seperator = "&";
                //    if (SECURE_SECRET.Length > 0)
                //    {
                //        rawHashData += item.Value.ToString();
                //    }
                //}
                //string signature = "";
                //if (SECURE_SECRET.Length > 0)
                //{
                //    signature = CreateMD5Signature(rawHashData);
                //    queryString += seperator + "vpc_SecureHash=" + signature;
                //    debugData += "<br/><u>Hash Data Input</u>: " + rawHashData + "<br/><br/><u>Signature Created</u>: " + signature + "<br/>";
                //}
                //debugData += "<br/><u>Final QueryString Data String</u>: " + queryString + "<br/><br/><a href=\'" + queryString + "'>Click here to proceed.</a><br/>";
                //// Page.Response.Redirect(queryString);

                url = conn.Create3PartyQueryString();

            }
            catch (Exception ex)
            {

            }
            return  url;
        }
        private string debugData = "";
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
    }
    public class VPCStringComparer : IComparer
    {
        /*
         <summary>Customised Compare Class</summary>
         <remarks>
         <para>
         The Virtual Payment Client need to use an Ordinal comparison to Sort on 
         the field names to create the MD5 Signature for validation of the message. 
         This class provides a Compare method that is used to allow the sorted list 
         to be ordered using an Ordinal comparison.
         </para>
         </remarks>
         */

        public int Compare(Object a, Object b)
        {
            /*
             <summary>Compare method using Ordinal comparison</summary>
             <param name="a">The first string in the comparison.</param>
             <param name="b">The second string in the comparison.</param>
             <returns>An int containing the result of the comparison.</returns>
             */

            // Return if we are comparing the same object or one of the 
            // objects is null, since we don't need to go any further.
            if (a == b) return 0;
            if (a == null) return -1;
            if (b == null) return 1;

            // Ensure we have string to compare
            string sa = a as string;
            string sb = b as string;

            // Get the CompareInfo object to use for comparing
            System.Globalization.CompareInfo myComparer = System.Globalization.CompareInfo.GetCompareInfo("en-US");
            if (sa != null && sb != null)
            {
                // Compare using an Ordinal Comparison.
                return myComparer.Compare(sa, sb, System.Globalization.CompareOptions.Ordinal);
            }
            throw new ArgumentException("a and b should be strings.");
        }
    }
   

}
