import { expect, test } from "vitest";

test("concat", () => {
  const a = [1, 2, 3, 4];
  const b = [4, 5, 6, 7];
  const c = [...a, ...b];
  expect(c).toEqual([1, 2, 3, 4, 4, 5, 6, 7]);
});

test("delete", () => {
  const a = [1, 2, 3, 4];
  a.splice(1, 1);
  expect(a).toEqual([1, 3, 4]);
});

test("insert", () => {
  const a = [1, 2, 3, 4];
  a.splice(1, 0, 5);
  expect(a).toEqual([1, 5, 2, 3, 4]);
});
