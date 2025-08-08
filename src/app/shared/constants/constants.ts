export const standardProposition =
  "There are no words in this section. Do you want to download the default list?";

export const removing = {
  methodeSelect: "Do you want to delete this list completely or selectively?",
  confirmation: "Are you sure you want to delete",
  item: {
    list: "this list?",
    word: "this word?",
    phrase: "this phrase (word)?",
    selectedItems: "the selected items?",
  },
};

export const warningPopoverMessage = {
  proceedWay: "To proceed the removing -",
  proceedCondition: "select at least one element,",
  editWay: "To start the editing - ",
  editWayCondition: "complete the removing,",
  cancelWay: "to cancel the removing -",
  cancelCondition: "press this button",
};

export const convenientResourse = {
  baseURL: "https://dictionary.cambridge.org/",
  translationDefaultURL:
    "https://dictionary.cambridge.org/dictionary/english-ukrainian/",
  pronunciationDefaultURL: "https://dictionary.cambridge.org/pronunciation/",
  pronunciationTargetURL:
    "https://dictionary.cambridge.org/pronunciation/english/",
};

export const defaultSearchParametr = "name";
export const irregularSearchParametr = "firstForm";
export const defaultColumnName = "WORD / PHRASE";
export const defaultSelectedValue = "name";
export const reservedSelectedValue = "firstForm";

export const selectOptions = [
  { value: "date", type: "date" },
  { value: defaultSelectedValue, type: "alphabet" },
];

export const routePath = {
  guide: "guide",
  irregular: "irregular",
  vocabulary: "vocabulary",
  separable: "separable",
  gerund: "gerund",
  infinitive: "infinitive",
  phrases: "phrases",
  stative: "stative",
  login: "login",
  registration: "registration",
  new: "new",
  id: ":id",
};

export enum PageTitle {
  vocabulary = "Vocabulary",
  irregular = "Irregular verbs",
  gerund = "Gerund",
  infinitive = "Infinitive",
  separable = "Separable phrasal verbs",
  phrases = "Phrases",
  stative = "Stative verbs",
  guide = "Guide",
  login = "Login",
  registration = "Registration",
}

export const validationPattern = {
  word: /^([A-Za-z\'\-\`]+\s?(\-|\.{0,3}|\,|\;|\:|\?{0,3}|\!{0,3})?\s?)+$/,
  transcription: /\D+/,
  translation:
    /^([А-Яа-яЁёа-щсьіїєґА-ЩЬІЇЄҐ\'\-\`]+\s?(\-|\.{0,3}|\,|\;|\:|\?{0,3}|\!{0,3})?\s?)+$/,
};
