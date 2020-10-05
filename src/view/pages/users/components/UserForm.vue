<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="name"
      :rules="textFieldRules"
      label="Name"
      required
    ></v-text-field>
    <v-text-field
      v-model="last_name"
      :rules="textFieldRules"
      label="Last Name"
      required
    ></v-text-field>
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

    <v-autocomplete
      v-model="country"
      :items="items"
      :rules="[v => !!v || 'Country is required']"
      label="Country"
      required
    ></v-autocomplete>
    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      outlined
      @click="validate"
      :loading="isLoading"
    >
      Save
    </v-btn>
    <v-btn color="error" outlined class="mr-4" @click="reset">
      Reset Form
    </v-btn>
  </v-form>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "UserForm",
  props: {
    handleSubmit: { type: Function },
    dataForm: { type: Object },
    loading: { type: Boolean },
    success: { type: Boolean }
  },
  data: () => ({
    valid: true,
    name: "",
    last_name: "",
    textFieldRules: [v => !!v || "This value is required"],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    country: null,
    items: []
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.$props.handleSubmit({
          name: this.name,
          last_name: this.last_name,
          email: this.email,
          country: this.country
        });
      }
    },
    reset() {
      this.$refs.form.reset();
    }
  },
  mounted() {
    if (this.$props.dataForm) {
      const { name, last_name, email, country } = this.$props.dataForm;
      this.name = name;
      this.last_name = last_name;
      this.email = email;
      this.country = country;
    }
    this.items = this.countries;
  },
  computed: {
    ...mapGetters(["countries"]),
    isLoading() {
      return this.$props.loading;
    }
  },
  watch: {
    success(newValue, oldValue) {
      if (newValue !== oldValue && newValue && !this.$props.dataForm) {
        this.reset();
      }
    }
  }
};
</script>

<style scoped></style>
