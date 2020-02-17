import React, { useContext } from "react";
import { Text, View } from "react-native";
import { SettingsContext } from "./settings";
import { ColorsContext } from "./colors";
import { Grid, Row, Col } from "react-native-easy-grid";
import { Cell } from "./types";

interface PropTypes {
  notes: Cell["notes"];
  size: number;
}

const Notes: React.FC<PropTypes> = ({ notes, size }) => {
  const settings = useContext(SettingsContext);
  const colors = useContext(ColorsContext);

  const fontSize = (0.75 / 2) * (size / settings.degree);

  const unit = Math.sqrt(settings.degree);
  const notesGrid = [...Array(unit)].map((_, r) =>
    [...Array(unit)].map((_, c) => notes[r * unit + c + 1])
  );

  return (
    <View style={{ height: "100%", width: "100%", margin: 0, padding: 0 }}>
      <Grid>
        {notesGrid.map((row, r) => (
          <Row key={r}>
            {row.map((isNote, c) => (
              <Col key={c}>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {isNote ? (
                    <Text
                      allowFontScaling={false}
                      style={{
                        fontSize,
                        color: colors.text,
                        lineHeight: fontSize
                      }}
                    >
                      {settings.dotNotes ? "•" : r * unit + c + 1}
                    </Text>
                  ) : null}
                </View>
              </Col>
            ))}
          </Row>
        ))}
      </Grid>
    </View>
  );
};

export default Notes;
