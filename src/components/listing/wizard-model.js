import { isEmail, isPhone } from "@/lib/validation";

export const STEPS = [
  { id: "purpose", title: "Purpose", question: "What would you like to do?" },
  {
    id: "category",
    title: "Category",
    question: "Is it residential or commercial?",
  },
  {
    id: "type",
    title: "Property type",
    question: "What type of property is it?",
  },
  { id: "location", title: "Location", question: "Where is the property?" },
  { id: "details", title: "Details", question: "Tell us about the property" },
  { id: "amenities", title: "Amenities", question: "What does it offer?" },
  { id: "images", title: "Photos", question: "Add photos" },
  {
    id: "description",
    title: "Description",
    question: "Describe your property",
  },
  { id: "contact", title: "Contact", question: "How should buyers reach you?" },
  { id: "preview", title: "Preview", question: "Review and submit" },
];

export const EMPTY_LISTING = {
  country: "United States",
  state: "",
  city: "",
  locality: "",
  address: "",
  bedrooms: "",
  bathrooms: "",
  area: "",
  price: "",
  floor: "",
  amenities: [],
  images: [],
  title: "",
  description: "",
  contactName: "",
  contactPhone: "",
  contactEmail: "",
  contactRole: "owner",
};

const positive = (v) => v.trim() !== "" && Number(v) > 0;

export function validateStep(step, d) {
  const e = {};
  switch (step) {
    case "purpose":
      if (!d.purpose)
        e.purpose = "Choose whether you are selling or renting out.";
      break;
    case "category":
      if (!d.category) e.category = "Choose residential or commercial.";
      break;
    case "type":
      if (!d.propertyType) e.propertyType = "Choose a property type.";
      break;
    case "location":
      if (!d.country.trim()) e.country = "Country is required.";
      if (!d.state.trim()) e.state = "State is required.";
      if (!d.city.trim()) e.city = "City is required.";
      if (!d.locality.trim()) e.locality = "Locality is required.";
      if (d.address.trim().length < 5) e.address = "Enter the full address.";
      break;
    case "details":
      if (!positive(d.area)) e.area = "Enter the area in sq ft.";
      if (!positive(d.price))
        e.price =
          d.purpose === "rent"
            ? "Enter the monthly rent."
            : "Enter the asking price.";
      if (d.category === "residential" && d.propertyType !== "land") {
        if (d.bedrooms === "") e.bedrooms = "Select bedrooms.";
        if (d.bathrooms === "") e.bathrooms = "Select bathrooms.";
      }
      if (!d.furnishing) e.furnishing = "Select a furnishing status.";
      if (!d.possession) e.possession = "Select a possession status.";
      break;
    case "images":
      if (d.images.length === 0)
        e.images = "Add at least one photo to continue.";
      break;
    case "description":
      if (d.title.trim().length < 10)
        e.title = "Give your listing a title of at least 10 characters.";
      if (d.description.trim().length < 50)
        e.description =
          "Write at least 50 characters so buyers know what to expect.";
      break;
    case "contact":
      if (d.contactName.trim().length < 2) e.contactName = "Enter your name.";
      if (!isPhone(d.contactPhone))
        e.contactPhone = "Enter a valid phone number.";
      if (!isEmail(d.contactEmail))
        e.contactEmail = "Enter a valid email address.";
      break;
    default:
      break;
  }
  return e;
}
