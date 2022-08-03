import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

//Layout
import AppLayout from "./views/layout/AppLayout";
import PrivateRoute from "./views/layout/PrivateRoute";

//Job
import JobGridView from "./views/pages/Job/JobGridView";
import JobView from "./views/pages/Job/JobView";
import JobEdit from "./views/pages/Job/JobEdit";
import JobPost from "./views/pages/Job/JobPost";

//Profile
import ViewOther from "./views/pages/Profile/ViewOther";
import Edit from "./views/pages/Profile/Edit";
import View from "./views/pages/Profile/View";

//Application
import Applications from "./views/pages/Application/Applications";
import AppliedDevs from "./views/pages/Application/AppliedDevs";
import AppliedApplications from "./views/pages/Application/AppliedApplications";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="/" element={<JobGridView />} />
            <Route path="/job" element={<JobGridView />} />
            <Route path="/job/grid" element={<JobGridView />} />
            <Route path="/job/view/:id" element={<JobView />} />

            <Route path="/job" element={<PrivateRoute />}>
              <Route path="/job/edit/:id" element={<JobEdit />} />
              <Route path="/job/post" element={<JobPost />} />
            </Route>

            <Route path="/profile/view/:id" element={<ViewOther />} />
            <Route path="/profile" element={<PrivateRoute />}>
              <Route path="/profile/edit" element={<Edit />} />
              <Route path="/profile/view" element={<View />} />
            </Route>

            <Route path="/applications" element={<PrivateRoute />}>
              <Route path="/applications/:id" element={<AppliedDevs />} />
              <Route
                path="/applications/jobs"
                element={<AppliedApplications />}
              />
              <Route path="/applications" element={<Applications />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster />
    </>
  );
}

export default App;
