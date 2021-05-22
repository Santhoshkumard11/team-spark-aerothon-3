import Dashboard from "@material-ui/icons/Dashboard";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import LeaderBoardView from "views/LeaderBoard/LeaderBoardView.jsx";
import BugsView from "views/ManageBugs/BugsView.jsx";
import SupportView from "views/Support/support.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/leaderboard",
    name: "Leader Board",
    icon: "receipt_long",
    component: LeaderBoardView,
    layout: "/admin",
  },
  {
    path: "/manage-bugs",
    name: "Manage Bugs",
    icon: "pending_actions",
    component: BugsView,
    layout: "/admin",
  },
  {
    path: "/support",
    name: "Support Agent",
    icon: "support_agent",
    component: SupportView,
    layout: "/admin",
  },
];

export default dashboardRoutes;
