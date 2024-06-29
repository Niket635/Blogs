import Dashboard from "../peges/Dashboard";
import Blogs from "../peges/Blogs";
import Users from "../peges/Users";
import Categories from "../peges/Categories";
import Tages from "../peges/Tages";
import NewBlog from "../FrontDesingn/NewWeb";
import Contacts from "../peges/Contacts";

const Route1 = [
  {
    path: "dashboard",
    componet: <Dashboard />,
  },
  {
    path: "categories",
    componet: <Categories />,
  },
  {
    path: "blogs",
    componet: <Blogs />,
  },
  {
    path: "users",
    componet: <Users />,
  },
  {
    path: "tages",
    componet: <Tages />,
  },
  {
    path: "contacts",
    componet: <Contacts />,
  },
  {
    path: "",
    componet: <NewBlog />,
  },
];

export default Route1;
