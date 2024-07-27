import React, { useEffect, useState } from 'react';
import { getDashboardData, updateTaskStatus } from '../api/api';

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    activeUsers: 0,
    totalTasks: 0,
    tasks: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleStatusChange = async (taskId, status) => {
    try {
      await updateTaskStatus(taskId, { status });
      // Refresh tasks after status update
      const { data } = await getDashboardData();
      setDashboardData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Active Users</h5>
              <p className="card-text">{dashboardData.activeUsers}</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Tasks</h5>
              <p className="card-text">{dashboardData.totalTasks}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <h3>All Tasks</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Task Number</th>
              <th>Task Name</th>
              <th>Status</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.tasks.map(task => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Approved">Approved</option>
                  </select>
                </td>
                <td>{task.User ? task.User.name : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
