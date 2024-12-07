<template>
  <div>
    <h2>Task List</h2>
    <ul>
      <li v-for="task in taskStore.tasks" :key="task.id">
        <div>{{ task.title }} - {{ task.description }}</div>
        <button @click="updateTask(task)">Edit</button>
        <button @click="deleteTask(task.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue';
import {useTaskStore} from "@/store/tasksStore";


export default defineComponent({
  emits: ["edit-task"],
  methods:
      {
        updateTask(task: any) {
          // Correct usage of $emit within methods
          this.$emit('edit-task', task);
        }
      },
  setup(props, {emit}) {
    const taskStore = useTaskStore();
    const isLoading = ref(false);
    const error = ref('');


    onMounted(() => {
      isLoading.value = true;
      taskStore.fetchTasks();
      isLoading.value = false;
    });

    const editTask = (task: any) => {
      this.$emit('edit-task', task);
    };

    const deleteTask = (taskId: string) => {
      isLoading.value = true;
      taskStore.deleteTask(taskId);
      isLoading.value = false;
    };

    return {
      taskStore,
      isLoading,
      error,
      deleteTask,
      editTask
    };
  }
});
</script>
