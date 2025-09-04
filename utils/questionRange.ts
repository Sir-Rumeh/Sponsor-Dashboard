export const billingRate = {
	"1 – 5": 250,
	"6 – 10": 375,
	"11 – 15": 500,
	"16 – 20": 500,
	"21 – 30": 650,
	"31 – 40": 800,
	"41 – 50": 1000,
};

export function getPriceForQuestions(numberOfQuestions: number) {
	if (numberOfQuestions > 0 && numberOfQuestions < 6) {
		return 250;
	} else if (numberOfQuestions > 5 && numberOfQuestions < 11) {
		return 375;
	} else if (numberOfQuestions > 10 && numberOfQuestions < 16) {
		return 500;
	} else if (numberOfQuestions > 15 && numberOfQuestions < 21) {
		return 500;
	} else if (numberOfQuestions > 20 && numberOfQuestions < 31) {
		return 650;
	} else if (numberOfQuestions > 30 && numberOfQuestions < 41) {
		return 800;
	} else if (numberOfQuestions > 40 && numberOfQuestions < 51) {
		return 1000;
	} else {
		return 0;
	}
}

// export function getQuestionRange(upperLimit) {
// 	switch (parseInt(upperLimit)) {
// 		case 5:
// 			return "1 – 5";
// 		case 10:
// 			return "6 – 10";
// 		case 15:
// 			return "11 – 15";
// 		case 20:
// 			return "16 – 20";
// 		case 30:
// 			return "21 – 30";
// 		case 40:
// 			return "31 – 40";
// 		case 50:
// 			return "41 – 50";
// 		default:
// 			return "";
// 	}
// }

// export function getAccurateQuestionRange(upperLimit, questionLength) {
// 	const choosenQuestionRange = getQuestionRange(upperLimit);
// 	const lowerLimit = parseInt(choosenQuestionRange.split(" ")[0]);

// 	if (questionLength !== 0 && questionLength < lowerLimit) {
// 		return getQuestionRange(lowerLimit - 1);
// 	}

// 	if (questionLength !== 0 && questionLength > upperLimit && upperLimit < 20) {
// 		return getQuestionRange(upperLimit + 5);
// 	}

// 	if (questionLength !== 0 && questionLength > upperLimit && upperLimit > 15) {
// 		return getQuestionRange(upperLimit + 10);
// 	}

// 	return getQuestionRange(upperLimit);
// }

// export function getAccurateUpperLimit(upperLimit, questionLength) {
// 	const choosenQuestionRange = getQuestionRange(upperLimit);
// 	const lowerLimit = parseInt(choosenQuestionRange.split(" ")[0]);

// 	if (questionLength !== 0 && questionLength < lowerLimit) {
// 		return lowerLimit - 1;
// 	}

// 	if (questionLength !== 0 && questionLength > upperLimit && upperLimit < 20) {
// 		return upperLimit + 5;
// 	}

// 	if (questionLength !== 0 && questionLength > upperLimit && upperLimit > 15) {
// 		return upperLimit + 10;
// 	}

// 	return upperLimit;
// }

// function getCategoryLength(questionList) {
// 	let category = [];
// 	let totalNumberOfCategory = 0;

// 	questionList.forEach((item) => {
// 		if (Array.isArray(item.categories) && Boolean(item.categories.length)) {
// 			totalNumberOfCategory += 1;
// 			const temporaryCat = item["categories"];
// 			category = [...category, ...temporaryCat];
// 		}
// 	});

// 	return {
// 		categoryLength: category.length,
// 		totalNumberOfCategory: totalNumberOfCategory,
// 	};
// }

// export function getQuestionLength(currentQuestionnaire, currentScreeningQuestion) {
// 	console.log({ currentQuestionnaire, currentScreeningQuestion });
// 	let questionnaireCategory = getCategoryLength(currentQuestionnaire);
// 	let screeningQuestionCategory = getCategoryLength(currentScreeningQuestion);

// 	const questionnaireLength = currentQuestionnaire.length - questionnaireCategory["totalNumberOfCategory"];
// 	const screeningQuestionLength =
// 		currentScreeningQuestion.length - screeningQuestionCategory["totalNumberOfCategory"];
// 	const questionnaireCategoryLength = questionnaireCategory["categoryLength"];
// 	const screeningQuestionCategoryLength = screeningQuestionCategory["categoryLength"];

// 	const totalNumberOfQuestion =
// 		questionnaireLength + screeningQuestionLength + questionnaireCategoryLength + screeningQuestionCategoryLength;

// 	return totalNumberOfQuestion;
// }
