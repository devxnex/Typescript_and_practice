export const isAuthenticated = () => {


   return localStorage.getItem("authToken") === "true";
       
  // This function should check if the user is authenticated
  // For example, it could check a token in localStorage or a global state
}


export const login = () => {
  // This function should handle the login logic
  // For example, it could set a token in localStorage or update a global state
  localStorage.setItem("authToken", "true");    }



  export const signOut = () => {   
    // This function should handle the sign-out logic
    // For example, it could remove a token from localStorage or update a global s
    localStorage.removeItem("authToken");
  }