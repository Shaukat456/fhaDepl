
// ** React Imports


import { useContext, useEffect, useRef, useState } from "react";
// ** Third Party Components
import { User } from "react-feather";
import "cleave.js/dist/addons/cleave-phone.us";
import { useForm } from "react-hook-form";
import "cleave.js/dist/addons/cleave-phone.us";
import "cleave.js/dist/addons/cleave-phone.pk";
import Cleave from "cleave.js/react";
import currencies from "currencies.json";
import axios from "axios";
import {
  Row,
  Col,
  Button,
  Form,
  Card,
  CardHeader,
  CardTitle,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Table,
} from "reactstrap";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import {
  inputSelectField,
  inputTextField,
  ReadOnlySlug,
  ReadOnlyTextField,
} from "../../components/common-functions/input-fields";
import { useSelector, useDispatch } from "react-redux";
import {
  hardRequest,
  hardRequestViaAxios,
  softRequest,
} from "../../../@core/auth/request";
import {
  ADD_CONSUMER,
  CONSUMER_TYPE,
  GET_ALL_CONSUMER,
} from "../../../@core/auth/req.config";
import { errorToast, successToast } from "../../../@core/components/toastify";

import { countries2 } from "../../forms/form-elements/input-mask/countryListCode";
import { BasicHookForm2 } from "../../forms/validations/react-hook-form/BasicHookForm";

import ConsumerType from "../consumer";

import util from "util";
import { CustomTableResponsive2 } from "../../tables/reactstrap/TableResponsive";
import { CustomPagination } from "../../components/pagination/PaginationSeparated";
import ComponentSpinner from "../../../@core/components/spinner/Loading-spinner";
// import ProduceR from "../Producer/ProduceR";
// console.log(countries)

// var removeName=countries.map((curr)=>{
//     delete curr.name;
//     return curr;
// })
// console.log(removeName)

var countries = [
  { name: "Afghanistan", value: "AF", label: 93 },
  { name: "Aland Islands", value: "AX", label: 358 },
  { name: "Albania", value: "AL", label: 355 },
  { name: "Algeria", value: "DZ", label: 213 },
  { name: "American Samoa", value: "AS", label: 1684 },
  { name: "Andorra", value: "AD", label: 376 },
  { name: "Angola", value: "AO", label: 244 },
  { name: "Anguilla", value: "AI", label: 1264 },
  { name: "Antarctica", value: "AQ", label: 672 },
  { name: "Antigua and Barbuda", value: "AG", label: 1268 },
  { name: "Argentina", value: "AR", label: 54 },
  { name: "Armenia", value: "AM", label: 374 },
  { name: "Aruba", value: "AW", label: 297 },
  { name: "Australia", value: "AU", label: 61 },
  { name: "Austria", value: "AT", label: 43 },
  { name: "Azerbaijan", value: "AZ", label: 994 },
  { name: "Bahamas", value: "BS", label: 1242 },
  { name: "Bahrain", value: "BH", label: 973 },
  { name: "Bangladesh", value: "BD", label: 880 },
  { name: "Barbados", value: "BB", label: 1246 },
  { name: "Belarus", value: "BY", label: 375 },
  { name: "Belgium", value: "BE", label: 32 },
  { name: "Belize", value: "BZ", label: 501 },
  { name: "Benin", value: "BJ", label: 229 },
  { name: "Bermuda", value: "BM", label: 1441 },
  { name: "Bhutan", value: "BT", label: 975 },
  { name: "Bolivia", value: "BO", label: 591 },
  { name: "Bonaire, Sint Eustatius and Saba", value: "BQ", label: 599 },
  { name: "Bosnia and Herzegovina", value: "BA", label: 387 },
  { name: "Botswana", value: "BW", label: 267 },
  { name: "Bouvet Island", value: "BV", label: 55 },
  { name: "Brazil", value: "BR", label: 55 },
  { name: "British Indian Ocean Territory", value: "IO", label: 246 },
  { name: "Brunei Darussalam", value: "BN", label: 673 },
  { name: "Bulgaria", value: "BG", label: 359 },
  { name: "Burkina Faso", value: "BF", label: 226 },
  { name: "Burundi", value: "BI", label: 257 },
  { name: "Cambodia", value: "KH", label: 855 },
  { name: "Cameroon", value: "CM", label: 237 },
  { name: "Canada", value: "CA", label: 1 },
  { name: "Cape Verde", value: "CV", label: 238 },
  { name: "Cayman Islands", value: "KY", label: 1345 },
  { name: "Central African Republic", value: "CF", label: 236 },
  { name: "Chad", value: "TD", label: 235 },
  { name: "Chile", value: "CL", label: 56 },
  { name: "China", value: "CN", label: 86 },
  { name: "Christmas Island", value: "CX", label: 61 },
  { name: "Cocos (Keeling) Islands", value: "CC", label: 672 },
  { name: "Colombia", value: "CO", label: 57 },
  { name: "Comoros", value: "KM", label: 269 },
  { name: "Congo", value: "CG", label: 242 },
  { name: "Congo, Democratic Republic of the Congo", value: "CD", label: 242 },
  { name: "Cook Islands", value: "CK", label: 682 },
  { name: "Costa Rica", value: "CR", label: 506 },
  { name: "Cote D'Ivoire", value: "CI", label: 225 },
  { name: "Croatia", value: "HR", label: 385 },
  { name: "Cuba", value: "CU", label: 53 },
  { name: "Curacao", value: "CW", label: 599 },
  { name: "Cyprus", value: "CY", label: 357 },
  { name: "Czech Republic", value: "CZ", label: 420 },
  { name: "Denmark", value: "DK", label: 45 },
  { name: "Djibouti", value: "DJ", label: 253 },
  { name: "Dominica", value: "DM", label: 1767 },
  { name: "Dominican Republic", value: "DO", label: 1809 },
  { name: "Ecuador", value: "EC", label: 593 },
  { name: "Egypt", value: "EG", label: 20 },
  { name: "El Salvador", value: "SV", label: 503 },
  { name: "Equatorial Guinea", value: "GQ", label: 240 },
  { name: "Eritrea", value: "ER", label: 291 },
  { name: "Estonia", value: "EE", label: 372 },
  { name: "Ethiopia", value: "ET", label: 251 },
  { name: "Falkland Islands (Malvinas)", value: "FK", label: 500 },
  { name: "Faroe Islands", value: "FO", label: 298 },
  { name: "Fiji", value: "FJ", label: 679 },
  { name: "Finland", value: "FI", label: 358 },
  { name: "France", value: "FR", label: 33 },
  { name: "French Guiana", value: "GF", label: 594 },
  { name: "French Polynesia", value: "PF", label: 689 },
  { name: "French Southern Territories", value: "TF", label: 262 },
  { name: "Gabon", value: "GA", label: 241 },
  { name: "Gambia", value: "GM", label: 220 },
  { name: "Georgia", value: "GE", label: 995 },
  { name: "Germany", value: "DE", label: 49 },
  { name: "Ghana", value: "GH", label: 233 },
  { name: "Gibraltar", value: "GI", label: 350 },
  { name: "Greece", value: "GR", label: 30 },
  { name: "Greenland", value: "GL", label: 299 },
  { name: "Grenada", value: "GD", label: 1473 },
  { name: "Guadeloupe", value: "GP", label: 590 },
  { name: "Guam", value: "GU", label: 1671 },
  { name: "Guatemala", value: "GT", label: 502 },
  { name: "Guernsey", value: "GG", label: 44 },
  { name: "Guinea", value: "GN", label: 224 },
  { name: "Guinea-Bissau", value: "GW", label: 245 },
  { name: "Guyana", value: "GY", label: 592 },
  { name: "Haiti", value: "HT", label: 509 },
  { name: "Heard Island and Mcdonald Islands", value: "HM", label: 0 },
  { name: "Holy See (Vatican City State)", value: "VA", label: 39 },
  { name: "Honduras", value: "HN", label: 504 },
  { name: "Hong Kong", value: "HK", label: 852 },
  { name: "Hungary", value: "HU", label: 36 },
  { name: "Iceland", value: "IS", label: 354 },
  { name: "India", value: "IN", label: 91 },
  { name: "Indonesia", value: "ID", label: 62 },
  { name: "Iran, Islamic Republic of", value: "IR", label: 98 },
  { name: "Iraq", value: "IQ", label: 964 },
  { name: "Ireland", value: "IE", label: 353 },
  { name: "Isle of Man", value: "IM", label: 44 },
  { name: "Israel", value: "IL", label: 972 },
  { name: "Italy", value: "IT", label: 39 },
  { name: "Jamaica", value: "JM", label: 1876 },
  { name: "Japan", value: "JP", label: 81 },
  { name: "Jersey", value: "JE", label: 44 },
  { name: "Jordan", value: "JO", label: 962 },
  { name: "Kazakhstan", value: "KZ", label: 7 },
  { name: "Kenya", value: "KE", label: 254 },
  { name: "Kiribati", value: "KI", label: 686 },
  { name: "Korea, Democratic People's Republic of", value: "KP", label: 850 },
  { name: "Korea, Republic of", value: "KR", label: 82 },
  { name: "Kosovo", value: "XK", label: 381 },
  { name: "Kuwait", value: "KW", label: 965 },
  { name: "Kyrgyzstan", value: "KG", label: 996 },
  { name: "Lao People's Democratic Republic", value: "LA", label: 856 },
  { name: "Latvia", value: "LV", label: 371 },
  { name: "Lebanon", value: "LB", label: 961 },
  { name: "Lesotho", value: "LS", label: 266 },
  { name: "Liberia", value: "LR", label: 231 },
  { name: "Libyan Arab Jamahiriya", value: "LY", label: 218 },
  { name: "Liechtenstein", value: "LI", label: 423 },
  { name: "Lithuania", value: "LT", label: 370 },
  { name: "Luxembourg", value: "LU", label: 352 },
  { name: "Macao", value: "MO", label: 853 },
  {
    name: "Macedonia, the Former Yugoslav Republic of",
    value: "MK",
    label: 389,
  },
  { name: "Madagascar", value: "MG", label: 261 },
  { name: "Malawi", value: "MW", label: 265 },
  { name: "Malaysia", value: "MY", label: 60 },
  { name: "Maldives", value: "MV", label: 960 },
  { name: "Mali", value: "ML", label: 223 },
  { name: "Malta", value: "MT", label: 356 },
  { name: "Marshall Islands", value: "MH", label: 692 },
  { name: "Martinique", value: "MQ", label: 596 },
  { name: "Mauritania", value: "MR", label: 222 },
  { name: "Mauritius", value: "MU", label: 230 },
  { name: "Mayotte", value: "YT", label: 269 },
  { name: "Mexico", value: "MX", label: 52 },
  { name: "Micronesia, Federated States of", value: "FM", label: 691 },
  { name: "Moldova, Republic of", value: "MD", label: 373 },
  { name: "Monaco", value: "MC", label: 377 },
  { name: "Mongolia", value: "MN", label: 976 },
  { name: "Montenegro", value: "ME", label: 382 },
  { name: "Montserrat", value: "MS", label: 1664 },
  { name: "Morocco", value: "MA", label: 212 },
  { name: "Mozambique", value: "MZ", label: 258 },
  { name: "Myanmar", value: "MM", label: 95 },
  { name: "Namibia", value: "NA", label: 264 },
  { name: "Nauru", value: "NR", label: 674 },
  { name: "Nepal", value: "NP", label: 977 },
  { name: "Netherlands", value: "NL", label: 31 },
  { name: "Netherlands Antilles", value: "AN", label: 599 },
  { name: "New Caledonia", value: "NC", label: 687 },
  { name: "New Zealand", value: "NZ", label: 64 },
  { name: "Nicaragua", value: "NI", label: 505 },
  { name: "Niger", value: "NE", label: 227 },
  { name: "Nigeria", value: "NG", label: 234 },
  { name: "Niue", value: "NU", label: 683 },
  { name: "Norfolk Island", value: "NF", label: 672 },
  { name: "Northern Mariana Islands", value: "MP", label: 1670 },
  { name: "Norway", value: "NO", label: 47 },
  { name: "Oman", value: "OM", label: 968 },
  { name: "Pakistan", value: "PK", label: 92 },
  { name: "Palau", value: "PW", label: 680 },
  { name: "Palestinian Territory, Occupied", value: "PS", label: 970 },
  { name: "Panama", value: "PA", label: 507 },
  { name: "Papua New Guinea", value: "PG", label: 675 },
  { name: "Paraguay", value: "PY", label: 595 },
  { name: "Peru", value: "PE", label: 51 },
  { name: "Philippines", value: "PH", label: 63 },
  { name: "Pitcairn", value: "PN", label: 64 },
  { name: "Poland", value: "PL", label: 48 },
  { name: "Portugal", value: "PT", label: 351 },
  { name: "Puerto Rico", value: "PR", label: 1787 },
  { name: "Qatar", value: "QA", label: 974 },
  { name: "Reunion", value: "RE", label: 262 },
  { name: "Romania", value: "RO", label: 40 },
  { name: "Russian Federation", value: "RU", label: 70 },
  { name: "Rwanda", value: "RW", label: 250 },
  { name: "Saint Barthelemy", value: "BL", label: 590 },
  { name: "Saint Helena", value: "SH", label: 290 },
  { name: "Saint Kitts and Nevis", value: "KN", label: 1869 },
  { name: "Saint Lucia", value: "LC", label: 1758 },
  { name: "Saint Martin", value: "MF", label: 590 },
  { name: "Saint Pierre and Miquelon", value: "PM", label: 508 },
  { name: "Saint Vincent and the Grenadines", value: "VC", label: 1784 },
  { name: "Samoa", value: "WS", label: 684 },
  { name: "San Marino", value: "SM", label: 378 },
  { name: "Sao Tome and Principe", value: "ST", label: 239 },
  { name: "Saudi Arabia", value: "SA", label: 966 },
  { name: "Senegal", value: "SN", label: 221 },
  { name: "Serbia", value: "RS", label: 381 },
  { name: "Serbia and Montenegro", value: "CS", label: 381 },
  { name: "Seychelles", value: "SC", label: 248 },
  { name: "Sierra Leone", value: "SL", label: 232 },
  { name: "Singapore", value: "SG", label: 65 },
  { name: "Sint Maarten", value: "SX", label: 1 },
  { name: "Slovakia", value: "SK", label: 421 },
  { name: "Slovenia", value: "SI", label: 386 },
  { name: "Solomon Islands", value: "SB", label: 677 },
  { name: "Somalia", value: "SO", label: 252 },
  { name: "South Africa", value: "ZA", label: 27 },
  {
    name: "South Georgia and the South Sandwich Islands",
    value: "GS",
    label: 500,
  },
  { name: "South Sudan", value: "SS", label: 211 },
  { name: "Spain", value: "ES", label: 34 },
  { name: "Sri Lanka", value: "LK", label: 94 },
  { name: "Sudan", value: "SD", label: 249 },
  { name: "Suriname", value: "SR", label: 597 },
  { name: "Svalbard and Jan Mayen", value: "SJ", label: 47 },
  { name: "Swaziland", value: "SZ", label: 268 },
  { name: "Sweden", value: "SE", label: 46 },
  { name: "Switzerland", value: "CH", label: 41 },
  { name: "Syrian Arab Republic", value: "SY", label: 963 },
  { name: "Taiwan, Province of China", value: "TW", label: 886 },
  { name: "Tajikistan", value: "TJ", label: 992 },
  { name: "Tanzania, United Republic of", value: "TZ", label: 255 },
  { name: "Thailand", value: "TH", label: 66 },
  { name: "Timor-Leste", value: "TL", label: 670 },
  { name: "Togo", value: "TG", label: 228 },
  { name: "Tokelau", value: "TK", label: 690 },
  { name: "Tonga", value: "TO", label: 676 },
  { name: "Trinidad and Tobago", value: "TT", label: 1868 },
  { name: "Tunisia", value: "TN", label: 216 },
  { name: "Turkey", value: "TR", label: 90 },
  { name: "Turkmenistan", value: "TM", label: 7370 },
  { name: "Turks and Caicos Islands", value: "TC", label: 1649 },
  { name: "Tuvalu", value: "TV", label: 688 },
  { name: "Uganda", value: "UG", label: 256 },
  { name: "Ukraine", value: "UA", label: 380 },
  { name: "United Arab Emirates", value: "AE", label: 971 },
  { name: "United Kingdom", value: "GB", label: 44 },
  { name: "United States", value: "US", label: 1 },
  { name: "United States Minor Outlying Islands", value: "UM", label: 1 },
  { name: "Uruguay", value: "UY", label: 598 },
  { name: "Uzbekistan", value: "UZ", label: 998 },
  { name: "Vanuatu", value: "VU", label: 678 },
  { name: "Venezuela", value: "VE", label: 58 },
  { name: "Viet Nam", value: "VN", label: 84 },
  { name: "Virgin Islands, British", value: "VG", label: 1284 },
  { name: "Virgin Islands, U.s.", value: "VI", label: 1340 },
  { name: "Wallis and Futuna", value: "WF", label: 681 },
  { name: "Western Sahara", value: "EH", label: 212 },
  { name: "Yemen", value: "YE", label: 967 },
  { name: "Zambia", value: "ZM", label: 260 },
  { name: "Zimbabwe", value: "ZW", label: 263 },
];



countries.map((curr) => {
  delete curr.name;
  return curr;
});

const DataType = [
  { value: "Number", label: "Number" },
  { value: "String", label: "String" },
  { value: "Radio", label: "Radio" },
  { value: "Dropdown", label: "Dropdown" },
];

const numopt = [
  { value: "MinValue", label: "Min Value" },
  { value: "MaxValue", label: "Max Value" },
  { value: "Dropdown", label: "Dropdown" },
];

const dropdOpt = [
  { value: "Amount", label: "Amount" },
  { value: "Percentage", label: "Percentage" },
  { value: "None", label: "None" },
];

const demData = [
  { id: 0, key: 0, label: "Consumer" },
  { id: 1, key: 1, label: "Consumer" },
  { id: 2, key: 2, label: "Consumer" },
];

const symbols = [
  { value: "$", label: "$" },
  { value: "$", label: "$" },
  { value: "$", label: "$" },
  { value: "$", label: "$" },
];

// const Country_Symbol_label=()=>{
//   // countries.forEach((country)=>{
//       // console.log(country.slice(0,6))
// })}

const AddConsumer = (props) => {

  // fields states
  const [selectFieldData, setSelectFieldData] = useState({});

  // const [NumberFieldData, setDatatype_FieldData] = useState({});
  const [Datatype_FieldData, setDatatype_FieldData] = useState({});
  const [NumberAttribute_Data, setNumberAttribute_Data] = useState({});
  const [savebtn, setsavebtn] = useState(false);

  const [extraState, setextraState] = useState();
  const [dropdownState, setdropdownState] = useState();
  const [Amount, setAmount] = useState();
  const [Dstate, setDstate] = useState();
  const [addNew, setAddNew] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState({
    code: countries[0].label,
    no: countries[0].value,
  });
  const [Num_DropDownValue, setNum_DropDownValue] = useState();
  const [Num_Drop_Amount, setNum_Drop_Amount] = useState({
    currencySymbol: countries[0].label,
    currencyLabel: countries[0].value,
  });

  const [storePhoneNum, setStorePhoneNum] = useState([]);
  const [page, setpage] = useState(1);
  const [limit, setlimit] = useState(5);
  const [loader, setloader] = useState(false);
  const [Consumer_Data, setConsumer_Data] = useState([]);


  //form states
  const [data, setdata] = useState(demData);
  const [nodata, setNodata] = useState(false);

  const [label, setLabel] = useState("");
  const [ke, setke] = useState("");
  const [formModal, setFormModal] = useState(false);

  const [btnstate, setBtnState] = useState(false);
  // const [data, setdata] = useState(Form_data);
  // const [nodata, setNodata] = useState(false);

  // const [label, setLabel] = useState("");
  // const [ke, setke] = useState("");

  //updated states
  const [Updatedlabel, setUpdatedlabel] = useState("");
  const [Updatedkey, setUpdatedkey] = useState("");

  // const [formModal, setFormModal] = useState(false);
  const [UpdateModal, setUpdateModal] = useState(false);
  const [IsEditedConsumer, setIsEditedConsumer] = useState();
  const [uId, setuId] = useState();

  const [EditLabel, setEditLabel] = useState();
  const [Editkey, setEditkey] = useState();
  const [SavebtnState, setSavebtnState] = useState(false);

  const [RecFormData, setRecFormData] = useState();

  // redux selector
  const userData = useSelector((state) => {
    state?.auth.userdata;
  });
 

  const { register, errors, handleSubmit, control, setValue, trigger, reset } =
    useForm();

  const storeValuesInDataTypeState = (data, key) => {
    const { value } = data;
    // console.log(data)
    if (!value) return;
    const numData = { ...Datatype_FieldData, ...data.type };
    console.log(numData);
    numData[key] = value;
    setDatatype_FieldData(numData);
  };

  useEffect(() => {
getAllConsumerType()
  }, [page]);


  const getAllConsumerType = async () => {
    // setloader(true)
    const response = await softRequest(
      `${CONSUMER_TYPE}?page=${page}&limit=${limit}`,
      "GET",  
      true,
      true
    );
    console.log(response);

    setloader(() => {
      return (
        <>
          <ComponentSpinner />
        </>
      );
    });

    setTimeout(() => {
      setloader(false);
    }, 1000);

    const { result } = response;
    console.log(result);
    setConsumer_Data(result);
  };


  //make it receive form data
  const onDataSubmit = async (num_data) => {
    try {
      console.log("num data", num_data);

      const attributes = [];

      const { title, max_value, min_value, key, label } = num_data;

      // if ( phoneNumber.no.length){
      StoreData(storePhoneNum, phoneNumber);

      trigger();
      if (Object.keys(Datatype_FieldData).length === 0)
        return errorToast("Required Field", ` Portion Required`);
      for (const [key, value] of Object.entries(Datatype_FieldData)) {
        if (!value) return errorToast("Required Field", `${key} is required`);
      }

      // body will change based on the type of value selected
      var body;

      if (Datatype_FieldData.type == "Number") {
        if (Num_DropDownValue === "Amount") {
          attributes.push({
            label: label,
            key: key,
            type: "number",
            values: "number",
            additionalFields: {
              maxValue: max_value,
              minValue: min_value,
              isPercentage: false,
              isAmount: true,
              currency: {
                currencyLabel: Num_Drop_Amount.currencyLabel,
                currencySymbol: Num_Drop_Amount.currencySymbol,
              },
            },
          });
          console.log("attributes", attributes);

          body = { title: title, label: label, attributes: attributes };
          console.log(body);
          console.log("body when number selected", body);
        }
        if (Num_DropDownValue === "Percentage") {
          attributes.push({
            label: label,
            key: key,
            type: "number",
            values: "number",
            additionalFields: {
              maxValue: max_value,
              minValue: min_value,
              isPercentage: true,
              isAmount: false,
            },
          });

          body = { title: title, label: label, attributes: attributes };
        }
        if (Num_DropDownValue === "None") {
          attributes.push({
            label: label,
            key: key,
            type: "number",
            values: "number",
            additionalFields: {
              maxValue: max_value,
              minValue: min_value,
              isPercentage: true,
              isAmount: false,
            },
          });

          body = { title: title, label: label, attributes: attributes };
        }


        // if (Num_DropDownValue === "None") {
        //   console.log("none selected ");
        //   // body={ title:title , label:label ,}
        // }
      }
      Datatype_FieldData.type == "String"
        ? (body = { ...Datatype_FieldData })
        : "";
      // Datatype_FieldData.type=='Radio' ? body={ ...Datatype_FieldData} : '' //?
      if (Datatype_FieldData.type == "Radio") {
        
        attributes.push({
            label:label,
            key:key,
            type:"radiobutton",
            values: [{ key: key, label: label }],
            additionalFields:null,
          
        });

        // console.log(attributes);
        body = { title: title, label: label, attributes };
        console.log("body",body)
      }
      if (Datatype_FieldData.type == "Dropdown") {
        
        attributes.push({
          label:label,
          key:key,
          type:"dropdown",
          values: [{ key: key, label: label }],
          additionalFields:null,
        
      });


        // console.log(attributes);
        body = { title: title, label: label, attributes };
        console.log("body",body)
      }


      const response = await hardRequest(
        CONSUMER_TYPE,
        body,

        //{...body,[body.attributes[0].additionalFields.currency]:{currencyLabel:"usd", currencySymbol:"$"},salman:"arshad"},
        //   {
        //     title : "new restaurant",
        //     label: "shaukat",
        //     attributes :[
        //          {
        //         label : "title",
        //         key : "key",
        //         type : "number",
        //         values:"number",
        //         additionalFields :
        //             {
        //                     maxValue:10,
        //                     minValue:5,
        //                     isPercentage:true,
        //                     isAmount:true,
        //                    currency:{
        //                     currencyLabel:"usd", currencySymbol:"$"}

        //            }

        //     }]
        // },
        "POST",
        true
      );

      const { ok, result } = response;
      if (!ok) return;

      if (ok) {
        return successToast("Success", "Consumer  added successfully");
      }
    } catch (error) {
      errorToast("Failure", "Something Went Wrong!");
      console.log(error);
    }
  };

  useEffect(() => {
    // UpdateConsumer
    UpdateBtn;
  }, [SavebtnState]);

  const UpdateBtn = (id) => {
    console.log(id);
    setUpdateModal(!UpdateModal);
    const { label, key } = data[id];
    // console.log(label)
    setSavebtnState(true);

    setBtnState(true);
  };

  useEffect(() => {
    setUpdatedlabel("");
    setUpdatedkey("");
  }, [data]);

  function openModal() {
    setFormModal(!formModal);
  }

  function EditConsumer(id) {
    let newEditedConsumer = data.find((cons) => {
      return cons.id === id;
    });

    console.log(newEditedConsumer.label);

    setEditLabel(newEditedConsumer.label);
    setEditkey(newEditedConsumer.key);
    setIsEditedConsumer(id);

    console.log(newEditedConsumer);
  }

  useEffect(() => {
    setLabel("");
    setke("");

    console.log("Refresh");
  }, [data]);

  function StoreData(prevData, NewData) {
    if (!NewData) {
      return;
      // return errorToast("ERROR", 'FILL ALL FIELDS')
    }
    if (prevData.length === 0) {
      return setStorePhoneNum([NewData]);
    }
    setStorePhoneNum({ NewData });
    // console.log(storePhoneNum)
    // successToast("Submitted" , "Phone number stored")
  }
  //make seperate states for types
  //make seperate states for dropdown inner values
  // fetch post to the api end point

  const getData = (data) => {
    //  console.log( "get data",data)
    setRecFormData(data);
  };

  const handle_Search = (e) => {
    if (!e) return;
  };

  useEffect(() => {
    storeValuesInDataTypeState;
  }, [Datatype_FieldData]);

  //use ref
  return (
    // seperate form for  Datatype _ Number
    <>
      <Card>
        <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom">
          <Form onSubmit={handleSubmit(onDataSubmit)}>
            <Row className="mt-1">
              <Col sm="12">
                <h4 className="mb-1">
                  <User size={20} className="mr-50" />
                  <span className="align-middle">Consumer Type</span>
                </h4>
              </Col>
            </Row>
            <Row>
              {/* <Col sm="12">
                <h4 className="mb-1 mt-2"> Consumer Type </h4>
              </Col> */}
              {inputTextField("Title", "Title", errors, register)}

              {inputTextField("Label", "Label", errors, register)}

              {/* Attributes */}
              <Col sm="12">
                <h4 className="mb-1 mt-2"> Attributes </h4>
              </Col>

              {inputTextField("label", "label", errors, register)}

              {inputTextField("Key", "Key", errors, register)}

              {inputSelectField("Type", "type", DataType, (e, key) => {
                register;
                let { value } = e;

                // get data from api
                storeValuesInDataTypeState(e, key);

                if (value === "Number") {
                  // storeValuesInDataTypeState(e,key)
                  // register;
                  setDstate(false);

                  // storeValuesInState
                  setextraState(() => {
                    return (
                      <>
                        {/* <Form> */}
                        {inputTextField(
                          "Min Value",
                          "Min value",
                          errors,
                          register
                        )}
                        {inputTextField(
                          "Max Value",
                          "Max value",
                          errors,
                          register
                        )}

                        {/* Seperate state for dropdown value that can store dropdown value */}
                        {inputSelectField(
                          "Dropdown",
                          "Dropdown",
                          dropdOpt,
                          (am) => {
                            // storeValuesInState(selectedD, `key ${am.label}`);
                            // storeValuesInState
                            // console.log(am.value);
                            // setNumberAttribute_Data({})
                            register;
                            let selectedD = am.value;
                            setNum_DropDownValue(selectedD);

                            //sep state for dropdown
                            // const body ={... numberfileddata, ...numdata,  ...dropdowndata }
                            // storeValuesInState(...am,9)

                            // console.log(selectFieldData);
                            // console.log(selectedD);

                            if (selectedD === "Amount") {
                              if (phoneNumber.no.length <= 0) {
                                errorToast("ERROR", "Phone number required");
                              }
                              const options = {
                                phone: true,
                                phoneRegionCode: "PK",
                              };
                              setAmount(() => {
                                return (
                                  <>
                                    <Col className="mb-1" md="6" sm="12">
                                      <InputGroup className="input-group-merge">
                                        {inputSelectField(
                                          "Currency Label",
                                          "Currency_Label",
                                          symbols,
                                          (currency_symbol_value) => {
                                            console.log(
                                              currency_symbol_value.label
                                            );
                                            // setsaveCurr_label(currency_symbol_value.label)
                                            setNum_Drop_Amount({
                                              ...Num_Drop_Amount,
                                              currencySymbol:
                                                currency_symbol_value.label,
                                            });
                                          }
                                        )}
                                        {inputSelectField(
                                          "Currency Symbol",
                                          "Currency_Symbol",
                                          countries2,
                                          (currency_label_value) => {
                                            console.log(
                                              currency_label_value.label
                                            );
                                            // setsaveCurr_label(currency_label_value.label)
                                            setNum_Drop_Amount({
                                              ...Num_Drop_Amount,
                                              currencyLabel:
                                                currency_label_value.label,
                                            });
                                          }
                                        )}

                                        <InputGroupAddon addonType="prepend"></InputGroupAddon>
                                      </InputGroup>

                                      {/* {    phoneNumber.no.length  ?  StoreData(storePhoneNum,phoneNumber) :  errorToast("ERROR", 'FILL ALL FIELDS')} */}

                                      {/* { StoreData(storePhoneNum,phoneNumber)} */}
                                    <Cleave
                                      className="form-control"
                                      placeholder="*********"
                                      onChange={(pn) => {
                                        setPhoneNumber({
                                          ...phoneNumber,
                                          no: pn.target.value,
                                        });

                                        if (selectedD === "Percentage") {
                                          return (phoneNumber = null);
                                        }
                                        if (selectedD === "None") {
                                          return (phoneNumber = null);
                                        }

                                        // console.log(phoneNumber)
                                      }}
                                      datatype="number"
                                      // min={}
                                      // max={11}
                                      options={options}
                                      id="phone-number"
                                    />
                                    </Col>
                                    {/* <label htmlFor="phone-number">
                                      Phone Number
                                    </label> */}
                                  </>
                                );

                                // store phone number in a state ;
                                // send the state here with usecontext
                                // on change save to state

                                // return <PhoneM />;
                              });
                            }

                            //what to show in percentage
                            if (selectedD === "Percentage") {
                              setPhoneNumber(false);
                              // StoreData(false)
                              setAmount(false);
                            }
                            if (selectedD === "None") {
                              // StoreData(false)

                              setAmount(false);
                            }
                          }
                        )}
                        {/* {inputSelectField("Dropdown", "Dropdown", dropdOpt,storeValuesInState)} */}
                        {/* </Form> */}
                      </>
                    );
                  });
                }

                if (value === "String") {
                  //only type will go to backend in case of string
                  // fix min/max values they shouldnt go to be
                  // storeValuesInDataTypeState(e, key);
                  
                  setextraState("");
                  setextraState(false);
                  setdropdownState(false);
                  setAmount(false);
                  setDstate(false);
                }

                if (value === "Dropdown") {
                  //on dropdown select store values in state
                  // storeValuesInDataTypeState(e, key);
                  setextraState(false);
                  setdropdownState(false);
                  setAmount(false);

                  // setextraState(() => {
                  //   return (
                  //     // <BasicHookForm2 getData={getData} Form_data={demData} />
                  //   );
                  // });

                  // });
                }
                if (value === "Radio") {
                  //??
                  setextraState(false);
                  setdropdownState(false);
                  setAmount(false);
                  setDstate(false);

                  // setextraState(() => {
                  //   return (
                  //     <BasicHookForm2 getData={getData} Form_data={demData} />
                  //   );
                  // });
                }
              })}

              {/* <DropdownAdmin/> */}
              {extraState}
              {dropdownState}
              {Amount}
              {Dstate}
              {addNew}
              {savebtn}

              {/* <DataTableWithButtons/> */}
              {/* <AddNewModal/> */}
              {/* <Tables/> */}

              <Col className="d-flex flex-sm-row flex-column mt-2">
                <Button
                  type="submit"
                  color="primary"
                  className="mb-1 mb-sm-0 mr-0 mr-sm-1"
                >
                  Save Changes
                </Button>

                <Button type="reset" color="secondary" outline>
                  Reset
                </Button>
              </Col>
            </Row>
          </Form>
        </CardHeader>

        {/* <Producer/> */}
      </Card>

      <Card>
      <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom">

      <ConsumerType />
      
      <CustomTableResponsive2
            list={Consumer_Data}
            PostUrl={GET_ALL_CONSUMER}
          />
          
<CustomPagination
            page={page}
            inc={() => {
              setpage(page + 1);
            }} 
            
            dec={()=>{
              setpage(page -1 )
            }}/>
              {/* <Button
            type="button"
            color="primary"
            className="  mb-sm-0  mr-sm-1  mx-1   mb-3"
            onClick={getAllConsumerType}
          >
            Get Consumer  type data
          </Button> */}
      </CardHeader>
      </Card>
    </>
  );
};

export default AddConsumer;
