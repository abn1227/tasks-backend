import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
	title: string;
	description: string;
	completed: boolean;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
}

const TaskSchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		completed: { type: Boolean, default: false },
	},
	{ timestamps: true },
);

export const Task = mongoose.model<ITask>('Task', TaskSchema);
