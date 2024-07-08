const cors = require("cors");
const bodyParser = require("body-parser");

const corsOptions = {
  origin: 'https://medcall-client.web.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

export const applyMiddleware = (app: any) => {
  app.use(cors(corsOptions));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
};
