import React, { useContext } from "react";
import { ColorsContext } from "../colors";
import * as Sudoku from "../types";
import styled from "styled-components/native";
import _ from "lodash";
import { Store, useStore } from "../../state";

const Grid = styled.View`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
`;

const Row = styled.View`
  flex: 1;
  flex-direction: row;
`;

const Cell = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Note = styled.Text`
  ${({ fontSize, color }: { fontSize: number; color: string }) => `
    font-size: ${fontSize}px;
    line-height: ${fontSize}px;
    color: ${color};
  `}
`;

interface NotesProps {
  notes: Sudoku.Cell["notes"];
  size: number;
}

const selector = (state: Store) => ({
  degree: state.game?.degree,
  dotNotes: state.settings.sudoku.dotNotes,
});

const Notes: React.FC<NotesProps> = ({ notes, size }) => {
  const { degree, dotNotes } = useStore(selector);
  const colors = useContext(ColorsContext);

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
