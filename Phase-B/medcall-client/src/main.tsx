import { render } from "preact";
import { App } from "./app.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import "./index.css";
import "./I18n.ts";

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")!
);
