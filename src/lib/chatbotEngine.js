import { chatbotKnowledge } from '../chatbotKnowledge';

export const getChatbotResponse = (userMessage) => {
  const normalizedMessage = userMessage.toLowerCase().trim();

  // 1. Detect buying intent
  const isBuyingIntent = chatbotKnowledge.buyingIntentPhrases.some((phrase) =>
    normalizedMessage.includes(phrase)
  );

  if (isBuyingIntent) {
    return {
      text: "That's great! I can help you get in touch with the project team. Would you like to schedule a site visit or share your contact details?",
      type: "BUYING_INTENT",
    };
  }

  // 2. Intent matching based on keywords
  let bestMatch = null;
  let maxKeywordMatches = 0;

  for (const intent of chatbotKnowledge.intents) {
    let matchCount = 0;
    for (const keyword of intent.keywords) {
      if (normalizedMessage.includes(keyword)) {
        matchCount++;
      }
    }
    if (matchCount > maxKeywordMatches) {
      maxKeywordMatches = matchCount;
      bestMatch = intent;
    }
  }

  if (bestMatch) {
    return {
      text: bestMatch.answer,
      type: "ANSWER",
    };
  }

  // 3. Fallback
  return {
    text: chatbotKnowledge.fallbackResponse,
    type: "FALLBACK",
  };
};
