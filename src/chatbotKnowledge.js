export const chatbotKnowledge = {
  contacts: [
    { name: "Rahul Chauhan", phone: "+91 95288 95118" },
    { name: "Rajeev Anand", phone: "+91 97208 78882" },
    { name: "Anil Anand", phone: "+91 98377 40000" },
    { name: "Vansh Chauhan", phone: "+91 87555 63983" }
  ],
  buyingIntentPhrases: [
    "i am interested",
    "i want to buy",
    "i want to book",
    "i want to visit",
    "i want more information",
    "contact me",
    "call me",
    "i am looking for a property",
    "i want to schedule a visit"
  ],
  fallbackResponse: "I'm sorry, I don't have that specific information available right now.\n\nFor the latest details, you can contact our project team directly.",
  intents: [
    {
      id: "LOCATION",
      keywords: ["where is it", "location", "where is the property", "where is the project", "address", "where"],
      answer: "Hare Krishna Resort & Suites is located in Rukmani Vihar, Vrindavan, just 2 minutes from ISKCON and Prem Mandir."
    },
    {
      id: "PROPERTY_TYPE",
      keywords: ["1 bhk", "how many rooms", "bedrooms", "apartment type", "what type of property", "type"],
      answer: "The project offers premium 1BHK apartments at Krishna Towers."
    },
    {
      id: "PRICE",
      keywords: ["how much", "price", "cost", "starting price", "what's the price", "what is the price"],
      answer: "The starting price is ₹45 Lacs."
    },
    {
      id: "APPROVALS",
      keywords: ["rera", "is it approved", "approved by mvda", "registered"],
      answer: "Yes. The project is UP RERA Registered and MVDA Approved."
    },
    {
      id: "TOWERS",
      keywords: ["towers", "what towers", "which towers"],
      answer: "The project site plan includes three residential towers: Tower Krishna, Tower Radha and Tower Gopika."
    },
    {
      id: "PAYMENT_PLAN",
      keywords: ["payment options", "can i pay over time", "payment plan", "easy payment"],
      answer: "Yes. A 2-year easy payment plan is available."
    },
    {
      id: "LOAN",
      keywords: ["loan", "home loan", "financing", "finance"],
      answer: "Yes. Loan facility is available for the project."
    },
    {
      id: "BEDROOMS",
      keywords: ["how many bedrooms", "spacious bedroom", "living room"],
      answer: "The apartments are 1BHK units featuring 1 spacious bedroom, a stylish living room and a modern bathroom."
    },
    {
      id: "AMENITIES",
      keywords: ["amenities", "facilities", "what is available"],
      answer: "The project includes a grand on-site temple, swimming pool, green park, 24x7 water supply and a secure and peaceful environment."
    },
    {
      id: "STRUCTURE",
      keywords: ["earthquake", "building structure", "rcc", "strong"],
      answer: "The project has a 100% RCC structure designed to provide a strong, safe and earthquake-resistant structure."
    },
    {
      id: "SPACIOUS",
      keywords: ["spacious", "ventilated"],
      answer: "Yes. The apartments are described as spacious, well designed and well ventilated."
    },
    {
      id: "FITTINGS",
      keywords: ["fittings", "finishes"],
      answer: "The apartments feature premium fittings and finishes."
    },
    {
      id: "TEMPLE",
      keywords: ["temple", "is there a temple", "mandir"],
      answer: "Yes. The project features a grand on-site temple."
    },
    {
      id: "SWIMMING_POOL",
      keywords: ["pool", "swimming pool", "swim"],
      answer: "Yes. A swimming pool is one of the listed project amenities."
    },
    {
      id: "GREEN_PARK",
      keywords: ["park", "green space", "garden", "green area"],
      answer: "Yes. The project includes a green park."
    },
    {
      id: "WATER",
      keywords: ["water", "water supply", "24 hour water", "24x7 water"],
      answer: "Yes. The project provides 24x7 water supply."
    },
    {
      id: "ENVIRONMENT",
      keywords: ["peaceful", "secure environment"],
      answer: "The project is designed around a secure and peaceful living environment, with amenities such as a green park, swimming pool and an on-site temple."
    },
    {
      id: "AVAILABILITY",
      keywords: ["are units still available", "availability", "available units"],
      answer: "Yes. Limited units are currently available. For the latest availability and unit-specific details, please contact the project team."
    },
    {
      id: "SITE_VISIT",
      keywords: ["visit", "site visit", "can i see the property", "i want to visit", "schedule a visit", "see the property"],
      answer: "Absolutely. You can contact the project team to arrange a site visit. Rahul Chauhan: +91 95288 95118, Rajeev Anand: +91 97208 78882, Anil Anand: +91 98377 40000, or Vansh Chauhan: +91 87555 63983."
    },
    {
      id: "CONTACT",
      keywords: ["contact", "phone number", "call someone", "sales team", "speak to someone", "more information"],
      answer: "You can contact the project team directly. Rahul Chauhan: +91 95288 95118, Rajeev Anand: +91 97208 78882, Anil Anand: +91 98377 40000, or Vansh Chauhan: +91 87555 63983."
    }
  ]
};
