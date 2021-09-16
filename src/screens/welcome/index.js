import { withTranslation } from "react-i18next";
import WelcomeComponent from "./welcome";

let Welcome = withTranslation()(WelcomeComponent);

export default Welcome;
