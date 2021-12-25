import { ThemeType } from "@ui-kitten/components";

declare module "styled-components/native" {
  export interface DefaultTheme extends ThemeType {}
}
