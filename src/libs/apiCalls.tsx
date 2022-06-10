import services from "../services";

async function fetchChartData(
  filterStartValue: Date | null,
  filterEndValue: Date | null
) {
  if (filterStartValue && filterEndValue) {
    const filter = { startDate: filterStartValue, endDate: filterEndValue };
    const chartData = await services
      .getTotalTimebyProject(filter)
      .then((result) => {
        return result;
      });
    return chartData;
  } else {
    const chartData = await services.getTotalTimebyProject().then((result) => {
      return result;
    });
    return chartData;
  }
}

export { fetchChartData };
