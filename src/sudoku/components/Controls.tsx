import React, { useContext } from "react";
import styled from "styled-components/native";
import { SettingsContext } from "../settings";
import { ColorsContext } from "../colors";
import { TouchableOpacity } from "react-native";
import { Icon } from "@ui-kitten/components";
import NumberButton from "./NumberButton";

const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;
interface ControlsProps {
  progress: number[];
  size: number;
  notesMode: boolean;
  handleNotesButtonPress: () => void;
  handleEraserButtonPress: () => void;
  handleRevealButtonPress: () => void;
  handleNumberButtonPress: (number: number) => void;
}

const Controls: React.FC<ControlsProps> = ({
  progress,
  size,
  notesMode,
  handleNotesButtonPress,
  handleEraserButtonPress,
  handleRevealButtonPress,
  handleNumberButtonPress,
}) => {
  const settings = useContext(SettingsContext);
  const colors = useContext(ColorsContext);

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
        <TouchableOpacity onPress={handleRevealButtonPress}>
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
        {[...Array(settings.degree)].map((_, i) => {
          const number = i + 1;
          return (
            <NumberButton
              key={number}
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
