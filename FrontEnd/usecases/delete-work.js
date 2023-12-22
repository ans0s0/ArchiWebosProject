const token = localStorage.getItem("token");

export const deleteWork = async (workId) => {
  return await fetch(`http://localhost:5678/api/works/${workId}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
