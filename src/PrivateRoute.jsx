// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

import { useNavigate } from "react-router-dom";

// const PrivateRoute = ({ children }) => {
//   const navigate = useNavigate();

//   const isActive = JSON.parse(localStorage.getItem('isActive'));
//   useEffect(() => {
//     if (!isActive) {
//       navigate('/login');
//       console.log(isActive);
//     }
//   }, [navigate]);

//   // Agar isActive true hai, toh yeh render karega
//   return isActive ? children : null;
// };

// export default PrivateRoute;

// PrivateRoute component
const PrivateRoute = ({ element ,allowIsActive}) => {
  const isAuthenticated = localStorage.getItem("isActive");

  const navigate = useNavigate()
  
  if (isAuthenticated === 'false' || !allowIsActive.includes(isAuthenticated) ) {
    navigate('/login')
  }   
      return <>
  {element}
  </>
   
};

export default PrivateRoute;