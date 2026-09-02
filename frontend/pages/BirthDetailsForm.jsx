import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import Select from "react-select";

const places = [
  { value: "mumbai_maharashtra_india", label: "Mumbai, Maharashtra, India" },
  { value: "delhi_delhi_india", label: "Delhi, Delhi, India" },
  { value: "bangalore_karnataka_india", label: "Bangalore, Karnataka, India" },
  { value: "hyderabad_telangana_india", label: "Hyderabad, Telangana, India" },
  { value: "ahmedabad_gujarat_india", label: "Ahmedabad, Gujarat, India" },
  { value: "chennai_tamil_nadu_india", label: "Chennai, Tamil Nadu, India" },
  { value: "kolkata_west_bengal_india", label: "Kolkata, West Bengal, India" },
  { value: "surat_gujarat_india", label: "Surat, Gujarat, India" },
  { value: "pune_maharashtra_india", label: "Pune, Maharashtra, India" },
  { value: "jaipur_rajasthan_india", label: "Jaipur, Rajasthan, India" },
  {
    value: "lucknow_uttar_pradesh_india",
    label: "Lucknow, Uttar Pradesh, India",
  },
  {
    value: "kanpur_uttar_pradesh_india",
    label: "Kanpur, Uttar Pradesh, India",
  },
  { value: "nagpur_maharashtra_india", label: "Nagpur, Maharashtra, India" },
  {
    value: "indore_madhya_pradesh_india",
    label: "Indore, Madhya Pradesh, India",
  },
  { value: "thane_maharashtra_india", label: "Thane, Maharashtra, India" },
  {
    value: "bhopal_madhya_pradesh_india",
    label: "Bhopal, Madhya Pradesh, India",
  },
  {
    value: "visakhapatnam_andhra_pradesh_india",
    label: "Visakhapatnam, Andhra Pradesh, India",
  },
  {
    value: "pimpri_chinchwad_maharashtra_india",
    label: "Pimpri-Chinchwad, Maharashtra, India",
  },
  { value: "patna_bihar_india", label: "Patna, Bihar, India" },
  { value: "vadodara_gujarat_india", label: "Vadodara, Gujarat, India" },
  {
    value: "ghaziabad_uttar_pradesh_india",
    label: "Ghaziabad, Uttar Pradesh, India",
  },
  { value: "ludhiana_punjab_india", label: "Ludhiana, Punjab, India" },
  { value: "agra_uttar_pradesh_india", label: "Agra, Uttar Pradesh, India" },
  { value: "nashik_maharashtra_india", label: "Nashik, Maharashtra, India" },
  { value: "faridabad_haryana_india", label: "Faridabad, Haryana, India" },
  {
    value: "meerut_uttar_pradesh_india",
    label: "Meerut, Uttar Pradesh, India",
  },
  { value: "rajkot_gujarat_india", label: "Rajkot, Gujarat, India" },
  {
    value: "kalyan_dombivli_maharashtra_india",
    label: "Kalyan-Dombivli, Maharashtra, India",
  },
  {
    value: "vasai_virar_maharashtra_india",
    label: "Vasai-Virar, Maharashtra, India",
  },
  {
    value: "varanasi_uttar_pradesh_india",
    label: "Varanasi, Uttar Pradesh, India",
  },
  {
    value: "srinagar_jammu_and_kashmir_india",
    label: "Srinagar, Jammu and Kashmir, India",
  },
  {
    value: "aurangabad_maharashtra_india",
    label: "Aurangabad, Maharashtra, India",
  },
  { value: "dhanbad_jharkhand_india", label: "Dhanbad, Jharkhand, India" },
  { value: "amritsar_punjab_india", label: "Amritsar, Punjab, India" },
  {
    value: "navi_mumbai_maharashtra_india",
    label: "Navi Mumbai, Maharashtra, India",
  },
  {
    value: "allahabad_uttar_pradesh_india",
    label: "Allahabad, Uttar Pradesh, India",
  },
  { value: "ranchi_jharkhand_india", label: "Ranchi, Jharkhand, India" },
  { value: "howrah_west_bengal_india", label: "Howrah, West Bengal, India" },
  {
    value: "coimbatore_tamil_nadu_india",
    label: "Coimbatore, Tamil Nadu, India",
  },
  {
    value: "jabalpur_madhya_pradesh_india",
    label: "Jabalpur, Madhya Pradesh, India",
  },
  {
    value: "gwalior_madhya_pradesh_india",
    label: "Gwalior, Madhya Pradesh, India",
  },
  {
    value: "vijayawada_andhra_pradesh_india",
    label: "Vijayawada, Andhra Pradesh, India",
  },
  { value: "jodhpur_rajasthan_india", label: "Jodhpur, Rajasthan, India" },
  { value: "madurai_tamil_nadu_india", label: "Madurai, Tamil Nadu, India" },
  { value: "raipur_chhattisgarh_india", label: "Raipur, Chhattisgarh, India" },
  { value: "kota_rajasthan_india", label: "Kota, Rajasthan, India" },
  {
    value: "chandigarh_chandigarh_india",
    label: "Chandigarh, Chandigarh, India",
  },
  { value: "guwahati_assam_india", label: "Guwahati, Assam, India" },
  { value: "solapur_maharashtra_india", label: "Solapur, Maharashtra, India" },
  {
    value: "hubli_dharwad_karnataka_india",
    label: "Hubli-Dharwad, Karnataka, India",
  },
  {
    value: "bareilly_uttar_pradesh_india",
    label: "Bareilly, Uttar Pradesh, India",
  },
  {
    value: "moradabad_uttar_pradesh_india",
    label: "Moradabad, Uttar Pradesh, India",
  },
  { value: "mysore_karnataka_india", label: "Mysore, Karnataka, India" },
  { value: "gurgaon_haryana_india", label: "Gurgaon, Haryana, India" },
  {
    value: "aligarh_uttar_pradesh_india",
    label: "Aligarh, Uttar Pradesh, India",
  },
  { value: "jalandhar_punjab_india", label: "Jalandhar, Punjab, India" },
  {
    value: "tiruchirappalli_tamil_nadu_india",
    label: "Tiruchirappalli, Tamil Nadu, India",
  },
  { value: "bhubaneswar_odisha_india", label: "Bhubaneswar, Odisha, India" },
  { value: "salem_tamil_nadu_india", label: "Salem, Tamil Nadu, India" },
  {
    value: "bhiwandi_maharashtra_india",
    label: "Bhiwandi, Maharashtra, India",
  },
  {
    value: "saharanpur_uttar_pradesh_india",
    label: "Saharanpur, Uttar Pradesh, India",
  },
  { value: "warangal_telangana_india", label: "Warangal, Telangana, India" },
  {
    value: "guntur_andhra_pradesh_india",
    label: "Guntur, Andhra Pradesh, India",
  },
  { value: "bikaner_rajasthan_india", label: "Bikaner, Rajasthan, India" },
  {
    value: "amravati_maharashtra_india",
    label: "Amravati, Maharashtra, India",
  },
  { value: "noida_uttar_pradesh_india", label: "Noida, Uttar Pradesh, India" },
  {
    value: "jamshedpur_jharkhand_india",
    label: "Jamshedpur, Jharkhand, India",
  },
  { value: "bhilai_chhattisgarh_india", label: "Bhilai, Chhattisgarh, India" },
  { value: "cuttack_odisha_india", label: "Cuttack, Odisha, India" },
  {
    value: "firozabad_uttar_pradesh_india",
    label: "Firozabad, Uttar Pradesh, India",
  },
  { value: "kochi_kerala_india", label: "Kochi, Kerala, India" },
  {
    value: "nellore_andhra_pradesh_india",
    label: "Nellore, Andhra Pradesh, India",
  },
  { value: "bhavnagar_gujarat_india", label: "Bhavnagar, Gujarat, India" },
];
const BirthDetailsForm = ({ onSubmit }) => {
  const [dob, setDob] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dob && time && place) {
      
      onSubmit({ dob, time: `${time}`, place });
    }
  };

  return (
    <div className="max-w-md bg-gray-900 text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">Birth Details</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Date of Birth Field */}
        <div className="relative">
          <label className="block mb-1 text-gray-300">Date of Birth</label>
          <div className="relative">
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full p-3 bg-gray-800 text-white rounded-md focus:ring focus:ring-gray-500"
              required
            />
            {/* <FaCalendarAlt className="absolute right-3 top-3 text-gray-400" /> */}
          </div>
        </div>
        {/* Time of Birth Field */}
        <div>
          <label className="block mb-1 text-gray-300">Time of Birth</label>
          <div className="flex items-center gap-2">
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-3 bg-gray-800 text-white rounded-md focus:ring focus:ring-gray-500"
              required
            />
          </div>
        </div>
        {/* Place of Birth Field */}
        <div>
          <label className="block mb-1 text-gray-300">Place of Birth</label>
          <Select
            options={places}
            value={place}
            onChange={setPlace}
            className="text-black"
            placeholder="Select a place..."
            isSearchable
            required
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="bg-gray-700 text-white p-3 rounded-md hover:bg-gray-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BirthDetailsForm;
