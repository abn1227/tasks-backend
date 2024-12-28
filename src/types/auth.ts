export interface TokenPayload {
	userId: string;
	email: string;
}

export interface AuthResponse {
	user: {
		id: string;
		email: string;
		firstName: string;
		lastName: string;
	};
	token: string;
}
