function useColorLevel(level: number | string) {
  const colorLevel = [
    "50",
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
  ];
  const index = colorLevel.indexOf(level + "");

  function calculateLevel(action: "increment" | "decrement") {
    if (index > 0 && action === "decrement") {
      return colorLevel[index - 1];
    }
    if (index < colorLevel.length - 1 && action === "increment") {
      return colorLevel[index + 1];
    }
    return level;
  }

  const decreaseLevel = calculateLevel("decrement");

  const increaseLevel = calculateLevel("increment");

  return [increaseLevel, decreaseLevel];
}

export default useColorLevel;
