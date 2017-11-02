using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Qa_Payment.Client
{
    public class Location
    {
        public string IP { get; set; }
        public string CountryName { get; set; }
        public string CountryCode { get; set; }
        public string City { get; set; }
        public string RegionName { get; set; }
        public string RegionCode { get; set; }
        public string ZipCode { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public string TimeZone { get; set; }
    }
}