import mongoose, { Document, Schema } from 'mongoose';

export interface IAccount extends Document {
	id: string;
	name: string;
	email: string;
	password: string;
}

const AccountSchema = new Schema({
	id: { type: String, required: true },
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
});

export const Account = mongoose.model<IAccount>('Account', AccountSchema);
