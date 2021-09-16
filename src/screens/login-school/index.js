import { connect } from "react-redux";
import { UserCreators } from "@redux/actions";
import LoginSchool from "./login-school";

function mapStateToProps(state) {
  return {
    isLoggingInSchool: state.loadingState.isLoggingInSchool,
  };
}

const mapDispatchToProps = {
  requestSchoolLogin: UserCreators.requestSchoolLogin,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginSchool);
