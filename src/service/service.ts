export const fetchData = async () => {
  const response = await fetch("https://randomuser.me/api/?results=100");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

