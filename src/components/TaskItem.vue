<template>
  <div class="task-container">
    <div class="task" :class="{ 'overdue-task': isOverdue }">
      <div class="checkbox-icon">
        <input
          type="checkbox"
          :checked="isChecked"
          @click.stop="toggleCheckbox"
        />
      </div>

      <div class="task-content" :class="priority">
        <span class="task-name">Task name: {{ taskName }}</span>
        <p v-if="description" class="task-description">
          Description: {{ description }}
        </p>
        <p v-if="dueDate" class="task-due-date">
          Due: {{ formattedDueDate }}
        </p>
      </div>

      <div class="task-delete-btn-container">
        <button @click.stop="deleteTask" class="delete-icon">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "TaskItem",
  components: {
    
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    taskName: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      default: "",
    },
    dueDate: {
      type: String,
      default: null,
    },
  },
  setup(props, { emit }) {
    const isChecked = ref(props.isCompleted);
    const router = useRouter();

    const toggleCheckbox = () => {
      isChecked.value = !isChecked.value;
      emit("update-completion", {
        id: props.id,
        isCompleted: isChecked.value,
      });
    };

    const isOverdue = computed(() => {
      if (!props.dueDate || props.isCompleted) return false;
      const dueDate = new Date(props.dueDate);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      return dueDate < currentDate;
    });

    const formattedDueDate = computed(() => {
      if (props.dueDate) {
        return new Date(props.dueDate).toLocaleDateString();
      }
      return "";
    });

    watch(isChecked, (newVal) => {
      emit("update-completion", {
        id: props.id,
        isCompleted: newVal,
      });
    });

    const deleteTask = () => {
      emit("delete-task", props.id);
      router.push("/"); 
    };

    return {
      isChecked,
      deleteTask,
      formattedDueDate,
      isOverdue,
      toggleCheckbox,
    };
  },
});
</script>

<style scoped>
.task-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
}

.task {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #444;
  background-color: #343436;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.3s;
  position: relative;
}

.task:hover {
  background-color: #2d2d2f;
  transform: translateY(-5px);
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
}

.task-name {
  flex-grow: 1;
  margin-left: 10px;
  margin-right: 10px;
}

.task-due-date {
  margin-left: 10px;
  color: orange;
}

.priority-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-left: 10px;
}

.priority-indicator.low {
  background-color: green;
}

.priority-indicator.medium {
  background-color: orange;
}

.priority-indicator.high {
  background-color: red;
}

.edit-icon, .delete-icon {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
  border-radius: 5px;
}

.delete-icon:hover {
  color: #dc3545;
}

.task-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  position: relative;
  padding-bottom: 5px;
}

.task-delete-btn-container {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #dc3545;
}

.task-content::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: currentColor;
  border-radius: 50%;
}

.task-content.low::after {
  background-color: green;
}

.task-content.medium::after {
  background-color: orange;
}

.task-content.high::after {
  background-color: red;
}

.task-description {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 4px;
  margin-left: 10px;
}

.overdue-task {
  border-color: red;
}

.delete-icon .fas, .edit-icon .fas {
  font-size: 0.9em;
  color: white;
}

@media only screen and (max-width: 600px) {
  .task-container {
    grid-template-columns: repeat(1, 1fr);
  }

  .task {
    flex-wrap: wrap;
    padding: 8px;
  }

  .task-content {
    flex-grow: 1;
    flex-basis: 70%;
    margin-left: 10px;
  }

  .task-name {
    margin-right: 5px;
    font-size: 0.95em;
  }

  .task-description {
    font-size: 0.85rem;
    display: none;
  }

  .task:hover .task-description {
    display: block;
  }

  .edit-icon, .delete-icon {
    font-size: 18px;
    padding: 5px;
  }
}
</style>


