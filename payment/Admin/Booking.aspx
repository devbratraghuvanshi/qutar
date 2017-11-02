<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="Booking.aspx.cs" Inherits="Qa_Payment.Booking" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <script src="../Scripts/jquery-1.5.1.min.js" type="text/javascript"></script>
    <script src="../Scripts/jquery-ui-1.8.11.min.js" type="text/javascript"></script>
    <script src="../Scripts/one.app.js" type="text/javascript"></script>
    <script src="../Scripts/booking.js" type="text/javascript"></script>
    <script>
        $(function () {
            $("#li_CLIENT").addClass("active");
            $("#txt_Mobile").intlTelInput({
                // allowDropdown: false,
                // autoHideDialCode: false,
                // autoPlaceholder: "off",
                // dropdownContainer: "body",
                // excludeCountries: ["us"],
                // formatOnDisplay: false,
                // geoIpLookup: function(callback) {
                //   $.get("http://ipinfo.io", function() {}, "jsonp").always(function(resp) {
                //     var countryCode = (resp && resp.country) ? resp.country : "";
                //     callback(countryCode);
                //   });
                // },
                // initialCountry: "auto",
                // nationalMode: false,
                // onlyCountries: ['us', 'gb', 'ch', 'ca', 'do'],
                // placeholderNumberType: "MOBILE",
                // preferredCountries: ['cn', 'jp'],
                // separateDialCode: true,
                //  utilsScript: "build/js/utils.js"
            });

        });

    </script>
    <div style="margin-top: 15px">
        <div class="container">
            <div class="row">
                <%--<div class="col-lg-12 headBg">
  
  <h3 class="headBg">---- Booking ----</h3>
  </div>--%>
                <input type="hidden" value="" name="hdn_type_of_meeting" id="hdn_type_of_meeting">
                <input type="hidden" value="" name="hdn_lead_source" id="hdn_lead_source">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>First Name<span style="color: Red">*</span></label>
                        <div class="input-group">
                            <span class="input-group-addon">
                                <span aria-hidden="true" class="glyphicon glyphicon-user"></span>
                            </span>

                            <input type="text" value="" placeholder="First Name" onkeyup="valid(this,'special')"
                                onkeypress="return AllowAlphabet(event)" onblur="valid(this,'special')" name="Name" maxlength="50"
                                id="txt_name" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Last Name<span style="color: Red"></span></label>
                        <div class="input-group">
                            <span class="input-group-addon">
                                <span aria-hidden="true" class="glyphicon glyphicon-user"></span>
                            </span>

                            <input type="text" value="" placeholder="Last Name" onkeyup="valid(this,'special')"
                                onkeypress="return AllowAlphabet(event)" onblur="valid(this,'special')" name="Name" maxlength="50"
                                id="txt_lastname" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Address<span style="color: Red">*</span></label>
                        <div class="input-group">
                            <span class="input-group-addon">
                                <span aria-hidden="true" class="glyphicon glyphicon-map-marker"></span>
                            </span>

                            <input type="text" value="" placeholder="Address" name="Address" maxlength="100" id="txt_Address" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Mobile No.<span style="color: Red">*</span> </label>
                        <div class="input-group">
                            <%--<span class="input-group-addon">
                        	<span aria-hidden="true" class="glyphicon glyphicon-phone"></span>
                        </span>--%>
                            <input id="txt_Mobile" type="tel">
                            <%--<input type="text" value="" 
                placeholder="Mobile" onkeypress="return isNumberKey(event)"
                 name="Mobile_No"  id="txt_Mobile" class="form-control">--%>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Email Id<span style="color: Red">*</span></label>
                        <div class="input-group">
                            <span class="input-group-addon">
                                <span aria-hidden="true" class="glyphicon glyphicon-envelope"></span>
                            </span>

                            <input type="text" value="" placeholder="Email" name="Email_ID" maxlength="50" id="txt_Email" class="form-control">
                        </div>
                        <!-- Email -->
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label>Service Name<span style="color: Red">*</span></label>
                        <div class="input-group">
                            <span class="input-group-addon">
                                <span aria-hidden="true" class="glyphicon glyphicon-briefcase"></span>
                            </span>

                            <input type="text" value="" placeholder="Service Name" name="ddl_packegname" maxlength="25" id="ddl_packegname" class="form-control">
                        </div>



                    </div>
                    <div class="form-group">
                        <label>Nationality<span style="color: Red">*</span></label>
                        <div class="input-group">
                            <span class="input-group-addon">
                                <span aria-hidden="true" class="glyphicon glyphicon-briefcase"></span>
                            </span>
                            <select id="ddl_Nationality" class="form-control">
                                <option selected="selected" value="0">--Select---</option>
                                <option value="AL">Albania</option>
                                <option value="AD">Andorra</option>
                                <option value="AG">Antigua and Barbuda</option>
                                <option value="AR">Argentina</option>
                                <option value="AM">Armenia</option>
                                <option value="AW">Aruba</option>
                                <option value="AU">Australia</option>
                                <option value="AT">Austria</option>
                                <option value="AZ">Azerbaijan</option>
                                <option value="BS">Bahamas</option>
                                <option value="BH">Bahrain</option>
                                <option value="BD">Bangladesh</option>
                                <option value="BB">Barbados</option>
                                <option value="BY">Belarus</option>
                                <option value="BE">Belgium</option>
                                <option value="BM">Bermuda</option>
                                <option value="BO">Bolivia</option>
                                <option value="BA">Bosnia Herzegovina</option>
                                <option value="BW">Botswana</option>
                                <option value="BR">Brazil</option>
                                <option value="VG">British Virgin Islands</option>
                                <option value="BN">Brunei Darussalam</option>
                                <option value="BG">Bulgaria</option>
                                <option value="KH">Cambodia</option>
                                <option value="CM">Cameroon</option>
                                <option value="CA">Canada</option>
                                <option value="KY">Cayman Islands</option>
                                <option value="CL">Chile</option>
                                <option value="CN">China</option>
                                <option value="CO">Colombia</option>
                                <option value="CD">Congo (Democratic Republic)</option>
                                <option value="CG">Congo (Republic of)</option>
                                <option value="CK">Cook Islands</option>
                                <option value="CR">Costa Rica</option>
                                <option value="HR">Croatia</option>
                                <option value="CU">Cuba</option>
                                <option value="CY">Cyprus</option>
                                <option value="CZ">Czech Republic</option>
                                <option value="DK">Denmark</option>
                                <option value="DO">Dominican Republic</option>
                                <option value="EC">Ecuador</option>
                                <option value="EG">Egypt</option>
                                <option value="EE">Estonia</option>
                                <option value="ET">Ethiopia</option>
                                <option value="FJ">Fiji</option>
                                <option value="FI">Finland</option>
                                <option value="FR">France</option>
                                <option value="PF">French Polynesia</option>
                                <option value="GA">Gabon</option>
                                <option value="GM">Gambia</option>
                                <option value="GE">Georgia</option>
                                <option value="DE">Germany</option>
                                <option value="GI">Gibraltar</option>
                                <option value="GR">Greece</option>
                                <option value="GL">Greenland</option>
                                <option value="GD">Grenada</option>
                                <option value="GP">Guadeloupe</option>
                                <option value="GU">Guam</option>
                                <option value="GT">Guatemala</option>
                                <option value="HT">Haiti</option>
                                <option value="HN">Honduras</option>
                                <option value="HK">Hong Kong</option>
                                <option value="HU">Hungary</option>
                                <option value="IS">Iceland</option>
                                <option value="IN">India</option>
                                <option value="ID">Indonesia</option>
                                <option value="IR">Iran</option>
                                <option value="IQ">Iraq</option>
                                <option value="IE">Ireland (Republic of)</option>
                                <option value="IL">Israel</option>
                                <option value="IT">Italy</option>
                                <option value="JM">Jamaica</option>
                                <option value="JP">Japan</option>
                                <option value="JO">Jordan</option>
                                <option value="KZ">Kazakhstan</option>
                                <option value="KE">Kenya</option>
                                <option value="KW">Kuwait</option>
                                <option value="KG">Kyrgyzstan</option>
                                <option value="LA">Laos</option>
                                <option value="LV">Latvia</option>
                                <option value="LB">Lebanon</option>
                                <option value="LY">Libya</option>
                                <option value="LI">Liechtenstein</option>
                                <option value="LT">Lithuania</option>
                                <option value="LU">Luxembourg</option>
                                <option value="MO">Macau</option>
                                <option value="MK">Macedonia</option>
                                <option value="MY">Malaysia</option>
                                <option value="MV">Maldives</option>
                                <option value="ML">Mali</option>
                                <option value="MT">Malta</option>
                                <option value="MU">Mauritius</option>
                                <option value="MX">Mexico</option>
                                <option value="MD">Moldova</option>
                                <option value="MC">Monaco</option>
                                <option value="MN">Mongolia</option>
                                <option value="MA">Morocco</option>
                                <option value="MZ">Mozambique</option>
                                <option value="MM">Myanmar</option>
                                <option value="NA">Namibia</option>
                                <option value="NP">Nepal</option>
                                <option value="NL">Netherlands</option>
                                <option value="AN">Netherlands Antilles</option>
                                <option value="NC">New Caledonia</option>
                                <option value="NZ">New Zealand</option>
                                <option value="NI">Nicaragua</option>
                                <option value="NG">Nigeria</option>
                                <option value="KP">North Korea</option>
                                <option value="NO">Norway</option>
                                <option value="OM">Oman</option>
                                <option value="PK">Pakistan</option>
                                <option value="PA">Panama</option>
                                <option value="PY">Paraguay</option>
                                <option value="PE">Peru</option>
                                <option value="PH">Philippines</option>
                                <option value="PL">Poland</option>
                                <option value="PT">Portugal</option>
                                <option value="PR">Puerto Rico</option>
                                <option value="QA">Qatar</option>
                                <option value="RO">Romania</option>
                                <option value="RU">Russia</option>
                                <option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>
                                <option value="KN">Saint Kitts and Nevis</option>
                                <option value="LC">Saint Lucia</option>
                                <option value="MF">Saint Martin (French part)</option>
                                <option value="VC">Saint Vincent and the Grenadines</option>
                                <option value="SM">San Marino (Republic of)</option>
                                <option value="SA">Saudi Arabia</option>
                                <option value="SN">Senegal</option>
                                <option value="RS">Serbia</option>
                                <option value="SC">Seychelles</option>
                                <option value="SG">Singapore</option>
                                <option value="SK">Slovakia</option>
                                <option value="SI">Slovenia</option>
                                <option value="ZA">South Africa</option>
                                <option value="KR">South Korea</option>
                                <option value="ES">Spain</option>
                                <option value="LK">Sri Lanka</option>
                                <option value="SZ">Swaziland</option>
                                <option value="SE">Sweden</option>
                                <option value="CH">Switzerland</option>
                                <option value="SY">Syria</option>
                                <option value="TW">Taiwan</option>
                                <option value="TJ">Tajikistan</option>
                                <option value="TZ">Tanzania</option>
                                <option value="TH">Thailand</option>
                                <option value="TG">Togo</option>
                                <option value="TT">Trinidad &amp; Tobago</option>
                                <option value="TN">Tunisia</option>
                                <option value="TR">Turkey</option>
                                <option value="TM">Turkmenistan</option>
                                <option value="TC">Turks and Caicos Islands</option>
                                <option value="UG">Uganda</option>
                                <option value="UA">Ukraine</option>
                                <option value="AE">United Arab Emirates</option>
                                <option value="GB">United Kingdom</option>
                                <option value="US">United States</option>
                                <option value="UY">Uruguay</option>
                                <option value="UZ">Uzbekistan</option>
                                <option value="VU">Vanuatu</option>
                                <option value="VE">Venezuela</option>
                                <option value="VN">Vietnam</option>
                                <option value="VI">Virgin Islands (USA)</option>
                                <option value="YE">Yemen Republic</option>
                                <option value="ZM">Zambia</option>
                                <option value="ZW">Zimbabwe</option>

                            </select>
                        </div>



                    </div>
                    <div class="form-group">
                        <label>Currency<span style="color: Red">*</span></label>
                        <div class="input-group">
                            <span class="input-group-addon">
                                <span aria-hidden="true" class="glyphicon glyphicon-briefcase"></span>
                            </span>
                            <select id="ddl_currency" onchange="currency_sign()" class="form-control">
                                <option value="BHD">Bahraini Dinar (BHD)</option>
                                <option value="QAR" selected="selected">Qatari Rial (QAR)</option>
                                <option value="KWD">Kuwaiti Dinar (KWD)</option>
                                <option value="OMR">Omani Rial (OMR)</option>
                                <option value="SAR">Saudi Riyal (SAR)</option>
                                <option value="AED">United Arab Emirates Dirham (AED)</option>
                                <option value="EUR">Euro (EUR)</option>
                                <option value="GBP">British Pound Sterling (GBP)</option>
                                <option value="USD">US Dollar (USD)</option>


                            </select>
                        </div>


                    </div>
                    <div class="form-group">
                        <label>Amount<span style="color: Red">*</span> </label>

                        <div class="input-group">
                            <span class="input-group-addon"><span class="" id="spn_logo" aria-hidden="true">QAR</span></span>
                            <%-- <i class="fa fa-inr"></i>
                            --%>
                            <input type="text" value="" placeholder="Amount" onkeypress="return isNumberKey(event)"
                                name="Meeting_Date" maxlength="20" id="txt_amount" class="form-control hasDatepicker">
                        </div>
                    </div>


                    <div class="form-group">
                        <label for="Description">Description:</label>
                        <textarea class="form-control" rows="3" id="Description"></textarea>
                    </div>


                    <div class="form-group" align="right">
                        <label></label>
                        <div class="input-group">
                            <span id="spn_error" style="color: Red; font-weight: bold"></span>
                            <input type="button" style="width: 150px;" value="Submit" id="btn_submit_add" class="btn btn-primary" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <style type="text/css">
        .country-list {
            z-index: 99 !important;
        }
    </style>
    <script type="text/javascript">
        $(function () {


        });

        var currency_symbols = {
            'USD': 'USD', // US Dollar
            'EUR': 'EUR', // Euro
            'CRC': '₡', // Costa Rican Colón
            'GBP': 'GBP', // British Pound Sterling
            'ILS': '₪', // Israeli New Sheqel
            'INR': '₹', // Indian Rupee
            'JPY': '¥', // Japanese Yen
            'KRW': '₩', // South Korean Won
            'NGN': '₦', // Nigerian Naira
            'PHP': '₱', // Philippine Peso
            'PLN': 'zł', // Polish Zloty
            'PYG': '₲', // Paraguayan Guarani
            'THB': '฿', // Thai Baht
            'UAH': '₴', // Ukrainian Hryvnia
            'VND': '₫', // Vietnamese Dong
            'QAR': 'QAR', // Vietnamese Don       
            'ALL': 'Lek',
            'AFN': '؋',
            'ARS': '$',
            'AWG': 'ƒ',
            'AUD': '$',
            'BSD': '$',
            'BBD': '$',
            'BYR': 'p.',
            'BZD': 'BZ$',
            'BMD': '$',
            'BOB': '$b',
            'BAM': 'KM',
            'BWP': 'P',
            'BHD': 'BHD',
            'KWD': 'KWD',
            'OMR': 'OMR',
            'SAR': 'SAR',
            'AED': 'AED',

        };
        function currency_sign() {

            var currency = $("#ddl_currency").val();
            $("#spn_logo").text(currency_symbols[currency])
        }
    </script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="../Scripts/intlTelInput.js" type="text/javascript"></script>
    <link href="../Styles/intlTelInput.css" rel="stylesheet" type="text/css" />
    <link href="../Styles/demo.css" rel="stylesheet" type="text/css" />
</asp:Content>
