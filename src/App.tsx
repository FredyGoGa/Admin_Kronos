import {
  Admin,
  Resource, 
  ListGuesser, 
  EditGuesser, 
  ShowGuesser,   
} from "react-admin";
import { Layout } from "./Layout";
import authProvider from "./authProvider";
//import { UserList } from "./users";
import {dataProvider} from "./dataProvider";
import LoginPage from "./LoginPage";
import { RoutesList } from "./routes/RoutesList";

export const App = () => (
  <Admin
  
    layout={Layout}
    dataProvider={dataProvider}
    authProvider={authProvider}
    loginPage={LoginPage}
  >
    <Resource
      name="Administrator"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}

     
    />
    <Resource
      name="Drivers"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
     
    />
     <Resource
      name="companies"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
     
    />
   <Resource
      name="routes"
      list={ListGuesser}     
      edit={EditGuesser}
      show={ShowGuesser} // Usa el componente personalizado para listar rutas
    />
  </Admin>
);
