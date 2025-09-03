interface VerifyEmailInterface {
	email: string;
}
interface RegisterBusinessInterface {
	full_name: string;
	email: string;
	password: string;
	phone: string;
	state: string;
	sponsor_type: string;
	lga: string;
}
interface AgentLoginInterface {
	email: string;
	password: string;
}
interface CreateSurveyInterface {
	name: string;
	respondent_type: string;
	respondent_incentive_amount: number;
	sample_needed: number;
}
interface AddSurveyQuestionsInterface {
	question: string;
	category: string;
	question_type: string;
	options: string;
	survey_id: number;
	screening_type: string;
}
interface EditSurveyGenderInterface {
	id: number;
	gender: string;
}
interface EditSurveyStateInterface {
	id: number;
	state: string;
}
interface EditSurveySettlementInterface {
	id: number;
	settlement: string;
}
interface EditSurveyAgeGroupInterface {
	id: number;
	age_group: string;
}
interface EditSurveyMonthlyIncomeInterface {
	id: number;
	montly_income: string;
}
interface EditSurveyEducationInterface {
	id: number;
	education: string;
}
