const shadeColor = (color: string, percent: number) => {
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);
  R = Math.min((R * (100 + percent)) / 100, 255);
  G = Math.min((G * (100 + percent)) / 100, 255);
  B = Math.min((B * (100 + percent)) / 100, 255);
  const RR =
    R.toString(16).length === 1 ? `0${R.toString(16)}` : R.toString(16);
  const GG =
    G.toString(16).length === 1 ? `0${G.toString(16)}` : G.toString(16);
  const BB =
    B.toString(16).length === 1 ? `0${B.toString(16)}` : B.toString(16);
  return `#${RR}${GG}${BB}`;
};

export default shadeColor;
