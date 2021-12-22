import { useTheme } from "@ui-kitten/components";
import _ from "lodash";
import React from "react";
import { Store, useStore } from "../../../state";
import * as Sudoku from "../../types";
import { Cell, Grid, Note, Row } from "./styles";

interface NotesProps {
  notes: Sudoku.Cell["notes"];
  size: number;
}

const selector = (state: Store) => ({
  degree: state.game?.degree,
  dotNotes: state.settings.sudoku.dotNotes,
  getColors: state.getColors,
});

const Notes: React.FC<NotesProps> = ({ notes, size }) => {
  const { degree, dotNotes, getColors } = useStore(selector);
  const theme = useTheme();
  const colors = getColors(theme);

  if (!degree) return null;

  const fontSize = (0.75 / 2) * (size / degree);

  const unit = Math.sqrt(degree);
  const notesGrid = _.range(0, unit).map((_value, r) =>
    _.range(0, unit).map((_value, c) => notes[r * unit + c + 1])
  );

  return (
    <Grid>
      {notesGrid.map((row, r) => (
        <Row key={`notes-row-${r}`}>
          {row.map((isNote, c) => (
            <Cell key={`notes-cell-${c}`}>
              {isNote && (
                <Note
                  allowFontScaling={false}
                  fontSize={fontSize}
                  color={colors.text}
                >
                  {dotNotes ? "•" : r * unit + c + 1}
                </Note>
              )}
            </Cell>
          ))}
        </Row>
      ))}
    </Grid>
  );
};

export default Notes;
