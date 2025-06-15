import {
  PixelRatio,
  Text as TextRN,
  TextProps as TextPropsRN,
} from "react-native";

const fontScale = PixelRatio.getFontScale();

interface TextProps extends TextPropsRN {
  size?: number;
}

export const Text = ({ size = 16, ...rest }: TextProps) => {
  const getFontSize = (s: number) => s / fontScale;
  return <TextRN style={{ fontSize: getFontSize(size) }} {...rest} />;
};
