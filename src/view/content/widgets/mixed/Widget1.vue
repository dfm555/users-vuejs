<template>
	<!--begin::Mixed Widget 1-->
	<div class="card card-custom bg-gray-100 card-stretch gutter-b">
		<!--begin::Header-->
		<!--end::Header-->
		<!--begin::Body-->
		<div class="card-body p-0 position-relative overflow-hidden">
			<!--begin::Stats-->
			<div class="card-spacer">
				<div class="col bg-light-primary px-6 py-8 rounded-xl">
					<span class="svg-icon svg-icon-3x svg-icon-primary d-block my-2">
						<inline-svg src="media/svg/icons/Communication/Add-user.svg" />
					</span>
					<router-link to="/users" v-slot="{ href, navigate }">
						<a
							:href="href"
							class="text-primary font-weight-bold font-size-h6 mt-2"
							@click="navigate"
						>
							Our Users
						</a>
					</router-link>
				</div>
			</div>
			<!--end::Stats-->
			<!--end::Body-->
		</div>
		<!--end::Mixed Widget 1-->
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	name: "widget-1",
	components: {},
	computed: {
		...mapGetters(["layoutConfig"])
	},
	mounted() {
		// reference; kt_mixed_widget_1_chart
	}
};
</script>
