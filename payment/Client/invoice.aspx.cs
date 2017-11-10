using iTextSharp.text;
using iTextSharp.text.html.simpleparser;
using iTextSharp.text.pdf;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Qa_Payment.Client
{
    public partial class invoice : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
           string bookingRef = Request["bookingRef"];
            string email = Request["email"];

            try
            {
                dynamic bookingDetail = GetBooking_details(email, bookingRef);

                string strHtml = string.Empty;
                //HTML File path -http://aspnettutorialonline.blogspot.com/
                string htmlFileName = Server.MapPath("~") + "\\client\\" + "invoicetemplate.html";
                //pdf file path. -http://aspnettutorialonline.blogspot.com/
                //  string pdfFileName = Request.PhysicalApplicationPath + "\\client\\invoice\\" + "invoice.pdf";

                //reading html code from html file
                FileStream fsHTMLDocument = new FileStream(htmlFileName, FileMode.Open, FileAccess.Read);
                StreamReader srHTMLDocument = new StreamReader(fsHTMLDocument);
                strHtml = srHTMLDocument.ReadToEnd();
                srHTMLDocument.Close();

                strHtml = strHtml.Replace("\r\n", "");
                strHtml = strHtml.Replace("\0", "");

                strHtml = strHtml.Replace("{{Date}}", bookingDetail.PaymentDate.Substring(0,10));
                strHtml = strHtml.Replace("{{InvoiceNumber}}", bookingRef + bookingDetail.PaymentDate.Substring(0, 16).Replace("/","").Replace(":", "").Replace(" ", ""));
                strHtml = strHtml.Replace("{{ClientName}}", bookingDetail.Client_nAME);
                strHtml = strHtml.Replace("{{CustomerEmail}}", bookingDetail.Client_Email);
                strHtml = strHtml.Replace("{{MobileNumber}}", bookingDetail.Client_MobileNo);
                strHtml = strHtml.Replace("{{Address}}", bookingDetail.CLIENT_Address);
                strHtml = strHtml.Replace("{{BookingReferance}}", bookingRef);
                strHtml = strHtml.Replace("{{ServiceName}}", bookingDetail.Client_Packegname);
                strHtml = strHtml.Replace("{{Description}}", bookingDetail.Description);
                strHtml = strHtml.Replace("{{PaymentStatus}}", bookingDetail.Payment_Status);
                strHtml = strHtml.Replace("{{TotalPrice}}", bookingDetail.Clinet_Amount);

                CreatePDFFromHTMLFile(strHtml);

             //   Response.Write("pdf creation successfully with password -http://aspnettutorialonline.blogspot.com/");
            }
            catch (Exception ex)
            {
                Response.Write(ex.Message);
            }

        }


        public void CreatePDFFromHTMLFile(string HtmlStream)
        {
            try
            {
                StringReader sr = new StringReader(HtmlStream.ToString());

                Document pdfDoc = new Document(PageSize.A4, 10f, 10f, 10f, 0f);
                HTMLWorker htmlparser = new HTMLWorker(pdfDoc);
                using (MemoryStream memoryStream = new MemoryStream())
                {
                    PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);
                    pdfDoc.Open();

                    htmlparser.Parse(sr);
                    pdfDoc.Close();

                    byte[] bytes = memoryStream.ToArray();
                    memoryStream.Close();

                    Response.Clear();
                    Response.ContentType = "application/pdf";
                    Response.AddHeader("Content-Disposition", "attachment; filename=Invoice.pdf");
                    Response.Buffer = true;
                    Response.Cache.SetCacheability(HttpCacheability.NoCache);
                    Response.BinaryWrite(bytes);
                    Response.End();
                    Response.Close();
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public dynamic GetBooking_details(string mail_id, string booking_ref)
        {
            QuatarPayemntEntities context = new QuatarPayemntEntities();

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
                                 IsBlocked = e.IsBlocked || (e.FailedAttempt >= e.FailedAttemptLimit),
                                 Description = e.Discription,
                                 PaymentDate = e.PaymentDate

                             }).ToList().Where(x => x.Client_BookingRef == booking_ref
                                 && (x.Client_Email == mail_id || x.Client_MobileNo == mail_id)
                                  ).FirstOrDefault();
            return query;

        }
    }
}