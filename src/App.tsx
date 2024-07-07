
import { Header } from "./components/HeaderComponents/Header";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { AppContextProvider } from "./contexts/AppContext";

const App = () => {

    return (
        <div>
            <Header />
            {/* <UserProfile user={user} /> */}
            <AppContextProvider>
                <RouterProvider router={router} />
            </AppContextProvider>
        </div>
    );
};

export default App;
