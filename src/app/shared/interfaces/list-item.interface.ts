export interface ListItem {
  [index: string]: string | boolean | undefined;
  name?: string;
  transcription?: string;
  firstForm?: string;
  firstFormTranscription?: string;
  secondForm?: string;
  secondFormTranscription?: string;
  thirdForm?: string;
  thirdFormTranscription?: string;
  translation: string;
  removable?: boolean;
  user?: string;
  date?: string;
  _id: string;
}
