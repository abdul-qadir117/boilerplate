import moment from "moment";
import { Platform } from "react-native";

class Format {
  static cost(value) {
    if (!value && value !== 0) {
      return "N/A";
    }

    if (Platform.OS === "android")
      return (
        "$" +
        Math.round(parseFloat(value))
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      );
    const cost = parseFloat(value);
    return `${cost < 0 ? "-" : ""}$${Math.abs(
      cost,
    ).toLocaleString()}`;
  }

  static percentage(value) {
    return `${value}%`;
  }

  static getNameInitials(name = "") {
    return name
      .split(" ")
      .slice(0, 2)
      .map(word => word[0])
      .join("");
  }

  static timeFromNow(d) {
    return d ? moment(d).fromNow() : "-";
  }

  static time(d, format = "hh:mma") {
    return moment(d).format(format);
  }
}

export { Format };
