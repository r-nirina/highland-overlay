<template>
<div class="app">
	<h1>Highland Overlay</h1>
</div>
</template>

<script>
export default {
	name: "App",
	components: {},
	data: () => ({}),
	mounted() {},
	methods: {}
}
</script>

<style lang="scss">
@import url("../assets/fonts/Ubuntu/Ubuntu.scss");
@import url("../assets/fonts/UbuntuMono/UbuntuMono.scss");

* {
	font-family:   'Ubuntu', sans-serif;
	box-sizing:    border-box;
	margin:        0;
	padding:       0;
	outline:       none;
	user-select:   none;
}

html {
	height:   100%;
	width:    100%;

	body {
		height:   100%;
		width:    100%;

		ul,
		ol {
			list-style:   none;
		}
	}
}

</style>
