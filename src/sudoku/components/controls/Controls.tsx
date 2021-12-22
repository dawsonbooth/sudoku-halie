import { Icon, useTheme } from "@ui-kitten/components";
import _ from "lodash";
import React from "react";
import { Alert, TouchableOpacity } from "react-native";
import { Store, useStore } from "../../../state";
import NumberButton from "../numberButton";
import { Wrapper } from "./styles";

interface ControlsProps {
  size: number;
}

const selector = (state: Store) => ({
  degree: state.game?.degree,
  progress: state.game?.progress,
  notesMode: state.notesMode,
  handleNotesButtonPress: state.handleNotesButtonPress,
  handleEraserButtonPress: state.handleEraserButtonPress,
  handleRevealButtonPress: state.handleRevealButtonPress,
  handleNumberButtonPress: state.handleNumberButtonPress,
  getColors: state.getColors,
});

const Controls: React.FC<ControlsProps> = ({ size }) => {
  const {
    degree,
    progress,
    notesMode,
    handleNotesButtonPress,
    handleEraserButtonPress,
    handleRevealButtonPress,
    handleNumberButtonPress,
    getColors,
  } = useStore(selector);

  const theme = useTheme();
  const colors = getColors(theme);

  if (!progress) return null;

  return (
    <>
      <Wrapper>
        <TouchableOpacity onPress={handleNotesButtonPress}>
          <Icon
            name="edit-outline"
            width={size / 8}
            height={size / 8}
            fill={colors.text}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Alert.alert(
              "Reveal",
              "Are you sure you want to reveal this cell?",
              [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "OK",
                  onPress: handleRevealButtonPress,
                },
              ],
              { cancelable: false }
            )
          }
        >
          <Icon
            name="search-outline"
            width={size / 8}
            height={size / 8}
            fill={colors.text}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleEraserButtonPress}>
          <Icon
            name="trash-outline"
            width={size / 8}
            height={size / 8}
            fill={colors.text}
          />
        </TouchableOpacity>
      </Wrapper>
      <Wrapper>
        {_.range(0, degree).map((_, i) => {
          const number = i + 1;
          return (
            <NumberButton
              key={`number-button-${number}`}
              number={number}
              percent={progress[number] * 100}
              radius={size / 14}
              notesMode={notesMode}
              onPress={() => handleNumberButtonPress(number)}
            />
          );
        })}
      </Wrapper>
    </>
  );
};

export default Controls;
