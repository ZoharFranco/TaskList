<template>
  <div>
    <h3>{{ isEdit ? "Edit Task" : "Add Task" }}</h3>
    <form @submit.prevent="submitForm">
      <textarea v-model="task.title" placeholder="Title" required/>
      <textarea v-model="task.description" placeholder="Description" required></textarea>
      <button type="submit">{{ isEdit ? "Save" : "Add" }}</button>
    </form>
    <button @click="closeForm">Cancel</button>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {Task} from "@/models/task";
import {useTaskStore} from "@/store/tasksStore";

export default defineComponent({
  props: {
    initialTask: {
      type: Object as () => Task | null,
      default: null
    },
    isEdit: {
      type: Boolean,
      required: true
    }
  },
  emits: ["close"],
  setup(props, {emit}) {

    const taskStore = useTaskStore();
    const task = ref<Task>({
      id: props.initialTask ? props.initialTask.id : "",
      title: props.initialTask ? props.initialTask.title : "",
      description: props.initialTask ? props.initialTask.description : ""
    });

    const closeForm = () => {
      emit("close");
    };

    const submitForm = () => {
      if (!props.isEdit) taskStore.addTask(task.value);
      else taskStore.updateTask(task.value);
      taskStore.fetchTasks();
      closeForm();
    };

    return {task, closeForm, submitForm};
  }
});
</script>
