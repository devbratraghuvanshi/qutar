using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Qa_Payment
{
    public partial class SiteMaster : System.Web.UI.MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            try
            {
                hdn_url.Value = utilityclass.web_site_url;
                client_name.InnerText = Session["Admin_nAME"].ToString();
                hdn_userid.Value = Session["Admin_UserName"].ToString();
                hdn_usertype.Value = Session["Admin_UserType"].ToString();
            }
            catch (Exception)
            {

                Response.Redirect("Login.aspx");
            }
        }
    }
}
