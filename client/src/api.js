const API_URL = "/api/todos";

const request = async (url, options = {}) => {
  let response;

  try {
    response = await fetch(url, options);
  } catch (error) {
    throw new Error(
      "Unable to connect to the server. Make sure the backend is running."
    );
  }

  const text = await response.text();

  let data = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error("Server returned an invalid response.");
    }
  }

  if (!response.ok) {
    throw new Error(
      data?.message || `Request failed with status ${response.status}`
    );
  }

  return data;
};

// GET all todos
export const getTodos = () => {
  return request(API_URL);
};

// CREATE todo
export const createTodo = (title) => {
  return request(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
    }),
  });
};

// UPDATE todo
export const updateTodo = (id, data) => {
  return request(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

// DELETE todo
export const deleteTodo = (id) => {
  return request(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};
