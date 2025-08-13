import { google } from "googleapis";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID;
const GOOGLE_CLIENT_SECRECT = process.env.GOOGLE_OAUTH_CLIENT_SECRECT;

const oauth2client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRECT,
    'postmessage'
)

export default oauth2client;