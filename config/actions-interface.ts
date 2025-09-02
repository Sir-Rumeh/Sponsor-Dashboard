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
