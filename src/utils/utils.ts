import { useEffect, useState } from "react";
import { ICard } from "../components/Card/Card";

interface IAgeGroupUser {
	dob: {
		age: number;
	};
}
export function countUsersByAgeGroup(users: IAgeGroupUser[]) {
	const ageGroups = {
		age11to20: 0,
		age21to30: 0,
		age31to40: 0,
		age41to50: 0,
		age51plus: 0,
	};

	users.forEach((user) => {
		const age = user.dob.age;
		if (age >= 11 && age <= 20) ageGroups["age11to20"]++;
		if (age >= 21 && age <= 30) ageGroups["age21to30"]++;
		if (age >= 31 && age <= 40) ageGroups["age31to40"]++;
		if (age >= 41 && age <= 50) ageGroups["age41to50"]++;
		if (age >= 51) ageGroups["age51plus"]++;
	});

	return ageGroups;
}

export function countUsersByGenderGroup(users: ICard[] | undefined) {
	const genderGroups = {
		male: 0,
		female: 0,
	};
	if (users)
		users.forEach((user) => {
			const gender = user.gender;
			if (gender === "male") genderGroups["male"]++;
			if (gender === "female") genderGroups["female"]++;
		});

	return genderGroups;
}

export interface IUser extends ICard {
	location: {
		street: {
			name: string;
		};
		city: string;
		state: string;
		country: string;
	};
	login: {
		uuid: string;
	};
}

export function searchUsers(users: ICard[], searchTerm: string | null): ICard[] | null {
	if (!searchTerm) return users;

	const normalizedSearchTerm = searchTerm.toLowerCase();

	return users.filter((user: ICard) => {
		const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
		const email = user.email.toLowerCase();
		const cell = user.cell.replace(/[^\d]/g, "");
		const birthday = new Date(user.dob.date).toLocaleDateString("en-Gb", { year: "numeric", month: "long", day: "numeric" }).toLowerCase();
		const address = `${user.location.street.name} ${user.location.city} ${user.location.state} ${user.location.country}`.toLowerCase();

		return (
			fullName.includes(normalizedSearchTerm) ||
			email.includes(normalizedSearchTerm) ||
			cell.includes(normalizedSearchTerm) ||
			birthday.includes(normalizedSearchTerm) ||
			address.includes(normalizedSearchTerm)
		);
	});
}

export const useDebouncer = (value: string | null, delay: number = 300, setInput?: (data: string | null) => void): string | null => {
	const [debouncedValue, setDebouncedValue] = useState<string | null>(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			if (setInput) {
				setInput(value);
			} else {
				setDebouncedValue(value);
			}
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	},[value,delay, setInput]);

	return debouncedValue;
};
