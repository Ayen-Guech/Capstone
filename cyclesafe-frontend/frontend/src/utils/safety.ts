export const isUnsafe = (text: string): boolean => {
  const badWords = ["sex", "porn", "nudes", "hook up", "meet me"];
  const phone = /\b(\+?\d{10,15})\b/;
  const email = /\S+@\S+\.\S+/;

  return badWords.some(w => text.toLowerCase().includes(w)) || phone.test(text) || email.test(text);
};
