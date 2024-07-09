import { login } from "../slices/authSlice";

// Login user
export const loginUser = (user) => {
  return async (dispatch) => {
    try {
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        body: JSON.stringify(user),
        headers:{
          "Content-Type": "application/json"
        }
      });

      const data = await res.json();
      dispatch(login(data));
      localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {
      console.log(error.message);
    }
  }
}