import React, { useContext } from "react";
import { SettingsContext } from "./settings";
import { TouchableOpacity, View } from "react-native";
import { Icon } from "@ui-kitten/components";
import NumberButton from "./NumberButton";

interface PropTypes {
  progress: number[];
  size: number;
  notesMode: boolean;
  handleNotesButtonPress: () => void;
  handleEraserButtonPress: () => void;
  handleRevealButtonPress: () => void;
  handleNumberButtonPress: (number: number) => void;
}

const Controls: React.FC<PropTypes> = ({
  progress,
  size,
  notesMode,
  handleNotesButtonPress,
  handleEraserButtonPress,
  handleRevealButtonPress,
  handleNumberButtonPress
}) => {
  const settings = useContext(SettingsContext);

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          margin: size * 0.02
        }}
      >
        <TouchableOpacity onPress={handleNotesButtonPress}>
          <Icon name="edit-outline" width={size / 8} height={size / 8} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRevealButtonPress}>
          <Icon name="search-outline" width={size / 8} height={size / 8} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleEraserButtonPress}>
          <Icon name="trash-outline" width={size / 8} height={size / 8} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          margin: size * 0.02
        }}
      >
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
      </View>
    </>
  );
};

export default Controls;
