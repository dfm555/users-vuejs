<template>
  <v-card>
    <v-card-title>
      Add User
    </v-card-title>
    <v-container>
      <v-row>
        <v-col cols="12" v-if="errors || success">
          <v-alert v-if="errors" type="error">
            Something went wrong! {{ errors.message }}
          </v-alert>
          <v-alert v-if="success" type="success">
            User was created!
          </v-alert>
        </v-col>
        <v-col cols="12" md="6">
          <UserForm
            :success="success"
            :loading="loading"
            :handleSubmit="saveUser"
          ></UserForm>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import { ADD_USER } from "@/core/services/store/users.module";
import UserForm from "@/view/pages/users/components/UserForm";

export default {
  name: "Add",
  components: { UserForm },

  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Users", route: "/users" },
      { title: "Add User" }
    ]);
  },
  computed: {
    ...mapGetters(["loading", "success", "errors"])
  },
  methods: {
    saveUser(item) {
      this.$store.dispatch(ADD_USER, item);
    }
  }
};
</script>
