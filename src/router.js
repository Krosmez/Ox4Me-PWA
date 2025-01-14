import { createBrowserRouter } from "react-router-dom";

import Home from "./Views/Home";

{
  /* <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/cocktail/:id"
          element={<Cocktail screenWidth={dimensions.width} />}
        />
        <Route path="/random" element={<RandomCocktail />} />
        <Route path="/list" element={<CocktailList />} />
        <Route path="/favorites" element={<FavoritesList />} />
        <Route path="/search" element={<SearchResult pattern={pattern} />} />
      </Routes> */
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/edit/:personId",
    // element: <Edit />,
  },
  {
    path: "/view/:personId",
    // element: <Person />,
  },
  {
    path: "/new",
    // element: <Add />,
  },
]);

export default router;
