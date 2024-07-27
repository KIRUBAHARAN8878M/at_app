import React, { useEffect, useState } from 'react';
import { getUserTasks, createTask } from '../api/api';

function UserTasks() {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({ title: '', status: 'Pending' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getUserTasks();
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask(formData);
      setFormData({ title: '', status: 'Pending' });
      const { data } = await getUserTasks();
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>User Tasks</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Task Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Task</button>
      </form>
      <div className="mt-3">
        <h3>Tasks</h3>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Task Number</th>
              <th scope="col">Task Name</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task.id}>
                <th scope="row">{index + 1}</th>
                <td>{task.title}</td>
                <td>{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserTasks;
