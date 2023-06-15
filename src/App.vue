<script setup>
import Papa from "papaparse";
import { ref } from "vue";
import { useToast } from "vue-toastification";

import Modal from "./components/Modal.vue";

const data = ref([]);
const toast = useToast();

function deleteColumn(index) {
  data.value = data.value.filter((elem, i) => i != index);
}

function input(event, index, i) {
  data.value[index][i] = event.target.value;
  if (index === data.value.length - 1) {
    data.value.push(data.value[0].map((elem) => ""));
  }
}

function uploadFile(event) {
  const file = event.target.files[0];
  Papa.parse(file, {
    skipEmptyLines: true,
    complete(res) {
      console.log(res);
      if (res.errors[0]) toast.error(res.errors[0].message);
      else {
        data.value = res.data;
        data.value.push(data.value[0].map((elem) => ""));
        document.getElementById("open_modal").click();
      }
    },
  });
}

function downloadFile() {
  const a = document.createElement("a");

  const str = Papa.unparse(data.value);

  const blob = new Blob([str], { type: "text/csv" });

  const url = window.URL.createObjectURL(blob);

  a.href = url;
  a.download = "download.csv";

  a.click();
}
</script>

<template>
  <Modal :table="data" />
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
        @change="uploadFile"
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
  <!-- <div class="px-2 pt-3 flex flex-col h-screen">
    <div class="flex justify-between">
      <button
        type="button"
        :disabled="!data.length"
        @click="downloadFile"
        class="ml-2 text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          class="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
          ></path>
        </svg>
      </button>
    </div>
    <div class="relative overflow-x-auto my-4 overflow-y-auto h-screen">
      <table
        class="w-full text-sm text-center text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th></th>
            <th
              scope="col"
              class="border-2 px-4 py-3"
              v-for="header in data[0]"
              :key="header"
            >
              {{ header }}
            </th>
            <th v-if="data.length" class="border-2 px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in data"
            :key="index"
            class="bg-white border-2 dark:bg-gray-800 dark:border-gray-700"
          >
            <template v-if="index != 0">
              <td class="border-r-2 px-1">{{ index }}</td>
              <td v-for="(elem, i) in row" :key="i" class="border-r-2">
                <input
                  class="pl-1 w-full"
                  :value="data[index][i]"
                  @input="input($event, index, i)"
                />
              </td>
              <td v-if="index != data.length - 1" class="border-r-2 px-4 py-3">
                <a
                  href="#"
                  @click="deleteColumn(index)"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >Delete</a
                >
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
  </div> -->
</template>
