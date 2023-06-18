<script setup>
import Papa from "papaparse";
import { ref } from "vue";
import { useToast } from "vue-toastification";

import Modal from "./components/Modal.vue";

const data = ref([]);
const toast = useToast();

function deleteColumn(index) {
  data.value = data.value.map((row, i) =>
    row.filter((column, i) => i !== index)
  );
}

function deleteRow(index) {
  data.value = data.value.filter((elem, i) => i != index);
}

function input(event, index, i) {
  data.value[index][i] = event.target.value;
  if (index === data.value.length - 1) {
    data.value.push(data.value[0].map((elem) => ""));
  }
  if (i === data.value[index].length - 1) {
    data.value = data.value.map((elem) => [...elem, ""]);
  }
}

function uploadFile(event) {
  const file = event.target.files[0];
  Papa.parse(file, {
    skipEmptyLines: true,
    complete(res) {
      if (res.errors[0]) toast.error(res.errors[0].message);
      else {
        data.value = res.data;
        data.value.push(data.value[0].map((elem) => ""));
        data.value = data.value.map((elem) => [...elem, ""]);
        document.getElementById("open_modal").click();
      }
    },
  });
}
</script>

<template>
  <Modal :table="data">
    <div class="relative overflow-y-auto max-h-[45rem]">
      <table
        class="min-w-max text-sm text-center text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="left-0 border-2 z-10"></th>
            <th scope="col" v-for="(header, i) in data[0]" :key="i" class="border-2">
              <div class="flex border-2">
                <input
                  class="pl-1 text-center ml-auto"
                  :value="data[0][i]"
                  @input="input($event, 0, i)"
                  :style="{ width: (data[0][i].length || 10) * 12 + 'px' }"
                />
                <svg
                  v-if="i != data[0].length - 1"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  @click="deleteColumn(i)"
                  class="mr-auto w-5 h-5 cursor-pointer hover:text-black"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  ></path>
                </svg>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in data"
            :key="index"
            class="bg-white border-2 dark:bg-gray-800 dark:border-gray-700"
          >
            <template v-if="index != 0">
              <th class="px-1 w-20 sticky left-0 bg-gray-50">
                <div class="flex justify-around border-2">
                  {{ index }}
                  <svg
                    v-if="index != data.length - 1"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    @click="deleteRow(index)"
                    class="w-5 h-5 cursor-pointer hover:text-black"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    ></path>
                  </svg>
                </div>
              </th>
              <td v-for="(elem, i) in row" :key="i" class="border-r-2 w-10">
                <input
                  class="pl-1 text-center"
                  :value="data[index][i]"
                  @input="input($event, index, i)"
                  :style="{ width: (data[index][i].length || 10) * 12 + 'px' }"
                />
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
  </Modal>
  <div class="flex items-center justify-center h-screen">
    <label
      for="dropzone-file"
      class="mx-10 flex flex-col items-center justify-center w-96 h-96 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
    >
      <div class="flex flex-col items-center justify-center pt-5 pb-6">
        <svg
          aria-hidden="true"
          class="w-10 h-10 mb-3 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          ></path>
        </svg>
        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span class="font-semibold">Click to upload</span> or drag and drop
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400">Only CSV files</p>
      </div>
      <input
        id="dropzone-file"
        type="file"
        @input="uploadFile"
        class="hidden"
      />
    </label>
  </div>
  <button
    id="open_modal"
    class="hidden"
    data-modal-target="extralarge-modal"
    data-modal-toggle="extralarge-modal"
  ></button>
</template>
<style scoped>
thead th {
  position: sticky;
  top: 0;
  --tw-bg-opacity: 1;
  background-color: rgb(249 250 251 / var(--tw-bg-opacity));
}
</style>
