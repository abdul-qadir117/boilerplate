import _ from "lodash";

// use post script names for font families
const Lato = {
  '400':          { fontFamily: 'Lato-Regular' },
};

const Montserrat = {
  '500':          { fontFamily: 'Montserrat-Medium'},
  '600':          { fontFamily: 'Montserrat-SemiBold'},
  '700':          { fontFamily: 'Montserrat-Bold' },
  '800':          { fontFamily: 'Montserrat-ExtraBold' },
};

const FONTS = {
  Montserrat,
  Lato,
};

/*
  Helper class for cross-platform font styles
*/
class FontHelper {
  static font(fontParams) {
    let { fontFamily, fontWeight, fontStyle } = fontParams;
    fontFamily = fontFamily || "Montserrat";
    fontWeight = fontWeight || "400";
    fontStyle = fontStyle || "";

    const styles = {
      ..._.omit(fontParams, ["fontFamily", "fontWeight", "fontStyle"]),
      // ...FONTS[fontFamily][fontWeight + fontStyle],
    };

    return styles;
  }
}

export { FontHelper };
