import { useState } from 'react'
import {BrowserRouter, Routes , Route} from 'react-router-dom';
import Login from './pages/Login';
import EmployeeDashboard from './pages/EmployeeDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import DailyUpdate from './pages/DailyUpdate';
import LeavePage from './pages/LeavePage';
import LeaveRequests from './pages/admin/LeaveRequests';
import MyLeaves from './pages/MyLeaves';
import TaskAssign from './pages/admin/TaskAssign';
import EmployeeTasks from './pages/EmployeeTasks';
import TaskMonitor from './pages/admin/TaskMonitor';
import AttendanceDashboard from './pages/admin/AttendanceDAshboard';
import Attendance from './pages/admin/Attendance';
import Employees from './pages/admin/Employee';
import EmployeeDetails from './pages/admin/ExployeeDetails';
import ProtectedRoute from './components/ProtectedRoute';
import DailyReportsDashboard from './pages/admin/DailyReportsDashboard';
import WorkUpdatesDashboard from './pages/admin/WorkUpdatesDashboard';

function App() {


  return (
    <BrowserRouter>
        <Routes>
          <Route 
            path='/'
            element = {<Login/>}
          />
          <Route
            path='employee/dashboard'
            element={<ProtectedRoute>
                      <EmployeeDashboard/>
                    </ProtectedRoute>
                    }
          />
          <Route
            path='admin/dashboard'
            element={ <ProtectedRoute>
                        <AdminDashboard/>
                      </ProtectedRoute> }
          />
          <Route
            path='employee/daily-update'
            element={<ProtectedRoute>
                      <DailyUpdate/>
                    </ProtectedRoute>
            }
          />
          <Route
            path='employee/leaves'
            element={ <ProtectedRoute><LeavePage/></ProtectedRoute>}
          />
          <Route
            path='admin/leaves'
            element={<ProtectedRoute><LeaveRequests/></ProtectedRoute> }
          />
          <Route
            path='/employee/my-leaves'
            element={<ProtectedRoute><MyLeaves/></ProtectedRoute> }
          />

          <Route
            path='/admin/tasks'
            element={<ProtectedRoute><TaskAssign/></ProtectedRoute> }
          />

          <Route
            path='/employee/tasks'
            element={<ProtectedRoute><EmployeeTasks/></ProtectedRoute> }  
          />

          <Route
            path='/admin/task-monitor'
            element={<ProtectedRoute><TaskMonitor/></ProtectedRoute>}
          />
          
          <Route
            path= '/admin/attendance'
            element={<ProtectedRoute><AttendanceDashboard/></ProtectedRoute> }
          />

          <Route
            path='employee/attendance'
            element={<ProtectedRoute> <Attendance/></ProtectedRoute>}
          />

          <Route
            path='admin/employees'
            element={<ProtectedRoute><Employees/></ProtectedRoute> }
          />

          <Route
            path='/admin/employee/:id'
            element={<ProtectedRoute><EmployeeDetails/></ProtectedRoute>}
          />

          <Route
            path='/admin/reports'
            element={<ProtectedRoute><DailyReportsDashboard/></ProtectedRoute>}
          />

          <Route
            path='/admin/work-updates'
            element={<ProtectedRoute><WorkUpdatesDashboard/></ProtectedRoute>}
          ></Route>

        </Routes>
    </BrowserRouter>
  )
}

export default App
