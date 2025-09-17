
const run = (N) => {
  const counts = new Array(10).fill(0);
  for (let i = 0; i < N; i++) {
    counts[Math.floor(Math.random() * 10)]++;
  }

  const expected = N / 10;
  const deviations = counts.map(c => Math.abs(c - expected));
  const maxDeviation = Math.max(...deviations);

  return {
    N,
    expected,
    counts,
    maxDeviation
  };
};

// Примеры запусков:
[100, 10_000, 1_000_000, 1_000_000_000].forEach(N => {
  const result = run(N);
  console.log(`\nЗапусков: ${N}`);
  console.log("Ожидание на число:", result.expected);
  console.log("Реальные частоты:", result.counts);
  console.log("Макс. отклонение:", result.maxDeviation);
});
