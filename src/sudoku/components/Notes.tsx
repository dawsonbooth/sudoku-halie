import React, { useContext } from "react";
import { SettingsContext } from "../settings";
import { ColorsContext } from "../colors";
import * as Sudoku from "../types";
import styled from "styled-components/native";
import _ from "lodash";

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

const Notes: React.FC<NotesProps> = ({ notes, size }) => {
  const settings = useContext(SettingsContext);
  const colors = useContext(ColorsContext);

  const fontSize = (0.75 / 2) * (size / settings.degree);

  const unit = Math.sqrt(settings.degree);
  const notesGrid = _.range(0, unit).map((_value, r) =>
    _.range(0, unit).map((_value, c) => notes[r * unit + c + 1])
  );

  return (
    <Grid>
      {notesGrid.map((row, r) => (
        <Row key={r}>
          {row.map((isNote, c) => (
            <Cell key={c}>
              {isNote && (
                <Note
                  allowFontScaling={false}
                  fontSize={fontSize}
                  color={colors.text}
                >
                  {settings.dotNotes ? "•" : r * unit + c + 1}
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
