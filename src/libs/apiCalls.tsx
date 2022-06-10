import services from "../services";

async function fetchTimeSheetList(): Promise<[]> {
  try {
    const timeList = await services.getAllTimesheetList().then((result) => {
      return result;
    });
    return timeList;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function fetchTeamList(): Promise<[]> {
  try {
    const teamList = await services.getTeamList().then((result) => {
      return result;
    });
    return teamList;
  } catch (error) {
    console.log(error);
    return [];
  }
}

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

export { fetchTimeSheetList, fetchChartData, fetchTeamList };
