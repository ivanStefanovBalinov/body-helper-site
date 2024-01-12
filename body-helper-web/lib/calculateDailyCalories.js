//bmr - base metabolic rate
const totalDailyEnergyExpenditure = (bmr, activityRate) =>
  Math.round(bmr * activityRate);

const calcDeficit = (totalDailyEnergyExpenditure) =>
  Math.round(totalDailyEnergyExpenditure * 0.2);

const calculateCaloriesDeficit = (totalDailyEnergyExpenditure, deficit) =>
  Math.round(totalDailyEnergyExpenditure - deficit);

export const dailyCaloriesCalculation = (
  gender,
  desireWeight,
  height,
  ages,
  weight,
  activity
) => {
  if (gender === "male") {
    const basalMetabolicRate = 10 * desireWeight + 6.25 * height - 5 * ages + 5;
    const maleTotalDailyEnergyExpenditure = totalDailyEnergyExpenditure(
      basalMetabolicRate,
      activity
    );
    const deficit = calcDeficit(maleTotalDailyEnergyExpenditure);

    if (Number(weight) < Number(desireWeight)) {
      return maleTotalDailyEnergyExpenditure;
    } else {
      return calculateCaloriesDeficit(maleTotalDailyEnergyExpenditure, deficit);
    }
  } else {
    const basalMetabolicRate =
      10 * desireWeight + 6.25 * height - 5 * ages - 161;
    const femaleTotalDailyEnergyExpenditure = totalDailyEnergyExpenditure(
      basalMetabolicRate,
      activity
    );

    const deficit = calcDeficit(femaleTotalDailyEnergyExpenditure);
    if (Number(weight) < Number(desireWeight)) {
      return femaleTotalDailyEnergyExpenditure;
    } else {
      return calculateCaloriesDeficit(
        femaleTotalDailyEnergyExpenditure,
        deficit
      );
    }
  }
};
