import {useEffect, useState} from "react";
import { ICard } from "./components/Card/Card";

interface IAgeGroupUser {
	dob: {
		age: number
	}
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

interface IGenderUser {
	gender: string
}

export function countUsersByGenderGroup(users: IGenderUser[]) {
	const genderGroups = {
		male: 0,
		female: 0,
	};

	users.forEach((user) => {
		const gender = user.gender;
		if (gender === "male") genderGroups["male"]++;
		if (gender === "female") genderGroups["female"]++;
	})

	return genderGroups;
}

interface IUser extends ICard {
	location: {
		street: {
			name: string
		};
		city: string;
		state: string;
		country: string;
	},
	login:{
		uuid: string
	}
}

export function searchUsers(users: IUser[], searchTerm: string): IUser[] {
  return users.filter((user: IUser) => {
    const firstName: string = user.name.first.toLowerCase();
    const lastName: string = user.name.last.toLowerCase();
    const email: string = user.email.toLowerCase();
    const cell: string = user.cell.replace(/[^\d]/g, '');
    const birthday: string = new Date(user.dob.date).toLocaleDateString();
    const address: string = `${user.location.street.name} ${user.location.city} ${user.location.state} ${user.location.country}`.toLowerCase();
    
    const transformSearch: string = searchTerm.toLowerCase();

    return (
      firstName.includes(transformSearch) ||
      lastName.includes(transformSearch) ||
      email.includes(transformSearch) ||
      cell.includes(transformSearch) ||
      birthday.includes(transformSearch) || 
      address.includes(transformSearch)
    );
  });
}

export const useDebouncer = (value: string, delay: number): string => {
	const [debouncedValue, setDebouncedValue] = useState<string>(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		}
	})

	return debouncedValue
}