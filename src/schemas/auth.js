import { string } from 'yup';

export const name = string().required().min(2).label('Name');

export const email = string().required().email().label('Email address');

export const password = string().required().min(6).label('Password');
