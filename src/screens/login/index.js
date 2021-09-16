import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import i18n from "i18next";
import { reduxForm } from "redux-form";
import validator from "validator";
import { UserCreators } from "@redux/actions";
import Login from "./login";

const validateLogin = (values, props) => {
  const errors = {};
  const { email, password } = values;

  if (!email || (email && !validator.isEmail(email))) {
    errors.email = i18n.t("formErrors.invalidEmail");
  }

  if (!password || (password && password.length < 6)) {
    errors.password = i18n.t("formErrors.shortPassword");
  }
  return errors;
};

function mapStateToProps(state) {
  return {
    isLoggingIn: state.loadingState.isLoggingIn,
    isLoggingInSchool: state.loadingState.isLoggingInSchool,
  };
}

const mapDispatchToProps = {
  requestLogin: UserCreators.requestLogin,
  requestSchoolLogin: UserCreators.requestSchoolLogin,
};

let LoginForm = reduxForm({
  form: "login",
  validate: validateLogin,
  touchOnChange: true,
  fields: ["email", "password"],
})(Login);

LoginForm = withTranslation()(LoginForm);

LoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

export default LoginForm;
