import LocalizedStrings from "react-localization";

export const strings = new LocalizedStrings<ILocalizationStrings>({
  en: {
    apiMethodNotAllowed: `Method not allowed!`,
    defaultLoadingMessage: `Loading...`,
    internalServerErrorMessage: `Looks like something went wrong on our end, we are working hard to fix it! Check back in a few minutes, if the issue persists let an adminstrator know.`,
  },
});
