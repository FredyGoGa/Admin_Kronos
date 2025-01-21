import {
  Admin,
  Resource, 
  ListGuesser, 
  EditGuesser, 
  ShowGuesser,
  Login,  
} from "react-admin";
import { Layout } from "./Layout";
import authProvider from "./authProvider";
//import {dataProvider} from "./dataProvider";
//import { UserList } from "./users";
import {dataProvider} from "./dataProvider";
import LoginPage from "./LoginPage";

export const App = () => (
  <Admin
    layout={Layout}
    dataProvider={dataProvider}
    authProvider={authProvider}
    loginPage={LoginPage}
  >
    <Resource
      name="Administradores"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}

     
    />
    <Resource
      name="Users"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
     
    />
     <Resource
      name="Compañias"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
     
    />
     <Resource
      name="Usuarios"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
   
    />
  </Admin>
);
