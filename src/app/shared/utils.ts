export function getByRange(start: number, finish: number): number[] {
  const res = []

  if (start > finish) {
    [start, finish] = [finish, start]
  }

  for (let i = start; i <= finish; i++) {
    res.push(i)
  }

  return res
}



