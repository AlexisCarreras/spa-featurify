export const timeSignatureDescriptions: { [key: number]: string } = {
    3: "3/4",
    4: "4/4",
    5: "5/4",
    6: "6/4",
    7: "7/4",
  };

const keyMap: { [key: number]: string } = {
  0: "C",
  1: "C♯/D♭",
  2: "D",
  3: "D♯/E♭",
  4: "E",
  5: "F",
  6: "F♯/G♭",
  7: "G",
  8: "G♯/A♭",
  9: "A",
  10: "A♯/B♭",
  11: "B",
};

const modeMap: { [mode: number]: string } = {
  0: "Menor",
  1: "Mayor",
};

export function getKeyDescription(typeNote: number): string {
  return keyMap[typeNote] || "Clave desconocida";
}

export function getModeDescription(mode: number): string {
  return modeMap[mode] || "Modo desconocido";
}
