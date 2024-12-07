<template>
  <div>
    <h1>Dashboard</h1>
    <h3>Hello {{ localStorage.username }}</h3>
    <!-- Task List Component -->
    <TaskList @edit-task="openEditForm"/>
    <!-- Task Form Component (only visible when showTaskForm is true) -->
    <TaskForm
        v-if="showTaskForm"
        :initial-task="editingTask"
        :is-edit="isEditing"
        @close="resetForm"
    />
    <!-- Button to trigger Task Form (for adding a new task) -->
    <button v-if="!showTaskForm" @click="openTaskForm">Add New Task</button>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import TaskList from '../components/TaskList.vue';
import TaskForm from '../components/TaskForm.vue';
import {Task} from "@/models/task";


export default defineComponent({
  components: {
    TaskList,
    TaskForm
  },
  setup() {
    const showTaskForm = ref(false);
    const isEditing = ref(false);
    const editingTask = ref<Task | null>(null);

    const openTaskForm = () => {
      isEditing.value = false;
      editingTask.value = null;
      showTaskForm.value = true;
    };
    const openEditForm = (task: Task) => {
      isEditing.value = true;
      console.log(task);
      editingTask.value = task;
      showTaskForm.value = true;
    };


    const resetForm = () => {
      showTaskForm.value = false;
    };

    return {
      localStorage,
      showTaskForm,
      isEditing,
      editingTask,
      openTaskForm,
      openEditForm,
      resetForm
    };
  }
});
</script>
