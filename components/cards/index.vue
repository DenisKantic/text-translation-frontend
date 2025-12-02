<template>
  <div
    class="h-screen d-flex items-center justify-center align-center flex-column w-100"
    style="background-color: #e8eef2"
  >
    <p class="text-h3 text-center mt-16">Translate your Text</p>
    <v-row class="pa-10 w-66 mx-auto h-screen mt-10">
      <!-- LEFT PANEL -->
      <v-col cols="12" md="6">
        <v-card class="pa-4" elevation="1" color="#fefefe">
          <!-- Dropdown Row -->
          <div class="d-flex align-center mb-4" style="gap: 12px">
            <v-select
              :items="languages"
              item-title="label"
              item-value="value"
              v-model="selectedLang"
              label="Translate to"
              variant="outlined"
              density="comfortable"
              style="max-width: 180px"
            />

            <v-select
              :items="models"
              item-title="label"
              item-value="value"
              v-model="selectedModel"
              label="AI Model"
              variant="outlined"
              density="comfortable"
              style="max-width: 180px"
            />
          </div>

          <div class="text-subtitle-1 mb-2">Source Text</div>

          <v-textarea
            v-model="sourceText"
            counter
            variant="plain"
            rows="12"
            class="border-sm rounded-lg px-4"
            no-resize
            placeholder="Enter text to translate."
          />

          <v-card-actions class="mt-2">
            <v-spacer></v-spacer>
            <v-btn variant="flat" color="red">Delete</v-btn>

            <v-btn variant="flat" color="#3770e8" @click="submit">
              Translate
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- RIGHT PANEL -->
      <v-col cols="12" md="6">
        <v-card class="pa-4" elevation="1">
          <div
            class="text-subtitle-1 mb-2 d-flex flex-row justify-space-between"
          >
            <p>Translated Text</p>
            <v-icon>mdi-content-copy</v-icon>
          </div>

          <v-textarea
            v-model="translatedText"
            variant="plain"
            rows="18"
            class="border-sm rounded-lg px-4"
            no-resize
            readonly
            placeholder="Translated text appears here..."
          />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const languages = [
  { label: "English", value: "en" },
  { label: "Slovenian", value: "sl" },
  { label: "German", value: "de" },
];

const models = [
  { label: "ChatGPT", value: "chatgpt" },
  { label: "Google Gemini", value: "gemini" },
];

// State
const selectedLang = ref("Select");
const selectedModel = ref("chatgpt");
const sourceText = ref("");
const translatedText = ref("");

// Stats
const timeMs = ref(0);
const tokens = ref(0);
const cost = ref(0);

const submit = () => {
  console.log("selected Lang:", selectedLang.value);
  console.log("selected model:", selectedModel.value);
  console.log("selected text:", sourceText.value);
};
</script>

<style scoped>
.v-card {
  border-radius: 16px;
}
</style>
