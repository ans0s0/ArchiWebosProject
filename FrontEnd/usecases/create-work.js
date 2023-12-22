const token = localStorage.getItem("token");

export const createWork = async (formData) => {
  return await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + token,
      ContentType: "multipart/form-data",
    },
    body: formData,
  });
};
