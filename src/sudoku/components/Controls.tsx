import React from "react";
import styled from "styled-components/native";
import { Alert, TouchableOpacity } from "react-native";
import { Icon, useTheme } from "@ui-kitten/components";
import NumberButton from "./NumberButton";
import _ from "lodash";
import { Store, useStore } from "../../state";

const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;
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
      <Container>
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
      </Container>
      <Container>
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
      </Container>
    </>
  );
};

export default Controls;
