using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Security.Cryptography;
using System.Text;
using System.IO;
using System.Configuration;

namespace Qa_Payment
{
    public class utilityclass
    {
      
        public static string responce_url =ReadId("responceurl");// "http://localhost:49462/Client/Client_Payment_Status.aspx";
        public static string MerchentID = ReadId("MerchentID");// "DB91421";
        public static string Access_Code = ReadId("AccessCode");//"F3A0F3EF";
        public static string Secure_key = ReadId("Securekey");//"E8852DA532AEC9D1364842D633191795 ";
        public static string url_payment = ReadId("urlpayment");//"https://migs.mastercard.com.au/vpcpay";
        public static string VPC_Version = ReadId("VPCVersion");// "1";
        public static string Command_Type = ReadId("CommandType");//"pay";
        public static string Pa_Language = ReadId("PaLanguage");//"en";
        public static string web_site_url = ReadId("websiteurl");//"http://localhost:49462/";
        private static string Read(string keyName)
        {
            if (!string.IsNullOrEmpty(keyName.Trim()))
            {
                if (ConfigurationManager.AppSettings.AllKeys.Contains(keyName))
                {
                    return ConfigurationSettings.AppSettings[keyName].ToString();
                }
                else
                {
                   
                    return string.Empty;
                }
            }
            else
            {
               
                return string.Empty;
            }
        }
        public static string ReadId(string keyName)
        {
            return Read(keyName);
        }
        public static string Encrypt(string clearText)
        {
            string EncryptionKey = "MAKV2SPBNI99212";
            byte[] clearBytes = Encoding.Unicode.GetBytes(clearText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(clearBytes, 0, clearBytes.Length);
                        cs.Close();
                    }
                    clearText = Convert.ToBase64String(ms.ToArray());
                }
            }
            return clearText;
        }
        public static string Decrypt(string cipherText)
        {
            string EncryptionKey = "MAKV2SPBNI99212";
            byte[] cipherBytes = Convert.FromBase64String(cipherText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(cipherBytes, 0, cipherBytes.Length);
                        cs.Close();
                    }
                    cipherText = Encoding.Unicode.GetString(ms.ToArray());
                }
            }
            return cipherText;
        }
    }
}