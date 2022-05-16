const baseConfig = {
  host: {
    protocol: "http",
    hostname: null,
    // port: 8080,
    isProd: false,
    isDev: true,
    isLocal: true,
  },
  mongo: {
    connectionString:
      "mongodb+srv://DB_USERDATA:pass123@node-data-db.9rtsp.mongodb.net/userData?retryWrites=true&w=majority",
  },
  goggleLogin: {
    GOOGLE_CLIENT_ID:
      "283854367484-i24eefibb2jj7r19p373s3vafpa5o2vm.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "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",
    SERVER_ROOT_URI: "http://localhost:9000",
    UI_ROOT_URI: "http://localhost:9000",
    JWT_SECRET: "shshhs",
    COOKIE_NAME: "auth_token",
  },
};

module.exports = baseConfig;
