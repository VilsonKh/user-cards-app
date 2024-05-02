import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const fetchData = async ()=> {
  const response = await fetch("https://randomuser.me/api/?results=500");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();

};

