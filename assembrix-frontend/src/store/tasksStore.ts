import {defineStore} from 'pinia';
import {ref} from 'vue';
import {Task} from "@/models/task";
import {axiosInstance} from "@/router/axiosInstance";
import {useAuthStore} from "@/store/authStore";


// Define the store for tasks
export const useTaskStore = defineStore('task', () => {
    const tasks = ref<Task[]>([]); // Store for all tasks
    const isLoading = ref(false); // Loading state
    const error = ref<string | null>(null); // Error message
    const auth = useAuthStore();

    // Fetch tasks from backend
    const fetchTasks = async () => {
        isLoading.value = true;
        try {
            console.log(auth.token);
            console.log('aoeuaoeuaoeuaoeu')
            const response = await axiosInstance.get('tasks', {headers: {Authorization: `Bearer ${auth.token}`}}); // Replace with your backend URL
            tasks.value = response.data;
        } catch (err) {
            error.value = 'Failed to fetch tasks';
        } finally {
            isLoading.value = false;
        }
    };

    // Add a new task
    const addTask = async (newTask: Task) => {
        try {
            const response = await axiosInstance.post('tasks', newTask, {headers: {Authorization: `Bearer ${auth.token}`}});
            tasks.value.push(response.data); // Add the new task to the list
        } catch (err) {
            console.log(err);
            error.value = 'Failed to add task';
        }
    };

    // Update an existing task
    const updateTask = async (updatedTask: Task) => {
        try {
            console.log(updatedTask.id)
            const response = await axiosInstance.put(`tasks/${updatedTask.id}`, updatedTask, {headers: {Authorization: `Bearer ${auth.token}`}});
            const index = tasks.value.findIndex(task => task.id === updatedTask.id);
            if (index !== -1) {
                tasks.value[index] = response.data; // Update the task in the list
            }
        } catch (err) {
            error.value = 'Failed to update task';
        }
    };

    // Delete a task
    const deleteTask = async (taskId: string) => {
        try {
            await axiosInstance.delete(`tasks/${taskId}`, {headers: {Authorization: `Bearer ${auth.token}`}});
            tasks.value = tasks.value.filter(task => task.id !== taskId); // Remove task from list
        } catch (err) {
            error.value = 'Failed to delete task';
        }
    };

    return {
        auth,
        tasks,
        isLoading,
        error,
        fetchTasks,
        addTask,
        updateTask,
        deleteTask
    };
});
