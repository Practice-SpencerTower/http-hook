import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {
    const [tasks, setTasks] = useState([]);
    useHttp();

    const fetchTasks = async (taskText) => {
        try {
            const response = await fetch(
                'https://react-http-9f7be-default-rtdb.firebaseio.com/tasks.json'
            );

            if (!response.ok) {
                throw new Error('Request failed!');
            }

            const data = await response.json();

            const loadedTasks = [];

            for (const taskKey in data) {
                loadedTasks.push({ id: taskKey, text: data[taskKey].text });
            }

            setTasks(loadedTasks);
        } catch (err) {
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const taskAddHandler = (task) => {
        setTasks((prevTasks) => prevTasks.concat(task));
    };

    return (
        <React.Fragment>
            <NewTask onAddTask={taskAddHandler} />
            <Tasks
                items={tasks}
                loading={isLoading}
                error={error}
                onFetch={fetchTasks}
            />
        </React.Fragment>
    );
}

export default App;
