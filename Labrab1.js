const runExperiment = (N) => {
  const counts = new Array(10).fill(0);
  for (let i = 0; i < N; i++) {
    counts[Math.floor(Math.random() * 10)]++;
  }

  const expected = N / 10;
  const deviations = counts.map(c => Math.abs(c - expected));
  const maxDeviation = Math.max(...deviations);
  const percentDeviation = (maxDeviation / expected * 100).toFixed(2);

  return {
    N,
    expected,
    counts,
    maxDeviation,
    percentDeviation
  };
};

// Примеры запусков:
[10**2, 10**4, 10**6].forEach(N => {
  const result = runExperiment(N);
  console.log(`\nЗапусков: ${result.N}`);
  console.log("Ожидание на число:", result.expected);
  console.log("Реальные частоты:", result.counts);
  console.log("Макс. отклонение:", result.maxDeviation);
  console.log("Процент отклонения:", result.percentDeviation + "%");
});
