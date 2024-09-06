import { Configuration, LogLevel } from "@azure/msal-browser";

const clientId = import.meta.env.VITE_AUTH_CLIENT_ID;
const redirectUri = import.meta.env.VITE_APP_URL;
const authority = `https://login.microsoftonline.com/${
  import.meta.env.VITE_AUTH_TENANT_ID
}`;

export const msalConfig: Configuration = {
  auth: {
    clientId: clientId,
    authority: authority,
    redirectUri: redirectUri,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      },
    },
  },
};

export const loginRequest = {
  scopes: ["User.Read"],
};
