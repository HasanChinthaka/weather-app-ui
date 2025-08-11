# Setup env file

Client

    1. Rename exmple.env --> .env

    2. Register on [OpenWeatherMap](https://openweathermap.org/) to obtain an API key.

    3. Add open wather API Key

Server

    1. Add Mongo db link and project name

    2. Create [Brevo](https://app.brevo.com/) accounnt and add smtpsever details

    3. Add brevo account mail as the SENDER_MAIL

# Run Project

1. Install dependencies (need to be run in both client and server folders)

   ```bash
   npm install
   ```

2. Recheck .env file variable (check in both client and server folders)

3. Run sever in local (open cmd in server folder and run this command)

    ````bash
      npm run server
    ```

4. Run client in local (open cmd in client folder and run this command)

    ```bash
      npm run dev
    ```
