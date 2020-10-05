<template>
  <div>
    <v-alert v-if="errors" type="error">
      Something went wrong! {{ errors.message }}
    </v-alert>
    <v-alert v-if="success" type="success">
      User was updated!
    </v-alert>
    <UserForm
      :data-form="getUserData()"
      :success="success"
      :loading="loading"
      :handleSubmit="editUser"
    ></UserForm>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import { UPDATE_USER } from "@/core/services/store/users.module";
import UserForm from "@/view/pages/users/components/UserForm";

export default {
  name: "Edit",
  components: { UserForm },
  data: () => ({ userId: null }),
  created() {
    const {
      params: { id }
    } = this.$route;
    this.userId = id;
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [
      { title: "Users", route: "/users" },
      { title: "Edit User" }
    ]);
  },
  computed: {
    ...mapGetters(["listUsers", "loading", "success", "errors"])
  },
  methods: {
    editUser(item) {
      this.$store.dispatch(UPDATE_USER, { _id: this.userId, ...item });
    },
    getUserData() {
      const userData = this.listUsers.filter(user => user._id === this.userId);
      return userData.length ? userData[0] : {};
    }
  }
};
</script>

<style scoped></style>
