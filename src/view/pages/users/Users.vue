<template>
  <div>
    <v-alert v-if="errors" type="error" dismissible>
      {{ errors }}
    </v-alert>
    <v-card elevation="2" outlined>
      <div class="p-4">
        <router-link to="/users/add" v-slot="{ navigate }">
          <v-btn class="ma-2" outlined color="indigo" @click="navigate">
            Add user
          </v-btn>
        </router-link>
      </div>
      <v-card-title>
        Users List
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>

      <v-data-table
        item-key="name"
        class="elevation-1"
        :headers="headers"
        :items="listUsers"
        :loading="loading"
        loading-text="Loading... Please wait"
        :search="search"
      >
        <template v-slot:item.actions="{ item }">
          <router-link :to="'/users/edit/' + item._id" v-slot="{ navigate }">
            <v-icon small class="mr-2" @click="navigate">
              mdi-pencil
            </v-icon>
          </router-link>
          <v-icon
            v-if="item.role !== 'admin'"
            small
            @click="deleteDialog(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" persistent max-width="200">
      <v-card>
        <v-card-title>
          Delete user
        </v-card-title>
        <v-card-text>Are you sure?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="deleteItem">
            Yes
          </v-btn>
          <v-btn color="green darken-1" text @click="dialog = false">
            No
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
import { DELETE_USER, LIST_USERS } from "@/core/services/store/users.module";

export default {
  name: "Users",
  data: () => ({
    search: "",
    dialog: false,
    deleteId: null,
    headers: [
      {
        text: "Name",
        value: "name"
      },
      {
        text: "Last Name",
        value: "last_name"
      },
      {
        text: "Email",
        value: "email"
      },
      {
        text: "Country",
        value: "country"
      },
      {
        text: "",
        sortable: false,
        value: "actions"
      }
    ]
  }),

  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Users" }]);
    this.$store.dispatch(LIST_USERS);
  },
  computed: {
    ...mapGetters(["listUsers", "loading", "errors"])
  },
  methods: {
    deleteDialog(item) {
      this.dialog = true;
      this.deleteId = item._id;
    },
    deleteItem() {
      this.dialog = false;
      this.$store.dispatch(DELETE_USER, this.deleteId);
    }
  }
};
</script>
