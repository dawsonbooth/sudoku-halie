import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SettingsContext } from "../settings";
import { ColorsContext } from "../colors";
import { Cell } from "../types";

interface NotesProps {
  notes: Cell["notes"];
  size: number;
}

const Notes: React.FC<NotesProps> = ({ notes, size }) => {
  const settings = useContext(SettingsContext);
  const colors = useContext(ColorsContext);

  const fontSize = (0.75 / 2) * (size / settings.degree);

  const styles = StyleSheet.create({
    grid: {
      display: "flex",
      flexDirection: "column",

      height: "100%",
      width: "100%",
      margin: 0,
      padding: 0,
    },
    row: {
      flex: 1,
      flexDirection: "row",
    },
  });

  const unit = Math.sqrt(settings.degree);
  const notesGrid = [...Array(unit)].map((_, r) =>
    [...Array(unit)].map((_, c) => notes[r * unit + c + 1])
  );

  return (
    <View style={styles.grid}>
      {notesGrid.map((row, r) => (
        <View key={r} style={styles.row}>
          {row.map((isNote, c) => (
            <View
              key={c}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isNote ? (
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize,
                    color: colors.text,
                    lineHeight: fontSize,
                  }}
                >
                  {settings.dotNotes ? "•" : r * unit + c + 1}
                </Text>
              ) : null}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default Notes;
