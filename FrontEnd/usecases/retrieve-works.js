// Récupération des pièces depuis l'API
export const retrieveWorks = async () => {
  const response = await fetch("http://localhost:5678/api/works");
  return await response.json();
};
